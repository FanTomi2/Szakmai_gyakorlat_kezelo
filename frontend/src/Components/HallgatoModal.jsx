import { useState } from "react";
import { deleteHallgato } from "../services/hallgatoServices";

function HallgatoModal({ hallgato, onClose, onSikeresTorles, onEdit }) {
    const [torlesFolyamatban, setTorlesFolyamatban] = useState(false);
    const [hiba, setHiba] = useState('');

    if (!hallgato) return null;

    const handleTorles = async () => {
        const megerositve = window.confirm(`Biztosan törölni szeretnéd a következő hallgatót: ${hallgato.nev} (${hallgato.neptunId})?`);

        if (!megerositve) return;

        try {
            setTorlesFolyamatban(true);
            setHiba('');
            await deleteHallgato(hallgato.neptunId);
            onSikeresTorles();
        } catch (err) {
            setHiba(err.message || 'Sikertelen törlés!');
        } finally {
            setTorlesFolyamatban(false);
        }
    };

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

                <div className="modal-action flex justify-between">
                    <div className="modal-action felx ">
                        <button
                            type="button"
                            onClick={onEdit}
                            className="btn bg-blue-600 text-white hover:bg-blue-700 border-none"
                        >
                            Szerkesztés
                        </button>
                        <button
                            type="button"
                            onClick={handleTorles}
                            disabled={torlesFolyamatban}
                            className="btn bg-red-600 text-white hover:bg-red-700 border-none"
                        >
                            {torlesFolyamatban ? 'Törlés folyamatban...' : 'Hallgató törlése'}
                        </button>
                    </div>
                    <div className="modal-action felx">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn-neutral btn-outline"
                        >
                            Bezárás
                        </button>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop bg-black/40" onClick={onClose}></div>
        </div>
    );
}

export default HallgatoModal;
