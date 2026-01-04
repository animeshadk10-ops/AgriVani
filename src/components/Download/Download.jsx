import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Download as DownloadIcon, Smartphone, Wifi, Zap } from "lucide-react";
import "./Download.css";

const MagneticButton = ({ children, href }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        x.set((clientX - centerX) * 0.3);
        y.set((clientY - centerY) * 0.3);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.a
            href={href}
            ref={ref}
            className="magnetic-dl-btn"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: mouseX, y: mouseY }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <span className="btn-liquid"></span>
            <span style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "10px" }}>
                {children}
            </span>
        </motion.a>
    );
};

export default function Download() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section id="download" className="download-section" ref={containerRef}>
            {/* Dynamic Background */}
            <div className="download-bg">
                <div className="grid-overlay"></div>
                <div className="bg-orb orb-1"></div>
                <div className="bg-orb orb-2"></div>
            </div>

            {/* Glass Panel */}
            <motion.div
                className="glass-panel"
                style={{ y, opacity }}
            >
                <motion.h2
                    className="download-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    AgriVani Mobile
                </motion.h2>

                <motion.p
                    className="download-desc"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    Access the full power of our AI-driven agricultural network directly from your pocket. Real-time insights, market data, and community connection—anywhere, anytime.
                </motion.p>

                <div className="download-btn-wrapper">
                    <div className="btn-pulse-ring"></div>
                    <MagneticButton href="/assets/agrivani.apk">
                        <DownloadIcon size={24} />
                        <span>Download APK</span>
                    </MagneticButton>
                </div>

                {/* Stats / Features Row */}
                <motion.div
                    className="stats-row"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <div className="stat-item">
                        <span className="stat-val"><Zap size={28} color="#00ff88" /></span>
                        <span className="stat-label">Fast</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-val"><Wifi size={28} color="#00d9ff" /></span>
                        <span className="stat-label">Offline Mode</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-val"><Smartphone size={28} color="#b300ff" /></span>
                        <span className="stat-label">Low Data</span>
                    </div>
                </motion.div>

            </motion.div>
        </section>
    );
}
