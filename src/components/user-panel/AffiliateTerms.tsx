import { usePanelCopy } from "./PanelPrimitives";
import { FileCheck } from "lucide-react";
export default function AffiliateTerms({
  rate,
  contract,
}: {
  rate?: number;
  contract?: string;
}) {
  const { s, n } = usePanelCopy();
  const sections = [
    [
      "عضویت و اطلاعات حساب",
      "Enrollment and account details",
      "همکاری پس از تأیید حساب و اختصاص کد معرفی فعال می‌شود. اطلاعات هویتی و حساب بانکی برای برداشت باید متعلق به صاحب حساب و قابل بررسی باشد. عضویت یا تعداد کلیک، تضمین درآمد نیست.",
      "The program starts after account approval and referral-code assignment. Identity and withdrawal account details must belong to the account holder and be verifiable. Enrollment and clicks do not guarantee income.",
    ],
    [
      "ثبت و انتساب معرفی",
      "Referral attribution",
      "مشتری باید از لینک یا کد اختصاصی شما وارد شود و انتساب او در سامانه ثبت و تأیید شود. تغییر دستی معرف پس از خرید تضمین نمی‌شود. بازه انتساب و خدمات واجد شرایط مطابق قرارداد تأییدشده حساب است؛ صرف کلیک یا اسکرین‌شات، تأیید معرفی محسوب نمی‌شود.",
      "A customer must use your assigned link or code and have attribution recorded and verified by the system. Manual reassignment after purchase is not guaranteed. Attribution windows and eligible services follow your approved account agreement. A click or screenshot alone does not verify a referral.",
    ],
    [
      "مبنای محاسبه پورسانت",
      "Commission calculation",
      "نرخ، همان نرخ تأییدشده حساب است. مبنا، مبلغ خالص خرید واجد شرایط پس از تخفیف و پیش از مالیات است. مالیات، شارژ کیف پول و واریز تأییدنشده پورسانت ایجاد نمی‌کنند. مشمول بودن تمدید و محصولات خاص باید در قرارداد مشخص شود.",
      "The approved account rate applies to eligible net purchases after discounts and before tax. Tax, wallet funding and unverified deposits do not earn commission. Renewal and product-specific eligibility must be specified in the agreement.",
    ],
    [
      "تأیید خرید و وضعیت‌ها",
      "Purchase verification and statuses",
      "پورسانت تا دریافت تأیید پرداخت، انتساب و نرخ همکاری در وضعیت بررسی باقی می‌ماند. خرید لغوشده، برگشتی، ناموفق یا تقلبی قابل تأیید نیست. خطا یا استرداد خرید می‌تواند باعث اصلاح پورسانت مطابق سابقه قابل پیگیری شود.",
      "Commission remains under review until payment, attribution and program rate are verified. Cancelled, refunded, failed or fraudulent purchases are ineligible. Errors or refunds may lead to a traceable commission adjustment.",
    ],
    [
      "واریز مستقیم به کیف پول",
      "Direct wallet credit",
      "پورسانت تأییدشده مستقیماً به موجودی تومانی کیف پول واریز می‌شود؛ برای هر خرید فقط یک بار. همان موجودی برای خرید سرویس یا درخواست برداشت قابل استفاده است. درآمد در انتظار بررسی، موجودی قابل برداشت نیست.",
      "Verified commission is credited directly to your Toman wallet once per eligible purchase. Use that balance for services or a withdrawal request. Pending income is not withdrawable balance.",
    ],
    [
      "برداشت و تسویه",
      "Withdrawal and settlement",
      "درخواست برداشت از مدیریت کیف پول ثبت می‌شود. مالکیت حساب مقصد باید تأیید شود؛ مبلغ و کارمزد، در صورت وجود، پیش از ثبت درخواست نمایش داده می‌شود. زمان تسویه و حداقل برداشت تابع مقررات اعلام‌شده در همان درخواست است و زمان قطعی اعلام‌نشده‌ای تضمین نمی‌شود.",
      "Request a payout through Wallet management. Destination ownership must be verified. The amount and any fees are shown before submission. Settlement timing and minimums follow the terms displayed in that request; no unspecified completion time is guaranteed.",
    ],
    [
      "روش‌های مجاز تبلیغ",
      "Permitted marketing",
      "می‌توانید از لینک اختصاصی، بنرها و محتوای معرفی با توضیح دقیق سرویس استفاده کنید. در تبلیغ، شرایط واقعی، محدودیت‌ها و رابطه همکاری را شفاف بیان کنید. استفاده از نام تجاری باید مطابق راهنمای برند و بدون ادعای نمایندگی رسمی باشد.",
      "Use your referral link, banners and accurate service descriptions. Clearly disclose material limits and your affiliate relationship. Follow brand guidance and do not imply official representation.",
    ],
    [
      "تخلفات و معرفی غیرواقعی",
      "Abuse and invalid referrals",
      "اسپم، خرید اجباری، معرفی خود، حساب‌های صوری یا چندگانه برای دریافت پاداش، جعل هویت، کلیک مصنوعی، ربودن انتساب و وعده قیمت یا درآمد غیرواقعی مجاز نیست. موارد مشکوک تا پایان بررسی متوقف می‌شوند.",
      "Spam, forced purchases, self-referrals, fake or duplicate reward accounts, impersonation, artificial clicks, attribution hijacking and misleading price or earnings claims are prohibited. Suspicious cases may be held for review.",
    ],
    [
      "حریم خصوصی مشتریان",
      "Customer privacy",
      "اطلاعات شخصی یا دسترسی مشتری را برای معرفی دریافت نکنید. گزارش همکاری فقط داده لازم برای پیگیری را نمایش می‌دهد؛ کلمه عبور، اطلاعات پرداخت یا مدارک هویتی مشتری نباید در تبلیغات یا گزارش عمومی منتشر شود.",
      "Do not collect customer credentials or personal documents to make a referral. Reports expose only information needed for tracking. Never publish customer passwords, payment details or identity documents.",
    ],
    [
      "پاداش مشتری معرفی‌شده",
      "Referred customer reward",
      "پس از یک میلیون تومان خرید تأییدشده، مشتری واجد شرایط یک کد یک‌بارمصرف با تخفیف تصادفی ۳، ۵، ۷ یا ۱۰ درصد و سقف صد هزار تومان دریافت می‌کند. انتخاب دوباره انجام نمی‌شود؛ اعتبار کد ۳۰ روز است. شارژ کیف پول به حد نصاب خرید اضافه نمی‌شود.",
      "After 1,000,000 Toman in verified purchases, an eligible referred customer receives one single-use randomly selected 3%, 5%, 7% or 10% coupon, capped at 100,000 Toman. It cannot be redrawn and expires after 30 days. Wallet funding does not count toward the threshold.",
    ],
    [
      "پیگیری اختلاف و پایان همکاری",
      "Disputes and ending participation",
      "برای اختلاف، شناسه خرید یا پورسانت را در تیکت بخش فروش ارسال کنید. درخواست شما با سوابق پرداخت و انتساب بررسی می‌شود. پایان همکاری یا تعلیق، مانع بررسی درآمد معتبر قبلی نیست؛ مبالغ مرتبط با تخلف یا استرداد تا تعیین نتیجه تسویه نمی‌شوند.",
      "Submit purchase or commission IDs in a sales ticket for a dispute. Reviews use payment and attribution records. Ending or suspending participation does not prevent review of earlier valid earnings; disputed fraud or refund amounts remain on hold until resolved.",
    ],
    [
      "نسخه شرایط و نرخ قرارداد",
      "Terms version and contract rate",
      "نرخ اختصاصی، بازه انتساب و فهرست خدمات مشمول باید در حساب شما ثبت شود. تغییر شرایط برای همکاری‌های بعدی اطلاع‌رسانی می‌شود؛ نرخ ثبت‌شده خرید قبلی نباید بدون سابقه و دلیل اصلاح شود. متن اختصاصی قرارداد تأییدشده در پایین نمایش داده می‌شود.",
      "Your assigned rate, attribution period and eligible services must be recorded on your account. Changes for future referrals are communicated. A past purchase rate must not be altered without a reason and audit record. Approved account-specific contract text appears below.",
    ],
  ];
  return (
    <section className="space-y-5">
      <header className="rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-700 p-6 text-white space-y-3">
        <FileCheck size={30} />
        <h2 className="text-xl font-bold">
          {s("شرایط همکاری در فروش", "Affiliate program terms")}
        </h2>
        <p className="text-sm leading-7">
          {s(
            "راهنمای محاسبه، تبلیغ و تسویه درآمد معرفی. نرخ و محدوده خدمات مشمول، تابع قرارداد تأییدشده حساب شماست.",
            "How referrals are marketed, calculated and settled. Your approved account agreement determines rates and eligible services.",
          )}
        </p>
        <p className="text-sm">
          {s("نرخ تأییدشده حساب", "Approved account rate")}:{" "}
          <strong>
            {rate == null
              ? s(
                  "پس از تأیید همکاری تعیین می‌شود",
                  "Assigned after program approval",
                )
              : n(rate) + "%"}
          </strong>
        </p>
      </header>
      <div className="grid md:grid-cols-2 gap-4">
        {sections.map(([faTitle, enTitle, faText, enText], i) => (
          <article key={i} className="rounded-2xl border bg-card p-5">
            <h3 className="font-bold mb-3 text-blue-700 dark:text-blue-300">
              {n(i + 1)}. {s(faTitle, enTitle)}
            </h3>
            <p className="text-sm leading-8 text-muted-foreground">
              {s(faText, enText)}
            </p>
          </article>
        ))}
      </div>
      {contract && (
        <section className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 space-y-3">
          <h3 className="font-bold">
            {s("شرایط اختصاصی ثبت‌شده حساب", "Recorded account-specific terms")}
          </h3>
          <p className="text-sm leading-8 whitespace-pre-wrap">{contract}</p>
        </section>
      )}
    </section>
  );
}
