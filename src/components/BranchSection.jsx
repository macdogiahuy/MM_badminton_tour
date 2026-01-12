
import MatchList from './MatchList';
import StandingsTable from './StandingsTable';

const BranchSection = ({ branch, results, updateResults }) => {
  return (
    <section className="mb-12 animate-in transition-all duration-500">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-2 h-8 bg-yellow-400 rounded shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div>
        <h2 className="text-2xl font-bold text-white tracking-wide">
          {branch.name} 
          <span className="text-sm font-normal text-gray-400 ml-3 bg-white/10 px-2 py-1 rounded-full">
            {branch.matches?.length || 0} trận
          </span>
        </h2>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="flex flex-col">
          <StandingsTable branch={branch} results={results} />
        </div>
        <div className="flex flex-col">
          <MatchList 
            matches={branch.matches} 
            teams={branch.teams} 
            results={results} 
            onScoreUpdate={updateResults} 
          />
        </div>
      </div>
    </section>
  );
};

export default BranchSection;
