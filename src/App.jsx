import { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Home } from './components/Home';
import { LessonView } from './components/lessons/LessonView';
import { QuizView } from './components/quiz/QuizView';
import { ExamView } from './components/quiz/ExamView';
import { grammarData } from './data/grammarData';
import { vocabularyData } from './data/vocabularyData';

function App() {
  const [currentView, setView] = useState('home'); // home, grammar, vocabulary, lesson, quiz
  const [activeTopicId, setActiveTopicId] = useState(null);
  const [activeTopicType, setActiveTopicType] = useState(null); // 'grammar' or 'vocabulary'

  const navigate = (view) => {
    setView(view);
    if(view === 'home' || view === 'grammar' || view === 'vocabulary') {
      setActiveTopicId(null);
    }
  };

  const startQuiz = (topicId, type) => {
    setActiveTopicId(topicId);
    setActiveTopicType(type);
    setView('quiz');
  };

  const openLesson = (topicId, type) => {
    setActiveTopicId(topicId);
    setActiveTopicType(type);
    setView('lesson');
  };

  const renderContent = () => {
    if (currentView === 'home') {
      return <Home setView={navigate} />;
    }
    if (currentView === 'grammar') {
      return (
        <div className="animate-fade-in grid-cards">
          {grammarData.map(topic => (
            <div key={topic.id} className="glass-panel">
              <h3 className="gradient-text" style={{fontSize: '1.5rem'}}>{topic.title}</h3>
              <p style={{marginBottom: '1.5rem', color: 'var(--text-secondary)'}}>{topic.description}</p>
              <div style={{display: 'flex', gap: '0.8rem', flexDirection: 'column'}}>
                <button className="btn" onClick={() => openLesson(topic.id, 'grammar')}>Dersi Oku</button>
                <button className="btn btn-secondary btn-success" onClick={() => startQuiz(topic.id, 'grammar')}>Quiz'e Başla</button>
              </div>
            </div>
          ))}
        </div>
      );
    }
    if (currentView === 'vocabulary') {
      return (
        <div className="animate-fade-in grid-cards">
          {vocabularyData.map(topic => (
            <div key={topic.id} className="glass-panel">
              <h3 className="gradient-text" style={{fontSize: '1.5rem'}}>{topic.title}</h3>
              <div style={{display: 'flex', gap: '0.8rem', flexDirection: 'column', marginTop: '1.5rem'}}>
                <button className="btn" onClick={() => openLesson(topic.id, 'vocabulary')}>Kelimeleri Çalış</button>
                <button className="btn btn-secondary btn-success" onClick={() => startQuiz(topic.id, 'vocabulary')}>Quiz'e Başla</button>
              </div>
            </div>
          ))}
        </div>
      );
    }
    if (currentView === 'lesson') {
      const data = activeTopicType === 'grammar' ? grammarData : vocabularyData;
      const topic = data.find(t => t.id === activeTopicId);
      return <LessonView topic={topic} type={activeTopicType} onBack={() => navigate(activeTopicType)} onQuiz={() => startQuiz(topic.id, activeTopicType)} />;
    }
    if (currentView === 'quiz') {
      const data = activeTopicType === 'grammar' ? grammarData : vocabularyData;
      const topic = data.find(t => t.id === activeTopicId);
      return <QuizView topic={topic} onBack={() => navigate(activeTopicType)} onLesson={() => openLesson(topic.id, activeTopicType)} />;
    }
    if (currentView === 'exam') {
      return <ExamView onBack={() => navigate('home')} />;
    }
  };

  return (
    <div className="app-container">
      <header className="header animate-fade-in">
        <h1 className="gradient-text">Impara L'Italiano</h1>
        <p>İtalyanca Öğrenme ve Test Uygulaması</p>
      </header>
      
      {currentView !== 'lesson' && currentView !== 'quiz' && currentView !== 'exam' && (
        <Navbar currentView={currentView} setView={navigate} />
      )}

      <main>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
