import { useState, useEffect } from 'react';
import { fetchDashboardStat } from '../services/hallgatoServices';
import {
    Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title
} from 'chart.js';
import { Pie, Bar, Doughnut } from 'react-chartjs-2';
import { letoltesCSV } from "../utils/exportUtils.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

function StatisztikaNezet() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const adatokBetoltese = async () => {
            try {
                setLoading(true);
                const data = await fetchDashboardStat();
                setStats(data);
            } catch (err) {
                setError("Nem sikerült betölteni a statisztikákat.");
            } finally {
                setLoading(false);
            }
        };

        adatokBetoltese();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg text-blue-600"></span>
            </div>
        );
    }

    if (error || !stats) {
        return <div className="alert alert-error text-white font-bold">{error}</div>;
    }

    const handleStatExport = () => {
        const exportAdat = [
            { Kategória: 'Összes hallgató', Érték: stats.osszesHallgato },
            { Kategória: 'Aktív cégek', Érték: stats.aktivCegek },
            { Kategória: 'Legnépszerűbb szak', Érték: stats.legnepszerubbSzak },
            //Szakok eloszlása
            { Kategória: '', Érték: '' },
            { Kategória: 'Szakok elosztása', Érték: '' },
            ...Object.entries(stats.szakokEloszlasa).map(([nev, db]) => ({ Kategória: nev, Érték: db + ' fő' })),
            
            //ÚJ: Félévek eloszlása
            { Kategória: '', Érték: '' },
            { Kategória: 'Félévek eloszlása', Érték: '' },
            ...Object.entries(stats.felevekEloszlasa || {}).map(([nev, db]) => ({ Kategória: nev, Érték: db + ' fő' })),
            //teljesítés eloszlása
            { Kategória: '', Érték: '' },
            { Kategória: 'Teljesítés', Érték: '' },
            ...Object.entries(stats.munkarendEloszlasa).map(([nev, db]) => ({ Kategória: nev, Érték: db + ' fő' })),
            //szakmai gyakorlat elvégzésének módja
            { Kategória: '', Érték: '' },
            { Kategória: 'Gyakorlat módja', Érték: '' },
            ...Object.entries(stats.gyakorlatModEloszlasa).map(([nev, db]) => ({ Kategória: nev, Érték: db + ' fő' })),
            
            //Céges értékelések
            { Kategória: '', Érték: '' },
            { Kategória: 'Partnercégek értékelései (Összesített)', Érték: '' },
            ...(stats.cegErtekelesek && stats.cegErtekelesek.length > 0 
                ? stats.cegErtekelesek.map(ceg => ({ 
                    Kategória: `${ceg.cegNev} (${ceg.ertekelesekSzama} db értékelés)`, 
                    Érték: `${ceg.osszesitettAtlag} átlag` 
                }))
                : [{ Kategória: 'Még nem érkezett értékelés a rendszerbe', Érték: '-' }]
            )
        ];
        
        letoltesCSV(exportAdat, 'statisztika_export');
    };

    // Chart.js formázó segédfüggvény
    const formatChartData = (dataObj, label, colors) => ({
        labels: Object.keys(dataObj),
        datasets: [{
            label: label,
            data: Object.values(dataObj),
            backgroundColor: colors,
            borderWidth: 1,
            borderColor: '#ffffff'
        }],
    });

    const colorsPie = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

    const pieOptions = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        // Kiszámoljuk az összes adat összegét
                        const total = context.dataset.data.reduce((acc, curr) => acc + curr, 0);
                        const value = context.raw;
                        // Százalék számítás 1 tizedesjegyre
                        const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                        
                        // Visszaadjuk a formázott szöveget
                        return `${context.label}: ${percentage}% (${value} fő)`;
                    }
                }
            }
        }
    };

    return (
        <div className="space-y-6">
            <button
                type="button" 
                onClick={handleStatExport}
                className="btn bg-green-600 text-white hover:bg-green-700 border-none shadow-sm flex-shrink-0"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export
            </button>

            {/* --- 1. SZEKCIÓ: FELSŐ KÁRTYÁK --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="stat bg-white rounded shadow-sm border border-slate-100">
                    <div className="stat-figure text-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    </div>
                    <div className="stat-title text-slate-500 font-semibold">Összes hallgató</div>
                    <div className="stat-value text-blue-600">{stats.osszesHallgato}</div>
                </div>
                
                <div className="stat bg-white rounded shadow-sm border border-slate-100">
                    <div className="stat-figure text-emerald-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                    </div>
                    <div className="stat-title text-slate-500 font-semibold">Gyakorlati helyek száma</div>
                    <div className="stat-value text-emerald-600">{stats.aktivCegek}</div>
                </div>

                <div className="stat bg-white rounded shadow-sm border border-slate-100">
                    <div className="stat-figure text-amber-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11l-3-3m0 0l-3 3m3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" /></svg>
                    </div>
                    <div className="stat-title text-slate-500 font-semibold">Legnépszerűbb Szak</div>
                    <div className="stat-value text-amber-500 text-2xl mt-1">{stats.legnepszerubbSzak}</div>
                </div>
            </div>

            {/* --- 2. SZEKCIÓ: DIAGRAMOK --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Szakok eloszlása */}
                <div className="card bg-white shadow-sm border border-slate-100">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-gray-700 font-bold border-b pb-2 w-full justify-center">Szakok szerinti eloszlás</h2>
                        <div className="w-full max-w-[280px] mt-4">
                            <Pie data={formatChartData(stats.szakokEloszlasa, 'Fő', colorsPie)} options={pieOptions} />
                        </div>
                    </div>
                </div>

                {/* Félévek eloszlása (Oszlopdiagram) */}
                <div className="card bg-white shadow-sm border border-slate-100">
                    <div className="card-body">
                        <h2 className="card-title text-gray-700 font-bold border-b pb-2">Hallgatók félévek szerint</h2>
                        <div className="w-full h-64 mt-4">
                            <Bar 
                                data={formatChartData(stats.felevekEloszlasa, 'Hallgatók száma', ['#6366f1'])} 
                                options={pieOptions}
                            />
                        </div>
                    </div>
                </div>

                {/* Munkarend */}
                <div className="card bg-white shadow-sm border border-slate-100">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-gray-700 font-bold border-b pb-2 w-full justify-center">Munkarend (Nappali / Levelező)</h2>
                        <div className="w-full max-w-[280px] mt-4">
                            <Doughnut data={formatChartData(stats.munkarendEloszlasa, 'Fő', ['#3b82f6', '#f59e0b'])} options={pieOptions} />
                        </div>
                    </div>
                </div>

                {/* Gyakorlat teljesítése */}
                <div className="card bg-white shadow-sm border border-slate-100">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-gray-700 font-bold border-b pb-2 w-full justify-center">Gyakorlat teljesítés módja</h2>
                        <div className="w-full max-w-[280px] mt-4">
                            <Pie data={formatChartData(stats.gyakorlatModEloszlasa, 'Fő', ['#10b981', '#ef4444', '#8b5cf6'])} options={pieOptions} />
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. SZEKCIÓ: ÉRTÉKELÉSEK TÁBLÁZATA*/}
            <div className="card bg-white shadow-sm border border-slate-100 mt-6">
                <div className="card-body p-6">
                    <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-2">
                        Partnercégek Hallgatói Értékelései
                    </h2>
                    
                    {stats.cegErtekelesek && stats.cegErtekelesek.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full text-center">
                                <thead className="bg-slate-100 text-gray-700 text-sm">
                                    <tr>
                                        <th className="text-left font-bold text-base">Cég neve</th>
                                        <th className="font-bold">Értékelések száma</th>
                                        <th className="font-bold">Munkahelyi légkör</th>
                                        <th className="font-bold">Szakmai fejlődés</th>
                                        <th className="font-bold">Mentorálás</th>
                                        <th className="font-bold">Újra választaná</th>
                                        <th className="bg-blue-100 text-blue-900 font-extrabold text-base rounded-tr-lg">
                                            Összesített Átlag
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {stats.cegErtekelesek.map((ceg, index) => (
                                        <tr key={index} className="hover:bg-slate-50 transition-colors">
                                            <td className="text-left font-bold text-slate-800">{ceg.cegNev}</td>
                                            <td className="text-slate-600 font-semibold">{ceg.ertekelesekSzama} db</td>
                                            <td className="text-amber-500 font-medium">{ceg.atlagKerdes1}</td>
                                            <td className="text-amber-500 font-medium">{ceg.atlagKerdes2}</td>
                                            <td className="text-amber-500 font-medium">{ceg.atlagKerdes3}</td>
                                            <td className="text-amber-500 font-medium">{ceg.atlagKerdes4}</td>
                                            <td className="font-extrabold text-lg text-blue-700 bg-blue-50/50">
                                                 {ceg.osszesitettAtlag}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="alert alert-info shadow-sm bg-blue-50 text-blue-800 border border-blue-200">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <span>Még nem érkezett hallgatói értékelés a rendszerbe.</span>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}

export default StatisztikaNezet;