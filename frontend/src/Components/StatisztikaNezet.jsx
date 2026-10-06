import { useState, useEffect } from 'react';
import { fetchDashboardStat } from '../services/hallgatoServices';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title
} from 'chart.js';
import { Pie, Bar, Doughnut } from 'react-chartjs-2';

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

    return (
        <div className="space-y-6">
            
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
                            <Pie data={formatChartData(stats.szakokEloszlasa, 'Fő', colorsPie)} />
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
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
                                    plugins: { legend: { display: false } }
                                }} 
                            />
                        </div>
                    </div>
                </div>

                {/* Munkarend */}
                <div className="card bg-white shadow-sm border border-slate-100">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-gray-700 font-bold border-b pb-2 w-full justify-center">Munkarend (Nappali / Levelező)</h2>
                        <div className="w-full max-w-[280px] mt-4">
                            <Doughnut data={formatChartData(stats.munkarendEloszlasa, 'Fő', ['#3b82f6', '#f59e0b'])} />
                        </div>
                    </div>
                </div>

                {/* Gyakorlat teljesítése */}
                <div className="card bg-white shadow-sm border border-slate-100">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-gray-700 font-bold border-b pb-2 w-full justify-center">Gyakorlat teljesítés módja</h2>
                        <div className="w-full max-w-[280px] mt-4">
                            <Pie data={formatChartData(stats.gyakorlatModEloszlasa, 'Fő', ['#10b981', '#ef4444', '#8b5cf6'])} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default StatisztikaNezet;