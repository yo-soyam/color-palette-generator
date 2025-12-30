import React, { useEffect } from "react";
// import Link from "next/link"; // Replaced with simple a tag or react-router Link if needed. Using <a> for now as basic or assuming React Router will be added later if requested.
import { renderCanvas } from "@/components/ui/canvas"
import { Plus, Shapes } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Hero = React.memo(function Hero({ onGenerate }) {
    useEffect(() => {
        // Ensuring canvas exists before running and cleaning up on unmount
        const cleanup = renderCanvas();
        return cleanup;
    }, []);

    const handleGenerate = () => {
        if (onGenerate) onGenerate();
        // Small delay to allow state update before smooth scroll, though usually fine
        setTimeout(() => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
        }, 10);
    };

    return (
        <section id="home" className="relative w-full overflow-hidden">
            <div className="animation-delay-8 animate-fadeIn mt-20 flex flex-col items-center justify-center px-4 text-center md:mt-20 z-10 relative">
                <div className="z-10 mb-6 mt-10 sm:justify-center md:mb-4 md:mt-20">
                    <div className="relative flex items-center whitespace-nowrap rounded-full border bg-popover px-3 py-1 text-xs leading-6 text-primary/60 ">
                        <Shapes className="h-5 p-1" /> Introducing Iris.
                    </div>
                </div>

                <div className="mb-10 mt-4 md:mt-6">
                    <div className="px-2">
                        <h1 className="select-none text-center text-5xl font-semibold leading-none tracking-tight md:text-7xl lg:text-8xl max-w-6xl mx-auto mt-4 mb-8 relative z-20">
                            {/* Plus icons for decorative effect, kept as they add 'design tool' vibe */}
                            <Plus
                                strokeWidth={4}
                                className="absolute -left-5 -top-5 h-10 w-10 text-primary hidden md:block"
                            />
                            <Plus
                                strokeWidth={4}
                                className="absolute -bottom-5 -left-5 h-10 w-10 text-primary hidden md:block"
                            />
                            <Plus
                                strokeWidth={4}
                                className="absolute -right-5 -top-5 h-10 w-10 text-primary hidden md:block"
                            />
                            <Plus
                                strokeWidth={4}
                                className="absolute -bottom-5 -right-5 h-10 w-10 text-primary hidden md:block"
                            />
                            Your Ultimate Platform for <span className="text-primary block md:inline">Colors.</span>
                        </h1>
                        <div className="flex items-center justify-center gap-1 mt-4">
                            <span className="relative flex h-3 w-3 items-center justify-center">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                            </span>
                            <p className="text-xs text-green-500">Instant Generation</p>
                        </div>
                    </div>

                    <h1 className="mt-8 text-2xl md:text-2xl font-light">
                        Welcome to the future of design! I'm{" "}
                        <span className="text-primary font-bold">Iris </span>
                    </h1>

                    <p className="md:text-md mx-auto mb-16 mt-2 max-w-2xl px-6 text-sm text-primary/60 sm:px-6 md:max-w-4xl md:px-20 lg:text-lg">
                        I craft enchanting color combinations for creators, and conjure design resources
                        to empower your next masterpiece.
                    </p>
                    <div className="flex justify-center gap-2">
                        <Button variant="default" size="lg" onClick={handleGenerate}>
                            Generate Now
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="border-2 border-solid border-primary text-primary hover:bg-primary hover:text-white dark:hover:text-black font-bold transition-all"
                            onClick={() => document.getElementById('generator').scrollIntoView({ behavior: 'smooth' })}
                        >
                            View Saved
                        </Button>
                    </div>
                </div>
            </div>
            <canvas
                className="bg-skin-base pointer-events-none absolute inset-0 mx-auto opacity-60"
                id="canvas"
            ></canvas>
        </section>
    );
});
