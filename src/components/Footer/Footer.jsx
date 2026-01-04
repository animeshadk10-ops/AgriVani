import React, { useState, useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { Search, Twitter, Linkedin, Instagram, ArrowRight } from "lucide-react";
import "./Footer.css";

// MAGNETIC BUTTON COMPONENT
const MagneticButton = ({ children }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        setPosition({ x: middleX * 0.5, y: middleY * 0.5 }); // Magnetic strength
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;
    return (
        <motion.div
            className="magnetic-btn-wrapper"
            ref={ref}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
        >
            {children}
        </motion.div>
    );
};

export default function Footer() {
    const footerRef = useRef(null);
    const [cursorVisible, setCursorVisible] = useState(false);

    // Mouse Position State for Framer Motion
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring physics for "Magnetic Lag"
    const springConfig = { damping: 25, stiffness: 120 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (footerRef.current && footerRef.current.contains(e.target)) {
                setCursorVisible(true);
                mouseX.set(e.clientX - 20); // Center the 40px cursor (20px radius)
                mouseY.set(e.clientY - 20);
            } else {
                setCursorVisible(false);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <footer className="footer-section" ref={footerRef}>
            {/* PROTOCOL 3: Smart Scanner Cursor */}
            {cursorVisible && (
                <motion.div
                    className="scanner-cursor"
                    style={{ x: cursorX, y: cursorY }}
                >
                    <div className="scanner-ring"></div>
                    <div className="scanner-dot"></div>
                </motion.div>
            )}

            {/* PROTOCOL 1: Noise & Watermark */}
            <div className="noise-overlay"></div>
            <div className="watermark-container">
                <h1 className="watermark-text">AGRIVANI</h1>
            </div>

            <div className="footer-content">
                {/* PROTOCOL 2: Specimen Capsule Input */}
                <div className="newsletter-column">
                    <div className="col-header">DISCOVER</div>
                    <div className="lens-input-wrapper">
                        <input
                            type="text"
                            className="specimen-capsule"
                            placeholder="Inspect research..."
                        />
                        <div className="lens-btn">
                            <Search size={20} />
                        </div>
                    </div>
                </div>

                {/* PROTOCOL 4: Aesthetic Columns */}
                <div className="footer-links">
                    <div className="link-column">
                        <div className="col-header">EXPLORE</div>
                        {['Vision', 'Technology', 'Impact'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="footer-link-wrapper">
                                <ArrowRight className="link-arrow" size={16} />
                                <span className="footer-link-text">{item}</span>
                            </a>
                        ))}
                    </div>

                    <div className="link-column">
                        <div className="col-header">LEGAL</div>
                        {['Privacy', 'Terms', 'Security'].map((item) => (
                            <a key={item} href="#" className="footer-link-wrapper">
                                <ArrowRight className="link-arrow" size={16} />
                                <span className="footer-link-text">{item}</span>
                            </a>
                        ))}
                    </div>

                    <div className="link-column">
                        <div className="col-header">SOCIAL (ORBS)</div>
                        <div className="socials-grid">
                            <MagneticButton>
                                <a href="#" className="social-orb"><Twitter size={20} /></a>
                            </MagneticButton>
                            <MagneticButton>
                                <a href="#" className="social-orb"><Linkedin size={20} /></a>
                            </MagneticButton>
                            <MagneticButton>
                                <a href="#" className="social-orb"><Instagram size={20} /></a>
                            </MagneticButton>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <span>&copy; 2026 AGRIVANI INC.</span>
                <span>DIGITAL ECOSYSTEM V2.0</span>
            </div>
        </footer>
    );
}
