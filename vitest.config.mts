import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// jsdom fijado en ^27: las versiones 28+ exigen Node >= 22.22 (ver docs/specs/tecnologias.md).
export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    css: false,
  },
});
