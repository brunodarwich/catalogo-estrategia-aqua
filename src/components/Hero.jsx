import React, { useState, useRef, useEffect } from 'react';
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
        .catch(error => {
          console.warn("Autoplay bloqueado:", error);
          setVideoEnded(true); // Se não puder tocar, mostra a imagem estática
        });
    }
  }, []);

  return (
    <section className="hero">
      <div className="hero-video-container">
        <img 
          src="/hero-poster.jpg" 
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
          poster="/hero-poster.jpg"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        
        <div className="hero-overlay"></div>
      </div>
      
      <div className="hero-content fade-in">
        <h1 className="hero-title">AQUA</h1>
        <p className="hero-subtitle">O luxo de se sentir bem</p>
        <span className="hero-tagline">Sinta. É AQUA.</span>
      </div>
    </section>
  );
};

export default Hero;
