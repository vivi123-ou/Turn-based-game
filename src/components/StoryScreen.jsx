import React, { useState, useEffect, useRef } from 'react';

const StoryScreen = ({ levelId, onComplete, onSkip }) => {
  const [currentText, setCurrentText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [showSkipButton, setShowSkipButton] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const completeCalled = useRef(false);

  const stories = {
    1: {
      title: 'Level 1: Basic Training',
      texts: [
        'Year 2145. Earth is under alien invasion.',
        'You are Commander of the last Tank Brigade.',
        'Your mission: Defend humanity at all costs.',
        'Let\'s start with basic training...',
      ],
      image: '🌍',
    },
    2: {
      title: 'Level 2: First Contact',
      texts: [
        'Well done, Commander!',
        'Enemy scouts have been detected nearby.',
        'This is your first real combat.',
        'Show them what you\'re made of!',
      ],
      image: '👾',
    },
    3: {
      title: 'Level 3: Urban Warfare',
      texts: [
        'The aliens are advancing to the cities.',
        'Civilians are counting on you.',
        'Urban combat is intense and dangerous.',
        'Stay focused and protect the city!',
      ],
      image: '🏙️',
    },
    4: {
      title: 'Level 4: Desert Storm',
      texts: [
        'Intelligence reports heavy enemy presence in the desert.',
        'This will be your toughest battle yet.',
        'The aliens are stronger and smarter.',
        'Give it everything you\'ve got!',
      ],
      image: '🏜️',
    },
    5: {
      title: 'Level 5: Final Stand',
      texts: [
        'This is it, Commander.',
        'The alien mothership has arrived.',
        'Defeat it, and Earth is saved.',
        'Fail, and humanity falls.',
        'The fate of the world is in your hands!',
      ],
      image: '🛸',
    },
  };

  const story = stories[levelId] || stories[1];

  // useEffect 1: Reset khi level thay đổi
  useEffect(() => {
    setIsReady(false);
    setCurrentText('');
    setTextIndex(0);
    setShowSkipButton(false);
    completeCalled.current = false;
    
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, [levelId]);

  // useEffect 2: Chạy animation text
  useEffect(() => {
    if (!isReady) return;
    
    if (textIndex < story.texts.length) {
      const text = story.texts[textIndex];
      let charIndex = 0;
      
      setShowSkipButton(true);
      
      const typeInterval = setInterval(() => {
        if (charIndex <= text.length) {
          setCurrentText(text.substring(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typeInterval);
          // Chờ 1s rồi chuyển sang text tiếp theo
          setTimeout(() => {
            setTextIndex(prev => prev + 1);
          }, 1000);
        }
      }, 50);
      
      return () => clearInterval(typeInterval);
      
    } else if (textIndex === story.texts.length && textIndex > 0) {
      const timer = setTimeout(() => {
        if (!completeCalled.current) {
          completeCalled.current = true;
          setIsReady(false);
          onComplete();
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [textIndex, isReady, story.texts, onComplete]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      padding: '40px',
      position: 'relative',
    }}>
      <div style={{
        fontSize: '120px',
        marginBottom: '40px',
        animation: 'float 3s ease-in-out infinite',
      }}>
        {story.image}
      </div>

      <h1 style={{
        fontSize: '48px',
        marginBottom: '40px',
        textAlign: 'center',
        color: 'white',
      }}>
        {story.title}
      </h1>

      <div style={{
        maxWidth: '800px',
        minHeight: '150px',
        fontSize: '28px',
        textAlign: 'center',
        lineHeight: '1.8',
        padding: '30px',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: '16px',
        animation: 'fadeIn 1s',
        color: 'white',
      }}>
        {currentText}
      </div>

      <div style={{
        marginTop: '40px',
        fontSize: '14px',
        opacity: 0.6,
        color: 'white',
      }}>
        {textIndex} / {story.texts.length}
      </div>

      {showSkipButton && (
        <button
          onClick={onSkip}
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '40px',
            padding: '12px 24px',
            fontSize: '18px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: '2px solid white',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s',
          }}
          onMouseOver={e => e.target.style.backgroundColor = 'rgba(255,255,255,0.3)'}
          onMouseOut={e => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
        >
          Skip →
        </button>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default StoryScreen;