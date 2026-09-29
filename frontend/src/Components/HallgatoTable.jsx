import React from "react";

function HallgatoTable({ adat, onOpenDetails }) {
    console.log(adat);
    return (
        <div className="overflow-x-auto bg-base-100 rounded-box shadow-sm border border-base-200">
            <table className="table table-zebra w-full">
                <thead className="bg-base-200 text-base-content text-sm">
                    <tr>
                        <th>Név</th>
                        <th>Neptun kód</th>
                        <th>Szak</th>
                        <th>Cég</th>
                        <th>Szakmai gyakorlat Teljesítési módja</th>
                        <th className="text-right">Műveletek</th>
                    </tr>
                </thead>
                <tbody>
                    {adat.map((hallgato) => (
                        <tr key={hallgato.neptunId} className="hover">
                            <td className="font-bold">{hallgato.nev}</td>
                            <td>{hallgato.neptunId}</td>
                            <td>{hallgato.kepzesek[0]?.szakNev}</td>
                            <td>{hallgato.cegNev}</td>
                            <td>{hallgato.kepzesek[0]?.szakmaiGyakTelj}</td>
                            <td className="text-right">
                                <button
                                    className="btn btn-sm btn-outline"
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
