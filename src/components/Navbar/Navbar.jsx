import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { motion, useSpring, useMotionValue, useTransform, useScroll } from "framer-motion";
import "./Navbar.css";

// --- COMPONENTS ---

// Magnetic Button with Morphing Logic
const MagneticButton = ({ children, className }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    // Scroll Morphing: Scale down on scroll
    const { scrollY } = useScroll();
    const scale = useTransform(scrollY, [0, 100], [1, 0.9]);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();

        // Protocol 4: Magnetic Pull (Trigger within 50px - simplified to rect)
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
        <motion.button
            ref={ref}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: mouseX, y: mouseY, scale }} // Morphing scale applied here
            whileHover={{ scale: 0.95 }} // Slight dip on hover
            whileTap={{ scale: 0.9 }}
        >
            <span className="liquid-fill"></span>
            <span className="btn-text">{children}</span>
        </motion.button>
    );
};

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");
    const [theme, setTheme] = useState("transparent"); // transparent, green, blue, dark

    const navRef = useRef(null);

    // Protocol 3: Scroll Progress Integrated Bar
    const { scrollYProgress } = useScroll();

    // Protocol 2: Spotlight Hover Logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleNavMouseMove = (e) => {
        if (!navRef.current) return;
        const rect = navRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    // Scroll & Theme Logic
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            if (window.scrollY <= 50) setTheme("transparent");
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Intersection Observer for Chameleon Effect
    useEffect(() => {
        const sections = [
            { id: "hero", theme: "transparent" },
            { id: "vision", theme: "green" },         // Vision -> Neon Lime
            { id: "how-it-works", theme: "blue" },    // Neural Workflow -> Electric Cyan
            { id: "features", theme: "blue" },        // Grouping features with blue if needed, or default
            { id: "download", theme: "dark" },        // Download -> Dark/Cyber
            { id: "team", theme: "dark" },            // Team -> White/Silver
            { id: "faq", theme: "green" }
        ];

        const observerOptions = {
            root: null,
            rootMargin: "-40% 0px -40% 0px", // Trigger when section is central
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                    // Update Chameleon Theme based on section
                    const activeTheme = sections.find(s => s.id === entry.target.id)?.theme || "green";
                    if (window.scrollY > 50) {
                        setTheme(activeTheme);
                    }
                }
            });
        }, observerOptions);

        sections.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const navLinks = [
        { name: "Home", href: "#hero", id: "hero" },
        { name: "Vision", href: "#vision", id: "vision" },
        { name: "Workflow", href: "#how-it-works", id: "how-it-works" }, // Updated ID/Name
        { name: "Features", href: "#features", id: "features" },
        { name: "Download", href: "#download", id: "download" },
        { name: "Team", href: "#team", id: "team" },
        { name: "FAQ", href: "#faq", id: "faq" },
    ];

    return (
        <motion.nav
            ref={navRef}
            className={`navbar-hud ${scrolled ? "scrolled" : ""} theme-${theme}`}
            onMouseMove={handleNavMouseMove}
        >
            {/* Protocol 2: Spotlight Overlay */}
            <motion.div
                className="nav-spotlight"
                style={{
                    background: useTransform(
                        [mouseX, mouseY],
                        ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,255,255,0.06), transparent 40%)`
                    )
                }}
            />

            <div className="nav-wrapper">
                <div className="nav-brand">
                    AgriVan<span className="brand-dot">i</span>
                </div>

                <div className="nav-links-desktop">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={`nav-link ${activeSection === link.id ? "active" : ""}`}
                            onClick={() => setActiveSection(link.id)}
                        >
                            {link.name}

                            {/* Protocol 2: Laser Underline */}
                            {activeSection === link.id && (
                                <motion.div
                                    className="laser-underline"
                                    layoutId="laser-underline"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </a>
                    ))}

                    {/* Protocol 4: Morphing CTA */}
                    <MagneticButton className="launch-cta">
                        Launch App
                    </MagneticButton>
                </div>

                <button
                    className="mobile-toggle"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    {mobileOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Protocol 3: Scroll Progress Integrated Bar */}
            <motion.div
                className="scroll-progress-bar"
                style={{ scaleX: scrollYProgress }}
            />

            <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
                {navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        className="mobile-nav-link"
                        onClick={() => setMobileOpen(false)}
                    >
                        {link.name}
                    </a>
                ))}
                <button className="mobile-launch-cta">Launch App</button>
            </div>
        </motion.nav>
    );
}
