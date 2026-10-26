import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
  type MouseEvent,
} from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { usePanelCopy } from "./PanelPrimitives";
type Entry = {
  id: symbol;
  run: (event: MouseEvent<HTMLButtonElement>) => void;
  label: ReactNode;
};
const BackContext = createContext<{
  register: (entry: Entry) => () => void;
} | null>(null);
function BackControl({ children, className = "", ...props }: ButtonProps) {
  const { fa, s } = usePanelCopy();
  return (
    <Button
      {...props}
      variant="outline"
      className={
        "panel-back-button inline-flex h-10 rounded-xl border-blue-500/20 bg-blue-500/5 text-blue-700 dark:text-blue-300 gap-2 px-4 shadow-none hover:bg-blue-500/10 " +
        className
      }
    >
      {fa ? <ArrowRight size={17} /> : <ArrowLeft size={17} />}
      <span>{children || s("بازگشت", "Back")}</span>
    </Button>
  );
}
export default function BackButton({
  onClick,
  children,
  ...props
}: ButtonProps) {
  const context = useContext(BackContext),
    ref = useRef(onClick),
    label = useRef(children),
    id = useRef(Symbol("back"));
  ref.current = onClick;
  label.current = children;
  const register = context?.register;
  useEffect(
    () =>
      register?.({
        id: id.current,
        run: (event) => ref.current?.(event),
        label: label.current,
      }),
    [register],
  );
  if (context) return null;
  return (
    <BackControl {...props} onClick={onClick}>
      {children}
    </BackControl>
  );
}
export function PanelBackHost({
  children,
  enabled,
  onFallback,
}: {
  children: ReactNode;
  enabled: boolean;
  onFallback: () => void;
}) {
  const entries = useRef(new Map<symbol, Entry>()),
    [, update] = useState(0);
  const register = useCallback((entry: Entry) => {
    entries.current.set(entry.id, entry);
    update((v) => v + 1);
    return () => {
      entries.current.delete(entry.id);
      update((v) => v + 1);
    };
  }, []);
  const { s } = usePanelCopy();
  const active = Array.from(entries.current.values()).at(-1);
  return (
    <BackContext.Provider value={{ register }}>
      {enabled && (
        <div className="panel-back-toolbar mb-5 flex items-center">
          <BackControl
            onClick={(event) => (active ? active.run(event) : onFallback())}
          >
            {s("بازگشت", "Back")}
          </BackControl>
        </div>
      )}
      {children}
    </BackContext.Provider>
  );
}
