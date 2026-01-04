import React from "react";
import { Mic, Activity, LineChart, ShieldCheck, Zap, Globe } from "lucide-react";
import "./Features.css";
// FIX 1: Import Asset
import marketImg from '../../assets/market-blur.png';

export default function Features() {
    const features = [
        { icon: <Mic size={32} />, title: "Vernacular Voice", desc: "Speak in Hindi, Tamil, or Bengali. Our AI understands." },
        { icon: <Activity size={32} />, title: "Llama-3 Diagnosis", desc: "Identify crop diseases with 99% accuracy instantly." },
        { icon: <LineChart size={32} />, title: "Live Mandi Rates", desc: "Real-time APMC market prices at your fingertips." },
        { icon: <ShieldCheck size={32} />, title: "Secure Data", desc: "Your farming data is encrypted and private." },
        { icon: <Zap size={32} />, title: "Offline Mode", desc: "Works even in low connectivity rural areas." },
        { icon: <Globe size={32} />, title: "Hyper-Local", desc: "Weather and soil reports for your specific village." },
    ];

    return (
        <section className="features" id="features">
            <div className="features-bg">
                <img src={marketImg} alt="Market Background" />
                <div className="features-overlay"></div>
            </div>

            <div className="features-header">
                <div className="green-spotlight"></div>
                <span className="tagline">POWERED BY LLAMA-3</span>
                <h2 className="main-title">Built for the Offline World.</h2>
                <p className="subtext">No internet? No problem. See what makes AgriVani unstoppable.</p>
            </div>

            <div className="features-container">
                {features.map((f, i) => (
                    <div key={i} className="glass-card">
                        <div className="icon-wrapper">
                            {f.icon}
                        </div>
                        <h3>{f.title}</h3>
                        <p>{f.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
