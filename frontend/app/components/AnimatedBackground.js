// app/components/AnimatedBackground.js

'use client'; // This component needs client-side hooks (useState, useEffect)

import React, { useEffect, useState } from 'react';

// This component will render the heart elements
const AnimatedBackground = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Create an array of 30 hearts
    const createHearts = () => {
      return Array.from({ length: 30 }).map((_, index) => ({
        id: index,
        // Random horizontal position
        left: `${Math.random() * 100}vw`,
        // Random animation duration
        duration: `${Math.random() * 5 + 5}s`, // 5 to 10 seconds
        // Random animation delay
        delay: `${Math.random() * 5}s`, // 0 to 5 seconds
        // Random size
        fontSize: `${Math.random() * 1 + 1}rem`, // 1rem to 2rem
      }));
    };

    setHearts(createHearts());
  }, []);

  return (
    <div className="hearts-container">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="heart"
          style={{
            left: heart.left,
            animationDuration: heart.duration,
            animationDelay: heart.delay,
            fontSize: heart.fontSize,
          }}
        >
          ❤️ {/* Using emoji for simplicity, but you can use CSS shapes too */}
        </div>
      ))}
    </div>
  );
};

export default AnimatedBackground;