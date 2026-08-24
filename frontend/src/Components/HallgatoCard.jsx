import React from "react";

function HallgatoCard({nev, szak, cegnev, status }) {
    const normalizedStatus = status?.trim().toLowerCase();
    const badgeColors = {
        "folyamatban": "badge badge-outline badge-primary",
        "befejezett": "badge badge-outline badge-success",
    };
    const statusColorClass = badgeColors[normalizedStatus] || "badge badge-outline badge-error";

    return(
        <div className="card bg-gray-200 card-md shadow-sm">
            <div className="card-body">
                <h2 className="card-title">{nev}</h2>
                <h4>{szak}</h4>
                <p>{cegnev}</p>
                
                <div className={`${statusColorClass}`}>
                    {status}
                </div>

                <div className="justify-end card-actions">
                    <button className="btn btn-outline">Részletek</button>
                </div>
            </div>
        </div>
    )
}

export default HallgatoCard;