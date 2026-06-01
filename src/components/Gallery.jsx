import { useState, useEffect } from 'react';
import g1 from '../assets/g1.jpg';
import g2 from '../assets/g2.jpg';
import g3 from '../assets/g3.jpg';
import g4 from '../assets/g4.jpg';
import g5 from '../assets/g5.jpg';
import g6 from '../assets/g6.jpg';

const galleryImages = [
  `url("${g1}") center/cover no-repeat`,
  `url("${g2}") center/cover no-repeat`,
  `url("${g3}") center/cover no-repeat`,
  `url("${g4}") center/cover no-repeat`,
  `url("${g5}") center/cover no-repeat`,
  `url("${g6}") center/cover no-repeat`,
];

export default function Gallery() {
  const [cells, setCells] = useState(
    Array.from({ length: 6 }).map((_, i) => ({
      isFlipped: false,
      frontBg: galleryImages[i],
      backBg: galleryImages[(i + 1) % 6],
    }))
  );

  useEffect(() => {
    const intervals = cells.map((_, i) =>
      setInterval(() => {
        setCells((prevCells) => {
          const newCells = [...prevCells];
          const cell = { ...newCells[i] };
          const randomImg = galleryImages[Math.floor(Math.random() * galleryImages.length)];
          
          if (cell.isFlipped) {
            cell.frontBg = randomImg;
          } else {
            cell.backBg = randomImg;
          }
          cell.isFlipped = !cell.isFlipped;
          newCells[i] = cell;
          return newCells;
        });
      }, 3000 + i * 700)
    );

    return () => intervals.forEach(clearInterval);
  }, [cells.length]);

  const handleFlip = (i) => {
    setCells((prevCells) => {
      const newCells = [...prevCells];
      const cell = { ...newCells[i] };
      const randomImg = galleryImages[Math.floor(Math.random() * galleryImages.length)];
      if (cell.isFlipped) {
        cell.frontBg = randomImg;
      } else {
        cell.backBg = randomImg;
      }
      cell.isFlipped = !cell.isFlipped;
      newCells[i] = cell;
      return newCells;
    });
  };

  return (
    <div className="gallery-section">
      <div className="section-title">
        <div className="title-accent"></div>
        <h2>Gallery</h2>
        <div className="title-bar"></div>
      </div>
      <div className="flip-grid" id="flipGrid">
        {cells.map((cell, i) => (
          <div
            key={i}
            className={`flip-cell ${cell.isFlipped ? 'flipped' : ''}`}
            onClick={() => handleFlip(i)}
          >
            <div className="flip-inner">
              <div className="flip-front" style={{ background: cell.frontBg }}></div>
              <div className="flip-back" style={{ background: cell.backBg }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
