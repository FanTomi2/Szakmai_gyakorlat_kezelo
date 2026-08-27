import React, { useState } from "react";

function LoginPage({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        //csak szimuláljuk a sikeres belépést:
        onLogin(email);
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
            <div className="card lg:card-side bg-base-100 shadow-2xl max-w-5xl w-full overflow-hidden">
                <div className="lg:w-1/2 bg-primary text-primary-content p-12 flex flex-col justify-center">
                    {/*Egyeztetni a szövegről*/}
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
                        >
                            Belépés
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
