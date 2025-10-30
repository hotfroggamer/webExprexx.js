'use client'; 

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Import Swiper components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const BACKEND_URL = 'http://localhost:5000';

export default function ImageSlider() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/images`)
      .then(res => res.json())
      .then(data => {
        setImages(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch images:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p style={{ textAlign: 'center', fontSize: '1.5rem' }}>Loading memories...</p>;
  }

  if (images.length === 0) {
    return <p style={{ textAlign: 'center', fontSize: '1.5rem' }}>No images found. Did you add photos to the backend/public/images folder?</p>;
  }

  return (
    // We set the height and center it.
    // The width will now be determined by the slide content (the auto-width image).
    <div style={{ 
      height: '500px', 
      margin: 'auto', 
      padding: '2rem 0',
      display: 'flex', // Use flex to center the swiper container
      justifyContent: 'center' // Center horizontally
    }}> 
      
      <Swiper
        modules={[Navigation, Pagination, Autoplay]} 
        spaceBetween={30} // Add some space for visual clarity
        
        // We still want only one slide visible
        slidesPerView={1} 
        
        grabCursor={true}
        centeredSlides={true}
        loop={false} 
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        className="mySwiper"

        // --- CHANGE 1: Swiper itself should be auto-width ---
        style={{ 
          height: '100%',
          width: 'auto' // Let the Swiper width shrink/grow with the slide
        }} 
      >
        {images.map((imageName) => (
          <SwiperSlide 
            key={imageName} 
            // --- CHANGE 2: Slide width is auto, based on content ---
            style={{ 
              borderRadius: '16px',
              overflow: 'hidden',
              width: 'auto', // <-- Let the slide width fit its content (the image)
              height: '100%', // Slide height fills the container
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* --- CHANGE: Added flex centering to the Link itself --- */}
            <Link href={`/download/${imageName}`} style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <img
                src={`${BACKEND_URL}/images/${imageName}`}
                alt={`Photo ${imageName}`}
                style={{ 
                  // --- CHANGE 3: The image defines the aspect ratio ---
                  objectFit: 'contain', // Show the whole image
                  width: 'auto', // <-- Width is auto, based on height and aspect ratio
                  height: '100%', // <-- Image height fills the 500px
                  transition: 'transform 0.3s ease',
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} 
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}


