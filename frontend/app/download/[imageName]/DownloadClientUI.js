'use client'; // This directive marks the component as a Client Component.

import Link from 'next/link';
import AnimatedBackground from '../../components/AnimatedBackground';

const BACKEND_URL = 'http://localhost:5000';

// This component receives 'imageName' as a simple string prop.
// It does not deal with 'params' directly.
export default function DownloadClientUI({ imageName }) {
  
  // Decode the image name
  const decodedImageName = decodeURIComponent(imageName);
  
  const imageUrl = `${BACKEND_URL}/images/${decodedImageName}`;
  const downloadUrl = `${BACKEND_URL}/api/download/${decodedImageName}`;

  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '2rem',
      position: 'relative',
      zIndex: 1,
    }}>
      <AnimatedBackground />

      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '16px',
        padding: '2rem',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        backdropFilter: 'blur(5px)',
        textAlign: 'center',
      }}>
        <h1 style={{ fontSize: '2rem', color: '#d63384' }}>{decodedImageName}</h1>
        
        {/* Image Preview (using <img> tag) */}
        <div style={{ margin: '2rem 0', position: 'relative', width: '80vw', maxWidth: '800px', height: '60vh' }}>
          <img
            src={imageUrl}
            alt={`Preview of ${decodedImageName}`}
            style={{ 
              objectFit: 'contain', 
              borderRadius: '8px', 
              width: '100%', 
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0
            }}
          />
        </div>

        {/* Download Button */}
        {/* Event handlers are allowed because this is a Client Component */}
        <a
          href={downloadUrl}
          download 
          style={{
            display: 'inline-block',
            padding: '1rem 2rem',
            fontSize: '1.2rem',
            color: '#fff',
            backgroundColor: '#d63384',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            transition: 'transform 0.2s ease, background-color 0.2s ease',
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Download This Memory ❤️
        </a>

        {/* Back to Home Link */}
        <div style={{ marginTop: '2rem' }}>
          <Link href="/" style={{ color: '#555', textDecoration: 'underline' }}>
            &larr; Back to gallery
          </Link>
        </div>
      </div>
    </main>
  );
}

