export const API_URL = import.meta.env.VITE_API_URL;
 

export async function register(data) {
    const response = await fetch(`${API_URL}/auth/register`, {  
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error("Failed to register");
    }

    return response.json();
}


export async function login(data) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json(); // Extract error message from response
        throw new Error(errorData.message || "Login failed");
    }

    return response.json(); // Return the parsed JSON response
}

export const getUser = async (token) => {

    const response = await fetch(`${API_URL}/user`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}` // ✅ Ensure token is included
        }
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch user data");
    }

    const userData = await response.json();
    return userData;
};

export async function addLink(linkData) {
    const response = await fetch(`${API_URL}/user/links`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(linkData)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add link");
    }

    return response.json();
}

// 📌 Get All Links
export async function getLinks() {
    const response = await fetch(`${API_URL}/user/links`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch links");
    }

    return response.json();
}

// 📌 Delete a Link (Optional)
export async function deleteLink(linkId) {
    const response = await fetch(`${API_URL}/user/links/${linkId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });

    if (!response.ok) {
        throw new Error("Failed to delete link");
    }

    return response.json();
}

export async function getAnalytics() {
    const response = await fetch(`${API_URL}/user/analytics`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch analytics");
    }

    return response.json();
}
export async function updateUserProfile(data) {
    const response = await fetch(`${API_URL}/user`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
    }

    return response.json();
}