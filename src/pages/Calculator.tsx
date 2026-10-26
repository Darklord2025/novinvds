import { useSearchParams } from "react-router-dom";
import PublicOrder from "@/components/public/PublicOrder";
export default function Calculator() {
  const [q] = useSearchParams();
  const kind =
    q.get("kind") === "hosting"
      ? "hosting"
      : q.get("kind") === "dedicated"
        ? "dedicated"
        : "vps";
  return <PublicOrder key={kind} kind={kind} calculator />;
}
