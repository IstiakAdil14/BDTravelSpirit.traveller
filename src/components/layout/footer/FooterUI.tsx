'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
    Award,
    Shield,
    Heart,
    ArrowRight,
    LucideIcon
} from 'lucide-react';
import Logo from '../shared/Logo';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

interface ImpactStat {
    number: string;
    label: string;
}

interface LinkItem {
    name: string;
    href: string;
}

interface LinkColumn {
    title: string;
    icon: LucideIcon;
    color: string;
    links: LinkItem[];
}

interface SocialIcon {
    Icon: React.ComponentType<{ className?: string }>;
    href: string;
    label: string;
}

interface PaymentMethod {
    src: string;
    alt: string;
}

interface FooterUIProps {
    impactStats: ImpactStat[];
    linkColumns: LinkColumn[];
    socialIcons: SocialIcon[];
    paymentMethods: PaymentMethod[];
}

const FooterUI: React.FC<FooterUIProps> = ({
    impactStats,
    linkColumns,
    socialIcons,
    paymentMethods,
}) => {
    return (
        <footer className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-t border-t-emerald-500/50">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />

            <div className="relative max-w-8xl mx-auto px-4 sm:px-8 lg:px-12 py-4">

                {/* Main Content Layout */}
                <div className="flex flex-col lg:flex-row gap-18 mb-16">
                    {/* Left div - Logo Section */}
                    <div className="flex-1">
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <Logo size="lg" showDescription={false} className="justify-center mb-6" />

                            <motion.p
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="text-gray-300 text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
                            >
                                Connecting travelers with authentic Bangladesh experiences through our network of professional local guides.
                                Discover the real Bangladesh beyond the ordinary.
                            </motion.p>

                            {/* Impact Stats Grid */}
                            <motion.div
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
                            >
                                {impactStats.map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-white/5 backdrop-blur-lg p-4 rounded-2xl shadow-lg border border-white/10"
                                    >
                                        <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                                            {stat.number}
                                        </div>
                                        <div className="text-gray-300 text-sm md:text-base">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Right div - Link Columns */}
                    <div className="flex-1 mt-8">
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                        >
                            {linkColumns.map((column, columnIndex) => (
                                <div key={columnIndex} className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <column.icon className={`w-5 h-5 ${column.color}`} />
                                        <h3 className="text-white font-bold text-lg uppercase tracking-wide">
                                            {column.title}
                                        </h3>
                                    </div>

                                    <div className="space-y-3">
                                        {column.links.map((link, linkIndex) => (
                                            <motion.div
                                                key={linkIndex}
                                                whileHover={{ x: 4 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <Link
                                                    href={link.href}
                                                    className="group flex items-center gap-3 rounded-lg backdrop-blur-md transition-all duration-300 hover:bg-white/5 p-2 -m-2"
                                                >
                                                    <div className={`w-2 h-2 rounded-full ${column.color.replace('text-', 'bg-')} opacity-60`} />
                                                    <span className="text-gray-300 group-hover:text-white transition-colors">
                                                        {link.name}
                                                    </span>
                                                    <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:text-white transition-all ml-auto" />
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Social Media, Payment Methods, and Newsletter Section */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-8"
                >
                    {/* Social Media Section */}
                    <div className="text-center lg:text-left flex-1">
                        <h3 className="text-white font-bold text-xl mb-4">Follow Us</h3>
                        <p className="text-gray-400 text-sm mb-8">Stay connected for travel inspiration and updates</p>

                        <div className="flex justify-center lg:justify-start gap-4">
                            {socialIcons.map(({ Icon, href, label }, index) => (
                                <motion.a
                                    key={index}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05, filter: 'brightness(1.25)' }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-white/5 rounded-2xl p-3 backdrop-blur-lg shadow-lg border border-white/10 hover:shadow-emerald-400/20 transition-all duration-300"
                                >
                                    <Icon className="w-5 h-5 text-white" />
                                    <span className="sr-only">{label}</span>
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Payment Methods Section */}
                    <div className="text-center flex-[3]">
                        <h3 className="text-white font-bold text-xl mb-4">Payment Methods</h3>
                        <p className="text-gray-400 text-sm mb-8">We accept secure payments</p>

                        <div className="grid grid-cols-4 gap-4 justify-items-center ">
                            {paymentMethods.map((method, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Image src={method.src} alt={method.alt} width={80} height={80} className="object-contain" />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter Subscription */}
                    <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto lg:mx-0 flex-1 lg:justify-end">
                        <motion.input
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 bg-white/10 backdrop-blur-md text-white placeholder-gray-400 rounded-xl px-4 py-3 border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 transition-all duration-300"
                        />
                        <motion.button
                            initial={{ x: 20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white font-semibold rounded-xl px-6 py-3 hover:from-emerald-500 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-emerald-400/25 cursor-pointer outline-none"
                        >
                            Subscribe
                        </motion.button>
                    </div>
                </motion.div>


                {/* Bottom Bar */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="bg-black/20 rounded-2xl p-6 backdrop-blur-md border border-white/10 "
                >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-gray-400 text-sm">
                            © 2025 BD Travel Spirit. All rights reserved.
                        </p>

                        <div className="flex items-center gap-2 text-gray-300">
                            <span>Made with</span>
                            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                            <span>in Bangladesh</span>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 text-emerald-400">
                                <Shield className="w-4 h-4" />
                                <span className="text-sm font-medium">SSL Secured</span>
                            </div>
                            <div className="flex items-center gap-2 text-yellow-400">
                                <Award className="w-4 h-4" />
                                <span className="text-sm font-medium">Trusted Platform</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </footer>
    );
};

export default FooterUI;
