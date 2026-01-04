import React, { useEffect, useState } from "react";
import { 
    Mic, 
    Radio, 
    Cloud, 
    Globe, 
    Cpu, 
    Brain, 
    Shield, 
    Activity, 
    ChevronDown 
} from "lucide-react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import "./Hero.css";
import heroVideo from '../../assets/hero-background.mp4';

// Spore/Particle component
const DataSpore = ({ delay, x, y }) => (
    <motion.div
        className="data-spore"
        initial={{ opacity: 0, y: 0, scale: 0 }}
        animate={{ 
            opacity: [0, 0.8, 0], 
            y: -100, 
            scale: [0, 1.5, 0],
            x: x // Drift 
        }}
        transition={{ 
            duration: Math.random() * 3 + 2, 
            repeat: Infinity, 
            delay: delay,
            ease: "easeInOut" 
        }}
        style={{ left: `${Math.random() * 100}%`, bottom: `${Math.random() * 20}%` }}
    />
);

export default function Hero() {
    const letters = "AGRIVANI".split("");
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    
    // Mouse move handler for interactive parallax/repulsion
    const handleMouseMove = (e) => {
        setMousePosition({
            x: e.clientX,
            y: e.clientY
        });
    };

    // Glitch Text Animation Variants
    const letterVariants = {
        hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            textShadow: [
                "0 0 10px rgba(132,204,22,0.5)",
                "2px 2px 0px rgba(255,0,0,0.5)", 
                "-2px -2px 0px rgba(0,0,255,0.5)",
                "0 0 10px rgba(132,204,22,0.5)"
            ],
            transition: {
                delay: i * 0.1,
                duration: 0.8,
                textShadow: {
                    repeat: Infinity,
                    duration: 2,
                    repeatType: "reverse"
                }
            }
        })
    };

    return (
        <section className="hero-beast" id="hero" onMouseMove={handleMouseMove}>
            
            {/* PROTOCOL 1: MULTI-LAYERED ATMOSPHERE */}
            <div className="atmosphere-container">
                {/* Base Layer: Sunset Wheat Field */}
                <video className="base-video" autoPlay loop muted playsInline>
                    <source src={heroVideo} type="video/mp4" />
                </video>

                {/* Layer 2: Digital Grid */}
                <div className="digital-grid"></div>

                {/* Layer 3: Atmospheric Particles (Data Spores) */}
                <div className="particles-container">
                    {[...Array(20)].map((_, i) => (
                        <DataSpore key={i} delay={Math.random() * 2} x={Math.random() * 40 - 20} />
                    ))}
                </div>

                {/* Gradient Overlay */}
                <div className="cinematic-gradient"></div>
                
                {/* Protocol 5: Noise & Chromatic Aberration */}
                <div className="noise-texture"></div>
                <div className="chromatic-aberration"></div>
            </div>

            {/* PROTOCOL 2 & 3: DYNAMIC TYPOGRAPHY & ORBITAL CLUSTERS */}
            <div className="content-layer">
                
                {/* PROTOCOL 3: LEFT CLUSTER (Connectivity) */}
                <motion.div 
                    className="orbital-cluster left-cluster"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    <div className="cluster-core">
                        <Radio size={32} className="core-icon" />
                        <div className="cluster-ripple"></div>
                    </div>
                    {/* Orbiting Satellites */}
                    <div className="orbit-ring">
                        <motion.div className="satellite sat-1" animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
                            <div className="sat-icon-wrapper"><Cloud size={14} /></div>
                        </motion.div>
                        <motion.div className="satellite sat-2" animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}>
                             <div className="sat-icon-wrapper"><Globe size={14} /></div>
                        </motion.div>
                    </div>
                    <div className="cluster-info">
                        <span className="cluster-label">GLOBAL LINK: ACTIVE</span>
                        <span className="cluster-sub">LATENCY: &lt;20ms</span>
                    </div>
                </motion.div>

                {/* PROTOCOL 2: MAIN TITLE */}
                <div className="typography-center">
                    <h1 className="holographic-title">
                        {letters.map((char, index) => (
                            <motion.span
                                key={index}
                                custom={index}
                                variants={letterVariants}
                                initial="hidden"
                                animate="visible"
                                className="glitch-char"
                            >
                                {char}
                            </motion.span>
                        ))}
                    </h1>

                    {/* Subtitle: Data Stream Container */}
                    <motion.div 
                        className="data-stream-pill"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0.5 }}
                    >
                        <div className="stream-border"></div>
                        <Mic size={18} className="mic-icon pulsing" />
                        <span className="stream-text">Farming at the speed of voice.</span>
                    </motion.div>
                </div>

                {/* PROTOCOL 3: RIGHT CLUSTER (Intelligence) */}
                <motion.div 
                    className="orbital-cluster right-cluster"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                     <div className="cluster-core">
                        <Cpu size={32} className="core-icon" />
                        <div className="cluster-ripple warning"></div>
                    </div>
                    {/* Orbiting Satellites */}
                    <div className="orbit-ring">
                         <motion.div className="satellite sat-1" animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }}>
                            <div className="sat-icon-wrapper"><Brain size={14} /></div>
                        </motion.div>
                        <motion.div className="satellite sat-2" animate={{ rotate: -360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}>
                             <div className="sat-icon-wrapper"><Shield size={14} /></div>
                        </motion.div>
                         <motion.div className="satellite sat-3" animate={{ rotate: 180 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                             <div className="sat-icon-wrapper"><Activity size={14} /></div>
                        </motion.div>
                    </div>
                    <div className="cluster-info text-right">
                        <span className="cluster-label">NEURAL CORE: ONLINE</span>
                        <span className="cluster-sub">THREATS: BLOCKED</span>
                    </div>
                </motion.div>

            </div>

            {/* PROTOCOL 4: SCROLL INDICATOR */}
            <div className="scroll-indicator-complex">
                <div className="rotating-data-ring"></div>
                <motion.div 
                    className="magnetic-arrow"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <span className="scroll-text">SCROLL TO EXPLORE</span>
                    <ChevronDown size={24} className="arrow-down" />
                </motion.div>
            </div>

        </section>
    );
}
