import { useState, useRef } from "react";
import { Button } from "./components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Progress } from "./components/ui/progress";
import { Download, Loader2, Link as LinkIcon, ArrowRight, Video, Music, CheckCircle2, Youtube } from "lucide-react";
import Features from "./components/Features";
export default function Hero() {
  const [url, setUrl] = useState("");
  const [info, setInfo] = useState(null);
  const [format, setFormat] = useState("");
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const eventSourceRef = useRef(null);

  const fetchInfo = async () => {
    if (!url) return;
    setLoading(true);
    setInfo(null);
    setProgress(0);
    setStatus("");

    try {
      const res = await fetch("http://localhost:5000/info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setInfo(data);
      if (data.formats.length > 0) setFormat(data.formats[0].formatId);
    } catch (err) {
      alert("Invalid URL or Server Error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const startDownload = () => {
    if(eventSourceRef.current) eventSourceRef.current.close();
    
    setDownloading(true);
    setProgress(0);
    setStatus("Initializing...");

    const es = new EventSource(
      `http://localhost:5000/download?url=${encodeURIComponent(url)}&format=${encodeURIComponent(format)}`
    );
    eventSourceRef.current = es;

    es.onmessage = (e) => {
      if(e.data.startsWith("status:")) {
        setStatus(e.data.replace("status:", ""));
        return;
      }
      const match = e.data.match(/(\d+\.?\d*)%/);
      if (match) {
        const pct = parseFloat(match[1]);
        setProgress(pct);
        setStatus(pct < 100 ? "Downloading..." : "Merging Audio & Video...");
      }
    };

    es.addEventListener("done", (e) => {
      es.close();
      setDownloading(false);
      setStatus("Download Ready!");
      window.location.href = `http://localhost:5000${e.data}`; 
    });

    es.addEventListener("error", () => {
        es.close();
        setDownloading(false);
        setStatus("Error occurred during conversion.");
    });
  };


  return (
    <div className="w-full max-w-3xl space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
     <div className="text-center space-y-6">
         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 bg-zinc-50 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400 text-xs font-medium mb-4">
            <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Accepting new URLs
         </div>
        <h1 className="text-4xl sm:text-6xl font-spacegrotesk tracking-tight">
          <span className="block text-zinc-900 dark:text-zinc-100">Download YouTube videos.</span>
          <span className="block bg-gradient-to-r from-sky-600 to-sky-600 bg-clip-text text-transparent pb-2">
            Fast. Simple. Reliable.
          </span>
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto leading-snug">
          Enter a link below to extract 4K video or high-fidelity audio instantly. No ads, no registration, just raw speed.
        </p>
      </div>

     <div className="relative group z-20">
       <div className="relative flex items-center p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl shadow-black/5 dark:shadow-black/50">
          <div className="pl-4 text-zinc-400 dark:text-zinc-500">
            <LinkIcon className="h-6 w-6" />
          </div>
          <input
            placeholder="Paste YouTube URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 border-0 outline-none  text-sm h-12 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600  px-4"
             onKeyDown={(e) => { if(e.key === 'Enter') fetchInfo() }}
          />
          <Button 
            onClick={fetchInfo} 
            disabled={loading}
         className="
    font-inter corner-squircel px-4 py-1
    bg-sky-500 hover:bg-sky-600
    cursor-pointer text-white
    [text-shadow:0_1px_1px_rgba(0,0,0,0.25)]
    shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-2px_0_rgba(0,0,0,0.15)]
    hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-2px_0_rgba(0,0,0,0.25)]
    active:shadow-[inset_0_3px_6px_rgba(0,0,0,0.35)]
    active:translate-y-[1px]
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-sky-400/60
    focus-visible:ring-offset-2
    focus-visible:ring-offset-transparent
    transition-all duration-200
  "
         >
            {loading ? <Loader2 className="animate-spin h-6 w-6" /> : <span className="flex items-center gap-2">Analyze <ArrowRight className="h-5 w-5" /></span>}
          </Button>
        </div>
      </div>

      {info && (
        <div className="relative z-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white/80 shadow-2xl backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/60">
                
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-sky-50/50 to-transparent dark:from-sky-900/10"></div>

                <div className="relative z-20 grid gap-6 p-6 md:grid-cols-[300px_1fr] md:gap-8">
                    
                    <div className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 shadow-md dark:border-zinc-800 dark:bg-black md:aspect-auto md:h-full">
                        <img 
                            src={info.thumbnail} 
                            alt="Video Thumbnail" 
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4">
                            <div className="self-start rounded-full border border-white/10 bg-black/40 p-2 backdrop-blur-md">
                                <Youtube className="h-5 w-5 text-red-500" />
                            </div>
                            <span className="rounded-md bg-black/60 px-2 py-1 font-mono text-xs text-zinc-300 backdrop-blur-sm">
                                {info.duration || 'N/A'}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between gap-6">
                        
                        <div className="space-y-2">
                            <h3 className="line-clamp-2 text-lg font-poppins leading-tight text-zinc-900 dark:text-zinc-100">
                                {info.title}
                            </h3>
                            <p className="text-xs font-inter text-zinc-500 dark:text-zinc-400">
                                Ready for conversion. Select your preferred quality below.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex flex-col gap-2 sm:flex-row">
                                
                                <Select value={format} onValueChange={setFormat}>
                                    <SelectTrigger className="h-12 flex-1 rounded-xl border-zinc-200 bg-zinc-50 text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900">
                                        <SelectValue placeholder="Select format" />
                                    </SelectTrigger>
                                    <SelectContent className="border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                                        {info.formats.map((f) => (
                                            <SelectItem key={f.formatId} value={f.formatId} className="cursor-pointer py-3 focus:bg-zinc-100 dark:focus:bg-zinc-800">
                                                <div className="flex items-center gap-3">
                                                    {f.container === 'mp4' 
                                                        ? <Video className="h-4 w-4 text-sky-500" /> 
                                                        : <Music className="h-4 w-4 text-emerald-500" />
                                                    }
                                                    <span className="font-medium dark:text-zinc-200">{f.quality}</span>
                                                    <span className="ml-auto text-xs font-mono uppercase text-zinc-400 dark:text-zinc-500">{f.container}</span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Button 
                                    onClick={startDownload} 
                                    disabled={downloading}
                                    className={`px-8 rounded-xl font-semibold text-white shadow-md transition-all duration-200 ${
                                        downloading 
                                        ? 'bg-zinc-300 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500 cursor-not-allowed' 
                                        : `font-inter corner-squircel px-4 py-1
    bg-sky-500 hover:bg-sky-600
    cursor-pointer text-white
    [text-shadow:0_1px_1px_rgba(0,0,0,0.25)]
    shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-2px_0_rgba(0,0,0,0.15)]
    hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-2px_0_rgba(0,0,0,0.25)]
    active:shadow-[inset_0_3px_6px_rgba(0,0,0,0.35)]
    active:translate-y-[1px]
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-sky-400/60
    focus-visible:ring-offset-2
    focus-visible:ring-offset-transparent
    transition-all duration-200`
                                    }`}
                                >
                                    {downloading ? "Processing..." : <span className="flex items-center gap-2">Download <Download className="h-5 w-5" /></span>}
                                </Button>
                            </div>
                            {(downloading || progress > 0) && (
                                <div className="relative overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 p-4 font-mono text-sm dark:border-zinc-800/50 dark:bg-zinc-950/50">
                                    {downloading && progress < 100 && (
                                        <div className="absolute inset-0 w-[200%] -skew-x-12 animate-[shimmer_2s_infinite_linear] bg-gradient-to-r from-transparent via-sky-500/10 to-transparent"></div>
                                    )}
                                    <div className="relative z-10 flex items-end justify-between text-zinc-500 dark:text-zinc-400">
                                        <span className="flex items-center gap-2 text-xs uppercase tracking-wider">
                                            {progress === 100 
                                                ? <CheckCircle2 className="h-4 w-4 text-emerald-500"/> 
                                                : <Loader2 className="h-4 w-4 animate-spin text-sky-500"/>
                                            }
                                            <span className="max-w-[150px] truncate sm:max-w-full">{status}</span>
                                        </span>
                                        <span className="font-bold text-zinc-900 dark:text-zinc-200">{progress.toFixed(0)}%</span>
                                    </div>
                                    <Progress 
                                        value={progress} 
                                        className="mt-2 h-2 border border-zinc-200 bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-900" 
                                        indicatorClassName="bg-sky-500 transition-all duration-300" 
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}




















