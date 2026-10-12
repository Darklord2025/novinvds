import { defineTool } from "@lovable.dev/mcp-js";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_hosting_services",
  title: "List my hosting services",
  description: "List the signed-in user's hosting services with domain, status, panel, usage and expiry.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async (_input, ctx) => {
    if (!ctx.isAuthenticated()) return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    const { data, error } = await supabaseForUser(ctx)
      .from("hosting_services")
      .select("id, service_name, domain, status, panel_type, server_location, disk_used_mb, bandwidth_used_mb, expires_at, created_at")
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    const services = (data ?? []).map((s) => ({
      id: s.id, service_name: s.service_name, domain: s.domain, status: String(s.status),
      panel_type: String(s.panel_type), server_location: s.server_location,
      disk_used_mb: s.disk_used_mb, bandwidth_used_mb: s.bandwidth_used_mb,
      expires_at: s.expires_at, created_at: s.created_at,
    }));
    return { content: [{ type: "text", text: JSON.stringify(services) }], structuredContent: { services } };
  },
});
