export const Utils = {
    API_URL:
        process.env.NODE_ENV === "development"
            ? "http://localhost:9000/api"
            : "https://simpletransit.onrender.com/api",
};

export default Utils;