import express from "express";
import cors from "cors";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

const DOWNLOAD_DIR = path.join(process.cwd(), "downloads");
if (!fs.existsSync(DOWNLOAD_DIR)) fs.mkdirSync(DOWNLOAD_DIR);

const infoCache = new Map();
const CACHE_LIMIT = 100;

app.post("/info", (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL required" });

  if (infoCache.size > CACHE_LIMIT) infoCache.clear();

  const cacheKey = crypto.createHash("md5").update(url).digest("hex");
  if (infoCache.has(cacheKey)) return res.json(infoCache.get(cacheKey));

  const yt = spawn("yt-dlp", [
    url,
    "--dump-json",
    "--no-playlist",
    "--no-warnings"
  ]);

  let data = "";
  let errorData = "";

  yt.stdout.on("data", chunk => (data += chunk));
  yt.stderr.on("data", chunk => (errorData += chunk));

  yt.on("close", code => {
    if (code !== 0) {
      console.error("yt-dlp error:", errorData);
      return res.status(500).json({ error: "Failed to fetch video data" });
    }

    try {
      const json = JSON.parse(data);
      
      const qualities = [1080, 720, 480, 360];
      const formats = qualities.map(q => ({
   
        formatId: `bv*[height=${q}]+ba/b[height=${q}]`, 
        quality: `${q}p`,
        container: 'mp4'
      }));

      formats.unshift({
        formatId: "bv*+ba/b",
        quality: "Best Available (4K/2K)",
        container: 'mp4'
      });

      const response = {
        title: json.title,
        thumbnail: json.thumbnail,
        duration: json.duration_string,
        formats
      };

      infoCache.set(cacheKey, response);
      res.json(response);

    } catch (err) {
      res.status(500).json({ error: "Invalid metadata response" });
    }
  });
});

app.get("/download", (req, res) => {
  const { url, format } = req.query;
  if (!url || !format) return res.status(400).send("Missing params");

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  
  const filename = `vid-${Date.now()}.mp4`;
  const filePath = path.join(DOWNLOAD_DIR, filename);

  const yt = spawn("yt-dlp", [
    url,
    "-f", format,
    "-o", filePath,
    "--merge-output-format", "mp4", 
    "--newline",
    "--progress-template", "download:%(progress._percent_str)s" 
  ]);

  req.on('close', () => {
    if (yt.exitCode === null) {
        console.log("Client disconnected, killing process...");
        yt.kill("SIGKILL");

        if (fs.existsSync(filePath)) fs.unlinkSync(filePath); 
    }
  });

  yt.stdout.on("data", data => {
    const str = data.toString();
    

    if (str.includes("download:")) {
        res.write(`data: ${str.trim()}\n\n`);
    }
    if (str.includes("[Merger]")) {
        res.write(`data: status:Merging audio and video...\n\n`);
    }
  });

  yt.stderr.on("data", data => {
  });

  yt.on("close", code => {
    if (code === 0) {
      res.write(`event: done\ndata: /file?path=${encodeURIComponent(filename)}\n\n`);
      res.end();
    } else {
      res.write(`event: error\ndata: Download failed\n\n`);
      res.end();
    }
  });
});

app.get("/file", (req, res) => {
  const filename = req.query.path;
  if(!filename) return res.status(400).send("No file specified");

  const safeName = path.basename(filename); 
  const filePath = path.join(DOWNLOAD_DIR, safeName);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("File expired or not found");
  }

  res.download(filePath, safeName, (err) => {
    try {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    } catch(e) { console.error("Cleanup failed", e); }
  });
});
setInterval(() => {
    fs.readdir(DOWNLOAD_DIR, (err, files) => {
        if (err) return;
        const now = Date.now();
        files.forEach(file => {
            const curPath = path.join(DOWNLOAD_DIR, file);
            fs.stat(curPath, (err, stats) => {
                if(err) return;
                if(now - stats.mtimeMs > 10 * 60 * 1000) {
                    fs.unlink(curPath, () => {});
                }
            });
        });
    });
}, 60 * 1000); 

app.listen(5000, () => console.log("Engine Running on 5000"));