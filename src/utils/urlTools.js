export const maxInputLength = 100_000;

const encodeQueryPairs = (source) => {
    const parsed = JSON.parse(source);
    const pairs = Array.isArray(parsed) ? parsed : parsed && typeof parsed === "object" ? Object.entries(parsed) : null;
    if (!pairs || pairs.some((pair) => !Array.isArray(pair) || pair.length !== 2)) {
        throw new Error("Use a JSON object or an array of [key, value] pairs.");
    }
    const params = new URLSearchParams();
    pairs.forEach(([key, value]) => params.append(String(key), String(value)));
    return params.toString();
};

const decodeQueryPairs = (source) => {
    const query = source.trim().replace(/^\?/, "");
    return JSON.stringify(Array.from(new URLSearchParams(query).entries()), null, 2);
};

export const transformUrlText = (input, direction = "encode", mode = "component") => {
    const source = String(input ?? "");
    if (source.length > maxInputLength) return { ok: false, error: "Input is limited to 100,000 characters." };
    if (!source) return { ok: true, output: "" };
    if (direction !== "encode" && direction !== "decode") return { ok: false, error: "Choose encode or decode." };

    try {
        if (mode === "component") return { ok: true, output: direction === "encode" ? encodeURIComponent(source) : decodeURIComponent(source) };
        if (mode === "address") return { ok: true, output: direction === "encode" ? encodeURI(source) : decodeURI(source) };
        if (mode === "query") return { ok: true, output: direction === "encode" ? encodeQueryPairs(source) : decodeQueryPairs(source) };
        return { ok: false, error: "Choose a supported URL format." };
    } catch (error) {
        const message = error instanceof SyntaxError ? "Query mode needs valid JSON input." : error instanceof URIError ? "This text has an invalid percent escape sequence." : error.message;
        return { ok: false, error: message };
    }
};
