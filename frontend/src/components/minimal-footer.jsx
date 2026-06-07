import {
    FacebookIcon,
    GithubIcon,
    Zap, 
    InstagramIcon,
    LinkedinIcon,
    TwitterIcon,
    YoutubeIcon,
} from 'lucide-react';

export function MinimalFooter() {
    const year = new Date().getFullYear();

    const company = [
        {
            title: 'About StreamRip',
            href: '#',
        },
        {
            title: 'Terms of Service',
            href: '#',
        },
        {
            title: 'Privacy Policy',
            href: '#',
        },
        {
            title: 'DMCA / Copyright',
            href: '#',
        },
    ];

    const resources = [
        {
            title: 'FAQ',
            href: '#',
        },
        {
            title: 'Supported Sites',
            href: '#',
        },
        {
            title: 'Contact Support',
            href: '#',
        },
        {
            title: 'API Status',
            href: '#',
        },
    ];

    const socialLinks = [
        {
            icon: <GithubIcon className="size-4" />,
            link: '#',
        },
        {
            icon: <TwitterIcon className="size-4" />,
            link: '#',
        },
        {
            icon: <InstagramIcon className="size-4" />,
            link: '#',
        },
    ];

    return (
        <footer className="relative z-10 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800/50 pt-16 pb-8">
            <div className="mx-auto max-w-6xl px-4">
                
                <div className="grid grid-cols-1 md:grid-cols-6 gap-12 md:gap-8 mb-16">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-3 flex flex-col gap-6">
                        <a href="#" className="flex items-center gap-2 w-max">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500 text-white">
                                <Zap className="size-5 fill-current" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                                StreamRip
                            </span>
                        </a>
                        <p className="text-zinc-500 dark:text-zinc-400 max-w-sm font-inter text-sm leading-relaxed">
                            The fastest tool to download YouTube videos in 4K, 1080p, and MP3. No ads, no registration, just raw speed.
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.map((item, i) => (
                                <a
                                    key={i}
                                    className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-sky-500 hover:text-white dark:hover:bg-sky-500 dark:hover:text-white transition-all duration-300"
                                    target="_blank"
                                    href={item.link}>
                                    {item.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="col-span-1 md:col-span-1.5">
                        <span className="text-zinc-900 dark:text-zinc-100 font-semibold mb-4 block">
                            Product
                        </span>
                        <div className="flex flex-col gap-3">
                            {resources.map(({ href, title }, i) => (
                                <a
                                    key={i}
                                    className="text-zinc-500 dark:text-zinc-400 hover:text-sky-500 dark:hover:text-sky-400 text-sm transition-colors w-max"
                                    href={href}>
                                    {title}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-1.5">
                        <span className="text-zinc-900 dark:text-zinc-100 font-semibold mb-4 block">
                            Legal
                        </span>
                        <div className="flex flex-col gap-3">
                            {company.map(({ href, title }, i) => (
                                <a
                                    key={i}
                                    className="text-zinc-500 dark:text-zinc-400 hover:text-sky-500 dark:hover:text-sky-400 text-sm transition-colors w-max"
                                    href={href}>
                                    {title}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-zinc-500 dark:text-zinc-500 text-sm font-inter">
                        © {year} StreamRip. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-500">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        All Systems Operational
                    </div>
                </div>
            </div>
        </footer>
    );
}