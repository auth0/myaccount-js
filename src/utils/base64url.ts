/**
 * Simple base64url encoding utility using core base64 functions
 */

import { base64Encode } from "../core/base64.js";

/**
 * Converts a string to base64url encoding
 * @param str - The string to encode
 * @returns The base64url encoded string
 */
export function base64urlEncode(str: string): string {
    // Use core base64 encode function
    const base64 = base64Encode(str);

    // Convert base64 to base64url by replacing characters and removing padding
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

/**
 * Converts an object to a base64url encoded JSON string
 * @param obj - The object to encode
 * @returns The base64url encoded JSON string
 */
export function base64urlEncodeJson(obj: unknown): string {
    const jsonString = JSON.stringify(obj);
    return base64urlEncode(jsonString);
}
