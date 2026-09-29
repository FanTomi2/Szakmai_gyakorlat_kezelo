import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import HallgatoTable from "./components/HallgatoTable";
import LoginPage from "./Pages/LoginPage.jsx";
import HallgatoModal from "./Components/HallgatoModal.jsx";
import { MockData } from "./data/MockData.js";
import { fetchHallgatok } from "./services/hallgatoServices.js";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [selectedHallgato, setSelectedHallgato] = useState(null);
    const [hallgatok, setHakkgatok] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const adatBetoltes = async () => {
            try {
                setLoading(true);
                const data = await fetchHallgatok();
                setHakkgatok(data);
            } catch (err) {
                setError('Sikertelen betöltés!');
            } finally {
                setLoading(false);
            }
        };
        adatBetoltes();
    }, []);

    if (loading) return <p>Adatok betöltése folyamatban</p>
    if (error) return <p style={{color: 'red'}}>{error}</p>

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
    }
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <NavBar onLogout={handleLogout} />
            <main className="flex-grow max-w-7xl mx-auto p-6 w-full">
                {/* Fejléc*/}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Hallgatók listája
                    </h2>
                </div>
                    <HallgatoTable
                        adat={hallgatok}
                        onOpenDetails={(hallgato) =>
                            setSelectedHallgato(hallgato)
                        }
                    />
                <HallgatoModal
                    hallgato={selectedHallgato}
                    onClose={() => setSelectedHallgato(null)}
                />
            </main>
        </div>
    );
}

export default App;
