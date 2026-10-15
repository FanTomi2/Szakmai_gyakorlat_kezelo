import { useState, useEffect } from "react";
import NavBar from "./Components/NavBar.jsx";
import HallgatoTable from "./Components/HallgatoTable.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import HallgatoModal from "./Components/HallgatoModal.jsx";
import { fetchHallgatok } from "./services/hallgatoServices.js";
import UjHallgatoForm from "./Components/UjHallgatoForm.jsx";
import StatisztikaNezet from "./Components/StatisztikaNezet.jsx";
import SearchBar from "./Components/SearchBar.jsx";
import { letoltesCSV } from "./utils/exportUtils.js";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [selectedHallgato, setSelectedHallgato] = useState(null);
    const [hallgatok, setHallgatok] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mutatGomb, setMutatGomb] = useState(false);
    const [aktivNezet, setAktivNezet] = useState('lista');
    const [szerkesztendoHallgato, setSzerkesztendoHallgato] = useState(null);
    const [keresoszoveg, setKeresoszoveg] = useState('');

    useEffect(() => {
        const gorgetesFigyelo = () => {
            if(window.scrollY > 300) {
                setMutatGomb(true);
            } else {
                setMutatGomb(false);
            }
        };

        window.addEventListener('scroll', gorgetesFigyelo);
        return () => window.removeEventListener('scroll', gorgetesFigyelo);
    }, []);

    const tetejere = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const adatBetoltes = async () => {
        try {
            if (hallgatok.length === 0) {
                setLoading(true);
            }
            const data = await fetchHallgatok();
            setHallgatok(data);
        } catch (err) {
            setError('Sikertelen betöltés!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        adatBetoltes();
    }, []);

    const szurtHallgatok = hallgatok.filter((h) => {
        const nevTalalat = h.nev.toLowerCase().includes(keresoszoveg.toLowerCase());
        const neptunTalalat = h.neptunId.toLowerCase().includes(keresoszoveg.toLowerCase());
        const cegTalalt = h.cegNev.toLowerCase().includes(keresoszoveg.toLowerCase());
        return nevTalalat || neptunTalalat || cegTalalt;
    });

    const handleExportCSV = () => {
        const exportAdat = hallgatok.map(h => ({
            'Név': h.nev,
            'Neptun kód': h.neptunId,
            'Email': h.email,
            'Cég': h.cegNev || '-',
            'Kapcsolattartó': h.kapcsolattarto || '-',
            'Kar': h.kepzesek?.[0]?.karNev || '-',
            'Szak': h.kepzesek?.[0]?.szakNev || '-',
            'Félév': h.kepzesek?.[0]?.felevSzama || '-',
            'Képzési szint': h.kepzesek?.[0]?.kepzesiSzint || '-',
            'teljesítés': h.kepzesek?.[0]?.teljesites || '-',
            'Gyakorlat módja': h.kepzesek?.[0]?.szakmaiGyakTelj || '-'
        }));
        letoltesCSV(exportAdat, 'hallgatok_lista');
    };

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
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="stroke-current flex-shrink-0 h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>Sikeresen kijelentkezett!</span>
                        </div>
                    </div>
                )}
                <LoginPage
                    onLogin={() => {
                        setIsLoggedIn(true);
                        setShowToast(false);
                    }}
                />
            </>
        );
    } else {
        if (loading) return <p>Adatok betöltése folyamatban...</p>
        if (error) return <p style={{color: 'red'}}>{error}</p>
        
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <NavBar 
                    onLogout={handleLogout} 
                    aktivNezet={aktivNezet}
                    onNavigate={(ujNezet) => {
                        setAktivNezet(ujNezet);
                        setSzerkesztendoHallgato(null); 
                    }}
                />
                
                <main className="flex-grow max-w-7xl mx-auto p-6 w-full">
                    
                    {/* 1. Lista nézet */}
                    {aktivNezet === 'lista' && (
                        <>
                            <div className="flex justify-between items-center w-full">
                                <button
                                    type="button"
                                    onClick={handleExportCSV}
                                    className="btn bg-green-600 text-white hover:bg-green-700 border-none shadow-sm flex-shrink-0"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Export
                                </button>
                                
                                <SearchBar 
                                    keresoszoveg={keresoszoveg} 
                                    onKereses={setKeresoszoveg} 
                                />
                            </div>

                            <HallgatoTable
                                adat={szurtHallgatok}
                                onOpenDetails={(hallgato) => setSelectedHallgato(hallgato)}
                            />

                            {szurtHallgatok.length === 0 && hallgatok.length > 0 && (
                                <div className="text-center py-10 text-gray-500 text-lg">
                                    Nincs találat a következőre: <span className="font-bold">"{keresoszoveg}"</span>
                                </div>
                            )}
                        </>
                    )}

                    {/* 2. Statisztika nézet */}
                    {aktivNezet === 'statisztika' && (
                        <StatisztikaNezet />
                    )}

                    {/* 3. Új hallgató*/}
                    {aktivNezet === 'uj_hallgato' && (
                        <UjHallgatoForm 
                            szerkesztendoAdat={szerkesztendoHallgato}
                            onVissza={() => {
                                setAktivNezet('lista');
                                setSzerkesztendoHallgato(null);
                            }}
                            onSikeresMentes={() => {
                                setAktivNezet('lista');
                                setSzerkesztendoHallgato(null);
                                adatBetoltes();
                            }}
                        />
                    )}

                    <HallgatoModal
                        hallgato={selectedHallgato}
                        onClose={() => setSelectedHallgato(null)}
                        onSikeresTorles={() => {
                            setSelectedHallgato(null);
                            adatBetoltes();
                        }}
                        onEdit={() => {
                            setSzerkesztendoHallgato(selectedHallgato);
                            setSelectedHallgato(null);
                            setAktivNezet('uj_hallgato');
                        }}
                    />
                </main>
                
                {mutatGomb && (
                    <button
                        onClick={tetejere}
                        className="btn btn-circle btn-primary fixed bottom-6 right-6 z-50 shadow-xl transition-all duration-300"
                        title="Ugrás az oldal tetejére"
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-6 w-6" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth="2.5" 
                                d="M5 10l7-7m0 0l7 7m-7-7v18" 
                            />
                        </svg>
                    </button>
                )}
            </div>
        );
    }
}

export default App;