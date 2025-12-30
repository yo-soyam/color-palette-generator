"use client"

import React, { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
// Removing next/link and next/navigation dependencies for Vite/React compatibility.
// Replacing with basic logic.

import ThemeToggle from "@/components/ui/theme-toggle"
import { Menu, X } from "lucide-react"

interface NavItem {
    name: string
    url: string
    icon: React.ElementType
}

interface NavBarProps {
    items: NavItem[]
    className?: string
    defaultActive?: string
    theme: string
    toggleTheme: () => void
}

export function AnimeNavBar({ items, className, defaultActive = "Home", theme, toggleTheme }: NavBarProps) {
    const [mounted, setMounted] = useState(false)
    const [hoveredTab, setHoveredTab] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState<string>(defaultActive)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const leaveTimeout = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        setMounted(true)
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
            if (window.scrollY > 50) {
                // optionally close menu on scroll, but keeping it open might be better UX if user explicitly opened it
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    if (!mounted) return null

    return (
        <>
            {/* Main Centered Navbar - Visible at top OR when menu is manually opened */}
            <AnimatePresence mode="wait">
                {(!isScrolled || isMenuOpen) && (
                    <div className="fixed top-5 left-0 right-0 z-[9999] pointer-events-none">
                        <div className="flex justify-center pt-6">
                            <motion.div
                                className="flex items-center gap-3 bg-white/50 dark:bg-black/50 border border-black/10 dark:border-white/10 backdrop-blur-lg py-2 px-2 rounded-full shadow-lg relative pointer-events-auto"
                                initial={{ y: -100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -100, opacity: 0 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20,
                                }}
                            >
                                {/* Brand Pill */}
                                <div className="pl-2 pr-4 mr-2 border-r border-black/10 dark:border-white/10">
                                    <div className="bg-transparent hover:bg-transparent text-black dark:text-white px-4 py-1.5 rounded-full font-bold text-2xl tracking-wide" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                        Iris
                                    </div>
                                </div>

                                {items.map((item) => {
                                    const Icon = item.icon
                                    const isActive = activeTab === item.name
                                    const isHovered = hoveredTab === item.name

                                    return (
                                        <a
                                            key={item.name}
                                            href={item.url}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                if (item.url.startsWith('#')) {
                                                    const element = document.querySelector(item.url)
                                                    if (element) {
                                                        element.scrollIntoView({ behavior: 'smooth' })
                                                    }
                                                }
                                                setActiveTab(item.name)
                                                if (isMenuOpen) setIsMenuOpen(false)
                                            }}
                                            onMouseEnter={() => {
                                                if (leaveTimeout.current) clearTimeout(leaveTimeout.current)
                                                setHoveredTab(item.name)
                                            }}
                                            onMouseLeave={() => {
                                                leaveTimeout.current = setTimeout(() => {
                                                    setHoveredTab(null)
                                                }, 200)
                                            }}
                                            className={cn(
                                                "relative cursor-pointer text-sm font-semibold px-6 py-3 rounded-full transition-all duration-300",
                                                "text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white",
                                                isActive && "text-black dark:text-white"
                                            )}
                                        >
                                            {isActive && (
                                                <motion.div
                                                    className="absolute inset-0 rounded-full -z-10 overflow-hidden"
                                                    initial={{ opacity: 0 }}
                                                    animate={{
                                                        opacity: [0.3, 0.5, 0.3],
                                                        scale: [1, 1.03, 1]
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        ease: "easeInOut"
                                                    }}
                                                >
                                                    <div className="absolute inset-0 bg-primary/25 rounded-full blur-md" />
                                                    <div className="absolute inset-[-4px] bg-primary/20 rounded-full blur-xl" />
                                                    <div className="absolute inset-[-8px] bg-primary/15 rounded-full blur-2xl" />
                                                    <div className="absolute inset-[-12px] bg-primary/5 rounded-full blur-3xl" />

                                                    <div
                                                        className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0"
                                                        style={{
                                                            animation: "shine 3s ease-in-out infinite"
                                                        }}
                                                    />
                                                </motion.div>
                                            )}

                                            <motion.span
                                                className="hidden md:inline relative z-10"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                {item.name}
                                            </motion.span>
                                            <motion.span
                                                className="md:hidden relative z-10"
                                                whileHover={{ scale: 1.2 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <Icon size={18} strokeWidth={2.5} />
                                            </motion.span>

                                            <AnimatePresence>
                                                {isHovered && !isActive && (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.8 }}
                                                        className="absolute inset-0 bg-black/5 dark:bg-white/10 rounded-full -z-10"
                                                    />
                                                )}
                                            </AnimatePresence>

                                            {isActive && (
                                                <motion.div
                                                    layoutId="anime-mascot"
                                                    className="absolute -top-12 left-1/2 -translate-x-1/2 pointer-events-none"
                                                    initial={false}
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 300,
                                                        damping: 30,
                                                    }}
                                                >
                                                    <div className="relative w-12 h-12">
                                                        {/* Color Palette Mascot */}
                                                        <motion.div
                                                            className="absolute w-10 h-10 left-1/2 -translate-x-1/2"
                                                            // Infinite rotation when any button is hovered
                                                            animate={
                                                                hoveredTab ? {
                                                                    rotate: 360,
                                                                    scale: 1.1,
                                                                    transition: {
                                                                        duration: 1,
                                                                        ease: "linear",
                                                                        repeat: Infinity
                                                                    }
                                                                } : {
                                                                    y: [0, -3, 0],
                                                                    transition: {
                                                                        duration: 2,
                                                                        repeat: Infinity,
                                                                        ease: "easeInOut"
                                                                    }
                                                                }
                                                            }
                                                        >
                                                            {/* Colorful segments */}
                                                            <div className="absolute inset-0 rounded-full border-[4px] border-t-red-500 border-r-green-500 border-b-blue-500 border-l-yellow-500 box-border bg-white" />

                                                            {/* Center dot */}
                                                            <div className="absolute inset-[35%] bg-black rounded-full" />
                                                        </motion.div>

                                                        {/* Sparkles */}
                                                        <AnimatePresence>
                                                            {hoveredTab && (
                                                                <>
                                                                    <motion.div
                                                                        initial={{ opacity: 0, scale: 0 }}
                                                                        animate={{ opacity: 1, scale: 1 }}
                                                                        exit={{ opacity: 0, scale: 0 }}
                                                                        className="absolute -top-1 -right-1 w-2 h-2 text-yellow-300"
                                                                    >
                                                                        ✨
                                                                    </motion.div>
                                                                    <motion.div
                                                                        initial={{ opacity: 0, scale: 0 }}
                                                                        animate={{ opacity: 1, scale: 1 }}
                                                                        exit={{ opacity: 0, scale: 0 }}
                                                                        transition={{ delay: 0.1 }}
                                                                        className="absolute -top-2 left-0 w-2 h-2 text-yellow-300"
                                                                    >
                                                                        ✨
                                                                    </motion.div>
                                                                </>
                                                            )}
                                                        </AnimatePresence>

                                                        <motion.div
                                                            className="absolute -bottom-1 left-1/2 w-4 h-4 -translate-x-1/2"
                                                            animate={
                                                                hoveredTab ? {
                                                                    y: [0, -4, 0],
                                                                    transition: {
                                                                        duration: 0.3,
                                                                        repeat: Infinity,
                                                                        repeatType: "reverse"
                                                                    }
                                                                } : {
                                                                    y: [0, 2, 0],
                                                                    transition: {
                                                                        duration: 1,
                                                                        repeat: Infinity,
                                                                        ease: "easeInOut",
                                                                        delay: 0.5
                                                                    }
                                                                }
                                                            }
                                                        >
                                                            <div className="w-full h-full bg-white rotate-45 transform origin-center border border-purple-400/50 dark:border-purple-400/30 shadow-sm shadow-purple-200/50" />
                                                        </motion.div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </a>
                                    )
                                })}

                                {/* Theme Toggle Element */}
                                <div className="pl-4 ml-2 border-l border-black/10 dark:border-white/10 flex items-center">
                                    <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                                </div>

                                {/* Close Button (Only visible if menu is open from scroll state) */}
                                {isMenuOpen && (
                                    <div className="pl-4 ml-2 border-l border-black/10 dark:border-white/10 flex items-center">
                                        <button
                                            onClick={() => setIsMenuOpen(false)}
                                            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                                        >
                                            <X size={20} className="text-black dark:text-white" />
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>
                )}
            </AnimatePresence>

            {/* Split Scrolled Navbar (Logo Left, Hamburger Right) */}
            <AnimatePresence>
                {(isScrolled && !isMenuOpen) && (
                    <>
                        {/* Left Logo Pill */}
                        <motion.div
                            className="fixed top-6 left-6 z-[9999]"
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -100, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        >
                            <div className="bg-white/50 dark:bg-black/50 backdrop-blur-lg border border-black/10 dark:border-white/10 px-6 py-2 rounded-full shadow-lg">
                                <span className="font-bold text-xl text-black dark:text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>Iris</span>
                            </div>
                        </motion.div>

                        {/* Right Hamburger Pill */}
                        <motion.div
                            className="fixed top-6 right-6 z-[9999]"
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 100, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        >
                            <button
                                onClick={() => setIsMenuOpen(true)}
                                className="bg-white/50 dark:bg-black/50 backdrop-blur-lg border border-black/10 dark:border-white/10 p-3 rounded-full shadow-lg hover:bg-white/80 dark:hover:bg-black/80 transition-colors group"
                            >
                                <Menu className="w-6 h-6 text-black dark:text-white group-hover:scale-110 transition-transform" />
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
