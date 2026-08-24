import { useState } from 'react';
import NavBar from './components/NavBar';
import HallgatoCard from './components/HallgatoCard';
import HallgatoTable from './components/HallgatoTable';
import { MockData } from './data/MockData.js';

function App() {
    const [viewMode, setViewMode] = useState('grid'); 

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <NavBar />
            
            <main className="flex-grow max-w-7xl mx-auto p-6 w-full">
                
                {/* Fejléc*/}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <h2 className="text-2xl font-bold text-gray-800">Hallgatók listája</h2>
                    
                    {/* Nézetváltó*/}
                    <div className="join bg-base-100 shadow-sm border border-base-200">
                        <button 
                            className={`join-item btn btn-sm ${viewMode === 'grid' ? 'btn-neutral' : 'btn-ghost'}`}
                            onClick={() => setViewMode('grid')}
                        >
                            Kártyák
                        </button>
                        <button 
                            className={`join-item btn btn-sm ${viewMode === 'table' ? 'btn-neutral' : 'btn-ghost'}`}
                            onClick={() => setViewMode('table')}
                        >
                            Táblázat
                        </button>
                    </div>
                </div>
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {MockData.map((hallgato) => (
                            <HallgatoCard 
                                key={hallgato.id}
                                nev={hallgato.nev}
                                szak={hallgato.szak}
                                cegnev={hallgato.cegnev}
                                status={hallgato.status}
                            />
                        ))}
                    </div>
                ) : (
                    <HallgatoTable adat={MockData} />
                )}

            </main>
        </div>
    );
}

export default App;