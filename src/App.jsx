import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Analytics } from '@vercel/analytics/react';
import Bee1 from './assets/Bee1.jpg';
import Bee2 from './assets/Bee2.jpg';
import IMG_0337 from './assets/IMG_0337.jpg';
import IMG_0338 from './assets/IMG_0338.jpg';
import IMG_1307 from './assets/IMG_1307.jpg';
import IMG_2761 from './assets/IMG_2761.jpg';
import IMG_2772 from './assets/IMG_2772.jpg';
import IMG_3047 from './assets/IMG_3047.JPG';
import IMG_7929 from './assets/IMG_7929.JPG';
import IMG_8618 from './assets/IMG_8618.jpg';
import WhatsApp1 from './assets/WhatsApp Image 2026-02-13 at 11.46.14 AM.jpeg';
import WhatsApp2 from './assets/WhatsApp Image 2026-02-13 at 11.46.14 AM (2).jpeg';
import WhatsApp3 from './assets/WhatsApp Image 2026-02-13 at 11.46.14 AM (3).jpeg';
import WhatsApp4 from './assets/WhatsApp Image 2026-02-13 at 11.46.14 AM (4).jpeg';

const App = () => {
  const [showModal, setShowModal] = useState(null);
  const [finalClicked, setFinalClicked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showFloatingHearts, setShowFloatingHearts] = useState(false);
  const audioRef = useRef(null);

  // Floating hearts configuration
  const floatingHearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
    size: 1 + Math.random() * 1.5,
  }));

  // Slideshow images
  const slideImages = [
    Bee1,
    Bee2,
    IMG_0337,
    IMG_0338,
    IMG_1307,
    IMG_2761,
    IMG_2772,
    IMG_3047,
    IMG_7929,
    IMG_8618,
    WhatsApp1,
    WhatsApp2,
    WhatsApp3,
    WhatsApp4,
  ];

  // Cycle through slideshow images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slideImages.length]);

  // Heart pulse animation for "You Knew Everything"
  const heartRef = useRef(null);
  const heartInView = useInView(heartRef, { once: false });
  const heartControls = useAnimation();

  useEffect(() => {
    if (heartInView) {
      heartControls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
      });
    } else {
      heartControls.stop();
    }
  }, [heartInView, heartControls]);

  // Text reveal animation
  const textReveal = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } },
  };

  // Typewriter component for typing animation
  const TypewriterText = ({ text, delay = 0, style = {} }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const textRef = useRef(null);

    // Check if element is in viewport
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.1 }
      );
      if (textRef.current) {
        observer.observe(textRef.current);
      }
      return () => observer.disconnect();
    }, []);

    useEffect(() => {
      if (!isVisible) return;

      let currentIndex = 0;
      const startTimeout = setTimeout(() => {
        const interval = setInterval(() => {
          if (currentIndex <= text.length) {
            setDisplayedText(text.slice(0, currentIndex));
            currentIndex++;
          } else {
            clearInterval(interval);
          }
        }, 40);

        return () => clearInterval(interval);
      }, delay * 1000);

      return () => clearTimeout(startTimeout);
    }, [isVisible, text, delay]);

    // Cursor blink effect
    useEffect(() => {
      if (!isVisible) return;
      const cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 530);
      return () => clearInterval(cursorInterval);
    }, [isVisible]);

    return (
      <p ref={textRef} style={{ ...style, minHeight: '1.5em' }}>
        {displayedText}
        {isVisible && <span style={{ opacity: showCursor ? 1 : 0, marginLeft: '2px' }}>|</span>}
      </p>
    );
  };

  // Emotional pause timing for "You Knew Everything"
  const pauseLines = [
    "You knew my past.",
    "You knew my struggles.",
    "You knew my weaknesses.",
  ];

  // Modal content
  const modals = {
    'Your Heart': "You care deeply.\nYou feel deeply.\nAnd you love without pretending.",
    'Your Strength': "You have endured things and still remain soft.\nThat balance amazes me.",
    'Your Loyalty': "The way you never used what you know about me as a weapon…\nThat told me everything about your character.",
    'The Way You Love Me': "You love me in a way that feels safe.\nAnd I did not know how much I needed that until I met you.",
  };

const handleFinalClick = () => {
    setFinalClicked(true);
    setShowFloatingHearts(true);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    // Optional: audioRef.current.play();
  };

  const handlePlayAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
<div style={{ backgroundColor: '#FAF6F2', backgroundImage: 'linear-gradient(135deg, rgba(255,220,235,0.88) 0%, rgba(255,240,250,0.85) 50%, rgba(255,220,235,0.88) 100%), url(' + Bee1 + ')', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', color: '#2B2B2B', fontFamily: 'Playfair Display, serif', fontWeight: 500, padding: '20px', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={textReveal}
        style={{ textAlign: 'center', padding: '50px 0' }}
      >
        <h1>Hi Abisinuola Ebun Fakinlede❤️…</h1>
        <p>I built this for you.</p>
        <p>Because one year with you deserves more than just a message.</p>
        <motion.button
          whileTap={{ scale: 1.04 }}
          style={{ backgroundColor: '#D8A7B1', color: '#2B2B2B', border: 'none', padding: '10px 20px', borderRadius: '5px', marginTop: '20px' }}
        >
          Tap to Begin
        </motion.button>
      </motion.section>

      {/* One Year Ago */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={textReveal}
        style={{ padding: '50px 0' }}
      >
        <h2>One Year Ago</h2>
        <p>One year ago, I did not know that loving you would change me.</p>
        <p>I did not know that I would find someone who sees all of me —</p>
        <p>the strength, the flaws, the fears, the dreams —</p>
        <p>and still chooses to stay.</p>
        <p>But here we are.</p>
        <p>One year later.</p>
        <p>And I am still choosing you.</p>
      </motion.section>

      {/* You Knew Everything */}
      <motion.section
        ref={heartRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={textReveal}
        style={{ padding: '50px 0', position: 'relative' }}
      >
        <motion.div
          animate={heartControls}
          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.05, fontSize: '100px' }}
        >
          ❤️
        </motion.div>
        <h2>You Knew Everything</h2>
        <p>You saw the parts of me I do not show the world.</p>
        {pauseLines.map((line, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.3 + 0.5, duration: 0.8 }}
          >
            {line}
          </motion.p>
        ))}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          And not once…
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 2.3, duration: 0.8 }}
        >
          Not even once…
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 3.3, duration: 0.8 }}
        >
          Did you use any of it against me.
        </motion.p>
        <p>That meant more to me than you will ever fully understand.</p>
        <p>In a world where people weaponize vulnerability,</p>
        <p>you protected mine.</p>
        <p>That is love.</p>
        <p>And I will never forget it.</p>
      </motion.section>

      {/* Thank You For Staying */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={textReveal}
        style={{ padding: '50px 0', position: 'relative', background: 'radial-gradient(circle, rgba(216,167,177,0.03) 0%, transparent 70%)' }}
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.03, 0.05, 0.03] }}
          transition={{ duration: 6, repeat: Infinity }}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle, rgba(216,167,177,0.05) 0%, transparent 70%)' }}
        />
        <h2>Thank You For Staying</h2>
        <p>You stayed.</p>
        <p>Not because you had to.</p>
        <p>Not because it was easy.</p>
        <p>But because you wanted to.</p>
        <p>Thank you for loving me while I was still growing.</p>
        <p>Thank you for being patient with me.</p>
        <p>Thank you for believing in who I am becoming.</p>
        <p>Loving you means a lot to me.</p>
        <p>Being loved by you means even more.</p>
      </motion.section>

      {/* Reasons I Choose You */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={textReveal}
        style={{ padding: '50px 0' }}
      >
        <h2>Reasons I Choose You</h2>
        {Object.keys(modals).map((key) => (
          <motion.button
            key={key}
            whileTap={{ scale: 1.04, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
            onClick={() => setShowModal(key)}
            style={{ display: 'block', backgroundColor: '#D8A7B1', color: '#2B2B2B', border: 'none', padding: '10px 20px', borderRadius: '5px', margin: '10px 0', width: '100%' }}
          >
            {key}
          </motion.button>
        ))}
      </motion.section>

      {/* Modal */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: 20 }}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}
          onClick={() => setShowModal(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8, y: 20 }}
            style={{ backgroundColor: '#FAF6F2', padding: '20px', borderRadius: '10px', maxWidth: '80%', textAlign: 'center' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>{showModal}</h3>
            <p style={{ whiteSpace: 'pre-line' }}>{modals[showModal]}</p>
            <button onClick={() => setShowModal(null)} style={{ backgroundColor: '#D8A7B1', color: '#2B2B2B', border: 'none', padding: '10px 20px', borderRadius: '5px' }}>Close</button>
          </motion.div>
        </motion.div>
      )}

      {/* What This Year Taught Me */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={textReveal}
        style={{ padding: '50px 0' }}
      >
        <h2>What This Year Taught Me</h2>
        <p>This year taught me that love is not loud.</p>
        <p>It is steady.</p>
        <p>It is not about perfection.</p>
        <p>It is about choosing each other even when things are not perfect.</p>
        <p>And I choose you.</p>
        <p>Again.</p>
        <p>And again.</p>
        <p>And again.</p>
      </motion.section>

      {/* New Section: Listen to This While Alone */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={textReveal}
        style={{ padding: '50px 0', textAlign: 'center' }}
      >
        <h2>Listen to This While Alone</h2>
        <p>Take a moment for yourself.</p>
        <p>Find a quiet place, close your eyes, and listen.</p>
        <p>This is just for you.</p>
        <motion.button
          whileTap={{ scale: 1.04 }}
          onClick={handlePlayAudio}
          style={{ backgroundColor: '#D8A7B1', color: '#2B2B2B', border: 'none', padding: '10px 20px', borderRadius: '5px', marginTop: '20px' }}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </motion.button>
      </motion.section>

      {/* Final Valentine Ask */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={textReveal}
        style={{ padding: '50px 0', textAlign: 'center' }}
      >
        <h2>Final Valentine Ask</h2>
        <p>So today…</p>
        <p>I am not just saying Happy Valentine’s Day.</p>
        <p>I am saying thank you.</p>
        <p>Thank you for knowing me.</p>
        <p>Thank you for protecting me.</p>
        <p>Thank you for loving me.</p>
        <p>Will you be my Valentine…</p>
        <p>again?</p>
        <motion.button
          whileTap={{ scale: 1.04 }}
          onClick={handleFinalClick}
          style={{ backgroundColor: '#D8A7B1', color: '#2B2B2B', border: 'none', padding: '10px 20px', borderRadius: '5px', marginTop: '20px' }}
        >
          Yes, Always
        </motion.button>
        {finalClicked && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: '20px', background: 'radial-gradient(circle, rgba(216,167,177,0.1) 0%, transparent 70%)', padding: '20px', borderRadius: '10px' }}
          >
            <p>One year down.</p>
            <p>Forever to go.</p>
          </motion.div>
        )}
      </motion.section>

      {/* Final Section: You Stayed */}
      <section
        style={{
          position: 'relative',
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '50px 20px',
          overflow: 'hidden',
        }}
      >
        {/* Slideshow Background */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          {slideImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: currentSlide === index ? 1 : 0 }}
              transition={{ duration: 2 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          ))}
          {/* Gradient Overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(180deg, rgba(43,43,43,0.7) 0%, rgba(43,43,43,0.85) 100%)',
            }}
          />
        </div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: '#FAF6F2' }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            style={{ fontSize: '1.5rem', fontFamily: 'Playfair Display, serif', marginBottom: '30px', fontStyle: 'italic' }}
          >
            You stayed when you did not have to.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 3 }}
            style={{ fontSize: '1.5rem', fontFamily: 'Playfair Display, serif', marginBottom: '30px', fontStyle: 'italic' }}
          >
            You loved me when I was not easy to love.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 5.5 }}
            style={{ fontSize: '1.5rem', fontFamily: 'Playfair Display, serif', marginBottom: '30px', fontStyle: 'italic' }}
          >
            And I do not take that for granted.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 7 }}
            style={{ fontSize: '1.5rem', fontFamily: 'Playfair Display, serif', marginBottom: '30px', fontStyle: 'italic' }}
          >
            Thank you for your patience.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 8.5 }}
            style={{ fontSize: '1.5rem', fontFamily: 'Playfair Display, serif', marginBottom: '30px', fontStyle: 'italic' }}
          >
            I do not take you for granted.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 10 }}
            style={{ fontSize: '1.5rem', fontFamily: 'Playfair Display, serif', marginBottom: '30px', fontStyle: 'italic' }}
          >
            I do not take your heart lightly.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 11.5 }}
            style={{ fontSize: '1.5rem', fontFamily: 'Playfair Display, serif', marginBottom: '30px', fontStyle: 'italic' }}
          >
            And I am grateful,
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 13 }}
            style={{ fontSize: '1.5rem', fontFamily: 'Playfair Display, serif', marginBottom: '30px', fontStyle: 'italic' }}
          >
            deeply grateful,
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 14.5 }}
            style={{ fontSize: '1.5rem', fontFamily: 'Playfair Display, serif', marginBottom: '30px', fontStyle: 'italic' }}
          >
            that I get to love you.
          </motion.p>
          
          {/* Decorative heart element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 0.8, scale: 1 }}
            transition={{ duration: 2, delay: 8 }}
            style={{ fontSize: '3rem', marginTop: '40px' }}
          >
            ❤️
          </motion.div>
        </div>
      </section>

      {/* Audio Element */}
      <audio ref={audioRef} src="/beeaudio.mp3" preload="none" onEnded={() => setIsPlaying(false)} />
      <Analytics />
    </div>
  );
};

export default App;
