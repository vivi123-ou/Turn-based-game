import React from 'react';

const CreditsScreen = ({ onClose }) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      padding: '40px',
    }}>
      <div style={{
        maxWidth: '600px',
        textAlign: 'center',
        animation: 'fadeIn 1s',
      }}>
        <h1 style={{ fontSize: '48px', marginBottom: '40px' }}>
          ⭐ CREDITS ⭐
        </h1>

        <div style={{
          backgroundColor: 'rgba(255,255,255,0.1)',
          padding: '30px',
          borderRadius: '16px',
          marginBottom: '30px',
        }}>
          <CreditItem title="Game Design & Development" name="Lê Quỳnh Minh Vân" />
          <CreditItem title="Programming" name="React + JavaScript" />
          <CreditItem title="Game Logic" name="Turn-Based Strategy System" />
          <CreditItem title="AI Logic" name="Smart Enemy Behavior" />
        </div>

        <p style={{ fontSize: '18px', marginBottom: '30px', opacity: 0.8 }}>
          Created with ❤️ using React
        </p>

        <button
          onClick={onClose}
          style={{
            padding: '15px 40px',
            fontSize: '20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
          }}
        >
          Back to Menu
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

const CreditItem = ({ title, name }) => (
  <div style={{ marginBottom: '20px' }}>
    <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '5px' }}>
      {title}
    </div>
    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
      {name}
    </div>
  </div>
);

export default CreditsScreen;