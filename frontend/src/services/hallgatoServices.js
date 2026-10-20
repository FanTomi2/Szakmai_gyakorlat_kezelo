const BASE_URL = "http://localhost:7064/api/";

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

const checkAuth = (response) => {
    if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('felhasznalo');
        window.location.reload(); 
    }
};

export const fetchHallgatok = async () => {
    try {
        const response = await fetch(`${BASE_URL}Hallgatok/reszletes`, {
            headers: getAuthHeaders(),
            cache: 'no-store' 
        });
        
        checkAuth(response);

        if (!response.ok) {
            throw new Error(`Szerver hiba történt: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Hiba az adatok lekérdezésekor: ", error);
        throw error;
    }
}

// Statisztika
export const fetchDashboardStat = async () => {
    try {
        const response = await fetch(`${BASE_URL}Hallgatok/statisztika/dashboard`, {
            headers: getAuthHeaders(),
            cache: 'no-store'
        });
        
        checkAuth(response);

        if (!response.ok) {
            throw new Error(`Szerver hiba a statisztika lekérésekor: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Hiba a statisztika lekérdezésekor: ", error);
        throw error;
    }
}

// Uj hallgato
export const createHallgato = async (hallgatoData) => {
    try {
        const response = await fetch(`${BASE_URL}Hallgatok`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(hallgatoData)
        });

        checkAuth(response);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || `Szerver hiba történt: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        throw error;
    }
}

// Hallgato törlés
export const deleteHallgato = async (neptunId) => {
    try {
        const response = await fetch(`${BASE_URL}Hallgatok/${neptunId}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });

        checkAuth(response);

        if (!response.ok) {
            throw new Error(`Szerver hiba történt a törléskor: ${response.status}`);
        }

        return true; 
        
    } catch (error) {
        console.error("Hiba a törlés során:", error);
        throw error;
    }
};

// Hallgato modositas
export const updateHallgato = async (neptunId, hallgatoData) => {
    try {
        const response = await fetch(`${BASE_URL}Hallgatok/${neptunId}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(hallgatoData)
        });

        checkAuth(response);

        if (!response.ok) {
            throw new Error(`Hiba történt a módosításkor: ${response.status}`);
        }
        return true; 
    } catch (error) {
        console.error("Hiba a módosítás során:", error);
        throw error;
    }
};