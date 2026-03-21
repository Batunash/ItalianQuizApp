import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const LessonView = ({ topic, type, onBack, onQuiz }) => {
  const [viewMode, setViewMode] = useState('list'); // 'list' veya 'flashcard'
  const [cardIdx, setCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!topic) return null;

  let flashcards = [];
  if (type === 'vocabulary' && topic.content) {
    const lines = topic.content.split('\n');
    lines.forEach(line => {
      const match = line.match(/-\s*\*\*(.+?):\*\*\s*(.+)/);
      if (match) {
        flashcards.push({ front: match[1].trim(), back: match[2].trim() });
      }
    });
  }

  const nextCard = () => {
    setIsFlipped(false);
    if (cardIdx + 1 < flashcards.length) setCardIdx(cardIdx + 1);
  };

  const prevCard = () => {
    setIsFlipped(false);
    if (cardIdx > 0) setCardIdx(cardIdx - 1);
  };

  return (
    <div className="glass-panel animate-fade-in" style={{maxWidth: '800px', margin: '0 auto'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem'}}>
        <button className="btn btn-secondary" onClick={onBack}>← Geri Dön</button>
        <button className="btn btn-success" onClick={onQuiz}>Quiz'e Başla →</button>
      </div>

      <h2 className="gradient-text" style={{fontSize: '2.5rem', marginBottom: '1rem'}}>{topic.title}</h2>
      
      {type === 'vocabulary' && flashcards.length > 0 && (
        <div style={{display: 'flex', gap: '1rem', marginBottom: '2rem'}}>
          <button className={`btn ${viewMode === 'list' ? 'btn-success' : 'btn-secondary'}`} onClick={() => setViewMode('list')}>Liste Görünümü</button>
          <button className={`btn ${viewMode === 'flashcard' ? 'btn-success' : 'btn-secondary'}`} onClick={() => setViewMode('flashcard')}>Flashcard (Kelime Kartları)</button>
        </div>
      )}

      {viewMode === 'list' || type !== 'vocabulary' ? (
        <div className="lesson-content markdown-body" style={{fontSize: '1.1rem', lineHeight: '1.8'}}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{topic.content}</ReactMarkdown>
        </div>
      ) : (
        <div className="flashcard-container animate-fade-in">
          <div style={{textAlign: 'center', marginBottom: '1rem', color: 'var(--text-secondary)'}}>
            Kart {cardIdx + 1} / {flashcards.length}
          </div>
          <div 
            className="flashcard" 
            onClick={() => setIsFlipped(!isFlipped)}
            style={{
              padding: '3rem', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: isFlipped ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255,255,255,0.05)',
              border: isFlipped ? '2px solid var(--accent-blue)' : '1px solid var(--glass-border)',
              borderRadius: '12px', cursor: 'pointer', fontSize: '2.5rem', fontWeight: 'bold', transition: 'all 0.3s ease',
              textAlign: 'center'
            }}
          >
            {isFlipped ? flashcards[cardIdx].back : flashcards[cardIdx].front}
          </div>
          <p style={{textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)'}}>Çevirmek için karta tıklayın</p>
          
          <div style={{display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem'}}>
            <button className="btn btn-secondary" onClick={prevCard} disabled={cardIdx === 0}>Önceki</button>
            <button className="btn btn-secondary" onClick={nextCard} disabled={cardIdx === flashcards.length - 1}>Sonraki</button>
          </div>
        </div>
      )}
    </div>
  );
};
