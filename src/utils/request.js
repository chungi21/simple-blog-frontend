export const customFetch = async (url, options = {}) => {
    const accessToken = localStorage.getItem("accessToken");

    const defaultOptions = {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
    };

    const response = await fetch(url, {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...(options.headers || {}),
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "요청 실패");
    }

    if (options.raw) {
        return response;
    }

    return await response.json();
};
