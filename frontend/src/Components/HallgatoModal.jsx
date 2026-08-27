import React from "react";

function HallgatoModal({ hallgato, onClose }) {
    if (!hallgato) return null;

    const getBadgeClass = (status) => {
        const normalizedStatus = status?.trim().toUpperCase();
        if (normalizedStatus === "FOLYAMATBAN")
            return "badge-info text-info-content";
        if (normalizedStatus === "BEFEJEZETT")
            return "badge-success text-success-content";
        return "badge-error text-error-content";
    };

    return (
        <div className="modal modal-open z-50">
            <div className="modal-box max-w-3xl">
                <div className="flex justify-between items-start border-b pb-4 mb-4">
                    <div>
                        <h3 className="font-bold text-2xl">{hallgato.nev}</h3>
                    </div>
                    <div
                        className={`badge ${getBadgeClass(hallgato.status)} p-3 font-bold`}
                    >
                        {hallgato.status}
                    </div>
                </div>
                {/*Egyeztetni adatokról*/}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-base-200 p-4 rounded-lg shadow-inner">
                        <h4 className="font-bold text-lg mb-3 border-b border-gray-300 pb-1">
                            Egyetemi adatok
                        </h4>
                        <p className="mb-2">
                            <span className="font-semibold">Neptun kód:</span>{" "}
                            {hallgato.neptun || "Ismeretlen"}
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">Félév:</span>{" "}
                            {hallgato.felev || "-"} félév
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">Szak:</span>{" "}
                            {hallgato.szak || "-"}
                        </p>
                    </div>

                    <div className="bg-base-200 p-4 rounded-lg shadow-inner">
                        <h4 className="font-bold text-lg mb-3 border-b border-gray-300 pb-1">
                            Céges gyakorlat
                        </h4>
                        <p className="mb-2">
                            <span className="font-semibold">Cég neve:</span>{" "}
                            {hallgato.cegnev}
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">
                                Külső kapcsolattartó:
                            </span>{" "}
                            {hallgato.kapcsolattarto || "-"}
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">
                                Kezdés dátuma:
                            </span>{" "}
                            {hallgato.kezdete || "-"}
                        </p>
                        {hallgato.status?.trim().toLowerCase() ===
                            "befejezett" && (
                            <p className="mb-2">
                                <span className="font-semibold">
                                    Befejezés dátuma:
                                </span>{" "}
                                {hallgato.kezdete || "-"}
                            </p>
                        )}
                    </div>
                </div>

                <div className="modal-action mt-6 border-t pt-4">
                    <button className="btn" onClick={onClose}>
                        Bezárás
                    </button>
                </div>
            </div>
            <div className="modal-backdrop bg-black/40" onClick={onClose}></div>
        </div>
    );
}

export default HallgatoModal;
