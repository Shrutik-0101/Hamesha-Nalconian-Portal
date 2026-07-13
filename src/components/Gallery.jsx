import { useState, useEffect, useCallback } from 'react';
import { getContent } from '../services/contentService';
import g1 from '../assets/g1.jpg';
import g2 from '../assets/g2.jpg';
import g3 from '../assets/g3.jpg';
import g4 from '../assets/g4.jpg';
import g5 from '../assets/g5.jpg';
import g6 from '../assets/g6.jpg';

const fallbackImages = [g1, g2, g3, g4, g5, g6];

export default function Gallery() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const content = await getContent();
        if (content && content.galleryImages && content.galleryImages.length > 0) {
          setGalleryImages(content.galleryImages.filter(url => url.trim() !== ''));
        } else {
          setGalleryImages(fallbackImages);
        }
      } catch (error) {
        console.error("Failed to load gallery images:", error);
        setGalleryImages(fallbackImages);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % galleryImages.length);
  }, [galleryImages.length]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, [galleryImages.length]);

  useEffect(() => {
    if (galleryImages.length <= 1) return;
    const interval = setInterval(nextSlide, 2000);
    return () => clearInterval(interval);
  }, [galleryImages.length, nextSlide]);

  const getSlideStyles = (index) => {
    const length = galleryImages.length;
    let offset = (index - activeIndex) % length;
    
    if (offset > Math.floor(length / 2)) offset -= length;
    if (offset < -Math.floor(length / 2)) offset += length;
    
    const absOffset = Math.abs(offset);
    const isCenter = offset === 0;
    
    const scale = Math.max(0.5, 1 - absOffset * 0.2);
    const translateX = offset * 75; 
    
    return {
      transform: `translateX(${translateX}%) scale(${scale})`,
      zIndex: 100 - absOffset,
      opacity: absOffset > 2 ? 0 : (isCenter ? 1 : 0.6),
      pointerEvents: absOffset > 2 ? 'none' : 'auto',
    };
  };

  if (loading || galleryImages.length === 0) return null;

  return (
    <div className="gallery-section" style={{ paddingBottom: '30px' }}>
      <div className="section-title">
        <div className="title-accent"></div>
        <h2>Gallery</h2>
        <div className="title-bar"></div>
      </div>
      
      <div className="gallery-slider">
        <button className="gallery-nav-btn prev" onClick={prevSlide}>&lt;</button>
        
        <div className="gallery-track">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className={`gallery-slide ${i === activeIndex ? 'active' : ''}`}
              style={{
                backgroundImage: `url("${img}")`,
                ...getSlideStyles(i)
              }}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
        
        <button className="gallery-nav-btn next" onClick={nextSlide}>&gt;</button>
      </div>

      <div className="gallery-dots">
        {galleryImages.map((_, i) => (
          <button
            key={i}
            className={`gallery-dot ${i === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
