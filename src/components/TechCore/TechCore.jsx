import React from "react";
import "./TechCore.css";
import { User, Mic, Cpu, Volume2 } from "lucide-react";

export default function TechCore() {
    return (
        <section className="tech-core-section">
            <div className="core-header">
                <h2>SYSTEM ARCHITECTURE</h2>
                <p>The Pipeline of Intelligence</p>
            </div>

            <div className="flow-diagram-container">

                {/* Step 1: User */}
                <div className="flow-step">
                    <div className="flow-icon glass-icon">
                        <User size={32} />
                    </div>
                    <span>Farmer</span>
                </div>

                {/* Animated Connector 1 */}
                <div className="flow-connector">
                    <svg className="connector-svg" width="100%" height="20">
                        <line x1="0" y1="10" x2="100%" y2="10" className="base-line" />
                        <circle cx="0" cy="10" r="4" className="data-packet" />
                    </svg>
                </div>

                {/* Step 2: Web Speech API */}
                <div className="flow-step">
                    <div className="flow-icon glass-icon">
                        <Mic size={32} />
                    </div>
                    <span>Web Speech API</span>
                </div>

                {/* Animated Connector 2 */}
                <div className="flow-connector">
                    <svg className="connector-svg" width="100%" height="20">
                        <line x1="0" y1="10" x2="100%" y2="10" className="base-line" />
                        <circle cx="0" cy="10" r="4" className="data-packet delay-1" />
                    </svg>
                </div>

                {/* Step 3: Llama-3 Engine (Active Node) */}
                <div className="flow-step active-node">
                    <div className="flow-icon glass-icon active-glow">
                        <Cpu size={40} />
                    </div>
                    <div className="active-label">LLAMA-3 ENGINE</div>
                </div>

                {/* Animated Connector 3 */}
                <div className="flow-connector">
                    <svg className="connector-svg" width="100%" height="20">
                        <line x1="0" y1="10" x2="100%" y2="10" className="base-line" />
                        <circle cx="0" cy="10" r="4" className="data-packet delay-2" />
                    </svg>
                </div>

                {/* Step 4: TTS Speaker */}
                <div className="flow-step">
                    <div className="flow-icon glass-icon">
                        <Volume2 size={32} />
                    </div>
                    <span>TTS Speaker</span>
                </div>

            </div>

            {/* Decorative Background Mesh */}
            <div className="tech-mesh"></div>
        </section>
    );
}
