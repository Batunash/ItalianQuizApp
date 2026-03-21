export const Home = ({ setView }) => {
  return (
    <div className="glass-panel animate-fade-in text-center flex-center" style={{flexDirection: 'column', minHeight: '50vh'}}>
      <h2 className="gradient-text" style={{fontSize: '3rem', marginBottom: '1.5rem'}}>
        Benvenuto! / Hoş Geldiniz!
      </h2>
      <p style={{fontSize: '1.25rem', marginBottom: '2.5rem', maxWidth: '700px', color: 'var(--text-secondary)'}}>
        Bu uygulama ile İtalyancanın temel gramer yapılarını ve en çok kullanılan kelimeleri kolayca öğrenebilir, ardından kendinizi quizler ile test edebilirsiniz.
      </p>
      <div style={{display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center'}}>
        <button className="btn" onClick={() => setView('grammar')}>
          Gramer Öğrenmeye Başla
        </button>
        <button className="btn btn-secondary" onClick={() => setView('vocabulary')}>
          Kelime Dağarcığını Geliştir
        </button>
      </div>
    </div>
  );
};
