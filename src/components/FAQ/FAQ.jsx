import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import "./FAQ.css";

export default function FAQ() {
    // Protocol data injection
    const faqs = [
        {
            q: "Does AgriVani work without an internet connection?",
            a: "Yes. Our core voice models and diagnostic tools are optimized to run locally on your device. You get instant answers in the field, even with zero connectivity. Cloud sync happens automatically when signal returns."
        },
        {
            q: "How accurate is the AI disease detection?",
            a: "Our Llama-3 powered vision models have trained on over 5 million datasets of plant pathology. We currently maintain a 98.5% diagnostic accuracy rate for major crop types like rice, wheat, and corn."
        },
        {
            q: "What regional languages are supported currently?",
            a: "We currently support full voice interaction in Hindi, Bengali, Tamil, Telugu, and Marathi. Our goal is to cover all 22 official Indian languages by Q4 2025."
        },
        {
            q: "Is my farm data secure?",
            a: "Absolutely. We use enterprise-grade encryption for all data. Furthermore, AgriVani believes your data is yours—we never sell personal farming location or yield data to third parties."
        },
        {
            q: "How is this different from just using Google Search?",
            a: "Google gives you links to read. AgriVani gives you a direct, actionable answer spoken back to you in your local dialect, tailored specifically to the image of the crop you just scanned. It cuts out the noise."
        },
        {
            q: "Is there a cost to use the app?",
            a: "The core diagnostic and voice features are completely free for smallholder farmers. We offer a premium tier for large-scale cooperatives requiring advanced analytics and API access."
        }
    ];

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="faq" id="faq">
            <div className="faq-header">
                <span className="faq-subtag">KNOWLEDGE BASE //</span>
                <h2 className="faq-title">Frequently Asked Questions</h2>
            </div>

            <div className="faq-container">
                {faqs.map((item, index) => {
                    const isOpen = activeIndex === index;

                    return (
                        <div
                            key={index}
                            className={`faq-pod ${isOpen ? "active" : ""}`}
                            onClick={() => toggleFAQ(index)}
                        >
                            <div className="faq-question">
                                <span className="q-text">{item.q}</span>
                                <motion.div
                                    className="faq-icon-wrapper"
                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                    transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                                >
                                    <ChevronDown size={28} />
                                </motion.div>
                            </div>

                            {/* PROTOCOL 3: Animation Physics */}
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{
                                            duration: 0.4,
                                            ease: [0.04, 0.62, 0.23, 0.98] // Spring-like physics feel
                                        }}
                                        className="faq-answer-wrapper"
                                    >
                                        <div className="faq-answer">
                                            <motion.p
                                                className="a-text"
                                                initial={{ y: 10, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.1, duration: 0.3 }}
                                            >
                                                {item.a}
                                            </motion.p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
