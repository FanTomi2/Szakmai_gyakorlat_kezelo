import { useState } from 'react';
import NavBar from './components/NavBar';
import HallgatoCard from './components/HallgatoCard';
import HallgatoTable from './components/HallgatoTable';
import LoginPage from './Pages/LoginPage.jsx';
import { MockData } from './data/MockData.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [viewMode, setViewMode] = useState('grid'); 
    const [showToast, setShowToast] = useState(false);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setShowToast(true);
        
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    };

    if (!isLoggedIn) {
        return (
            <>
                {showToast && (
                    <div className="toast toast-top toast-center z-50">
                        <div className="alert alert-success shadow-sm text-white font-bold flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>Sikeresen kijelentkezett!</span>
                        </div>
                    </div>
                )}
                <LoginPage onLogin={() => { setIsLoggedIn(true); setShowToast(false); }} />
            </>
        );
    }
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <NavBar onLogout = { handleLogout } />
            
            <main className="flex-grow max-w-7xl mx-auto p-6 w-full">
                
                {/* Fejléc*/}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <h2 className="text-2xl font-bold text-gray-800">Hallgatók listája</h2>
                    
                    {/* Nézetváltó*/}
                    <div className="join bg-blue-100 shadow-sm border border-base-200">
                        <button 
                            className={`join-item btn btn-sm ${viewMode === 'grid' ? 'btn-neutral bg-blue-800' : 'btn-ghost'}`}
                            onClick={() => setViewMode('grid')}
                        >
                            Kártyák
                        </button>
                        <button 
                            className={`join-item btn btn-sm ${viewMode === 'table' ? 'btn-neutral bg-blue-800' : 'btn-ghost'}`}
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