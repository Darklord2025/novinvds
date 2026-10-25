import { resolveSupportContext } from "../_shared/support-routing.ts";
import {proratedHostingUpgrade} from "../_shared/hosting-upgrade.ts";
import { check, cors, guard, json, provider, text } from "../_shared/panel.ts";
const amount = (v: unknown) => {
  const n = Number(v);
  if (!Number.isSafeInteger(n) || n <= 0 || n > 100000000000)
    throw Error("Invalid amount");
  return n;
};
const validExpiry = (v: unknown) =>
  typeof v === "string" &&
  Number.isFinite(Date.parse(v)) &&
  Date.parse(v) > Date.now();
const blankProfile = {
  kind: "personal",
  name: "",
  company: "",
  nationalId: "",
  economicCode: "",
  registrationNumber: "",
  postalCode: "",
  address: "",
  email: "",
  username: "",
};
const preferences = {
  login: true,
  email: true,
  inPanel: true,
  invoice: true,
  renewal: true,
  ticket: true,
  wallet: true,
  marketing: false,
  thresholdToman: 100000,
};
function profile(input: any, email: string) {
  const p: Record<string, string> = { ...blankProfile };
  for (const key of Object.keys(p))
    p[key] = text(input?.[key], key === "address" ? 2000 : 200);
  for (const key of [
    "nationalId",
    "postalCode",
    "economicCode",
    "registrationNumber",
  ])
    p[key] = p[key]
      .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
      .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
  p.kind = input?.kind === "company" ? "company" : "personal";
  p.email = email;
  if (p.username && !/^[A-Za-z0-9_]{3,32}$/.test(p.username))
    throw Error("Invalid username");
  return p;
}
function official(p: any) {
  return (
    p.name &&
    p.address &&
    /^\d{10}$/.test(p.postalCode) &&
    new RegExp(p.kind === "company" ? "^\\d{11}$" : "^\\d{10}$").test(
      p.nationalId,
    ) &&
    (p.kind !== "company" || (p.company && p.economicCode))
  );
}
Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);
  try {
    const ctx = await guard(req),
      db = ctx.db,
      uid = ctx.user.id,
      b = await req.json(),
      a = String(b.action),
      now = new Date().toISOString();
    const own = async (table: string, id: string) => {
      const { data } = check(
        await db
          .from(table)
          .select("*")
          .eq("user_id", uid)
          .eq("id", id)
          .single(),
      );
      return data;
    };
    if (a === "snapshot") {
      const tables = [
        "panel_profiles",
        "panel_preferences",
        "panel_tickets",
        "panel_ledger",
        "panel_invoices",
        "panel_inventory",
        "panel_requests",
        "panel_affiliates",
        "panel_referral_rewards",
      ];
      const results = await Promise.all(
        tables.map((t) => db.from(t).select("*").eq("user_id", uid)),
      );
      results.forEach(check);
      const [
        p,
        prefs,
        tickets,
        ledger,
        invoices,
        inventory,
        requests,
        affiliates,
        rewards,
      ] = results.map((r) => r.data || []);
      const initial = profile(
        {
          ...p[0]?.data,
          name: p[0]?.data?.name || ctx.user.user_metadata.full_name || "",
          username:
            p[0]?.data?.username || ctx.user.user_metadata.username || "",
        },
        ctx.user.email!,
      );
      check(
        await db.from("panel_profiles").upsert({ user_id: uid, data: initial }),
      );
      const { data: referral } = check(
        await db
          .from("panel_referrals")
          .select("referred_id")
          .eq("referred_id", uid)
          .maybeSingle(),
      );
      const paidToman = invoices
          .filter((i) => i.data.status === "Paid")
          .reduce((sum, i) => sum + Number(i.settled_toman), 0),
        reward = rewards[0];
      const { data: notices } = check(
        await db
          .from("panel_notifications")
          .select("*")
          .or("user_id.eq." + uid + ",user_id.is.null")
          .order("created_at", { ascending: false })
          .limit(200),
      );
      const { data: reads } = check(
        await db
          .from("panel_notification_reads")
          .select("notification_id")
          .eq("user_id", uid),
      );
      const readIds = new Set(reads.map((r) => r.notification_id));
      return json({
        notifications: notices.map((v) => ({
          id: v.id,
          title: v.title,
          body: v.body,
          important: v.important,
          at: v.created_at,
          read: readIds.has(v.id),
        })),
        referralReward: referral
          ? {
              eligible: paidToman >= 1000000,
              paidToman,
              thresholdToman: 1000000,
              coupon: reward
                ? {
                    code: reward.code,
                    percent: reward.percent,
                    capToman: reward.cap_toman,
                    expiresAt: reward.expires_at,
                    redeemed: !!reward.redeemed_invoice,
                  }
                : undefined,
            }
          : undefined,
        affiliate: affiliates[0]?.data,
        profile: initial,
        preferences: { ...preferences, ...prefs[0]?.data },
        tickets: tickets
          .map((t) => ({
            id: t.id,
            number: t.number,
            subject: t.subject,
            department: t.department,
            context: t.context,
            status: t.status,
            createdAt: t.created_at,
            messages: t.messages,
            survey: t.survey,
          }))
          .sort((a, b) => b.number - a.number),
        ledger: ledger
          .map((r) => ({
            id: r.id,
            at: r.at,
            category: r.category,
            description: r.description,
            amountToman: r.amount_toman,
            status: r.status,
            originalCurrency: r.original_currency,
            originalAmount: r.original_amount,
            rateToman: r.rate_toman,
          }))
          .sort((a, b) => b.at.localeCompare(a.at)),
        invoices: invoices.map((i) => ({ ...i.data, id: i.id, demo: false })),
        services: inventory
          .filter((i) => i.kind !== "domain")
          .map((i) => ({ ...i.data, id: i.id, kind: i.kind })),
        domains: inventory
          .filter((i) => i.kind === "domain")
          .map((i) => ({ ...i.data, id: i.id })),
        requests: requests.map((r) => ({
          id: r.id,
          kind: r.kind,
          status: r.status,
          amountToman: r.kind === "withdraw" ? r.data?.amountToman : undefined,
          createdAt: r.created_at,
        })),
      });
    }
    if (a === "profile") {
      const existing = check(
        await db
          .from("panel_profiles")
          .select("data")
          .eq("user_id", uid)
          .single(),
      ).data.data;
      const data = profile(b.profile, ctx.user.email!);
      data.kind = existing.kind || "personal";
      if (data.kind === "company")
        for (const key of [
          "name",
          "company",
          "nationalId",
          "economicCode",
          "registrationNumber",
        ])
          data[key] = existing[key];
      check(await db.from("panel_profiles").upsert({ user_id: uid, data }));
      return json({ ok: true });
    }
    if (a === "preferences") {
      const data: Record<string, boolean | number> = { ...preferences };
      for (const key of Object.keys(data)) {
        if (key === "thresholdToman") {
          const n = Number(b.preferences?.[key]);
          if (!Number.isSafeInteger(n) || n < 0)
            throw Error("Invalid threshold");
          data[key] = n;
        } else data[key] = !!b.preferences?.[key];
      }
      check(await db.from("panel_preferences").upsert({ user_id: uid, data }));
      return json({ ok: true });
    }
    if (a === "ticket-create") {
      const subject = text(b.subject, 200),
        body = text(b.body);
      if (subject.length < 3 || body.length < 5)
        throw Error("Complete ticket details");
      const department = text(b.department, 32);
      const context = await resolveSupportContext(department, b.context, async id => {
        const resource = await own("panel_inventory", id);
        return {id:resource.id,kind:resource.kind,name:text(resource.kind === "domain" ? resource.data.domain : resource.data.name,253)};
      });
      const { data } = check(
        await db
          .from("panel_tickets")
          .insert({
            user_id: uid,
            subject,
            department,
            context,
            messages: [{ body, at: now, sender: "customer" }],
          })
          .select("*")
          .single(),
      );
      return json({
        id: data.id,
        number: data.number,
        subject: data.subject,
        department: data.department,
        context: data.context,
        status: data.status,
        createdAt: data.created_at,
        messages: data.messages,
      });
    }
    if (a === "ticket-survey") {
      await own("panel_tickets", b.id);
      const rating = Number(b.rating);
      if (!Number.isInteger(rating) || rating < 1 || rating > 5)
        throw Error("Invalid rating");
      check(
        await db
          .from("panel_tickets")
          .update({
            survey: { rating, comment: text(b.comment, 2000), at: now },
          })
          .eq("id", b.id)
          .eq("user_id", uid),
      );
      return json({ ok: true });
    }
    if (a === "account-conversion" || a === "representative-change") {
      const existing = check(
        await db
          .from("panel_profiles")
          .select("data")
          .eq("user_id", uid)
          .single(),
      ).data.data;
      if (
        (a === "account-conversion" && existing.kind === "company") ||
        (a === "representative-change" && existing.kind !== "company")
      )
        throw Error("Invalid account conversion");
      const details: Record<string, string> =
        a === "account-conversion"
          ? profile({ ...b.profile, kind: "company" }, ctx.user.email!)
          : {
              name: text(b.name, 150),
              nationalId: text(b.nationalId, 10),
              reason: text(b.reason, 2000),
            };
      if (
        (a === "account-conversion" && !official(details)) ||
        (a === "representative-change" &&
          (!details.name ||
            !/^\d{10}$/.test(details.nationalId) ||
            details.reason.length < 20))
      )
        throw Error("Complete identity details");
      const { data } = check(
        await db.rpc("panel_identity_request", {
          p_user: uid,
          p_kind: a,
          p_data: details,
        }),
      );
      return json({ ticketNumber: data, status: "pending" });
    }
    if (a === "ticket-close") {
      await own("panel_tickets", text(b.id, 36));
      check(
        await db
          .from("panel_tickets")
          .update({ status: "closed" })
          .eq("id", b.id)
          .eq("user_id", uid),
      );
      return json({ ok: true });
    }
    if (a === "ticket-reply") {
      check(
        await db.rpc("panel_ticket_reply", {
          p_user: uid,
          p_id: b.id,
          p_body: text(b.body),
        }),
      );
      return json({ ok: true });
    }
    if (a === "notifications-read") {
      if (!Array.isArray(b.ids) || b.ids.length > 200)
        throw Error("Invalid notification list");
      if (!b.ids.length) return json({ ok: true });
      const { data } = check(
        await db
          .from("panel_notifications")
          .select("id")
          .in("id", b.ids)
          .or("user_id.eq." + uid + ",user_id.is.null"),
      );
      check(
        await db
          .from("panel_notification_reads")
          .upsert(data.map((v) => ({ user_id: uid, notification_id: v.id }))),
      );
      return json({ ok: true });
    }
    if (a === "reward-claim") {
      const random = new Uint32Array(1);
      crypto.getRandomValues(random);
      const percent = [3, 5, 7, 10][random[0] % 4];
      const { data } = check(
        await db.rpc("panel_claim_referral_reward", {
          p_user: uid,
          p_percent: percent,
        }),
      );
      return json({
        code: data.code,
        percent: data.percent,
        capToman: data.cap_toman,
        expiresAt: data.expires_at,
      });
    }
    if (a === "discount-preview") {
      const { data } = check(
        await db
          .from("panel_referral_rewards")
          .select("*")
          .eq("user_id", uid)
          .eq("code", text(b.code, 30))
          .single(),
      );
      if (data.redeemed_invoice || Date.parse(data.expires_at) <= Date.now())
        throw Error("Coupon expired or used");
      return json({ percent: data.percent, capToman: data.cap_toman });
    }
    if (a === "bank-save") {
      const iban = text(b.iban, 26).toUpperCase(),
        owner = text(b.owner, 200);
      if (!/^IR\d{24}$/.test(iban) || !owner)
        throw Error("Invalid bank details");
      const { data } = check(
        await db
          .from("panel_requests")
          .insert({
            user_id: uid,
            kind: "bank-verification",
            data: { iban, owner },
          })
          .select("id")
          .single(),
      );
      return json({ id: data.id, status: "pending" });
    }
    if (a === "withdraw") {
      const n = amount(b.amountToman);
      let iban, owner;
      if (b.source === "saved") {
        const { data } = check(
          await db
            .from("panel_bank_accounts")
            .select("iban,owner_name")
            .eq("user_id", uid)
            .single(),
        );
        iban = data.iban;
        owner = data.owner_name;
      } else {
        iban = text(b.iban, 26).toUpperCase();
        owner = text(b.owner, 200);
        if (!/^IR\d{24}$/.test(iban) || !owner)
          throw Error("Invalid bank details");
      }
      const { data } = check(
        await db.rpc("panel_request_withdrawal", {
          p_user: uid,
          p_amount: n,
          p_data: {
            source: b.source === "saved" ? "saved" : "other",
            iban,
            owner,
            requiresOwnershipReview: true,
          },
        }),
      );
      return json({ id: data, status: "pending" });
    }
    if (a === "official-invoice") {
      const existing = check(
        await db
          .from("panel_profiles")
          .select("data")
          .eq("user_id", uid)
          .single(),
      ).data.data;
      const p = profile({ ...b.profile, kind: existing.kind }, ctx.user.email!);
      if (!official(p)) throw Error("Complete official invoice details");
      await own("panel_invoices", b.invoiceId);
      const { data } = check(
        await db.rpc("panel_official_request", {
          p_user: uid,
          p_invoice: b.invoiceId,
          p_profile: p,
        }),
      );
      return json({ ticketNumber: data, status: "pending" });
    }
    if (a === "renewal") {
      const inventory = await own("panel_inventory", text(b.serviceId, 253)),
        months = Number(b.months),
        unit = String(b.unit || "months");
      const cycle = inventory.data.billingCycle;
      if (cycle === "OneTime") {
        if (unit !== "provider") throw Error("Provider eligibility required");
      } else if (cycle === "Daily") {
        if (unit !== "days" || ![1, 7, 30, 90].includes(months))
          throw Error("Invalid daily term");
      } else if (
        unit !== "months" ||
        !(inventory.kind === "domain" ? [12, 60] : [1, 3, 6, 12, 24]).includes(
          months,
        )
      )
        throw Error("Invalid term");
      if (inventory.kind === "hourly" || cycle === "Hourly")
        throw Error("Hourly services use wallet credit");
      if (
        inventory.kind === "domain" &&
        !(
          String(inventory.data.domain || inventory.data.name || inventory.id)
            .toLowerCase()
            .endsWith(".ir")
            ? [12, 60]
            : [12]
        ).includes(months)
      )
        throw Error("Invalid domain term");
      // The provider verifies expired-service eligibility, redemption fees and authoritative pricing.
      const q = await provider("renewal-quote", {
        userId: uid,
        serviceId: inventory.id,
        unit,
        count: cycle === "OneTime" ? undefined : months,
        months: unit === "months" ? months : undefined,
      });
      if (cycle === "OneTime" && q.renewable !== true)
        throw Error("Provider does not offer renewal for this purchase");
      const subtotal = amount(q.subtotalToman);
      if (!q.reference || !validExpiry(q.expiresAt))
        throw Error("Invalid renewal quote");
      const id = crypto.randomUUID(),
        p = check(
          await db
            .from("panel_profiles")
            .select("data")
            .eq("user_id", uid)
            .maybeSingle(),
        ).data?.data;
      const invoice = {
        id,
        issueDate: now.slice(0, 10),
        dueDate: q.expiresAt.slice(0, 10),
        status: "Unpaid",
        currency: "TOMAN",
        proforma: true,
        buyer: p,
        items: [
          {
            name:
              inventory.kind === "domain"
                ? inventory.data.domain
                : inventory.data.name,
            description: "تمدید / Renewal",
            quantity: 1,
            price: subtotal,
            period:
              unit === "provider"
                ? "پوشش تاییدشده / Verified coverage"
                : months + (unit === "days" ? " روز / days" : " ماه / months"),
          },
        ],
        tax: Math.round(subtotal * 0.1),
        renewal: {
          serviceId: inventory.id,
          months,
          quoteReference: q.reference,
          expiresAt: q.expiresAt,
        },
      };
      check(
        await db
          .from("panel_invoices")
          .insert({ id, user_id: uid, data: invoice }),
      );
      return json({ invoiceId: id });
    }
    if (a === "deposit-quote") {
      const value = Number(b.amount),
        currency = text(b.currency, 5),
        method = text(b.method, 20);
      if (
        !Number.isFinite(value) ||
        value <= 0 ||
        !["USD", "EUR", "USDT", "BTC", "ETH"].includes(currency)
      )
        throw Error("Invalid quote request");
      const q = await provider("conversion-quote", {
        userId: uid,
        currency,
        amount: value,
        method,
      });
      if (
        !q.reference ||
        !Number.isFinite(q.rateToman) ||
        q.rateToman <= 0 ||
        !Number.isFinite(q.amountToman) ||
        q.amountToman !== Math.round(value * q.rateToman) ||
        !validExpiry(q.expiresAt)
      )
        throw Error("Invalid conversion quote");
      const { data } = check(
        await db
          .from("panel_conversion_quotes")
          .insert({
            user_id: uid,
            currency,
            amount: value,
            method,
            rate_toman: q.rateToman,
            amount_toman: amount(q.amountToman),
            provider_reference: q.reference,
            expires_at: q.expiresAt,
          })
          .select("id")
          .single(),
      );
      return json({
        id: data.id,
        rateToman: q.rateToman,
        amountToman: q.amountToman,
        expiresAt: q.expiresAt,
      });
    }
    if (a === "deposit" || a === "invoice-pay") {
      const method = text(b.method, 20);
      if (
        ![
          "card",
          "card2card",
          "transfer",
          "crypto",
          "perfectmoney",
          "wallet",
        ].includes(method)
      )
        throw Error("Invalid payment method");
      let data: any;
      if (a === "invoice-pay") {
        const invoice = await own("panel_invoices", b.invoiceId);
        const upgrade = invoice.data.hostingUpgrade;
        if (upgrade && !validExpiry(upgrade.expiresAt))
          throw Error("Hosting upgrade quote expired; request a new quote");
        if (!["Unpaid", "Overdue"].includes(invoice.data.status))
          throw Error("Invoice is not payable");
        data = { invoiceId: invoice.id, method };
      } else {
        if (method === "wallet") throw Error("Wallet cannot top itself up");
        const currency = text(b.currency, 5),
          value = Number(b.amount);
        let toman: number, reference: string | undefined;
        if (["TOMAN", "IRR"].includes(currency)) {
          toman = amount(currency === "IRR" ? value / 10 : value);
        } else {
          const q = await own("panel_conversion_quotes", b.quoteId);
          if (
            q.currency !== currency ||
            Number(q.amount) !== value ||
            q.method !== method ||
            !validExpiry(q.expires_at)
          )
            throw Error("Quote expired or mismatched");
          toman = q.amount_toman;
          reference = q.provider_reference;
        }
        data = {
          amount: value,
          currency,
          amountToman: toman,
          method,
          quoteReference: reference,
        };
      }
      const result = await provider("checkout", { ...data, userId: uid });
      const url = new URL(result.checkoutUrl);
      const hosts = (Deno.env.get("PANEL_CHECKOUT_HOSTS") || "")
        .split(",")
        .map((s) => s.trim());
      if (url.protocol !== "https:" || !hosts.includes(url.hostname))
        throw Error("Checkout host is not approved");
      return json({ checkoutUrl: url.href });
    }
    if (a === "domain-request") {
      const domain = await own("panel_inventory", b.domainId);
      if (
        domain.kind !== "domain" ||
        b.operation !== "nameservers" ||
        !Array.isArray(b.nameservers) ||
        b.nameservers.length < 2 ||
        b.nameservers.length > 6 ||
        b.nameservers.some(
          (v: unknown) => !/^([a-z0-9-]+\.)+[a-z]{2,}$/i.test(String(v)),
        )
      )
        throw Error("Invalid nameserver request");
      const result = await provider("domain-request", {
        userId: uid,
        domainId: domain.id,
        operation: "nameservers",
        nameservers: b.nameservers,
      });
      return json({ status: "pending", reference: result.reference });
    }
    if(a==='hosting-upgrade'){
      const inventory=await own('panel_inventory',text(b.serviceId,253));
      if(inventory.kind!=='hosting'||inventory.data.status!=='active')throw Error('Active owned hosting service required');
      const target=text(b.targetPlanId,100);if(!/^novin-(seed|sprout|bloom|horizon)$/.test(target))throw Error('Invalid hosting plan');
      const q=await provider('hosting-upgrade-quote',{userId:uid,serviceId:inventory.id,targetPlanId:target});
      if(q.serviceId!==inventory.id||q.currency!=="TOMAN"||q.isUpgrade!==true||q.targetPlanId!==target||!q.reference||!validExpiry(q.expiresAt))throw Error('Invalid upgrade quote');
      const calculation=proratedHostingUpgrade(amount(q.currentPeriodPriceToman),amount(q.targetPeriodPriceToman),String(q.periodStart),String(q.periodEnd));
      const p=check(await db.from('panel_profiles').select('data').eq('user_id',uid).maybeSingle()).data?.data;
      const id=crypto.randomUUID();const invoice={id,issueDate:now.slice(0,10),dueDate:q.expiresAt.slice(0,10),status:'Unpaid',currency:'TOMAN',proforma:true,buyer:p,items:[{name:inventory.data.name,description:'ارتقای پلن میزبانی / Hosting plan upgrade: '+target,quantity:1,price:calculation.subtotal,period:'زمان باقی‌مانده دوره / Remaining billing period'}],tax:calculation.tax,hostingUpgrade:{serviceId:inventory.id,targetPlanId:target,quoteReference:q.reference,periodStart:q.periodStart,periodEnd:q.periodEnd,quotedAt:now,expiresAt:q.expiresAt}};
      const inserted=await db.from('panel_invoices').insert({id,user_id:uid,data:invoice});
      if(inserted.error?.code==='23505'){const existing=check(await db.from('panel_invoices').select('id').eq('user_id',uid).eq('data->hostingUpgrade->>quoteReference',q.reference).single());return json({invoiceId:existing.data.id});}
      check(inserted);return json({invoiceId:id});
    }
    if (a === "hosting-trial-request") {
      if (
        !["ir", "eu"].includes(b.location) ||
        !["linux", "wordpress"].includes(b.workload)||!["ir","de","fi","fr","gb","pl","us","ca","sg","au"].includes(b.country)||typeof b.datacenterId!=="string"||!b.datacenterId.startsWith(b.country+"-")||(b.location==="ir")!==(b.country==="ir")
      )
        throw Error("Invalid hosting trial request");
      const { data: id } = check(
        await db.rpc("panel_request_hosting_trial", {
          p_user: uid,
          p_location: b.location,
          p_workload: b.workload, p_country:b.country,p_datacenter:b.datacenterId,
        }),
      );
      return json({ id, status: "pending", provisioned: false });
    }
    if (a === "cart-invoice") {
      if (
        Array.isArray(b.items) &&
        b.items.some(
          (i: any) =>
            i.meta?.demo ||
            String(i.meta?.supplierPlanId || "").startsWith("demo-"),
        )
      )
        throw Error("Demo supplier plans cannot create a payable invoice");
      if (!Array.isArray(b.items) || !b.items.length || b.items.length > 100)
        throw Error("Invalid cart");
      if (
        b.items.some(
          (i: any) =>
            i.meta?.billing === "trial" || i.meta?.catalogId === "novin-trial",
        )
      )
        throw Error("Use the hosting trial request flow");
      const items = b.items.map((i: any) => ({
        id: text(i.id, 300),
        type: text(i.type, 30),
        quantity: amount(i.quantity),
        meta: i.meta,
      }));
      const q = await provider("cart-quote", { userId: uid, items });
      if (
        !q.reference ||
        !Array.isArray(q.items) ||
        !q.items.length ||
        q.items.some(
          (i: any) =>
            !Number.isSafeInteger(i.price) ||
            i.price < 0 ||
            !Number.isSafeInteger(i.quantity) ||
            i.quantity < 1,
        ) ||
        !validExpiry(q.expiresAt)
      )
        throw Error("Invalid order quote");
      const subtotal = q.items.reduce(
        (sum: number, i: any) => sum + i.price * i.quantity,
        0,
      );
      amount(subtotal);
      const p = check(
        await db
          .from("panel_profiles")
          .select("data")
          .eq("user_id", uid)
          .maybeSingle(),
      ).data?.data;
      const invoice = {
        issueDate: now.slice(0, 10),
        dueDate: q.expiresAt.slice(0, 10),
        status: "Unpaid",
        currency: "TOMAN",
        proforma: true,
        buyer: p,
        items: q.items,
        quoteReference: q.reference,
        quoteExpiresAt: q.expiresAt,
      };
      const { data: id } = check(
        await db.rpc("panel_create_order_invoice", {
          p_user: uid,
          p_invoice: invoice,
          p_reward_code: b.rewardCode ? text(b.rewardCode, 30) : null,
        }),
      );
      return json({ invoiceId: id });
    }
    if (a === "domain-check") {
      const domain = text(b.domain, 253).toLowerCase();
      if (
        !/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+(?:[a-z]{2,63}|xn--[a-z0-9-]{2,59})$/.test(
          domain,
        ) ||
        !(domain.endsWith(".ir") ? [1, 5] : [1]).includes(Number(b.years)) ||
        !["register", "transfer", "existing"].includes(b.mode)
      )
        throw Error("Invalid domain request");
      const result = await provider("domain-check", {
        domain,
        years: Number(b.years),
        mode: b.mode,
        userId: uid,
      });
      if (
        typeof result.available !== "boolean" ||
        (result.available && !Number.isFinite(result.priceToman))
      )
        throw Error("Invalid domain quote");
      return json(result);
    }
    return json({ error: "Unknown action" }, 400);
  } catch (e) {
    return json(
      { error: (e as Error).message || "Account operation failed" },
      400,
    );
  }
});
