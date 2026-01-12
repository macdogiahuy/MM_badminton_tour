import { useState } from 'react';
import BranchSection from './components/BranchSection';
import KnockoutBracket from './components/KnockoutBracket';
import { advancedGroups, basicGroups } from './data';

function App() {
  const [activeCategory, setActiveCategory] = useState('advanced'); // 'advanced' | 'basic'
  const [activeView, setActiveView] = useState('groups'); // 'groups' | 'playoff'
  const [results, setResults] = useState({});

  const groups = activeCategory === 'advanced' ? advancedGroups : basicGroups;

  const updateResults = (matchId, field, value) => {
    setResults(prev => {
        const matchRes = prev[matchId] || { score1: '', score2: '' };
        const newRes = { ...matchRes, [field]: value };
        
        // Auto-complete logic
        if (newRes.score1 !== '' && newRes.score2 !== '') {
            newRes.complete = true;
        } else {
            newRes.complete = false;
        }
        
        return {
            ...prev,
            [matchId]: newRes
        };
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans selection:bg-yellow-500 selection:text-black pb-20">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-yellow-500/10 rounded-full blur-3xl"></div>
      </div>

      <header className="relative z-10 container mx-auto pt-12 pb-8 text-center">
        <h1 className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-yellow-400 mb-2 drop-shadow-lg">
          MM BADMINTON 2025
        </h1>
        <p className="text-gray-400 text-lg">Giải đấu nội bộ - Tinh thần thể thao & Gắn kết</p>
      </header>

      {/* Navigation */}
      {/* Navigation */}
      <nav className="relative z-10 container mx-auto mb-12 flex flex-col items-center gap-8">
        {/* Category Selector */}
        <div className="flex p-1.5 bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-2xl">
            <button 
                onClick={() => setActiveCategory('advanced')}
                className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 ${activeCategory === 'advanced' ? 'bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
                <span>🔥</span>
                <span>Nâng Cao (A)</span>
            </button>
            <div className="w-px bg-slate-700/50 my-2 mx-1"></div>
            <button 
                onClick={() => setActiveCategory('basic')}
                className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 ${activeCategory === 'basic' ? 'bg-gradient-to-br from-yellow-500 to-yellow-600 text-black shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
                <span>🏸</span>
                <span>Cơ Bản (B)</span>
            </button>
        </div>

        {/* View Selector */}
        <div className="flex gap-1 border-b border-slate-700/50 px-8">
            <button 
                onClick={() => setActiveView('groups')}
                className={`px-6 py-4 border-b-2 transition-all font-semibold flex items-center gap-2 ${activeView === 'groups' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                Vòng Bảng
            </button>
            <button 
                onClick={() => setActiveView('playoff')}
                className={`px-6 py-4 border-b-2 transition-all font-semibold flex items-center gap-2 ${activeView === 'playoff' ? 'border-yellow-500 text-yellow-500' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
            >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                Vòng Playoff
            </button>
        </div>
      </nav>

      <main className="relative z-10 container mx-auto px-4">
        {activeView === 'groups' && (
            <div className="flex flex-col gap-12">
                {groups.map(branch => (
                    <BranchSection 
                        key={branch.id} 
                        branch={branch} 
                        results={results} 
                        updateResults={updateResults} 
                    />
                ))}
            </div>
        )}

        {activeView === 'playoff' && (
            <KnockoutBracket 
                category={activeCategory} 
                groups={groups} 
                results={results}
                updateResults={updateResults}
            />
        )}
      </main>
      
      <footer className="relative z-10 container mx-auto mt-20 text-center text-gray-500 border-t border-gray-800 pt-8">
        <p>&copy; {new Date().getFullYear()} MM Badminton Tournament. Built with ❤️.</p>
      </footer>
    </div>
  );
}

export default App;
