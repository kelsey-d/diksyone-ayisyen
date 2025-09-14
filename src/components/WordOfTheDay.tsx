interface WordOfTheDayProps {
  onWordClick: (word: string) => void;
}

export function WordOfTheDay({ onWordClick }: WordOfTheDayProps) {
  const currentDate = new Date().toLocaleDateString('fr-HT', { 
    day: 'numeric',
    month: 'long', 
    year: 'numeric' 
  });

  const handleWordClick = () => {
    onWordClick('ocean'); // Search for the English word to show its dictionary entry
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Top section with date - black background with top rounded corners */}
      <div className="bg-black text-white px-6 py-4 rounded-t-[10px]">
        <p className="text-center text-sm">{currentDate}</p>
        <h2 className="text-center text-lg font-medium">mo jounen an</h2>
      </div>
      
      {/* Bottom section with word - light blue background with bottom rounded corners */}
      <div 
        className="bg-[#9CA6CA] text-[#001669] px-6 py-6 rounded-b-[10px] cursor-pointer hover:bg-[#8B9BC4] transition-colors"
        onClick={handleWordClick}
      >
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">lanmè → ocean</div>
        </div>
      </div>
    </div>
  );
}