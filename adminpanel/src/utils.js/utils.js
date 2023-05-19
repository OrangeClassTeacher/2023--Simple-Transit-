export const Utils = {
    API_URL:
        process.env.NODE_ENV === "development"
            ? "http://localhost:9000/api"
            : "https://example.com/api",
};

export default Utils;