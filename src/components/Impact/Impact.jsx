import React, { useRef, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";
import { Users, ShieldCheck, MapPin } from "lucide-react";
import "./Impact.css";

// ANIMATED NUMBER COMPONENT
const CountUp = ({ to, suffix = "" }) => {
    const nodeRef = useRef(null);
    const inView = useInView(nodeRef, { once: true, margin: "-50px" });

    useEffect(() => {
        if (!inView) return;

        const node = nodeRef.current;
        // Animate from 0 to 'to'
        const controls = animate(0, to, {
            duration: 2.5,
            ease: "easeOut",
            onUpdate(value) {
                if (node) {
                    node.textContent = Math.round(value) + suffix;
                }
            }
        });

        return () => controls.stop();
    }, [inView, to, suffix]);

    return <span ref={nodeRef} className="data-number">0{suffix}</span>;
};

// HOLOGRAPHIC CARD COMPONENT
// eslint-disable-next-line no-unused-vars
const HolographicCard = ({ icon: Icon, value, suffix, label, delay }) => {
    return (
        <motion.div
            className="holo-prism"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.8,
                delay: delay,
                type: "spring",
                bounce: 0.3
            }}
        >
            <div className="prism-icon-wrapper">
                <Icon size={48} strokeWidth={1.5} />
            </div>
            <CountUp to={value} suffix={suffix} />
            <span className="data-label">{label}</span>
        </motion.div>
    );
};

export default function Impact() {
    return (
        <section className="impact" id="impact">
            {/* Protocol 1: Circuit Board Atmosphere */}
            <div className="impact-circuit-bg"></div>

            <div className="impact-content">
                <div className="impact-grid">
                    {/* Card 1: 50k+ Farmers */}
                    <HolographicCard
                        icon={Users}
                        value={50}
                        suffix="k+"
                        label="Farmers Onboarded"
                        delay={0}
                    />

                    {/* Card 2: 85% Loss Reduced */}
                    <HolographicCard
                        icon={ShieldCheck}
                        value={85}
                        suffix="%"
                        label="Crop Loss Reduced"
                        delay={0.2}
                    />

                    {/* Card 3: 12 States */}
                    <HolographicCard
                        icon={MapPin}
                        value={12}
                        suffix=""
                        label="States Covered"
                        delay={0.4}
                    />
                </div>
            </div>
        </section>
    );
}
