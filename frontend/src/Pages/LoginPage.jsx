import React, { useState } from "react";

function LoginPage({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hiba, setHiba] = useState("");
    const [loading, setLoading] = useState(false);

    const BASE_URL = "https://localhost:7064/api";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHiba("");
        setLoading(true);

        try {
            const response = await fetch(`${BASE_URL}/Auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, jelszo: password })
            });

            const data = await response.json();

            if (response.ok) {
                // Sikeres belépés: token és adatok mentése
                localStorage.setItem('token', data.token);
                localStorage.setItem('felhasznalo', JSON.stringify(data.felhasznalo));
                onLogin();
            } else {
                setHiba(data.message || 'Hibás e-mail cím vagy jelszó!');
            }
        } catch (error) {
            setHiba('Nem sikerült csatlakozni a szerverhez!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
            <div className="card lg:card-side bg-base-100 shadow-2xl max-w-5xl w-full overflow-hidden">
                <div className="lg:w-1/2 bg-primary text-primary-content p-12 flex flex-col justify-center">
                    <h1 className="text-4xl font-bold mb-6 text-center">
                        Szakmai Gyakorlat Kezelő
                    </h1>
                    <p className="text-lg opacity-90 mb-8 text-center">
                        Hallgatók szakmai gyakorlatát összegző oldal, <br />
                        ami megkönnyíti a szakmai gyakorlatok követését.
                    </p>
                </div>
                <div className="lg:w-1/2 p-12 flex flex-col justify-center bg-base-100">
                    <h2 className="text-2xl font-bold text-base-content mb-8 text-center">
                        Bejelentkezés
                    </h2>
                    
                    {/* Hibajelző doboz */}
                    {hiba && (
                        <div className="alert alert-error shadow-sm mb-6 text-white font-semibold rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{hiba}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">
                                    E-mail cím
                                </span>
                            </label>
                            <input
                                type="email"
                                className="input input-bordered w-full focus:input-primary transition-colors"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">
                                    Jelszó
                                </span>
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="input input-bordered w-full focus:input-primary transition-colors"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label className="label mt-1">
                                <a
                                    href="#"
                                    className="label-text-alt link link-hover text-primary"
                                >
                                    Elfelejtette a jelszavát?
                                </a>
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary w-full mt-4"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                                "Belépés"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;