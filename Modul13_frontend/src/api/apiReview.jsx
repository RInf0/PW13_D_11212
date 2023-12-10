import useAxios from ".";

// Mendapatkan semua review untuk ditaruh di halaman dashboard
export const GetAllReviews = async () => {
    try {
        const response = await useAxios.get("/reviews", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const GetMyReviews = async () => {
    const id = JSON.parse(sessionStorage.getItem("user")).id;
    try {
        const response = await useAxios.get(`/reviews/user/${id}`, {
             headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data.data;
    } catch (error) {
        throw error.response.data;
    }
};

// [Tidak dipakai] Mendapatkan review by id user
export const GetReviewById = async (id) => {
    try {
        const response = await useAxios.get(`/reviews/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Membuat review baru
export const CreateReview = async (data) => {
    try {
        const response = await useAxios.post("/reviews", data, {
            headers: {
                "Content-Type": "multipart/form-data", // untuk upload thumbnail
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Menghaspu review
export const DeleteReview = async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
        const response = await useAxios.delete(`/reviews/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};