// Streaming chat edge function using Lovable AI Gateway
// deno-lint-ignore-file no-explicit-any

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SYSTEM_PROMPT = `شما دستیار هوشمند "نوین وی‌دی‌اس" هستید. یک ارائه‌دهنده خدمات میزبانی وب، سرور مجازی، سرور اختصاصی، سرور ابری و ثبت دامنه در ایران.

خدمات ما:
- هاست اشتراکی (لینوکس ECO / PRO / VIP، هاست ایران، ووکامرس، وردپرس، ویندوز، Node.js، پایتون، دانلود، وارز)
- سرور مجازی (لینوکس، ویندوز، ایران، اروپا، ساعتی، روزانه، مولتی‌لوکیشن، مدیریت شده، میکروتیک)
- سرور اختصاصی (ایران، اروپا، آمریکا، آسیا، GPU، Storage)
- ثبت انواع دامنه (.ir، .com، .net، .org، …)
- کنترل پنل‌ها (cPanel، DirectAdmin، Plesk) و ماژول‌های اضافی
- پشتیبانی ۲۴/۷ و امکان تهیه سرور به‌صورت ساعتی

لحن شما:
- کاملاً فارسی، دوستانه، حرفه‌ای و مختصر
- از نیم‌فاصله و اعداد فارسی استفاده کن
- در صورت نیاز از Markdown (لیست، هایلایت) استفاده کن
- اگر سؤال خارج از حوزه است، به مؤدبانه به سمت خدمات شرکت هدایت کن
- درخواست‌های تخصصی (تیکت، پرداخت، دسترسی مستقیم به حساب) را به پنل کاربری یا پشتیبانی ارجاع بده
`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  if (!LOVABLE_API_KEY) {
    return new Response(JSON.stringify({ error: "LOVABLE_API_KEY not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { messages } = await req.json() as { messages: { role: string; content: string }[] };

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": LOVABLE_API_KEY,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        stream: true,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      let msg = "خطا در ارتباط با سرویس هوشمند";
      if (resp.status === 429) msg = "تعداد درخواست‌ها زیاد است. لطفاً کمی صبر کنید.";
      if (resp.status === 402) msg = "اعتبار سرویس هوشمند تمام شده است.";
      return new Response(JSON.stringify({ error: msg, detail: text }), {
        status: resp.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(resp.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message ?? "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
