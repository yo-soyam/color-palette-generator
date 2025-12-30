import React from 'react';
import {
    Facebook,
    Github,
    Instagram,
    Linkedin,
    Twitter,
    Youtube,
    Grid2X2Plus,
} from 'lucide-react';
import { motion } from 'framer-motion';

export function MinimalFooter() {
    const year = new Date().getFullYear();

    const company = [
        { title: 'About Us', href: '#' },
        { title: 'Careers', href: '#' },
        { title: 'Brand assets', href: '#' },
        { title: 'Privacy Policy', href: '#' },
        { title: 'Terms of Service', href: '#' },
    ];

    const resources = [
        { title: 'Blog', href: '#' },
        { title: 'Help Center', href: '#' },
        { title: 'Contact Support', href: '#' },
        { title: 'Community', href: '#' },
        { title: 'Security', href: '#' },
    ];

    const socialLinks = [
        { icon: <Facebook className="w-4 h-4" />, link: '#', label: 'Facebook' },
        { icon: <Github className="w-4 h-4" />, link: '#', label: 'Github' },
        { icon: <Instagram className="w-4 h-4" />, link: '#', label: 'Instagram' },
        { icon: <Linkedin className="w-4 h-4" />, link: '#', label: 'LinkedIn' },
        { icon: <Twitter className="w-4 h-4" />, link: '#', label: 'Twitter' },
        { icon: <Youtube className="w-4 h-4" />, link: '#', label: 'Youtube' },
    ];

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                staggerChildren: 0.1,
                ease: "easeOut"
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.footer
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="relative mt-32 w-full"
        >
            {/* Background Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

            <div className="bg-[radial-gradient(45%_60%_at_50%_0%,hsl(var(--foreground)/0.05),transparent)] w-full border-t border-border/40 backdrop-blur-sm relative overflow-hidden">
                {/* Top Border Gradient */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />

                <div className="grid max-w-7xl mx-auto grid-cols-1 md:grid-cols-12 gap-12 p-8 md:p-12">

                    {/* Brand Section */}
                    <motion.div variants={itemVariants} className="col-span-1 md:col-span-5 flex flex-col gap-6">
                        <a href="#" className="w-max opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-105">
                            <div className="bg-primary/10 p-3 rounded-2xl border border-primary/20">
                                <Grid2X2Plus className="w-8 h-8 text-primary" />
                            </div>
                        </a>
                        <p className="text-muted-foreground max-w-sm font-sans text-base leading-relaxed">
                            The ultimate tool for generating beautiful color palettes for your next project.
                            Crafted for designers, by designers.
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.map((item, i) => (
                                <motion.a
                                    key={i}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-background/50 hover:bg-primary/10 hover:text-primary text-muted-foreground rounded-xl border border-border/50 p-2.5 transition-colors shadow-sm"
                                    target="_blank"
                                    href={item.link}
                                    title={item.label}
                                >
                                    {item.icon}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Links Sections */}
                    <div className="col-span-1 md:col-span-7 grid grid-cols-2 gap-8 md:pl-12">
                        <motion.div variants={itemVariants} className="flex flex-col gap-4">
                            <h4 className="text-sm font-bold tracking-widest text-primary uppercase">Resources</h4>
                            <div className="flex flex-col gap-2">
                                {resources.map(({ href, title }, i) => (
                                    <a
                                        key={i}
                                        className="w-max text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-200"
                                        href={href}
                                    >
                                        {title}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div variants={itemVariants} className="flex flex-col gap-4">
                            <h4 className="text-sm font-bold tracking-widest text-primary uppercase">Company</h4>
                            <div className="flex flex-col gap-2">
                                {company.map(({ href, title }, i) => (
                                    <a
                                        key={i}
                                        className="w-max text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-200"
                                        href={href}
                                    >
                                        {title}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Divider */}
                <div className="bg-border/50 h-px w-full mx-auto max-w-7xl" />

                {/* Developer Credits Section */}
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-center gap-6 py-8 px-8 md:px-12 bg-background/30 max-w-7xl mx-auto">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
                        <span>Developed by</span>
                        <span className="text-primary font-bold animate-pulse">Threadrippers</span>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6">
                        {[
                            { name: "Sourodip Roy", url: "https://github.com/Sourodip-1" },
                            { name: "Souvik Ghosh", url: "https://github.com/souvikvos" },
                            { name: "Soyam Bhalotia", url: "https://github.com/yo-soyam" }
                        ].map((dev, i) => (
                            <a
                                key={i}
                                href={dev.url}
                                className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-primary transition-colors group px-3 py-1.5 hover:bg-primary/5 rounded-lg"
                                target="_blank"
                                rel="noreferrer"
                            >
                                {dev.name}
                                <Github className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                            </a>
                        ))}
                    </div>
                </motion.div>

                {/* Bottom Bar */}
                <div className="border-t border-border/50 bg-muted/20">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-4 px-8 md:px-12 text-xs text-muted-foreground max-w-7xl mx-auto">
                        <p>© {year} Iris Palette Generator. All rights reserved.</p>
                        <p>
                            Designed by <a href="https://x.com/sshahaider" className="hover:text-primary transition-colors underline decoration-primary/30 underline-offset-4">sshahaider</a>
                        </p>
                    </div>
                </div>
            </div>
        </motion.footer>
    );
}
