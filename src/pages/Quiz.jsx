import { useState } from 'react';
import { OrnateFrame } from '../app/components/OrnateFrame';
import { GoldButton } from '../app/components/GoldButton';
import '../styles/quiz.css';

const FRAGMENTS = [
  {
    id: 'anxiety',
    emotion: 'Ansiedade',
    fragrance: "L'Eclat Bleu",
    notes: 'Butterfly Pea, Bergamota',
    family: 'Aquatic Citric',
    color: '#4a8fb5',
    image: 'blue-vial.png',
  },
  {
    id: 'focus',
    emotion: 'Foco',
    fragrance: 'Energie Verte',
    notes: 'Pitanga, White Tea',
    family: 'Citric Vibrant',
    color: '#4a9e5a',
    image: 'green-vial.png',
  },
  {
    id: 'sadness',
    emotion: 'Tristeza',
    fragrance: 'Soie de Paix',
    notes: 'Osmanthus, Chamomile',
    family: 'Floral Velvety',
    color: '#8a6aaa',
    image: 'purple-vial.png',
  },
  {
    id: 'confidence',
    emotion: 'Autoconfiança',
    fragrance: 'Racine de Force',
    notes: 'Ginger, Cardamom',
    family: 'Spicy Modern',
    color: '#b06a30',
    image: 'orange-vial.png',
  },
  {
    id: 'stress',
    emotion: 'Estresse',
    fragrance: 'Equilibre Zen',
    notes: 'Matcha, Sandalwood',
    family: 'Woody Earthy',
    color: '#5a8a60',
    image: 'teal-vial.png',
  },
  {
    id: 'restoration',
    emotion: 'Restauração',
    fragrance: 'Brume de Nuit',
    notes: 'Valerian, Lavender',
    family: 'Herbal Deep',
    color: '#5a4a8a',
    image: 'deep-purple-vial.png',
  },
  {
    id: 'inspiration',
    emotion: 'Inspiração',
    fragrance: "Jasmin d'Eveil",
    notes: 'Sambac Jasmine, Fig',
    family: 'Floral Green Solar',
    color: '#7a8a3a',
    image: 'yellow-green-vial.png',
  },
];

const QUESTIONS = [
  {
    q: 'Como você se sente neste momento?',
    options: ['Ansiosa', 'Focada', 'Triste', 'Confiante'],
    emotions: ['anxiety', 'focus', 'sadness', 'confidence'],
  },
  {
    q: 'Qual é seu estado mental predominante?',
    options: ['Inquietude', 'Concentração', 'Melancolia', 'Segurança'],
    emotions: ['anxiety', 'focus', 'sadness', 'confidence'],
  },
  {
    q: 'O que você mais deseja agora?',
    options: ['Acalmar-me', 'Produzir', 'Processar emoções', 'Fortalecer'],
    emotions: ['stress', 'focus', 'sadness', 'confidence'],
  },
  {
    q: 'Seu corpo demanda?',
    options: ['Tranquilidade', 'Energia', 'Empatia', 'Motivação'],
    emotions: ['stress', 'focus', 'restoration', 'confidence'],
  },
  {
    q: 'Seu espírito busca?',
    options: ['Pausa', 'Criatividade', 'Compreensão', 'Criatividade'],
    emotions: ['restoration', 'inspiration', 'sadness', 'inspiration'],
  },
  {
    q: 'Em qual atmosfera você prospera?',
    options: ['Serena', 'Dinâmica', 'Reflexiva', 'Inspiradora'],
    emotions: ['stress', 'focus', 'sadness', 'inspiration'],
  },
  {
    q: 'Você está?',
    options: ['Tenso', 'Alerta', 'Pensativo', 'Motivado'],
    emotions: ['anxiety', 'focus', 'sadness', 'confidence'],
  },
  {
    q: 'O aroma ideal para você é?',
    options: ['Calmante', 'Estimulante', 'Consolador', 'Revigorante'],
    emotions: ['stress', 'focus', 'restoration', 'confidence'],
  },
  {
    q: 'Seu ritmo é?',
    options: ['Acelerado', 'Fluido', 'Contemplativo', 'Ascendente'],
    emotions: ['anxiety', 'focus', 'sadness', 'inspiration'],
  },
  {
    q: 'Qual perfume descreve você?',
    options: ['Aquático', 'Cítrico', 'Floral', 'Aromático'],
    emotions: ['anxiety', 'focus', 'sadness', 'inspiration'],
  },
];

export default function Quiz() {
  const [screen, setScreen] = useState('intro'); // 'intro', 'question', 'result'
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({});
  const [resultFragrance, setResultFragrance] = useState(null);

  const handleStart = () => {
    setScores({});
    setCurrentQuestion(0);
    setScreen('question');
  };

  const handleAnswer = (emotionId) => {
    setScores((prev) => ({
      ...prev,
      [emotionId]: (prev[emotionId] || 0) + 1,
    }));

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Determine result
      let maxEmotionId = Object.keys(scores)[0];
      let maxScore = 0;
      Object.entries(scores).forEach(([emotion, score]) => {
        if (score > maxScore) {
          maxScore = score;
          maxEmotionId = emotion;
        }
      });
      const fragrance = FRAGMENTS.find((f) => f.id === maxEmotionId);
      setResultFragrance(fragrance);
      setScreen('result');
    }
  };

  const handleRetry = () => {
    handleStart();
  };

  return (
    <article
      style={{
        maxWidth: '1120px',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingTop: '2rem',
        paddingBottom: '2rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
      }}
    >
      {screen === 'intro' && (
        <div
          style={{
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'center',
          }}
        >
          <OrnateFrame glow>
            <h1
              style={{
                marginBottom: '1rem',
                color: 'var(--color-gold)',
                fontSize: '2rem',
                letterSpacing: '0.15em',
              }}
            >
              Descobrir Meu Perfume
            </h1>
            <p
              style={{
                color: 'var(--foreground)',
                marginBottom: '2rem',
                fontSize: '1rem',
                lineHeight: '1.6',
              }}
            >
              Responda 10 perguntas simples e descubra qual fragrância Hidden Bloom combina com
              você. Nossa tecnologia Neuro-Sync analisa seus padrões emocionais para uma
              recomendação personalizada.
            </p>
            <GoldButton onClick={handleStart} style={{ padding: '1rem 2rem', fontSize: '0.9rem' }}>
              Começar Quiz
            </GoldButton>
          </OrnateFrame>
        </div>
      )}

      {screen === 'question' && (
        <div style={{ maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
          <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
            <div
              style={{
                color: 'var(--color-gold)',
                fontSize: '0.85rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
              }}
            >
              Pergunta {currentQuestion + 1} de {QUESTIONS.length}
            </div>
            <div
              style={{
                width: '100%',
                height: '4px',
                background: 'rgba(196, 162, 78, 0.15)',
                borderRadius: '2px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%`,
                  height: '100%',
                  background: 'linear-gradient(to right, var(--color-gold), #e0c878)',
                  transition: 'width 300ms ease',
                }}
              />
            </div>
          </div>

          <OrnateFrame glow>
            <h2
              style={{
                fontSize: '1.5rem',
                marginBottom: '2rem',
                color: 'var(--foreground)',
                textAlign: 'center',
              }}
            >
              {QUESTIONS[currentQuestion].q}
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem',
              }}
            >
              {QUESTIONS[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(QUESTIONS[currentQuestion].emotions[idx])}
                  style={{
                    background: 'rgba(196, 162, 78, 0.1)',
                    border: '2px solid rgba(196, 162, 78, 0.2)',
                    color: 'var(--foreground)',
                    padding: '1rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontFamily: 'Raleway, sans-serif',
                    fontSize: '0.95rem',
                    transition: 'all 300ms ease',
                    textAlign: 'center',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(196, 162, 78, 0.2)';
                    e.target.style.borderColor = 'rgba(196, 162, 78, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(196, 162, 78, 0.1)';
                    e.target.style.borderColor = 'rgba(196, 162, 78, 0.2)';
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </OrnateFrame>
        </div>
      )}

      {screen === 'result' && resultFragrance && (
        <div style={{ maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
          <OrnateFrame glow>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div
                style={{
                  background: resultFragrance.color,
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginBottom: '1rem',
                  opacity: 0.2,
                }}
              />
              <h1
                style={{ fontSize: '1.5rem', color: resultFragrance.color, marginBottom: '0.5rem' }}
              >
                {resultFragrance.emotion}
              </h1>
              <h2 style={{ fontSize: '1.8rem', color: 'var(--color-gold)', marginBottom: '1rem' }}>
                {resultFragrance.fragrance}
              </h2>
              <p
                style={{
                  color: 'var(--color-parchment)',
                  fontSize: '0.95rem',
                  marginBottom: '1rem',
                }}
              >
                {resultFragrance.family}
              </p>
              <p
                style={{
                  color: 'var(--muted-foreground)',
                  fontSize: '0.9rem',
                  marginBottom: '2rem',
                }}
              >
                Notas: {resultFragrance.notes}
              </p>
            </div>

            <div
              style={{
                marginBottom: '2rem',
                padding: '1rem',
                background: 'rgba(196, 162, 78, 0.05)',
                borderRadius: '4px',
                borderLeft: '3px solid var(--color-gold)',
              }}
            >
              <p style={{ color: 'var(--foreground)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Sua fragrância ideal foi selecionada com base em seus padrões neurológicos únicos.
                La Hidden Bloom harmoniza com seu estado emocional para criar um ritual de bem-estar
                personalizado.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <GoldButton style={{ padding: '0.85rem 1.5rem' }}>Comprar Refil</GoldButton>
              <GoldButton
                onClick={handleRetry}
                style={{
                  padding: '0.85rem 1.5rem',
                  background: 'transparent',
                  border: '1px solid var(--color-gold)',
                  color: 'var(--color-gold)',
                }}
              >
                Refazer Quiz
              </GoldButton>
            </div>
          </OrnateFrame>
        </div>
      )}
    </article>
  );
}
