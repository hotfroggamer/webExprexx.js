// app/page.js (Homepage)

import AnimatedBackground from './components/AnimatedBackground';
import ImageSlider from './components/ImageSlider';

export default function HomePage() {
  return (
    <main style={{
      minHeight: '200vh', // Make the page scrollable (Feature 4)
      padding: '2rem',
      position: 'relative', // Needed for z-index context
      zIndex: 1,
    }}>

      {/* This will be in the background and fixed */}
      <AnimatedBackground />

      <header style={{ textAlign: 'center', padding: '3rem 0' }}>
        <h1 style={{ fontSize: '3.5rem', color: '#d63384', marginBottom: '0.5rem' }}>
          To My Dearest Love
        </h1>
        <p style={{ fontSize: '1.5rem', color: '#555' }}>
          A collection of our moments...
        </p>
      </header>

      {/* --- Image Slider Section (Feature 2) --- */}
      <section>
        <ImageSlider />
      </section>

      {/* Extra content to make the page scrollable */}
      <section style={{ 
        textAlign: 'center', 
        padding: '5rem 2rem', 
        marginTop: '5rem',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: '16px',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        backdropFilter: 'blur(4px)',
      }}>
        <h2 style={{ fontSize: '2.5rem', color: '#d63384' }}>Remember this?</h2>
        <p style={{ fontSize: '1.2rem', lineHeight: 1.6, maxWidth: '800px', margin: 'auto' }}>
          Here you can add some text, a poem, or another message. 
          Scrolling down reveals more of the beautiful heart background. 
          Each photo in the slider above can be clicked to see it larger and download it.
          <br/><br/>
          I hope you love this little gift.
        </p>
      </section>

    </main>
  );
}