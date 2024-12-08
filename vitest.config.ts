import { defineConfig } from "vitest/config";
import { WxtVitest } from "wxt/testing";

export default defineConfig({
  test: {
    mockReset: true,
    restoreMocks: true,
    include: ["./entrypoints/**/*.test.ts"],
  },

  plugins: [WxtVitest()],
});
