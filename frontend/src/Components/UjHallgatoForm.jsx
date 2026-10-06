import { useState, useEffect } from "react";
import { createHallgato, updateHallgato } from "../services/hallgatoServices";

function UjHallgatoForm({onVissza, onSikeresMentes, szerkesztendoAdat}) {
    const [formData, setFormData] = useState({
        neptunId: '',
        nev: '',
        email: '',
        kapcsolattarto: '',
        cegNev: '',
        szakId: 3,
        teljesites: 'nappali',
        felevSzama: 7,
        kepzesiSzint: 'Bsc',
        szakmaiGyakTelj: 'kurzus teljesítés'
    });
    const [hiba, setHiba] = useState('');
    const [mentesFolyamatban, setMentesFolyamatban] = useState(false);

    useEffect(() => {
        if (szerkesztendoAdat) {
            setFormData({
                neptunId: szerkesztendoAdat.neptunId,
                nev: szerkesztendoAdat.nev,
                email: szerkesztendoAdat.email,
                kapcsolattarto: szerkesztendoAdat.kapcsolattarto || '',
                cegNev: szerkesztendoAdat.cegNev,
                szakId: szerkesztendoAdat.kepzesek?.[0]?.szakId || 3,
                teljesites: szerkesztendoAdat.kepzesek?.[0]?.teljesites || 'nappali',
                felevSzama: szerkesztendoAdat.kepzesek?.[0]?.felevSzama || 7,
                kepzesiSzint: szerkesztendoAdat.kepzesek?.[0]?.kepzesiSzint || 'Bsc',
                szakmaiGyakTelj: szerkesztendoAdat.kepzesek?.[0]?.szakmaiGyakTelj || 'kurzus teljesítés'
            });
        }
    }, [szerkesztendoAdat]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHiba('');
        setMentesFolyamatban(true);

        try {
            const kuldoAdat = {
                ...formData,
                szakId: parseInt(formData.szakId),
                felevSzama: parseInt(formData.felevSzama)
            };

            if (szerkesztendoAdat) {
                console.log("4/A. Módosítás (PUT) indítása...");
                await updateHallgato(szerkesztendoAdat.neptunId, kuldoAdat);
            } else {
                console.log("4/B. Új létrehozása (POST) indítása...");
                await createHallgato(kuldoAdat);
            }
            
            if (onSikeresMentes) {
                onSikeresMentes();
            } else {
                console.error("HIBA: Nincs onSikeresMentes függvény átadva az űrlapnak!");
            }
            
        } catch (err) {
            setHiba(err.message || 'Sikertelen mentés. Ellenőrizd az adatokat!');
        } finally {
            setMentesFolyamatban(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-blue-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-2">
                {szerkesztendoAdat ? 'Hallgató adatainak módosítása' : 'Új hallgató felvétele'}
            </h2>
            
            {hiba && <div className="alert alert-error mb-4 text-white">{hiba}</div>}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="space-y-4">
                    <h3 className="font-semibold text-blue-800">Alapadatok</h3>
                    <div>
                        <label className="label font-bold">Neptun kód</label>
                        <input type="text" name="neptunId" value={formData.neptunId} onChange={handleChange} required maxLength="6" 
                        className={`input input-bordered w-full uppercase ${szerkesztendoAdat ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                        placeholder="Pl: ABC123" />
                    </div>
                    <div>
                        <label className="label font-bold">Név</label>
                        <input type="text" name="nev" value={formData.nev} onChange={handleChange} required
                            className={"input input-bordered w-full p-2"}
                            placeholder="Pl: Kovács János"/>
                    </div>
                    <div>
                        <label className="label font-bold">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required 
                            className={"input input-bordered w-full p-2"}
                            placeholder="nev@nje.hallgato.hu"/>
                    </div>
                    <div>
                        <label className="label font-bold">Gyakorlati Cég neve</label>
                        <input type="text" name="cegNev" value={formData.cegNev} onChange={handleChange} required 
                            className={"input input-bordered w-full p-2"}
                            placeholder="Pl: Audi Hungaria Zrt." />
                    </div>
                    <div>
                        <label className="label font-bold">Kapcsolattartó</label>
                        <input type="text" name="kapcsolattarto" value={formData.kapcsolattarto} onChange={handleChange} required
                            className={"input input-bordered w-full p-2"}
                            placeholder="Pl: Varga Zoltán (HR)" />
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="font-semibold text-blue-800">Képzés adatok</h3>
                    <div>
                        <label className="label font-bold">Szak</label>
                        <select name="szakId" value={formData.szakId} onChange={handleChange} className="select select-bordered w-full">
                            <option value="1">Gépészmérnök</option>
                            <option value="2">Járműmérnök</option>
                            <option value="3">Mérnökinformatikus</option>
                            <option value="4">Logisztikai mérnök</option>
                        </select>
                    </div>
                    <div>
                        <label className="label font-bold">Félév száma</label>
                        <input type="number" name="felevSzama" value={formData.felevSzama} onChange={handleChange} required className="input input-bordered w-full" min="1" max="14" />
                    </div>
                    <div>
                        <label className="label font-bold">Képzési szint</label>
                        <select name="kepzesiSzint" value={formData.kepzesiSzint} onChange={handleChange} className="select select-bordered w-full">
                            <option value="Bsc">BSc</option>
                            <option value="foszk">FOSZK</option>
                        </select>
                    </div>
                    <div>
                        <label className="label font-bold">Teljesítés</label>
                        <select name="teljesites" value={formData.teljesites} onChange={handleChange} className="select select-bordered w-full">
                            <option value="nappali">Nappali</option>
                            <option value="levelező">Levelező</option>
                        </select>
                    </div>
                    <div>
                        <label className="label font-bold">Szakmai Gyakorlat</label>
                        <select name="szakmaiGyakTelj" value={formData.szakmaiGyakTelj} onChange={handleChange} className="select select-bordered w-full">
                            <option value="kurzus teljesítés">Kurzus teljesítés</option>
                            <option value="kredit elismerés">Kredit elismerés</option>
                        </select>
                    </div>
                </div>

                <div className="col-span-1 md:col-span-2 flex justify-end gap-4 mt-6 pt-4 border-t">
                    <button type="button" onClick={onVissza} className="btn btn-ghost">Mégsem</button>
                    <button type="submit" disabled={mentesFolyamatban} className="btn bg-blue-600 text-white hover:bg-blue-700 border-none">
                        {mentesFolyamatban ? 'Mentés folyamatban...' : 'Mentés'}
                    </button>
                </div>
            </form>
        </div>
    );
}
export default UjHallgatoForm;