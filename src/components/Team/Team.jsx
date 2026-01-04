import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import { Linkedin, Github, Twitter, Instagram } from "lucide-react";
import "./Team.css";

// Assets
import soham_img from '../../assets/soham.jpeg';
import aruneeema_img from '../../assets/aruneeema.jpeg';
import avrojyoti_img from '../../assets/Avrojyoti.jpeg';
import animesh_img from '../../assets/Animesh.jpeg';

// --- COMPONENTS ---

// Magnetic Social Icon
const MagneticIcon = ({ children }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        if (!ref.current) return;
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
        <motion.div
            ref={ref}
            className="magnetic-icon-wrapper"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: mouseX, y: mouseY }}
        >
            {children}
        </motion.div>
    );
};

// Holographic Portrait
const HoloPortrait = ({ img, alt }) => {
    return (
        <div className="holo-portrait-container">
            {/* Rotating Data Ring */}
            <div className="data-ring-svg">
                <svg viewBox="0 0 100 100" className="spin-slow">
                    <circle cx="50" cy="50" r="48" stroke="#84cc16" strokeWidth="1" fill="none" strokeDasharray="10, 5" strokeOpacity="0.5" />
                    <circle cx="50" cy="50" r="44" stroke="#84cc16" strokeWidth="0.5" fill="none" strokeDasharray="5, 5" strokeOpacity="0.3" />
                </svg>
            </div>

            {/* Portrait Image */}
            <div className="portrait-mask">
                <img src={img} alt={alt} className="team-img" />
                <div className="scanline-overlay"></div>
            </div>
        </div>
    );
};

// TECH SPECS (Skill Pills)
const SkillPills = ({ skills }) => (
    <div className="skill-pills-container">
        {skills.map((skill, index) => (
            <span key={index} className="tech-pill">{skill}</span>
        ))}
    </div>
);

// TEAM DATA
const teamMembers = [
    {
        name: "ANIMESH ADHIKARI",
        role: "TEAM LEAD",
        skills: ["REACT", "LEADERSHIP", "FRONTEND"],
        img: animesh_img,
        socials: { linkedin: "#https://www.linkedin.com/in/animesh-adhikari-803755379/", github: "#https://github.com/animeshadk10-ops", Instagram: "#https://www.instagram.com/an1mationx/" }
    },
    {
        name: "SOHAM CHAKRABORTY",
        role: "LEAD ARCHITECT",
        skills: ["FULLSTACK", "SYSTEM DESIGN", "NODE.JS"],
        img: soham_img,
        socials: { linkedin: "#https://www.linkedin.com/in/soham-chakraborty-b15837373/", github: "#https://github.com/soham-999", Instagram: "#https://www.instagram.com/soham99y/?utm_source=ig_web_button_share_sheet" }
    },
    {
        name: "ARUNEEMA MUKHERJEE",
        role: "PITCH LEAD",
        skills: ["UI/UX", "FRONTEND", "STRATEGY"],
        img: aruneeema_img,
        socials: { linkedin: "#https://www.linkedin.com/in/aruneema-mukherjee-3a48b2395/", github: "#https://github.com/AruNeema26", Instagram: "#https://www.instagram.com/aruneemaaaa____/" }
    },
    {
        name: "AVRAJYOTI KUNDU",
        role: "AI-ML ENGINEER",
        skills: ["PYTHON", "LLMs", "BACKEND"],
        img: avrojyoti_img,
        socials: { linkedin: "#https://www.linkedin.com/in/avrajyoti-kundu-48387b399/", github: "#https://github.com/Avrajyoti-Kundu", Instagram: "#https://www.instagram.com/avra_jyoti/" }
    }
];

export default function Team() {
    return (
        <section className="team-section" id="team">

            {/* Protocols 5: Command Center Background */}
            <div className="command-center-bg"></div>
            <div className="green-spotlight"></div>

            <div className="team-container">
                <motion.div
                    className="team-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2>TEAM ECLIPSE</h2>
                    <p>OPERATORS ONLINE</p>
                </motion.div>

                <div className="team-grid">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            className="glass-monolith"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <div className="monolith-content">
                                <HoloPortrait img={member.img} alt={member.name} />

                                <div className="member-info">
                                    <h3>{member.name}</h3>
                                    <p className="member-role">{member.role}</p>
                                    <SkillPills skills={member.skills} />
                                </div>
                            </div>

                            {/* Protocol 4: Social Dock (Slide Up on Hover via CSS/Framer) */}
                            <div className="social-dock">
                                <MagneticIcon>
                                    <a href={member.socials.linkedin} className="social-link"><Linkedin size={18} /></a>
                                </MagneticIcon>
                                <MagneticIcon>
                                    <a href={member.socials.instagram} className="social-link"><Instagram size={18} /></a>
                                </MagneticIcon>
                                <MagneticIcon>
                                    <a href={member.socials.github} className="social-link"><Github size={18} /></a>
                                </MagneticIcon>
                            </div>

                            {/* Border Glow Effect */}
                            <div className="monolith-border-glow"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
