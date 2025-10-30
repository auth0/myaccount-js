import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        ignores: ["dist/**", "coverage/**", "docs/**", "node_modules/**", "*.config.js", "*.config.mjs", "scripts/**"],
    },
    {
        // Relaxed rules for Fern-generated code
        files: ["src/Client.ts", "src/api/**", "src/core/**", "src/errors/**"],
        rules: {
            "@typescript-eslint/no-namespace": "off",
            "@typescript-eslint/no-empty-object-type": "off",
            "@typescript-eslint/no-unsafe-function-type": "off",
            "@typescript-eslint/ban-ts-comment": "off",
            "prefer-const": "off",
            "no-case-declarations": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unused-vars": "off",
        },
    },
    {
        // Custom code rules (wrappers, tests, etc.)
        files: ["src/wrappers/**", "src/utils/**", "tests/**", "example.ts"],
        rules: {
            "@typescript-eslint/no-namespace": "off", // Allow namespaces in wrappers
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                },
            ],
            "@typescript-eslint/no-unsafe-function-type": "warn",
            "@typescript-eslint/ban-ts-comment": [
                "warn",
                {
                    "ts-expect-error": "allow-with-description",
                    minimumDescriptionLength: 3,
                },
            ],
        },
    },
];
