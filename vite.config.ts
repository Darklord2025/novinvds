import { fetchMarketSnapshot } from "./supabase/functions/_shared/market-data";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { mcpPlugin } from "@lovable.dev/mcp-js/stacks/supabase/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && {
      name: "local-market-rates",
      configureServer(server: any) {
        server.middlewares.use(
          "/api/market-rates",
          async (_req: any, res: any) => {
            try {
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify(await fetchMarketSnapshot()));
            } catch {
              res.statusCode = 503;
              res.end("{}");
            }
          },
        );
      },
    },
    mcpPlugin(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
