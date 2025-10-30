import { base64urlEncode, base64urlEncodeJson } from "../../../src/utils/base64url.js";

describe("base64url", () => {
    describe("base64urlEncode", () => {
        it("should encode string to base64url format", () => {
            const result = base64urlEncode("hello");

            // base64url should not contain +, /, or = characters
            expect(result).not.toContain("+");
            expect(result).not.toContain("/");
            expect(result).not.toContain("=");
            expect(result).toBe("aGVsbG8");
        });

        it("should encode string with special characters", () => {
            const result = base64urlEncode("hello world!");

            expect(result).not.toContain("+");
            expect(result).not.toContain("/");
            expect(result).not.toContain("=");
        });

        it("should handle empty string", () => {
            const result = base64urlEncode("");
            expect(result).toBe("");
        });

        it("should encode UTF-8 characters", () => {
            const result = base64urlEncode("café");

            expect(result).not.toContain("+");
            expect(result).not.toContain("/");
            expect(result).not.toContain("=");
        });

        it("should replace + with -", () => {
            // String that would produce + in base64
            const result = base64urlEncode("?>>");
            expect(result).not.toContain("+");
            expect(result).toContain("-");
        });

        it("should replace / with _", () => {
            // String that would produce / in base64
            const result = base64urlEncode("???");
            expect(result).not.toContain("/");
        });

        it("should remove padding =", () => {
            // Strings that would produce padding
            expect(base64urlEncode("a")).not.toContain("=");
            expect(base64urlEncode("ab")).not.toContain("=");
            expect(base64urlEncode("abc")).not.toContain("=");
        });
    });

    describe("base64urlEncodeJson", () => {
        it("should encode object to base64url JSON", () => {
            const obj = { name: "test", version: "1.0.0" };
            const result = base64urlEncodeJson(obj);

            expect(result).not.toContain("+");
            expect(result).not.toContain("/");
            expect(result).not.toContain("=");
            expect(typeof result).toBe("string");
        });

        it("should encode simple object", () => {
            const obj = { key: "value" };
            const result = base64urlEncodeJson(obj);

            expect(result).toBeDefined();
            expect(result.length).toBeGreaterThan(0);
        });

        it("should encode nested object", () => {
            const obj = {
                name: "app",
                version: "1.0.0",
                env: { node: "20.0.0" },
            };
            const result = base64urlEncodeJson(obj);

            expect(result).toBeDefined();
            expect(typeof result).toBe("string");
        });

        it("should encode array", () => {
            const arr = ["value1", "value2", "value3"];
            const result = base64urlEncodeJson(arr);

            expect(result).toBeDefined();
            expect(typeof result).toBe("string");
        });

        it("should encode null", () => {
            const result = base64urlEncodeJson(null);
            expect(result).toBe("bnVsbA");
        });

        it("should encode number", () => {
            const result = base64urlEncodeJson(123);
            expect(result).toBeDefined();
        });

        it("should encode boolean", () => {
            const result = base64urlEncodeJson(true);
            expect(result).toBeDefined();
        });

        it("should handle special characters in object values", () => {
            const obj = { message: "hello world! & special chars: +/=" };
            const result = base64urlEncodeJson(obj);

            expect(result).not.toContain("+");
            expect(result).not.toContain("/");
            expect(result).not.toContain("=");
        });
    });
});
