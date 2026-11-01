import React, { useState } from 'react';

function ErtekelesPage() {
    const [neptunId, setNeptunId] = useState('');
    const [kerdes1, setKerdes1] = useState(0);
    const [kerdes2, setKerdes2] = useState(0);
    const [kerdes3, setKerdes3] = useState(0);
    const [kerdes4, setKerdes4] = useState(0);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const BASE_URL = "https://localhost:7064/api";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);

        // Validáció: mindenre adjon pontot
        if (kerdes1 === 0 || kerdes2 === 0 || kerdes3 === 0 || kerdes4 === 0) {
            setError("Kérjük, minden kérdésre adjon 1-5 csillagos értékelést!");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${BASE_URL}/Ertekeles`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    neptunId,
                    kerdes1,
                    kerdes2,
                    kerdes3,
                    kerdes4
                })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message || "Sikeres értékelés!");
            } else {
                setError(data.message || "Hiba történt az értékelés során.");
            }
        } catch (err) {
            setError("Nem sikerült csatlakozni a szerverhez.");
        } finally {
            setLoading(false);
        }
    };

    // Segédkomponens a csillagos értékelőhöz
    const CsillagosErtekelo = ({ label, ertek, setErtek }) => (
        <div className="form-control w-full mb-4">
            <label className="label">
                <span className="label-text font-semibold text-gray-700">{label}</span>
            </label>
            <br />
            <div className="rating rating-lg">
                {[1, 2, 3, 4, 5].map((num) => (
                    <input
                        key={num}
                        type="radio"
                        className="mask mask-star-2 bg-orange-400"
                        checked={ertek === num}
                        onChange={() => setErtek(num)}
                    />
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="card w-full max-w-lg bg-white shadow-2xl">
                <div className="card-body">
                    <h2 className="text-3xl font-bold text-center text-blue-800 mb-2">Gyakorlat Értékelése</h2>
                    <p className="text-center text-gray-500 mb-6 text-sm">
                        Kérjük, oszd meg velünk a szakmai gyakorlati helyeddel kapcsolatos tapasztalataidat!
                    </p>

                    {message ? (
                        <div className="alert alert-success shadow-sm text-white font-bold flex items-center justify-center py-8">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{message}</span>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            {error && (
                                <div className="alert alert-error shadow-sm text-white mb-4">
                                    <span>{error}</span>
                                </div>
                            )}

                            <div className="form-control mb-6">
                                <label className="label">
                                    <span className="label-text font-bold text-gray-700">Neptun kódod</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full uppercase focus:input-primary"
                                    maxLength={6}
                                    value={neptunId}
                                    onChange={(e) => setNeptunId(e.target.value.toUpperCase())}
                                    required
                                />
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                                <CsillagosErtekelo 
                                    label="1. Milyen volt a munkahelyi légkör?" 
                                    ertek={kerdes1} 
                                    setErtek={setKerdes1} 
                                />
                                <CsillagosErtekelo 
                                    label="2. Mennyire érezted biztosítottnak a szakmai fejlődésedet?" 
                                    ertek={kerdes2} 
                                    setErtek={setKerdes2} 
                                />
                                <CsillagosErtekelo 
                                    label="3. Milyen volt a mentorálás gyakorisága és minősége?" 
                                    ertek={kerdes3} 
                                    setErtek={setKerdes3} 
                                />
                                <CsillagosErtekelo 
                                    label="4. Szívesen választanád újra ezt a céget?" 
                                    ertek={kerdes4} 
                                    setErtek={setKerdes4} 
                                />
                            </div>

                            <button 
                                type="submit" 
                                className="btn btn-primary w-full text-lg"
                                disabled={loading}
                            >
                                {loading ? <span className="loading loading-spinner"></span> : 'Értékelés Mentése'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ErtekelesPage;