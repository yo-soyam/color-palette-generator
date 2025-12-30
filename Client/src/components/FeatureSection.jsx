import React from 'react';
import { Clock, LayoutTemplate, MousePointerClick } from 'lucide-react';

export const FeatureSection = () => {
    const features = [
        {
            icon: <Clock className="w-10 h-10 mb-4 text-primary" />,
            title: "Saves time",
            description: "No need to spend hours implementing different variations of colors. Decide right away!"
        },
        {
            icon: <LayoutTemplate className="w-10 h-10 mb-4 text-primary" />,
            title: "It's Realistic",
            description: "Color Palettes make it hard to pick. This tool distributes the colors on a real website."
        },
        {
            icon: <MousePointerClick className="w-10 h-10 mb-4 text-primary" />,
            title: "It's simple",
            description: "Push a few buttons, and there you have it! Your very own branding colors, ready to export."
        }
    ];

    return (
        <section className="py-20 px-4 container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-foreground">Why Iris?</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center text-center p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300"
                    >
                        {/* Icon Container with subtle background blob */}
                        <div className="relative mb-6">
                            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150 opacity-50"></div>
                            <div className="relative bg-background p-4 rounded-2xl shadow-sm ring-1 ring-border/50">
                                {feature.icon}
                            </div>
                        </div>

                        <div className="relative inline-block mb-4">
                            <h3 className="text-2xl font-semibold text-card-foreground relative z-10">{feature.title}</h3>
                            <div className="absolute bottom-1 left-0 w-full h-3 bg-secondary/30 -rotate-1 z-0 rounded-full"></div>
                        </div>

                        <p className="text-muted-foreground leading-relaxed">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};
