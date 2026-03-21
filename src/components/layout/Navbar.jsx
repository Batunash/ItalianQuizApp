export const Navbar = ({ currentView, setView }) => {
  return (
    <div className="nav-tabs">
      <button 
        className={`nav-tab ${currentView === 'home' ? 'active' : ''}`}
        onClick={() => setView('home')}
      >
        Anasayfa (Home)
      </button>
      <button 
        className={`nav-tab ${currentView === 'grammar' ? 'active' : ''}`}
        onClick={() => setView('grammar')}
      >
        Gramer (Grammatica)
      </button>
      <button 
        className={`nav-tab ${currentView === 'vocabulary' ? 'active' : ''}`}
        onClick={() => setView('vocabulary')}
      >
        Kelime (Vocabolario)
      </button>
      <button 
        className={`nav-tab ${currentView === 'exam' ? 'active' : ''}`}
        onClick={() => setView('exam')}
      >
        Genel Sınav (Esame)
      </button>
    </div>
  );
};
