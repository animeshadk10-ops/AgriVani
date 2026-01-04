import React, { useRef, useState, useEffect } from "react";
import { Mic, Cpu, Database, Speaker } from "lucide-react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import "./HowItWorks.css";

// --- COMPONENTS ---

// 3D Tilt Card Component
const GlassCard = ({ children, stepNumber, title, desc, align }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) / 20); // Tilt strength
        y.set((e.clientY - centerY) / 20);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            className={`glass-card-wrapper ${align}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
        >
            <motion.div
                className="glass-intelligence-card"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX: y, rotateY: x }}
            >
                <div className="card-vis-layer"></div>
                <div className="card-number">{stepNumber}</div>
                <div className="card-content">
                    <h3>{title}</h3>
                    <p>{desc}</p>
                </div>
            </motion.div>
        </motion.div>
    );
};

// Processing Node Component
const ProcessingNode = ({ icon, type, index }) => {
    return (
        <div className={`processing-node node-${type}`}>
            <div className="node-core">
                {icon}
            </div>
            <div className="node-ripple"></div>
            <div className="node-glow"></div>
        </div>
    );
};

export default function HowItWorks() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Synaptic Highway: Path Length Animation
    const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    // Energy Pulse: Continuous Loop down the path
    const [pulseY, setPulseY] = useState(0);

    // Animate pulse locally via CSS or simple loop, 
    // but here we use a motion value for the 'bead' position relative to container

    const steps = [
        {
            id: 1,
            icon: <Mic size={24} />,
            type: "voice",
            title: "Voice Input (Web Speech API)",
            desc: "Farmer opens 'Dr. Plant' and speaks. The browser's native Web Speech API instantly converts Hindi, Tamil, or Bengali audio into text.",
            side: "right"
        },
        {
            id: 2,
            icon: <Cpu size={24} />,
            type: "brain",
            title: "Llama-3 Intent Analysis",
            desc: "The text is sent to the Backend API. The Llama-3 AI Engine analyzes the prompt context to understand if it's a disease query or price check.",
            side: "left"
        },
        {
            id: 3,
            icon: <Database size={24} />,
            type: "database",
            title: "Real-Time Tool Calls",
            desc: "If needed, the AI triggers a 'Tool Call' (e.g., get_mandi_prices) to fetch live market data from Government Databases/APIs in JSON format.",
            side: "right"
        },
        {
            id: 4,
            icon: <Speaker size={24} />,
            type: "tts",
            title: "Native TTS Response",
            desc: "The final AI answer is sent back to the frontend, where the Native Text-to-Speech engine plays the solution aloud to the farmer.",
            side: "left"
        }
    ];

    return (
        <section className="neural-workflow-section" id="how-it-works" ref={containerRef}>

            {/* PROTOCOL 4: ATMOSPHERE */}
            <div className="void-texture"></div>
            <div className="binary-rain"></div>

            <div className="workflow-header">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    NEURAL WORKFLOW
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    From Voice to Solution in Milliseconds
                </motion.p>
            </div>

            <div className="synaptic-highway-container">

                {/* PROTOCOL 1: THE LINE (SVG Path) */}
                <div className="synaptic-line-wrapper">
                    <svg className="synaptic-svg" viewBox="0 0 10 1200" preserveAspectRatio="none">
                        {/* Background Path */}
                        <path d="M5 0 L5 1200" stroke="rgba(34, 197, 94, 0.2)" strokeWidth="4" />
                        {/* Active Drawing Path */}
                        <motion.path
                            d="M5 0 L5 1200"
                            stroke="#22c55e"
                            strokeWidth="4"
                            style={{ pathLength }}
                        />
                    </svg>

                    {/* Energy Pulse (Pure CSS Animation for infinite loop) */}
                    <div className="energy-pulse-bead"></div>
                </div>

                <div className="workflow-steps">
                    {steps.map((step, index) => (
                        <div key={step.id} className={`workflow-row ${step.side === "right" ? "row-right" : "row-left"}`}>

                            {/* Empty side for layout balance */}
                            <div className="row-spacer"></div>

                            {/* Center Node */}
                            <div className="node-container">
                                <ProcessingNode icon={step.icon} type={step.type} index={index} />
                            </div>

                            {/* Card Side */}
                            <div className="card-container">
                                <GlassCard
                                    stepNumber={`0${step.id}`}
                                    title={step.title}
                                    desc={step.desc}
                                    align={step.side}
                                />
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
