import React, { useRef } from 'react';
import './CircularText.css';

const defaultText = 'ByteSweep';

export default function CircularText({
  text = defaultText,
  onHover = 'speedUp',
  spinDuration = 20,
  className = '',
}) {
  const containerRef = useRef(null);

  // Split text into characters
  const chars = text.split('');
  const charCount = chars.length;
  const radius = 70; // px
  const fontSize = 22;

  // Inline style for spinning
  const spinStyle = {
    animation: `spin ${spinDuration}s linear infinite`,
  };

  // Handle hover effect
  const handleMouseEnter = () => {
    if (onHover === 'speedUp' && containerRef.current) {
      containerRef.current.style.animationDuration = '4s';
    }
  };
  const handleMouseLeave = () => {
    if (onHover === 'speedUp' && containerRef.current) {
      containerRef.current.style.animationDuration = `${spinDuration}s`;
    }
  };

  return (
    <div
      className={`circular-text-container ${className}`}
      style={{ width: radius * 2 + fontSize, height: radius * 2 + fontSize, margin: '0 auto 32px auto', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div
        className="circular-text-spin"
        ref={containerRef}
        style={spinStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {chars.map((char, i) => {
          const angle = (360 / charCount) * i;
          return (
            <span
              key={i}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: `rotate(${angle}deg) translate(${radius}px) rotate(${-angle}deg)`,
                fontSize,
                fontWeight: 700,
                color: '#2E2EFF',
                letterSpacing: 2,
                userSelect: 'none',
              }}
            >
              {char}
            </span>
          );
        })}
      </div>
    </div>
  );
} 