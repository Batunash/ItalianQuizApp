import { useState, useEffect } from 'react';
import { quizData } from '../../data/quizData';

export const ExamView = ({ onBack }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  
  // MCQ state
  const [selectedOption, setSelectedOption] = useState(null);

  // Open-ended state
  const [isOpenEnded, setIsOpenEnded] = useState(false);
  const [textInput, setTextInput] = useState('');

  // Shared state
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    startNewExam();
  }, []);

  const startNewExam = () => {
    const allQuestions = [];
    Object.values(quizData).forEach(topicArray => {
      allQuestions.push(...topicArray);
    });

    // Shuffle questions randomly
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    // Take 20 random questions
    setQuestions(shuffled.slice(0, 20));

    setCurrentQuestionIdx(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsAnswered(false);
    setTextInput('');
    setIsOpenEnded(Math.random() < 0.5);
  };

  if (questions.length === 0) {
    return <div className="text-center p-8">Sınav yükleniyor...</div>;
  }

  const handleOptionClick = (option) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    if (option === questions[currentQuestionIdx].answer) {
      setScore(score + 1);
    }
  };

  const handleSubmitOpenEnded = () => {
    if (isAnswered || !textInput.trim()) return;
    setIsAnswered(true);
    
    if (textInput.trim().toLowerCase() === questions[currentQuestionIdx].answer.toLowerCase()) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIdx + 1 < questions.length) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTextInput('');
      setIsOpenEnded(Math.random() < 0.5);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="glass-panel animate-fade-in text-center" style={{maxWidth: '600px', margin: '0 auto'}}>
        <h2 className="gradient-text" style={{fontSize: '2.5rem'}}>Genel Sınav Tamamlandı!</h2>
        <div className="pulse" style={{
          width: '150px', height: '150px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-purple) 100%)', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '2rem auto', fontSize: '3rem', fontWeight: 'bold'
        }}>
          {score} / {questions.length}
        </div>
        <p style={{fontSize: '1.2rem', marginBottom: '2rem'}}>
          Tüm konulardan rastgele seçilen bu sınavı başarıyla tamamladınız.
        </p>
        <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
          <button className="btn" onClick={startNewExam}>Yeni Sınav Başlat</button>
          <button className="btn btn-secondary" onClick={onBack}>Ana Menüye Dön</button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestionIdx];

  return (
    <div className="glass-panel animate-fade-in" style={{maxWidth: '700px', margin: '0 auto'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
        <button className="btn btn-secondary" style={{padding: '0.4rem 1rem'}} onClick={onBack}>← Çıkış</button>
        <div style={{textAlign: 'right'}}>
          <span style={{fontWeight: 'bold', color: 'var(--accent-pink)', display: 'block', fontSize: '1.2rem'}}>Genel Sınav Modülü</span>
          <span style={{fontWeight: 'bold', color: 'var(--text-secondary)'}}>Soru {currentQuestionIdx + 1} / {questions.length}</span>
        </div>
      </div>

      <h3 style={{fontSize: '1.8rem', marginBottom: '1.5rem'}}>{currentQ.question}</h3>

      {!isOpenEnded ? (
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem'}}>
          {currentQ.options.map((option, idx) => {
            let btnClass = "btn btn-secondary";
            if (isAnswered) {
              if (option === currentQ.answer) {
                btnClass = "btn btn-success";
              } else if (option === selectedOption) {
                btnClass = "btn";
              }
            }

            return (
              <button 
                key={idx} 
                className={btnClass}
                style={{
                  justifyContent: 'flex-start', padding: '1rem', fontSize: '1.1rem',
                  border: isAnswered && option === selectedOption && option !== currentQ.answer ? '2px solid var(--accent-red)' : ''
                }}
                onClick={() => handleOptionClick(option)}
                disabled={isAnswered}
              >
                <span style={{marginRight: '1rem', fontWeight: 'bold'}}>{String.fromCharCode(65 + idx)})</span> {option}
              </button>
            );
          })}
        </div>
      ) : (
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem'}}>
          <input 
            type="text" 
            style={{
              padding: '1rem', fontSize: '1.2rem', borderRadius: '8px', 
              border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.05)', 
              color: 'white', width: '100%'
            }}
            placeholder="Cevabınızı buraya yazın..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            disabled={isAnswered}
            onKeyDown={(e) => {if(e.key === 'Enter') handleSubmitOpenEnded()}}
            autoFocus
          />
          {!isAnswered && (
            <button className="btn btn-success" onClick={handleSubmitOpenEnded} disabled={!textInput.trim()}>
              Cevapla
            </button>
          )}
          
          {isAnswered && (
            <div className="animate-fade-in" style={{
              marginTop: '1rem', padding: '1rem', borderRadius: '8px', 
              background: textInput.trim().toLowerCase() === currentQ.answer.toLowerCase() ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
              border: `1px solid ${textInput.trim().toLowerCase() === currentQ.answer.toLowerCase() ? '#22c55e' : '#ef4444'}`
            }}>
              <p style={{marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '1.2rem'}}>
                {textInput.trim().toLowerCase() === currentQ.answer.toLowerCase() ? '✅ Doğru!' : '❌ Yanlış!'}
              </p>
              {textInput.trim().toLowerCase() !== currentQ.answer.toLowerCase() && (
                <p style={{fontSize: '1.1rem'}}>Doğru Cevap: <span style={{fontWeight: 'bold', color: '#4ade80'}}>{currentQ.answer}</span></p>
              )}
            </div>
          )}
        </div>
      )}

      {isAnswered && (
        <div className="animate-fade-in text-center mt-4" style={{marginTop: '2rem'}}>
          <button className="btn" style={{padding: '1rem 3rem', fontSize: '1.2rem'}} onClick={handleNext}>
            {currentQuestionIdx + 1 === questions.length ? 'Sonucu Gör' : 'Sıradaki Soru →'}
          </button>
        </div>
      )}
    </div>
  );
};
