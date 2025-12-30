import { Button } from '@/components/ui/button';
import { ArrowRight, Activity, Calendar, Mail, User, Bell, Search, Settings } from 'lucide-react';

export const BentoPreview = () => {
    return (
        <div className="w-full h-full p-4 md:p-8 bg-background/50 rounded-3xl overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-4 gap-4 h-full min-h-[500px]">

                {/* Large Hero Card */}
                <div className="col-span-1 md:col-span-2 row-span-2 md:row-span-2 bg-card rounded-3xl p-6 border border-border flex flex-col justify-between relative overflow-hidden group hover:shadow-lg transition-shadow">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10" />
                    <div>
                        <h3 className="text-3xl font-bold text-card-foreground mb-2">Grow Faster</h3>
                        <p className="text-muted-foreground">Scale your business with our premium tools.</p>
                    </div>
                    <div className="mt-4 flex gap-2">
                        <Button>Get Started</Button>
                        <Button variant="outline">Learn More</Button>
                    </div>
                    <div className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-20 bg-gradient-to-tl from-primary to-transparent" />
                </div>

                {/* Stats Card */}
                <div className="col-span-1 md:col-span-1 bg-primary text-primary-foreground rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-xl shadow-primary/20">
                    <span className="text-5xl font-bold mb-1">84%</span>
                    <span className="text-sm opacity-80 uppercase tracking-wider">Conversion</span>
                </div>

                {/* Icon Grid */}
                <div className="col-span-1 md:col-span-1 bg-secondary rounded-3xl p-6 flex flex-wrap gap-4 items-center justify-center content-center">
                    <div className="p-3 bg-background rounded-xl shadow-sm"><Bell className="w-5 h-5 text-foreground" /></div>
                    <div className="p-3 bg-background rounded-xl shadow-sm"><Settings className="w-5 h-5 text-foreground" /></div>
                    <div className="p-3 bg-background rounded-xl shadow-sm"><Search className="w-5 h-5 text-foreground" /></div>
                    <div className="p-3 bg-background rounded-xl shadow-sm"><User className="w-5 h-5 text-foreground" /></div>
                </div>

                {/* Typography Card */}
                <div className="col-span-1 md:col-span-2 row-span-1 bg-accent text-accent-foreground rounded-3xl p-6 flex items-center justify-between">
                    <div>
                        <h4 className="text-xl font-bold">Typography</h4>
                        <p className="opacity-70">Inter / Outfit / Plus Jakarta</p>
                    </div>
                    <div className="text-4xl font-serif italic opacity-50">Aa</div>
                </div>

                {/* Chart/Visual */}
                <div className="col-span-1 md:col-span-1 bg-card border border-border rounded-3xl p-4 flex items-end justify-between gap-2">
                    {[40, 70, 45, 90, 60].map((h, i) => (
                        <div key={i} className="w-full bg-primary rounded-t-sm" style={{ height: `${h}%`, opacity: 0.5 + (i * 0.1) }} />
                    ))}
                </div>

                {/* Profile */}
                <div className="col-span-1 md:col-span-1 bg-background border border-border rounded-3xl p-4 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 rounded-full bg-secondary mb-2" />
                    <div className="w-20 h-3 bg-muted rounded-full mb-1" />
                    <div className="w-12 h-2 bg-muted/50 rounded-full" />
                </div>

                {/* Bottom Wide CTA */}
                <div className="col-span-1 md:col-span-4 bg-foreground text-background rounded-3xl p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-background/10 rounded-full"><Mail className="w-6 h-6" /></div>
                        <div>
                            <h4 className="font-bold">Newsletter</h4>
                            <p className="text-sm opacity-70 hidden md:block">Stay updated with the latest trends.</p>
                        </div>
                    </div>
                    <div className="flex gap-2 w-full max-w-xs md:max-w-md">
                        <input className="w-full bg-background/10 border-none rounded-full px-4 text-sm placeholder:text-background/50 focus:ring-1 focus:ring-background" placeholder="Enter email..." />
                        <Button size="sm" variant="secondary" className="rounded-full shrink-0">Subscribe</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
