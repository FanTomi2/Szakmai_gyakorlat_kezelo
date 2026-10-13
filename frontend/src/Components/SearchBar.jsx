import { useState, useRef, useEffect } from 'react';

function SearchBar({ keresoszoveg, onKereses }) {
    const [nyitva, setNyitva] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (nyitva && inputRef.current) {
            inputRef.current.focus();
        }
    }, [nyitva]);

    const handleBezaras = () => {
        setNyitva(false);
        onKereses('');
    };

    return (
        <div className="flex items-center justify-end w-full mb-6 h-12">
            <div 
                // A 'w-full' fixen itt van, és a 'max-w' (maximális szélesség) animálódik a szétugrás elkerülése végett
                className={`flex items-center bg-white rounded-xl transition-all duration-200 ease-in-out overflow-hidden w-full ${
                    nyitva 
                        ? 'max-w-md shadow-md border border-blue-300' 
                        : 'max-w-[3rem] shadow-sm border border-gray-200 hover:bg-gray-50'
                }`}
            >
            
            {/* flex-shrink-0 hozzáadva, hogy a gomb ne torzuljon / laposodjon el összecsukáskor */}
            <button 
                type="button"
                onClick={() => setNyitva(true)}
                className={`flex-shrink-0 flex items-center justify-center h-12 w-12 text-gray-500 transition-colors ${
                    nyitva ? 'cursor-default' : 'hover:text-blue-600 cursor-pointer'
                }`}
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </button>
            
            <input
                ref={inputRef}
                type="text"
                // A w-full itt fix, a tartó div max-width-je fogja összenyomni láthatatlanra
                className={`outline-none bg-transparent transition-all duration-300 text-gray-700 h-full w-full ${
                    nyitva ? 'px-2 opacity-100' : 'px-0 opacity-0'
                }`}
                placeholder="Keresés"
                value={keresoszoveg}
                onChange={(e) => onKereses(e.target.value)}
            />
            
            {nyitva && (
                <button
                    type="button"
                    onClick={handleBezaras}
                    className="flex-shrink-0 flex items-center justify-center h-12 w-12 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            )}
            </div>
        </div>
    );
}

export default SearchBar;