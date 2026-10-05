import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import process from "process";

const inlineCss = () => ({
  name: "inline-css",
  apply: "build",
  enforce: "post",
  generateBundle(_, bundle) {
    const html = bundle["index.html"];
    if (!html) return;
    let source = String(html.source);
    for (const [name, chunk] of Object.entries(bundle)) {
      if (!name.endsWith(".css")) continue;
      const tag = new RegExp(`<link[^>]*href="[^"]*${name.split("/").pop()}"[^>]*>`);
      if (tag.test(source)) {
        source = source.replace(tag, () => `<style>${chunk.source}</style>`);
        delete bundle[name];
      }
    }
    html.source = source;
  },
});

const apiProxy = {
  "/api-proxy": {
    target: "https://open-api.delcom.org",
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api-proxy/, "/api/v1"),
  },
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const port = Number(env.APP_PORT) || 3000;

  return {
    plugins: [react(), tailwindcss(), inlineCss()],
    server: { port, proxy: apiProxy },
    preview: { port, proxy: apiProxy },
    define: {
      DELCOM_BASEURL: JSON.stringify(
        env.VITE_DELCOM_BASEURL || "https://open-api.delcom.org/api/v1"
      ),
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            redux: ['@reduxjs/toolkit', 'react-redux'],
            ui: ['@tabler/icons-react', 'sweetalert2']
          }
        }
      }
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.js",
      coverage: {
        provider: "v8",
        reporter: ["text", "json", "html", "lcov"],
        include: ["src/**/*.{js,jsx}"],
        exclude: [
          "src/main.jsx",
          "src/setupTests.js",
          "src/test-utils.jsx",
          "**/*.test.{js,jsx}",
          "node_modules/**",
        ],
        thresholds: { statements: 100, branches: 100, functions: 100, lines: 100 },
      },
    },
  };
});