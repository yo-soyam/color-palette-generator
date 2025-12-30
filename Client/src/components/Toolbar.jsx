import React from 'react';
import { Button } from "@/components/ui/button";
import AnimatedCopyButton from "@/components/ui/animated-copy-button";
import { RefreshCw, Save, Undo, Redo, Copy, Lock, Unlock } from "lucide-react";
import { cn } from "@/lib/utils";

export function Toolbar({ colors, onGenerate, onSave, onColorChange }) {
    const roles = [
        { name: 'Text', key: 'text' },
        { name: 'Background', key: 'background' },
        { name: 'Primary', key: 'primary' },
        { name: 'Secondary', key: 'secondary' },
        { name: 'Accent', key: 'accent' },
    ];

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4">
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-2xl rounded-2xl p-2 flex flex-col md:flex-row items-center gap-4 justify-between">

                {/* Color Controls */}
                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 px-2 hide-scrollbar">
                    {roles.map((role) => (
                        <div key={role.key} className="flex flex-col items-center gap-1 group relative">
                            <label
                                htmlFor={`color-${role.key}`}
                                className={cn(
                                    "w-24 h-12 md:h-14 rounded-lg cursor-pointer border-2 border-transparent hover:border-slate-300 dark:hover:border-slate-600 transition-all flex items-center justify-center relative overflow-hidden shadow-sm",
                                    "focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
                                )}
                                style={{ backgroundColor: colors[role.key] }}
                            >
                                <input
                                    type="color"
                                    id={`color-${role.key}`}
                                    value={colors[role.key]}
                                    onChange={(e) => onColorChange(role.key, e.target.value)}
                                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                                />
                                <span className="sr-only">{role.name}</span>
                                {/* Contrast check roughly for text color on the button */}
                                <div className="absolute bottom-1 right-2 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 text-white px-1 rounded">
                                    {colors[role.key]}
                                </div>
                            </label>
                            <span className="text-xs font-medium text-muted-foreground">{role.name}</span>
                        </div>
                    ))}
                </div>

                {/* Separator */}
                <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 hidden md:block"></div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <AnimatedCopyButton
                        onClick={() => {
                            const json = JSON.stringify(colors, null, 2);
                            navigator.clipboard.writeText(json).then(() => alert('Palette JSON copied!'));
                        }}
                    />

                    <div className="w-px h-8 bg-slate-200 dark:bg-slate-700 mx-2"></div>

                    <Button onClick={onGenerate} size="lg" className="gap-2 shadow-lg hover:shadow-primary/20">
                        <RefreshCw className="h-4 w-4" />
                        <span className="hidden sm:inline">Generate</span>
                    </Button>

                    <Button onClick={onSave} variant="secondary" size="lg" className="gap-2">
                        <Save className="h-4 w-4" />
                        <span className="hidden sm:inline">Save</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
