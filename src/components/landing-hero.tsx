import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const spiritGuides = [
  {
    name: "Sage Amara",
    tradition: "Universal Wisdom",
    image: "https://images.unsplash.com/photo-1659439902271-8a310f0edeca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwc3Bpcml0dWFsJTIwbWVkaXRhdGlvbiUyMHBlb3BsZXxlbnwxfHx8fDE3NTg4NDkyNTB8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    name: "Elder Chen",
    tradition: "Eastern Philosophy",
    image: "https://images.unsplash.com/photo-1504021624863-054aa77f753f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMHByYXllciUyMG1lZGl0YXRpb258ZW58MXx8fHwxNzU4ODQ5MjUzfDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    name: "Guide Sophia",
    tradition: "Interfaith Wisdom",
    image: "https://images.unsplash.com/photo-1742223996745-cedb68f57e52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcmVsaWdpb3VzJTIwc3ltYm9scyUyMHVuaXR5fGVufDF8fHx8MTc1ODg0OTI1Nnww&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

interface LandingHeroProps {
  onGetStarted: () => void;
}

export function LandingHero({ onGetStarted }: LandingHeroProps) {
  const [currentGuide, setCurrentGuide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGuide((prev) => (prev + 1) % spiritGuides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-light-gradient">
      {/* Light Background with Subtle Gradients */}
      <div className="absolute inset-0">
        {/* Subtle gradient overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(107,93,211,0.08),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(255,184,77,0.08),_transparent_60%)]" />
        
        {/* Elegant floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: i % 2 === 0 
                  ? 'linear-gradient(135deg, #6B5DD3, #B8B0FF)' 
                  : 'linear-gradient(135deg, #C9A882, #B89872)',
                left: `${10 + i * 4.5}%`,
                top: `${10 + (i % 5) * 18}%`,
                boxShadow: i % 2 === 0 
                  ? '0 0 8px rgba(107,93,211,0.3)' 
                  : '0 0 8px rgba(201,168,130,0.3)',
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.3, 0.8, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 4 + i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-display text-[#3D3D6B] mb-4">
            Divinity<span className="text-[#6B5DD3]">AGI</span>
          </h1>
          <p className="text-h3 text-[#5D5D7D] max-w-2xl mx-auto">
            Discover Your Spiritual Guide
          </p>
        </motion.div>

        {/* Rotating Spirit Guide */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-12"
        >
          <div className="relative w-64 h-64 mx-auto mb-6">
            <motion.div
              key={currentGuide}
              initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#6B5DD3]/20 elevation-3">
                <ImageWithFallback
                  src={spiritGuides[currentGuide].image}
                  alt={spiritGuides[currentGuide].name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Glowing Ring */}
              <div className="absolute -inset-2 rounded-full border-2 border-[#6B5DD3]/40 animate-pulse" />
            </motion.div>
          </div>
          
          <motion.div
            key={currentGuide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#3D3D6B]"
          >
            <h3 className="text-h3 mb-2">{spiritGuides[currentGuide].name}</h3>
            <p className="text-body text-[#6B5DD3]">{spiritGuides[currentGuide].tradition}</p>
          </motion.div>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl mb-2 text-[#3D3D6B]" style={{ fontWeight: 700 }}>24/7</div>
              <div className="text-sm text-[#6B5DD3]" style={{ fontWeight: 500 }}>Guidance</div>
            </div>
            <div>
              <div className="text-2xl mb-2 text-[#3D3D6B]" style={{ fontWeight: 700 }}>12</div>
              <div className="text-sm text-[#6B5DD3]" style={{ fontWeight: 500 }}>Faith Groups</div>
            </div>
            <div>
              <div className="text-2xl mb-2 text-[#3D3D6B]" style={{ fontWeight: 700 }}>50+</div>
              <div className="text-sm text-[#6B5DD3]" style={{ fontWeight: 500 }}>AI Avatars</div>
            </div>
            <div>
              <div className="text-2xl mb-2 text-[#3D3D6B]" style={{ fontWeight: 700 }}>100+</div>
              <div className="text-sm text-[#6B5DD3]" style={{ fontWeight: 500 }}>Languages</div>
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Button
            onClick={onGetStarted}
            size="lg"
            className="bg-gradient-to-r from-[#6B5DD3] to-[#C9A882] hover:from-[#5B4DC3] hover:to-[#B89872] text-white px-12 py-6 text-lg rounded-full elevation-2 hover:elevation-hover-2 transform hover:scale-105 transition-all duration-300 btn-lg"
          >
            Begin Your Transformation
          </Button>
          
          <p className="text-[#5D5D7D] mt-4 text-sm" style={{ fontWeight: 500 }}>
            Ready to begin your spiritual transformation?
          </p>
        </motion.div>

        {/* Guide Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-12 flex justify-center space-x-2"
        >
          {spiritGuides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentGuide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentGuide 
                  ? 'bg-[#6B5DD3] elevation-1' 
                  : 'bg-[#C5C5D0] hover:bg-[#6B5DD3]/50'
              }`}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}