"use client";

import React, { useState, useEffect } from "react";
import {
    Brain,
    Users,
    BarChart3,
    Clock,
    CheckCircle,
    Upload,
    Zap,
    Target,
    Award,
    ArrowRight,
    Play,
    Star,
    Sparkles,
    TrendingUp,
    Shield,
    Rocket,
    Users2,
    BookOpen,
    Lightbulb,
} from "lucide-react";
import Link from "next/link";
import Header from "@/components/reusables/header";

const ExamScribeLanding = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [currentBenefit, setCurrentBenefit] = useState(0);
    const [typewriterText, setTypewriterText] = useState("");
    const [typewriterIndex, setTypewriterIndex] = useState(0);

    const benefits = [
        "Generate comprehensive exams in minutes, not hours",
        "Create personalized questions for every student level",
        "Get instant insights into learning gaps and progress",
        "Build your question bank automatically as you teach",
    ];

    const fullText = "The Future of Exam Creation Starts Here";

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBenefit((prev) => (prev + 1) % benefits.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [benefits.length]);

    useEffect(() => {
        if (typewriterIndex < fullText.length) {
            const timeout = setTimeout(() => {
                setTypewriterText((prev) => prev + fullText[typewriterIndex]);
                setTypewriterIndex((prev) => prev + 1);
            }, 100);
            return () => clearTimeout(timeout);
        }
    }, [typewriterIndex, fullText]);

    const FloatingElement = ({ delay = 0, className = "" }) => (
        <div
            className={`animate-float ${className}`}
            style={{
                animationDelay: `${delay}s`,
                transform: `translate(${mousePosition.x * 0.01}px, ${
                    mousePosition.y * 0.01
                }px)`,
            }}
        />
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
            <style jsx>{`
                @keyframes float {
                    0%,
                    100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }
                @keyframes pulse-glow {
                    0%,
                    100% {
                        box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
                    }
                    50% {
                        box-shadow: 0 0 40px rgba(59, 130, 246, 0.8),
                            0 0 60px rgba(59, 130, 246, 0.4);
                    }
                }
                @keyframes gradient-shift {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }
                @keyframes typewriter {
                    from {
                        width: 0;
                    }
                    to {
                        width: 100%;
                    }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                .animate-pulse-glow {
                    animation: pulse-glow 2s ease-in-out infinite;
                }
                .animate-gradient {
                    animation: gradient-shift 3s ease infinite;
                    background-size: 200% 200%;
                }
                .glass {
                    backdrop-filter: blur(20px);
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .text-gradient {
                    background: linear-gradient(
                        45deg,
                        #3b82f6,
                        #8b5cf6,
                        #06b6d4
                    );
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .typewriter {
                    border-right: 2px solid #3b82f6;
                    white-space: nowrap;
                    overflow: hidden;
                    animation: typewriter 4s steps(40) 1s 1 normal both;
                }
            `}</style>

            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <FloatingElement
                    delay={0}
                    className="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
                />
                <FloatingElement
                    delay={2}
                    className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
                />
                <FloatingElement
                    delay={4}
                    className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"
                />
            </div>

            {/* Header */}
            <Header />

            {/* Hero Section */}
            <section className="relative z-10 pt-20 pb-32 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="mb-8">
                        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-blue-500/30">
                            <Rocket className="w-5 h-5 text-yellow-400" />
                            <span className="text-white font-semibold">
                                🚀 Launching Soon - Join the Revolution
                            </span>
                        </div>
                        <h1 className="text-6xl md:text-7xl font-black text-white mb-6 leading-tight">
                            Stop Spending Hours
                            <br />
                            <span className="text-gradient animate-gradient">
                                Creating Exams
                            </span>
                        </h1>
                        <div className="text-2xl text-blue-400 font-mono mb-6 h-8">
                            {typewriterText}
                            <span className="animate-pulse">|</span>
                        </div>
                        <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                            The first AI-powered platform that transforms any
                            teaching material into comprehensive, personalized
                            exams in minutes. Be among the first educators to
                            experience the future.
                        </p>
                    </div>

                    {/* Rotating Benefits */}
                    <div className="mb-12 h-16 flex items-center justify-center">
                        <div className="glass rounded-2xl px-8 py-4 max-w-2xl">
                            {benefits.map((benefit, index) => (
                                <div
                                    key={index}
                                    className={`text-lg font-semibold transition-all duration-1000 ${
                                        index === currentBenefit
                                            ? "text-white opacity-100 transform translate-x-0"
                                            : "text-gray-400 opacity-0 absolute transform translate-x-4"
                                    }`}
                                >
                                    ✨ {benefit}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link href={"/login"}>
                            <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-105 animate-pulse-glow flex items-center space-x-3">
                                <span>Get Early Access</span>
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                        <button className="group glass text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                            <Play className="w-5 h-5" />
                            <span>Watch Preview</span>
                        </button>
                    </div>

                    <p className="text-sm text-gray-400 mt-6">
                        🎯 Be first in line • No spam, ever • Cancel anytime
                    </p>
                </div>
            </section>

            {/* Problem/Solution Section */}
            <section className="relative z-10 py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Problem Side */}
                        <div className="glass rounded-3xl p-8 border-l-4 border-red-500">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                                <span className="w-3 h-3 bg-red-500 rounded-full mr-3 animate-pulse"></span>
                                The Current Reality
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <Clock className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="text-white font-semibold">
                                            8+ Hours Per Exam
                                        </p>
                                        <p className="text-gray-300 text-sm">
                                            Manual question creation is
                                            painfully slow
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <Users2 className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="text-white font-semibold">
                                            One-Size-Fits-All
                                        </p>
                                        <p className="text-gray-300 text-sm">
                                            Same questions for different skill
                                            levels
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <BookOpen className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="text-white font-semibold">
                                            Limited Question Variety
                                        </p>
                                        <p className="text-gray-300 text-sm">
                                            Running out of creative ways to test
                                            knowledge
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Solution Side */}
                        <div className="glass rounded-3xl p-8 border-l-4 border-green-500">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                                <span className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></span>
                                The ExamScribe Way
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <Zap className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="text-white font-semibold">
                                            Minutes, Not Hours
                                        </p>
                                        <p className="text-gray-300 text-sm">
                                            AI generates comprehensive exams
                                            instantly
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <Target className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="text-white font-semibold">
                                            Personalized for Each Student
                                        </p>
                                        <p className="text-gray-300 text-sm">
                                            Adaptive difficulty and learning
                                            paths
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <Lightbulb className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="text-white font-semibold">
                                            Unlimited Question Diversity
                                        </p>
                                        <p className="text-gray-300 text-sm">
                                            Fresh perspectives on every topic
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="relative z-10 py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold text-white mb-6">
                            Built for{" "}
                            <span className="text-gradient">
                                Modern Educators
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Every feature designed with one goal: give you more
                            time to focus on what matters most - teaching
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: (
                                    <Brain className="w-12 h-12 text-blue-400" />
                                ),
                                title: "Smart Question Generation",
                                description:
                                    "Upload any material - textbooks, slides, notes - and watch AI create diverse, comprehensive questions that truly test understanding.",
                                color: "from-blue-500/20 to-cyan-500/20",
                                comingSoon: false,
                            },
                            {
                                icon: (
                                    <Users className="w-12 h-12 text-green-400" />
                                ),
                                title: "Adaptive Learning Paths",
                                description:
                                    "AI automatically adjusts question difficulty based on student performance, ensuring optimal challenge for every learner.",
                                color: "from-green-500/20 to-emerald-500/20",
                                comingSoon: false,
                            },
                            {
                                icon: (
                                    <BarChart3 className="w-12 h-12 text-purple-400" />
                                ),
                                title: "Real-Time Analytics",
                                description:
                                    "Instant insights into student progress, knowledge gaps, and learning patterns to guide your teaching decisions.",
                                color: "from-purple-500/20 to-pink-500/20",
                                comingSoon: false,
                            },
                            {
                                icon: (
                                    <Target className="w-12 h-12 text-orange-400" />
                                ),
                                title: "Curriculum Alignment",
                                description:
                                    "Automatically align questions with learning objectives and educational standards for seamless integration.",
                                color: "from-orange-500/20 to-red-500/20",
                                comingSoon: true,
                            },
                            {
                                icon: (
                                    <Shield className="w-12 h-12 text-indigo-400" />
                                ),
                                title: "Academic Integrity Tools",
                                description:
                                    "Built-in plagiarism detection and question randomization to maintain the highest academic standards.",
                                color: "from-indigo-500/20 to-blue-500/20",
                                comingSoon: true,
                            },
                            {
                                icon: (
                                    <TrendingUp className="w-12 h-12 text-teal-400" />
                                ),
                                title: "Predictive Insights",
                                description:
                                    "AI-powered predictions help identify at-risk students before they fall behind, enabling proactive intervention.",
                                color: "from-teal-500/20 to-cyan-500/20",
                                comingSoon: true,
                            },
                        ].map((feature, index) => (
                            <div key={index} className="group">
                                <div
                                    className={`glass rounded-3xl p-8 h-full transform transition-all duration-500 hover:scale-105 hover:rotate-1 bg-gradient-to-br ${feature.color} border-2 border-transparent hover:border-white/20`}
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm">
                                            {feature.icon}
                                        </div>
                                        <div
                                            className={`text-black text-xs font-bold px-3 py-1 rounded-full ${
                                                feature.comingSoon
                                                    ? "bg-gradient-to-r from-yellow-400 to-orange-400"
                                                    : "bg-gradient-to-r from-green-400 to-emerald-400"
                                            }`}
                                        >
                                            {feature.comingSoon
                                                ? "SOON"
                                                : "LAUNCH"}
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-300 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Interactive Demo Section */}
            <section id="demo" className="relative z-10 py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold text-white mb-6">
                            See It in{" "}
                            <span className="text-gradient">Action</span>
                        </h2>
                        <p className="text-xl text-gray-300">
                            Experience the magic of AI-powered exam creation
                        </p>
                    </div>

                    <div className="glass rounded-3xl p-8 lg:p-12">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="space-y-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                            <Upload className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white">
                                                Upload Your Content
                                            </h3>
                                            <p className="text-gray-300">
                                                Any format: PDFs, Word docs,
                                                presentations, or plain text
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                                            <Brain className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white">
                                                AI Analysis
                                            </h3>
                                            <p className="text-gray-300">
                                                Advanced algorithms understand
                                                context and key concepts
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                            <Award className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white">
                                                Perfect Questions
                                            </h3>
                                            <p className="text-gray-300">
                                                Multiple choice, short answer,
                                                essay - all difficulty levels
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                                        <Play className="w-5 h-5" />
                                        <span>Watch Demo Preview</span>
                                    </button>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="glass rounded-2xl p-6 transform hover:scale-105 transition-all duration-300">
                                    <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-4 mb-4">
                                        <div className="flex space-x-2 mb-3">
                                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        </div>
                                        <div className="text-green-400 font-mono text-sm">
                                            <div className="mb-2">
                                                $ examscribe create --subject
                                                &quot;Biology&quot; --chapter
                                                &ldquo;Cell Division&quot;
                                            </div>
                                            <div className="text-gray-400">
                                                📄 Processing uploaded
                                                content...
                                            </div>
                                            <div className="text-gray-400">
                                                🧠 Analyzing key concepts...
                                            </div>
                                            <div className="text-gray-400">
                                                ⚡ Generating personalized
                                                questions...
                                            </div>
                                            <div className="text-blue-400">
                                                ✨ Ready! Generated
                                                comprehensive exam suite
                                            </div>
                                            <div className="text-green-400">
                                                🎯 Questions adapted for 3
                                                difficulty levels
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-400 mb-2">
                                            Your Exam is Ready!
                                        </div>
                                        <div className="text-gray-300">
                                            Multiple formats, all difficulty
                                            levels
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Early Access CTA */}
            <section id="early-access" className="relative z-10 py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="glass rounded-3xl p-12 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
                        <div className="relative z-10">
                            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full px-4 py-2 mb-6">
                                <Star className="w-4 h-4 text-yellow-400" />
                                <span className="text-sm text-white font-semibold">
                                    Limited Beta Access
                                </span>
                            </div>
                            <h2 className="text-5xl font-bold text-white mb-6">
                                Be a{" "}
                                <span className="text-gradient">Pioneer</span>
                            </h2>
                            <p className="text-xl text-gray-300 mb-8">
                                Join our exclusive beta program and help shape
                                the future of education technology. Early
                                adopters get lifetime perks and priority
                                support.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
                                <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-5 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-105 animate-pulse-glow flex items-center space-x-3">
                                    <span>Join Beta Program</span>
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                                <div className="flex items-center justify-center space-x-2 text-gray-300">
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                    <span>Free beta access</span>
                                </div>
                                <div className="flex items-center justify-center space-x-2 text-gray-300">
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                    <span>Shape product features</span>
                                </div>
                                <div className="flex items-center justify-center space-x-2 text-gray-300">
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                    <span>Lifetime early adopter perks</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 py-12 px-6 border-t border-white/10">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="flex items-center justify-center space-x-3 mb-6">
                        <div className="relative">
                            <Brain className="w-10 h-10 text-blue-400 animate-pulse-glow" />
                            <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
                        </div>
                        <span className="text-2xl font-bold text-white">
                            ExamScribe
                        </span>
                    </div>
                    <p className="text-gray-400 mb-8">
                        Pioneering the future of AI-powered education
                    </p>
                    <div className="flex justify-center space-x-8 text-sm text-gray-400">
                        <a
                            href="#"
                            className="hover:text-white transition-colors"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="#"
                            className="hover:text-white transition-colors"
                        >
                            Terms of Service
                        </a>
                        <a
                            href="#"
                            className="hover:text-white transition-colors"
                        >
                            Contact
                        </a>
                        <a
                            href="#"
                            className="hover:text-white transition-colors"
                        >
                            Beta Program
                        </a>
                    </div>
                    <div className="mt-8 text-xs text-gray-500">
                        © 2025 ExamScribe. Built with passion for educators
                        worldwide. 🚀
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ExamScribeLanding;
