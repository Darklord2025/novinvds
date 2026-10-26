import { supabase } from "@/integrations/supabase/client";
export async function accountApi(
  action: string,
  payload: Record<string, unknown> = {},
) {
  const { data, error } = await supabase.functions.invoke("account-security", {
    body: { action, ...payload },
  });
  if (error || data?.error)
    throw Error(
      data?.error || "سرویس حساب در دسترس نیست / Account service unavailable",
    );
  return data;
}
