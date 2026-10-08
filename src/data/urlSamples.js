export const urlSamples = [
    {
        name: "Search phrase",
        detail: "Encode spaces and reserved characters in one value",
        mode: "component",
        direction: "encode",
        source: "filter=family & status=active",
    },
    {
        name: "Encoded path",
        detail: "Decode one URL component without losing Unicode",
        mode: "component",
        direction: "decode",
        source: "%E6%9D%B1%E4%BA%AC%2Fguide",
    },
    {
        name: "Address with spaces",
        detail: "Encode a full address while keeping its structure",
        mode: "address",
        direction: "encode",
        source: "https://example.com/notes and plans?q=two words#today",
    },
    {
        name: "Query pairs",
        detail: "Build form data from a JSON object or pair list",
        mode: "query",
        direction: "encode",
        source: `{
  "search": "sea glass",
  "page": 2
}`,
    },
    {
        name: "Repeated filters",
        detail: "Decode repeated form values into ordered pairs",
        mode: "query",
        direction: "decode",
        source: "?tag=blue+sky&tag=green&sort=recent",
    },
];
