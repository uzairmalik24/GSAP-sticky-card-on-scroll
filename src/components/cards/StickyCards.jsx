import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const accentColors = {
    rose: "bg-rose-500 shadow-rose-200 border-rose-200",
    blue: "bg-blue-500 shadow-blue-200 border-blue-200",
    emerald: "bg-emerald-500 shadow-emerald-200 border-emerald-200",
    violet: "bg-violet-500 shadow-violet-200 border-violet-200"
};

const colorKeys = ['rose', 'blue', 'emerald', 'violet'];

const baseCards = [
    {
        title: "Innovative Solutions",
        description: "Delivering cutting-edge ideas that transform businesses and empower growth.",
        image: "/images/image-1.png",
    },
    {
        title: "Creative Design",
        description: "A perfect blend of aesthetics and usability to make every interaction memorable.",
        image: "/images/image-2.jpg",
    },
    {
        title: "Smart Development",
        description: "High-performing and efficient systems built with modern frameworks and precision.",
        image: "/images/image-3.jpg",
    },
    {
        title: "Strategic Thinking",
        description: "Turning insights into impactful strategies that drive measurable results.",
        image: "/images/image-4.jpg",
    },
    {
        title: "Seamless Experience",
        description: "Creating smooth and delightful user journeys that leave a lasting impression.",
        image: "/images/image-5.png",
    },
];

const cards = baseCards.flatMap((card, i) => [
    {
        ...card,
        index: i * 2 + 1,
        accentColor: colorKeys[i % colorKeys.length],
        bgColor: `from-${colorKeys[i % colorKeys.length]}-50 via-white to-${colorKeys[i % colorKeys.length]}-100`,
    },
    {
        ...card,
        index: i * 2 + 2,
        accentColor: colorKeys[(i + 1) % colorKeys.length],
        bgColor: `from-${colorKeys[(i + 1) % colorKeys.length]}-50 via-white to-${colorKeys[(i + 1) % colorKeys.length]}-100`,
    },
].slice(0, i === baseCards.length - 1 ? 1 : 2)); 

export default function StickyCards() {
    const container = useRef(null);

    useGSAP(() => {
        const stickyCards = container.current.querySelectorAll('.sticky-card');
        stickyCards.forEach((card, i) => {
            
            if (i < stickyCards.length - 1) {
                ScrollTrigger.create({
                    trigger: card,
                    start: "top 10%", 
                    endTrigger: stickyCards[stickyCards.length - 1],
                    end: "bottom bottom",
                    pin: true,
                    pinSpacing: false,
                    anticipatePin: 1, 
                });
            }

            if (i < stickyCards.length - 1) {
                const cardInner = card.querySelector('.card-inner');
                ScrollTrigger.create({
                    trigger: stickyCards[i + 1],
                    start: "top bottom-=100", 
                    end: "top top+=400", 
                    scrub: 0.8, 
                    onUpdate: (self) => {
                        const progress = self.progress;
                        const scale = 1 - progress * 0.08; 
                        const y = -progress * 15; 
                        const opacity = 1 - progress * 0.15; 
                        const rotate = -progress * 1; 

                        gsap.to(cardInner, {
                            scale: scale,
                            y: y,
                            rotation: rotate,
                            opacity: opacity,
                            ease: "power2.out", 
                            duration: 0.1, 
                        });
                    }
                });
            }
        });

        
        ScrollTrigger.refresh();
    }, { scope: container });

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
            <div className="sticky-cards pb-32" ref={container}>
                <div className="h-32 sm:h-24" />
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className={`sticky-card min-h-screen flex items-center justify-center px-4 sm:px-8 py-16 sm:py-24 bg-gradient-to-br ${card.bgColor} relative overflow-hidden`}
                    >
                        <div className="absolute inset-0 opacity-20 animate-pulse" style={{ backgroundImage: `radial-gradient(circle at 20% 80%, ${card.accentColor}20 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${card.accentColor}10 0%, transparent 50%)` }} />
                        <div className="card-inner max-w-7xl w-full relative z-10">
                            <div className="bg-white rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.12)] transition-all duration-700 overflow-hidden group hover:scale-[1.01] border border-gray-100">
                                <div className="p-8 sm:p-12 lg:p-16">
                                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
                                        {/* Content */}
                                        <div className="flex-1 space-y-4 sm:space-y-6 lg:space-y-8">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-3 h-3 rounded-full ${accentColors[card.accentColor]} animate-pulse-slow`} />
                                                <span className="text-sm font-semibold text-gray-500 uppercase tracking-[0.2em]">
                                                    Step {card.index}
                                                </span>
                                            </div>
                                            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                                {card.title}
                                            </h2>
                                            <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-xl">
                                                {card.description}
                                            </p>
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6 pt-4">
                                                <button className={`px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 cursor-pointer ${accentColors[card.accentColor]?.split(' ')[0]} text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 active:translate-y-0`}>
                                                    Get Started
                                                </button>
                                             
                                            </div>
                                        </div>
                                        {/* Image */}
                                        <div className="flex-1 w-full relative">
                                            {/* Decorative element with smoother hover */}
                                            <div className={`absolute -inset-4 ${accentColors[card.accentColor]?.split(' ')[0]} opacity-10 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-all duration-1000 ease-out`} />
                                            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                                                <img
                                                    src={card.image}
                                                    alt={card.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div className={`absolute -bottom-6 -right-6 w-28 h-28 lg:w-32 lg:h-32 ${accentColors[card.accentColor]} rounded-3xl shadow-2xl flex items-center justify-center transform group-hover:rotate-12 transition-all duration-700 ease-out animate-bounce-subtle`}>
                                                <span className="text-4xl lg:text-5xl font-black text-white drop-shadow-lg">{card.index}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}