import React from "react";

function HallgatoTable({ adat, onOpenDetails }) {
    return (
        <div className="overflow-x-auto bg-white rounded shadow-lg border border-gray-400">
            <table className="table w-full text-center border-collapse">
                <thead className="bg-gray-300 text-blue-900 text-sm border-b-2 border-black-300">
                    <tr>
                        <th className="font-semibold px-4 py-4">Név</th>
                        <th className="font-semibold px-4 py-4">Neptun kód</th>
                        <th className="font-semibold px-4 py-4">Félév</th>
                        <th className="font-semibold px-4 py-4">Cég</th>
                        <th className="font-semibold px-4 py-4">Szakmai gyakorlat Teljesítési módja</th>
                        <th className="font-semibold px-4 py-4 text-right">Részletek</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-400">
                    {adat.map((hallgato) => (
                        <tr 
                            key={hallgato.neptunId}
                            className="odd:bg-white even:bg-gray-200"
                        >
                            <td className="px-4 py-3 font-bold text-slate-800">{hallgato.nev}</td>
                            <td className="px-4 py-3 text-slate-700 tracking-wider">{hallgato.neptunId}</td>
                            <td className="px-4 py-3 text-slate-700">{hallgato.kepzesek[0]?.felevSzama}</td>
                            <td className="px-4 py-3 text-slate-700">{hallgato.cegNev}</td>
                            <td className="px-4 py-3 text-slate-700">{hallgato.kepzesek[0]?.szakmaiGyakTelj}</td>
                            <td className="px-4 py-3 text-right">
                                <button
                                    className="btn btn-sm bg-white text-blue-600 border-blue-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm"
                                    onClick={() => onOpenDetails(hallgato)}
                                >
                                    Részletek
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default HallgatoTable;