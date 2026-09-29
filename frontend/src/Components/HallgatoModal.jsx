import React from "react";

function HallgatoModal({ hallgato, onClose }) {
    if (!hallgato) return null;
    return (
        <div className="modal modal-open z-50">
            <div className="modal-box max-w-5xl">
                <div className="flex justify-between items-start border-b pb-4 mb-4">
                    <div>
                        <h3 className="font-bold text-2xl">{hallgato.nev}</h3>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-base-200 p-4 rounded-lg shadow-inner">
                        <p className="mb-2">
                            <span className="font-semibold">Neptun kód: </span>
                            {hallgato.neptunId || "Ismeretlen"}
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">Email: </span>
                            {hallgato.email || "-"}
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">Félév: </span>
                            {hallgato.kepzesek[0].felevSzama || "-"}. félév
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">Kar: </span>
                            {hallgato.kepzesek[0].karNev || "-"}
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">Szak: </span>
                            {hallgato.kepzesek[0].szakNev || "-"}
                        </p>
                    </div>

                    <div className="bg-base-200 p-4 rounded-lg shadow-inner">
                        <p className="mb-2">
                            <span className="font-semibold">Cég neve: </span>
                            {hallgato.cegNev}
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">Kapcsolattartó: </span>
                            {hallgato.kapcsolattarto || "-"}
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">Teljesítés: </span>
                            {hallgato.kepzesek[0].teljesites || "-"}
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">Képzési szint: </span>
                            {hallgato.kepzesek[0].kepzesiSzint || "-"}
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">Szakmai gyakorlat teljesítés módja: </span>
                            {hallgato.kepzesek[0].szakmaiGyakTelj || "-"}
                        </p>
                    </div>
                </div>

                <div className="modal-action mt-6 border-t pt-4">
                    <button className="btn btn-outline btn-error hover:bg-red-500" onClick={onClose}>
                        Bezárás
                    </button>
                </div>
            </div>
            <div className="modal-backdrop bg-black/40" onClick={onClose}></div>
        </div>
    );
}

export default HallgatoModal;
