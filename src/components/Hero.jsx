import { useState, useRef, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { storeSettings } from '../data/catalog';
import { generateWhatsAppGeneralLink } from '../utils/whatsapp';
import './Hero.css';

const Hero = () => {
  const [videoEnded, setVideoEnded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setVideoEnded(true));
    }
  }, []);

  const scrollToCatalog = () => {
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
  };

  const whatsappLink = generateWhatsAppGeneralLink();

  return (
    <section className="hero">
      <div className="hero-video-container">
        <img 
          src={storeSettings.hero.posterSrc}
          alt="AQUA Perfume"
          className="hero-static-image" 
        />
        
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          playsInline 
          loop
          className={`hero-video ${videoEnded ? 'fade-out' : ''} ${isPlaying ? 'is-playing' : ''}`}
          onEnded={() => setVideoEnded(true)}
          poster={storeSettings.hero.posterSrc}
        >
          <source src={storeSettings.hero.videoSrc} type="video/mp4" />
        </video>
        
        <div className="hero-overlay"></div>
      </div>
      
      <div className="hero-content fade-in">
        <span className="hero-eyebrow">{storeSettings.hero.eyebrow}</span>
        <h1 className="hero-title">{storeSettings.hero.title}</h1>
        <p className="hero-subtitle">{storeSettings.hero.subtitle}</p>
        <span className="hero-tagline">{storeSettings.hero.tagline}</span>
        <div className="hero-actions">
          <button type="button" onClick={scrollToCatalog} className="hero-btn hero-btn--primary">
            Ver Catálogo
          </button>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn hero-btn--secondary"
          >
            <MessageCircle size={16} strokeWidth={1.5} />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
