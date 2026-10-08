import test from "node:test";
import assert from "node:assert/strict";
import { maxInputLength, transformUrlText } from "./urlTools.js";

test("encodes and decodes a URL component", () => {
    const encoded = transformUrlText("a phrase/with?symbols=✓", "encode", "component");
    assert.equal(encoded.output, "a%20phrase%2Fwith%3Fsymbols%3D%E2%9C%93");
    assert.equal(transformUrlText(encoded.output, "decode", "component").output, "a phrase/with?symbols=✓");
});

test("encodes address spaces while preserving URL structure", () => {
    assert.equal(transformUrlText("https://example.com/a path?q=one two#top", "encode", "address").output, "https://example.com/a%20path?q=one%20two#top");
});

test("decodes unreserved address characters without decoding reserved separators", () => {
    assert.equal(transformUrlText("https://example.com/a%20path%2Fpart?q=one%2Btwo", "decode", "address").output, "https://example.com/a path%2Fpart?q=one%2Btwo");
});

test("encodes query pairs from an object and preserves repeated keys from pairs", () => {
    assert.equal(transformUrlText('{"search":"a phrase","page":2}', "encode", "query").output, "search=a+phrase&page=2");
    assert.equal(transformUrlText('[["tag","blue sky"],["tag","green"]]', "encode", "query").output, "tag=blue+sky&tag=green");
});

test("decodes query values into an ordered JSON pair list", () => {
    assert.equal(transformUrlText("?tag=blue+sky&tag=green&empty=", "decode", "query").output, '[\n  [\n    "tag",\n    "blue sky"\n  ],\n  [\n    "tag",\n    "green"\n  ],\n  [\n    "empty",\n    ""\n  ]\n]');
});

test("reports malformed component escapes and invalid query JSON", () => {
    assert.equal(transformUrlText("bad%2", "decode", "component").error, "This text has an invalid percent escape sequence.");
    assert.equal(transformUrlText("not json", "encode", "query").error, "Query mode needs valid JSON input.");
    assert.equal(transformUrlText("[1,2]", "encode", "query").error, "Use a JSON object or an array of [key, value] pairs.");
});

test("enforces the input limit and rejects unsupported modes", () => {
    assert.equal(transformUrlText("x".repeat(maxInputLength + 1)).ok, false);
    assert.equal(transformUrlText("x".repeat(maxInputLength)).ok, true);
    assert.equal(transformUrlText("text", "encode", "unknown").ok, false);
    assert.equal(transformUrlText("text", "other", "component").ok, false);
});
