import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Activity, Calendar, Mail, User, Bell, Search, Settings, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Toast = ({ message, onClose }) => (
    <motion.div
        initial={{ opacity: 0, y: 50, x: 20 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        exit={{ opacity: 0, y: 20, x: 20 }}
        className="fixed bottom-4 right-4 z-50 bg-foreground text-background px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 max-w-sm border border-border/10"
    >
        <div className="bg-green-500/20 p-2 rounded-full">
            <Check className="w-5 h-5 text-green-500" />
        </div>
        <div>
            <h4 className="font-bold text-sm">Successfully Subscribed!</h4>
            <p className="text-xs opacity-80 mt-1">{message}</p>
        </div>
        <button onClick={onClose} className="opacity-50 hover:opacity-100 transition-opacity ml-2">
            <X className="w-4 h-4" />
        </button>
    </motion.div>
);

export const BentoPreview = () => {
    const [submitting, setSubmitting] = useState(false);
    const [subscribed, setSubscribed] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const form = e.target;
        const formData = new FormData(form);

        try {
            await fetch("https://www.postpipe.in/api/public/submit/newsletter", {
                method: "POST",
                body: formData,
                mode: 'no-cors'
            });

            // Assume success
            setSubscribed(true);
            setShowToast(true);
            form.reset();

            // Hide button success state after 3s
            setTimeout(() => setSubscribed(false), 3000);

            // Hide toast after 5s
            setTimeout(() => setShowToast(false), 5000);

        } catch (error) {
            console.error("Newsletter error:", error);
            alert("Failed to subscribe.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <AnimatePresence>
                {showToast && (
                    <Toast
                        message="Welcome to Iris! You'll now receive the latest design trends, news, and exclusive updates directly to your inbox."
                        onClose={() => setShowToast(false)}
                    />
                )}
            </AnimatePresence>
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
                        <form onSubmit={handleSubscribe} className="flex gap-2 w-full max-w-xs md:max-w-md relative">
                            <input
                                name="Email Address"
                                type="email"
                                required
                                className="w-full bg-background/10 border-none rounded-full px-4 text-sm placeholder:text-background/50 focus:ring-1 focus:ring-background text-background"
                                placeholder="Enter email..."
                            />
                            <Button
                                size="sm"
                                variant="secondary"
                                className="rounded-full shrink-0 min-w-[100px]"
                                disabled={submitting}
                            >
                                {subscribed ? <><Check className="w-4 h-4 mr-1" /> Done</> : (submitting ? '...' : 'Subscribe')}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
