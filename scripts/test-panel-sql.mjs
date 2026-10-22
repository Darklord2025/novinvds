import { readFile } from "node:fs/promises";
import assert from "node:assert/strict";
const modulePath = process.env.PGLITE_MODULE;
if (!modulePath)
  throw Error(
    "Set PGLITE_MODULE to the installed @electric-sql/pglite module path",
  );
const { PGlite } = await import(modulePath);
const db = new PGlite();
await db.exec(
  "create role anon;create role authenticated;create role service_role;create schema auth;create table auth.users(id uuid primary key,email text,email_confirmed_at timestamptz,raw_user_meta_data jsonb);",
);
await db.exec(
  await readFile("supabase/migrations/20261018090000_client_panel.sql", "utf8"),
);
await db.exec(
  await readFile(
    "supabase/migrations/20261018100000_reward_checkout.sql",
    "utf8",
  ),
);
await db.exec(
  await readFile(
    "supabase/migrations/20261021120000_hosting_trial.sql",
    "utf8",
  ),
);
await db.exec(
  await readFile(
    "supabase/migrations/20261021130000_affiliate_wallet.sql",
    "utf8",
  ),
);
await db.exec(await readFile('supabase/migrations/20261022120000_order_locations.sql','utf8'));
const u = "00000000-0000-0000-0000-000000000001",
  v = "00000000-0000-0000-0000-000000000002",
  session = "00000000-0000-0000-0000-000000000011";
await db.query(
  "insert into auth.users(id,email,email_confirmed_at) values($1,$2,now()),($3,$4,now())",
  [u, "owner@example.com", v, "other@example.com"],
);
const scalar = async (sql, args = []) =>
  Object.values((await db.query(sql, args)).rows[0])[0];
assert.equal(await scalar("select panel_rate_limit('test',300)"), true);
assert.equal(await scalar("select panel_rate_limit('test',300)"), false);
await db.query(
  "insert into panel_ledger(user_id,category,description,amount_toman,status) values($1,'deposit','confirmed',1000,'confirmed'),($1,'deposit','pending',5000,'pending')",
  [u],
);
await db.query("select panel_request_withdrawal($1,700,'{}')", [u]);
await assert.rejects(
  db.query("select panel_request_withdrawal($1,400,'{}')", [u]),
);
await assert.rejects(
  db.query("select panel_request_withdrawal($1,-1,'{}')", [u]),
);
assert.equal(
  Number(
    await scalar(
      "select sum(amount_toman) from panel_ledger where user_id=$1 and status='confirmed'",
      [u],
    ),
  ),
  1000,
);
const ticket = await scalar(
  "insert into panel_tickets(user_id,subject,department) values($1,'subject','technical') returning id",
  [u],
);
await assert.rejects(
  db.query("select panel_ticket_reply($1,$2,$3)", [v, ticket, "other account"]),
);
await db.query("select panel_ticket_reply($1,$2,$3)", [
  u,
  ticket,
  "owner reply",
]);
assert.equal(
  await scalar(
    "select jsonb_array_length(messages) from panel_tickets where id=$1",
    [ticket],
  ),
  1,
);
await db.query("update panel_tickets set status='closed' where id=$1", [
  ticket,
]);
await assert.rejects(
  db.query("select panel_ticket_reply($1,$2,$3)", [u, ticket, "closed reply"]),
);
await db.query(
  "insert into panel_email_challenges(user_id,session_id,purpose,code_hash,expires_at) values($1,$2,'enable','good',now()+interval '5 minutes')",
  [u, session],
);
for (let i = 0; i < 5; i++)
  assert.equal(
    await scalar("select panel_consume_email_code($1,$2,'enable','wrong')", [
      u,
      session,
    ]),
    false,
  );
assert.equal(
  await scalar("select panel_consume_email_code($1,$2,'enable','good')", [
    u,
    session,
  ]),
  false,
);
await db.query(
  "update panel_email_challenges set attempts=0 where user_id=$1",
  [u],
);
assert.equal(
  await scalar("select panel_consume_email_code($1,$2,'enable','good')", [
    u,
    session,
  ]),
  true,
);
assert.equal(
  await scalar("select panel_consume_email_code($1,$2,'enable','good')", [
    u,
    session,
  ]),
  false,
);
assert.equal(
  await scalar("select email_enabled from panel_security where user_id=$1", [
    u,
  ]),
  true,
);
assert.equal(
  await scalar(
    "select count(*)::int from panel_email_grants where user_id=$1 and session_id=$2",
    [u, session],
  ),
  1,
);
const invoice = await scalar(
  "insert into panel_invoices(user_id,data) values($1,'{}') returning id",
  [u],
);
await assert.rejects(
  db.query("select panel_official_request($1,$2,'{}')", [v, invoice]),
);
const number = await scalar("select panel_official_request($1,$2,'{}')", [
  u,
  invoice,
]);
assert.ok(Number(number) >= 1001);
assert.equal(
  await scalar(
    "select count(*)::int from panel_requests where user_id=$1 and kind='official-invoice'",
    [u],
  ),
  1,
);

// One-way identity conversion requires a private, evidence-backed approval.
await db.query("insert into panel_profiles(user_id,data) values($1,$2)", [
  u,
  {
    kind: "personal",
    name: "Owner",
    email: "owner@example.com",
    username: "owner",
  },
]);
await db.query("select panel_identity_request($1,'account-conversion',$2)", [
  u,
  { kind: "company", company: "Example", name: "Representative" },
]);
await assert.rejects(
  db.query("select panel_identity_request($1,'account-conversion','{}')", [u]),
);
const review = await scalar(
  "select id from panel_requests where user_id=$1 and kind='account-conversion'",
  [u],
);
await assert.rejects(
  db.query("select panel_approve_identity_request($1,'short')", [review]),
);
await db.query(
  "select panel_approve_identity_request($1,'private-evidence-123')",
  [review],
);
assert.equal(
  await scalar("select data->>'kind' from panel_profiles where user_id=$1", [
    u,
  ]),
  "company",
);
await assert.rejects(
  db.query("select panel_identity_request($1,'account-conversion','{}')", [u]),
);
// Only immutable, assigned referral codes create a referral at signup.
await db.query("insert into panel_affiliates values($1,$2)", [
  v,
  { code: "VERIFIED123" },
]);
const referred = "00000000-0000-0000-0000-000000000003";
await db.query(
  "insert into auth.users(id,email,raw_user_meta_data) values($1,'referred@example.com',$2)",
  [referred, { referral_code: "VERIFIED123" }],
);
assert.equal(
  await scalar("select sponsor_id from panel_referrals where referred_id=$1", [
    referred,
  ]),
  v,
);
await assert.rejects(
  db.query("select panel_claim_referral_reward($1,10)", [referred]),
);
await db.query(
  "insert into panel_invoices(user_id,data,settled_toman) values($1,$2,999999)",
  [referred, { status: "Paid" }],
);
await assert.rejects(
  db.query("select panel_claim_referral_reward($1,10)", [referred]),
);
await db.query(
  "insert into panel_invoices(user_id,data,settled_toman) values($1,$2,1)",
  [referred, { status: "Paid" }],
);
const reward = await scalar(
  "select row_to_json(panel_claim_referral_reward($1,7))",
  [referred],
);
const same = await scalar(
  "select row_to_json(panel_claim_referral_reward($1,10))",
  [referred],
);
assert.equal(reward.percent, 7);
assert.equal(same.percent, 7);
assert.equal(same.code, reward.code);
const draft = {
  status: "Unpaid",
  currency: "TOMAN",
  items: [{ name: "Plan", price: 2000000, quantity: 1 }],
  tax: 0,
  discount: 1999999,
};
const order = await scalar("select panel_create_order_invoice($1,$2,$3)", [
  referred,
  draft,
  reward.code,
]);
assert.equal(
  await scalar("select panel_create_order_invoice($1,$2,$3)", [
    referred,
    draft,
    reward.code,
  ]),
  order,
);
const priced = await scalar("select data from panel_invoices where id=$1", [
  order,
]);
assert.equal(priced.discount, 100000);
assert.equal(priced.tax, 190000);
await assert.rejects(
  db.query("select panel_create_order_invoice($1,$2,$3)", [
    u,
    draft,
    reward.code,
  ]),
);
await assert.rejects(
  db.query("select panel_settle_invoice($1,$2,1,'gateway-verified-123')", [
    referred,
    order,
  ]),
);
await assert.rejects(
  db.query(
    "select panel_settle_invoice($1,$2,2090000,'gateway-verified-123')",
    [u, order],
  ),
);
await db.query(
  "select panel_settle_invoice($1,$2,2090000,'gateway-verified-123')",
  [referred, order],
);
await db.query(
  "select panel_settle_invoice($1,$2,2090000,'gateway-verified-123')",
  [referred, order],
);
assert.equal(
  await scalar("select count(*)::int from panel_payment_settlements"),
  1,
);
assert.equal(
  await scalar(
    "select redeemed_invoice from panel_referral_rewards where user_id=$1",
    [referred],
  ),
  order,
);
await assert.rejects(
  db.query("select panel_create_order_invoice($1,$2,$3)", [
    referred,
    draft,
    reward.code,
  ]),
);
await db.exec("set role authenticated");
await assert.rejects(db.query("select * from panel_ledger"));
await assert.rejects(
  db.query("select panel_request_withdrawal($1,1,'{}')", [u]),
);
await assert.rejects(db.query("select * from panel_email_challenges"));
await assert.rejects(
  db.query("select panel_settle_invoice($1,$2,2090000,'forged-payment')", [
    referred,
    order,
  ]),
);
await assert.rejects(
  db.query("select panel_approve_identity_request($1,'forged-evidence-123')", [
    review,
  ]),
);
await db.exec("reset role");
// An unapproved program earns nothing. A verified later purchase credits once.
assert.equal(
  await scalar(
    "select count(*)::int from panel_ledger where category='affiliate'",
  ),
  0,
);
await db.query(
  "update panel_affiliates set data=data||jsonb_build_object('approved',true,'ratePercent',5) where user_id=$1",
  [v],
);
const commissionOrder = await scalar(
  "select panel_create_order_invoice($1,$2,null)",
  [referred, draft],
);
await db.query(
  "select panel_settle_invoice($1,$2,2200000,'gateway-commission-verified')",
  [referred, commissionOrder],
);
await db.query(
  "select panel_settle_invoice($1,$2,2200000,'gateway-commission-verified')",
  [referred, commissionOrder],
);
assert.equal(
  await scalar(
    "select amount_toman from panel_ledger where provider_reference=$1",
    ["affiliate:" + commissionOrder],
  ),
  100000,
);
assert.equal(
  await scalar(
    "select count(*)::int from panel_ledger where category='affiliate'",
  ),
  1,
);
assert.equal(
  await scalar(
    "select jsonb_array_length(data->'commissions') from panel_affiliates where user_id=$1",
    [v],
  ),
  1,
);
const depositOrder = await scalar(
  "select panel_create_order_invoice($1,$2,null)",
  [referred, { ...draft, kind: "wallet-topup" }],
);
await db.query(
  "select panel_settle_invoice($1,$2,2200000,'gateway-deposit-verified')",
  [referred, depositOrder],
);
assert.equal(
  await scalar(
    "select count(*)::int from panel_ledger where category='affiliate'",
  ),
  1,
);
console.log(
  "Affiliate SQL passed: approved rate only, before-VAT commission, wallet credit, idempotence and no commission on wallet funding.",
);
const trialId = await scalar(
  "select panel_request_hosting_trial($1,'ir','linux')",
  [u],
);
assert.equal(
  await scalar("select panel_request_hosting_trial($1,'eu','wordpress')", [u]),
  trialId,
);
assert.equal(
  await scalar("select count(*) from panel_hosting_trials where user_id=$1", [
    u,
  ]),
  1,
);
assert.equal(
  await scalar("select location from panel_hosting_trials where id=$1", [
    trialId,
  ]),
  "ir",
);
await assert.rejects(
  db.query("select panel_request_hosting_trial($1,'moon','linux')", [v]),
);
await assert.rejects(
  db.query("select panel_request_hosting_trial($1,'ir','windows')", [v]),
);
await assert.rejects(
  db.query("update panel_hosting_trials set status='active' where id=$1", [
    trialId,
  ]),
);
await assert.rejects(
  db.query(
    "update panel_hosting_trials set status='active',activated_at=now(),provider_reference='device-test' where id=$1",
    [trialId],
  ),
);
await assert.rejects(
  db.query(
    "update panel_hosting_trials set status='active',activated_at=now(),expires_at=now()+interval '48 hours',provider_reference='device-test' where id=$1",
    [trialId],
  ),
);
await db.query(
  "update panel_hosting_trials set status='active',activated_at=now(),expires_at=now()+interval '24 hours',provider_reference='device-test' where id=$1",
  [trialId],
);
await assert.rejects(
  db.query("update panel_hosting_trials set resources='{}' where id=$1", [
    trialId,
  ]),
);
await db.exec("set role authenticated");
await assert.rejects(db.query("select * from panel_hosting_trials"));
await assert.rejects(
  db.query("select panel_request_hosting_trial($1,'ir','linux')", [v]),
);
await db.exec("reset role");
console.log(
  "Hosting trial SQL passed: one entitlement per account, exact resource cap, 24-hour activation and no browser table/RPC access.",
);
console.log(
  "SQL verification passed: private tables, ownership, withdrawal reserves, ticket closure, MFA lockout/replay, invoice tickets, reviewed one-way conversion, referral threshold/no reroll/cap/reservation/single redemption/idempotent settlement.",
);
const locationUser='00000000-0000-0000-0000-000000000099';
await db.query("insert into auth.users(id) values($1)",[locationUser]);
await assert.rejects(db.query("select panel_request_hosting_trial($1,'ir','linux','de','de-fsn')",[locationUser]));
const located=await scalar("select panel_request_hosting_trial($1,'eu','linux','de','de-fsn')",[locationUser]);
assert.equal(await scalar("select datacenter_id from panel_hosting_trials where id=$1",[located]),'de-fsn');
assert.equal(await scalar("select panel_request_hosting_trial($1,'ir','linux','ir','ir-asiatech')",[locationUser]),located);
assert.equal(await scalar("select datacenter_id from panel_hosting_trials where id=$1",[located]),'de-fsn');
console.log('Location SQL passed: paired country/datacenter, geographic scope and immutable first trial preference.');
await db.close();
