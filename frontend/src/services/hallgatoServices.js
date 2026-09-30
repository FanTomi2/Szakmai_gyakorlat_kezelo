const BASE_URL = "https://localhost:7064/api/";

export const fetchHallgatok = async () => {
    try {
        const response = await fetch(`${BASE_URL}Hallgatok/reszletes`);
        
        if (!response.ok) {
            throw new Error(`Szerver hiba történt: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("hiba az adatok lekérdezésekor: ", error);
        throw error;
    }
}

export const fetchFelevStat = async () => {
    try {
        const response = await fetch(`${BASE_URL}Hallgatok/statisztika/felevek`);
        
        if (!response.ok) {
            throw new Error(`Szerver hiba történt: ${response.status}`);
        }

        return await response.json();
        return data;
    } catch (error) {
        console.error("hiba az adatok lekérdezésekor: ", error);
        throw error;
    }    
}

export const fetchTeljesitesStat = async () => {
    try {
        const response = await fetch(`${BASE_URL}Hallgatok/statisztika/teljesites`);
        
        if (!response.ok) {
            throw new Error(`Szerver hiba történt: ${response.status}`);
        }

        return await response.json();
        return data;
    } catch (error) {
        console.error("hiba az adatok lekérdezésekor: ", error);
        throw error;
    }    
}

export const fetchTeljModStat = async () => {
    try {
        const response = await fetch(`${BASE_URL}Hallgatok/statisztika/teljmod`);
        
        if (!response.ok) {
            throw new Error(`Szerver hiba történt: ${response.status}`);
        }

        return await response.json();
        return data;
    } catch (error) {
        console.error("hiba az adatok lekérdezésekor: ", error);
        throw error;
    }    
}

export const createHallgato = async (hallgatoData) => {
    try {
        const response = await fetch(`${BASE_URL}Hallgatok`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(hallgatoData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || `Szerver hiba történt: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        throw error;
    }
}
