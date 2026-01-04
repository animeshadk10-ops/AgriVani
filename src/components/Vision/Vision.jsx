import React, { useEffect, useState } from "react";
import "./Vision.css";
import { TrendingUp, ArrowUpRight } from "lucide-react";
// FIX: Importing local asset
import visionImg from '../../assets/vision-img.jpg';

export default function Vision() {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const section = document.getElementById("vision");
            if (section) {
                const rect = section.getBoundingClientRect();
                const scrollSpeed = 0.3;
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    setOffset((window.innerHeight - rect.top) * scrollSpeed);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section className="vision-section" id="vision">
            <div className="vision-container">
                {/* Left Side: Parallax Visual */}
                <div className="vision-visual">
                    <div
                        className="parallax-container"
                        style={{ transform: `translateY(${offset * 0.1}px)` }}
                    >
                        {/* Local Asset: Vision Image */}
                        <img
                            src={visionImg}
                            alt="Future Agriculture"
                            className="vision-bg-img"
                        />
                    </div>

                    {/* Floating Success Metric Card */}
                    <div className="metric-card floating-glass">
                        <div className="metric-header">
                            <span className="metric-label">CROP YIELD</span>
                            <div className="metric-icon"><TrendingUp size={16} /></div>
                        </div>
                        <div className="metric-value">
                            +40% <ArrowUpRight size={24} className="metric-arrow" />
                        </div>
                        <div className="metric-chart">
                            <div className="chart-bar h-1"></div>
                            <div className="chart-bar h-2"></div>
                            <div className="chart-bar h-3"></div>
                            <div className="chart-bar h-4"></div>
                            <div className="chart-bar h-5 active"></div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Story Content */}
                <div className="vision-content">
                    <h2 className="vision-title">
                        Bridging the <br />
                        <span className="highlight-text">Digital Divide.</span>
                    </h2>
                    <p className="vision-text">
                        Technology shouldn't be a privilege. We are building a future where every farmer, regardless of literacy or connectivity, has the power of advanced AI in their pocket.
                    </p>
                    <div className="vision-stats">
                        <div className="stat-item">
                            <h3>100%</h3>
                            <p>Offline Capable</p>
                        </div>
                        <div className="stat-item">
                            <h3>3500+</h3>
                            <p>Dialects Mapped</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
