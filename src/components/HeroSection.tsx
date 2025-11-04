import { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-1fccac55`;

export default function HeroSection() {
  const [heroVideo, setHeroVideo] = useState('https://player.vimeo.com/video/1133168419?badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0');
  const [heroTitle, setHeroTitle] = useState('صوت من عندكم...\nمستقبل ليكم.\nحامد بندق');
  const [heroSubtitle, setHeroSubtitle] = useState('من بورسعيد... لبورسعيد، نبني مستقبل شبابنا سوا');

  useEffect(() => {
    fetchSiteContent();
  }, []);

  const fetchSiteContent = async () => {
    try {
      const response = await fetch(`${API_URL}/site-content`, {
        headers: { Authorization: `Bearer ${publicAnonKey}` },
      });
      const data = await response.json();
      if (data.success && data.content) {
        setHeroVideo(data.content.heroVideo || heroVideo);
        setHeroTitle(data.content.heroTitle || heroTitle);
        setHeroSubtitle(data.content.heroSubtitle || heroSubtitle);
      }
    } catch (error) {
      console.error('Error fetching site content:', error);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20" dir="rtl">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1730190202188-bc742975d595?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFZ3lwdCUyMHBvcnQlMjBjaXR5JTIwc3VucmlzZSUyMGNhbmFsfGVufDF8fHx8MTc2MjA4MDcxM3ww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Port Said Canal"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div 
            className="text-white"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {heroTitle.split('\n').map((line, i) => (
                <span key={i}>
                  {line.includes('حامد بندق') ? (
                    <span className="text-green-400">{line}</span>
                  ) : (
                    line
                  )}
                  {i < heroTitle.split('\n').length - 1 && <br />}
                </span>
              ))}
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {heroSubtitle}
            </motion.p>

            {/* Core Pledges */}
            <div className="grid gap-3 mb-8">
              {[
                { title: 'النزاهة أولاً', desc: 'برنامج واضح، تمويل شفاف، بلا مال سياسي' },
                { title: 'الشباب أولاً', desc: 'حلول جذرية للإسكان ووظائف نوعية حقيقية' },
                { title: 'معاكم على طول', desc: 'مش هتقابلني في مكتب، هنتقابل في الشارع وبينكم' }
              ].map((pledge, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-lg"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.2, duration: 0.6 }}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                >
                  <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="text-lg">{pledge.title}</h3>
                    <p className="text-gray-300 text-sm">{pledge.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => scrollToSection('youth-agenda')}
              >
                اكتشف برنامجنا للشباب
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 border-white text-white hover:bg-white/20"
                onClick={() => scrollToSection('principles')}
              >
                ليه احنا مختلفين
              </Button>
            </motion.div>
          </motion.div>

          {/* Video */}
          <motion.div 
            className="relative flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-lg overflow-hidden shadow-2xl max-w-md w-full" style={{ padding: '177.78% 0 0 0', position: 'relative' }}>
              <iframe 
                src={heroVideo} 
                frameBorder="0" 
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                title="حامد بندق - رسالة للشباب"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
