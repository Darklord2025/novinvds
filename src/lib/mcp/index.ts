import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listHostingServices from "./tools/list-hosting-services";

const projectRef = import.meta.env["VITE_SUPABASE_PROJECT_ID"] ?? "project-ref-unset";

export default defineMcp({
  name: "novinvds",
  title: "novinvds",
  version: "0.1.0",
  instructions: "Tools for novinvds customers. Read the signed-in user's hosting services.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listHostingServices],
});
