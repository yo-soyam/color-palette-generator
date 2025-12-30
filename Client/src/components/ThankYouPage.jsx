import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function ThankYouPage({ onComplete }) {
    const [seconds, setSeconds] = useState(5);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    onComplete();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground text-center p-4">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="max-w-md w-full"
            >
                <div className="mb-8 flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
                        <Heart className="w-24 h-24 text-primary relative z-10 fill-primary/20" />
                    </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Thank You!
                </h1>

                <p className="text-xl text-muted-foreground mb-12">
                    We appreciate your feedback. It helps us make Iris even better for everyone.
                </p>

                <div className="space-y-4">
                    <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-primary"
                            initial={{ width: "100%" }}
                            animate={{ width: "0%" }}
                            transition={{ duration: 5, ease: "linear" }}
                        />
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Redirecting to home in {seconds} seconds...
                    </p>
                </div>

                <div className="mt-8">
                    <Button variant="outline" onClick={onComplete}>
                        Return Home Now
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}
