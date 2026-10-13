export const letoltesCSV = (adatok, fajlnev) => {
    if (!adatok || !adatok.length) return;

    const fejlecek = Object.keys(adatok[0]);
    
    const csvSorok = [];
    csvSorok.push(fejlecek.join(';'));

    adatok.forEach(sor => {
        const ertekek = fejlecek.map(fejlec => {
            let ertek = sor[fejlec] === null || sor[fejlec] === undefined ? '' : sor[fejlec].toString();
            if (ertek.includes(',') || ertek.includes('\n') || ertek.includes('"')) {
                ertek = `"${ertek.replace(/"/g, '""')}"`;
            }
            return ertek;
        });
        csvSorok.push(ertekek.join(';'));
    });

    const csvTartalom = '\uFEFF' + csvSorok.join('\n');
    
    const blob = new Blob([csvTartalom], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", `${fajlnev}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};