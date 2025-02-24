export const getData = async() => {
    const response = await fetch(`${import.meta.env.VITE_PROXY_BASE_URL}/currencies`)
    const data = await response.json();

    const converted = Object.keys(data).map(currency => currency)
    return converted
};

