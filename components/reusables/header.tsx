import { Brain, Sparkles } from "lucide-react";
import Link from "next/link";

const Header = () => {
    return (
        <header className="relative z-50 glass">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link href={'/'} className="flex items-center space-x-3">
                        <div className="relative">
                            <Brain className="w-10 h-10 text-blue-400 animate-pulse-glow" />
                            <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
                        </div>
                        <span className="text-2xl font-bold text-white">
                            ExamScribe
                        </span>
                    </Link>
                    <nav className="hidden md:flex items-center space-x-8">
                        <a
                            href="#features"
                        className="text-gray-300 hover:text-white transition-colors"
                    >
                        Features
                    </a>
                    <a
                        href="#demo"
                        className="text-gray-300 hover:text-white transition-colors"
                    >
                        Demo
                    </a>
                    <a
                        href="#early-access"
                        className="text-gray-300 hover:text-white transition-colors"
                    >
                        Early Access
                    </a>
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 animate-pulse-glow">
                        Join Beta
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
