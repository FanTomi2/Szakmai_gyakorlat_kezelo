const BASE_URL = "http://localhost:7064/api/";

export const fetchHallgatok = async () => {
    try {
        const response = await fetch(`${BASE_URL}Hallgatok/reszletes`, {
            cache: 'no-store' 
        });
        
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

//Statisztika
export const fetchDashboardStat = async () => {
    try {
        const response = await fetch(`${BASE_URL}Hallgatok/statisztika/dashboard`, {
            cache: 'no-store'
        });
        
        if (!response.ok) {
            throw new Error(`Szerver hiba a statisztika lekérésekor: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Hiba a statisztika lekérdezésekor: ", error);
        throw error;
    }
}

//uj hallgato
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

//hallgato törlés
export const deleteHallgato = async (neptunId) => {
    try {
        const response = await fetch(`${BASE_URL}Hallgatok/${neptunId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Szerver hiba történt a törléskor: ${response.status}`);
        }

        return true; 
        
    } catch (error) {
        console.error("Hiba a törlés során:", error);
        throw error;
    }
};

//hallgato modositas
export const updateHallgato = async (neptunId, hallgatoData) => {
    try {
        const response = await fetch(`${BASE_URL}Hallgatok/${neptunId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(hallgatoData)
        });

        if (!response.ok) {
            throw new Error(`Hiba történt a módosításkor: ${response.status}`);
        }
        return true; 
    } catch (error) {
        console.error("Hiba a módosítás során:", error);
        throw error;
    }
};