import React from 'react';

function HallgatoTable({ adat }) {
    const getBadgeClass = (status) => {
        const normalizedStatus = status?.trim().toUpperCase();
        if (normalizedStatus === "FOLYAMATBAN") return "badge-info text-info-content";
        if (normalizedStatus === "BEFEJEZETT") return "badge-success text-success-content";
        return "badge-error text-error-content"; 
    };

    return (
        <div className="overflow-x-auto bg-base-100 rounded-box shadow-sm border border-base-200">
            <table className="table table-zebra w-full">
                <thead className="bg-base-200 text-base-content text-sm">
                    <tr>
                        <th>Név</th>
                        <th>Szak</th>
                        <th>Cég</th>
                        <th>Státusz</th>
                        <th className="text-right">Műveletek</th>
                    </tr>
                </thead>
                <tbody>
                    {adat.map((hallgato) => (
                        <tr key={hallgato.id} className="hover">
                            <td className="font-bold">{hallgato.nev}</td>
                            <td>{hallgato.szak}</td>
                            <td>{hallgato.cegnev}</td>
                            <td>
                                <div className={`badge ${getBadgeClass(hallgato.status)} text-[10px] uppercase font-bold whitespace-nowrap`}>
                                    {hallgato.status}
                                </div>
                            </td>
                            <td className="text-right">
                                <button className="btn btn-sm btn-outline">Részletek</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default HallgatoTable;