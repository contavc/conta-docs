# Editorial sources

The public docs explain Conta's main concepts to prospective users and investors.
Repository names and implementation details belong here, not in the reader's journey.

Reviewed on 2026-09-27; release claims rechecked on 2026-09-28:

The 2026-09-28 merged-feature audit also checked the app's August and September
PRs against production rollouts. This is a release-evidence checkpoint, not a
claim that every merged internal or pilot change belongs in public docs.

- Public payment links and fixed charges: `contavc/conta` PRs #296, #377 and
  #378 establish anonymous PIX checkout, charge states and approved-KYC owner
  eligibility. `contavc/conta-backend` PR #137 and app PR #628 record that
  the owner routes were opened to everyone and their legacy proxies retired.
  App PR #423 also implements Base USDC checkout, but explicitly says it
  defaults off pending funded activation; public docs therefore describe the
  verified PIX route and tell readers to follow the available options.
- Shareable receipts: app PR #614 and backend PR #129 record the `/receipt/:id`
  public route and every-owner rollout. The older `/callback` URL was removed.
  Receipt data is visible to holders of the opaque link without login.
- Older public flows: app PRs #27 and #35 introduced external digital-dollar
  sends, #49 and #50 introduced digital-dollar receiving, and PR #325 opened
  passkey management to everyone. The public pages explain the concepts and
  link to the website for exact steps and currently supported assets/networks.
- Open signup: app PR #636 and backend PR #145 removed invitation admission
  and report production rollout. No invitation requirement is asserted in
  this guided concept site; the website owns signup instructions.
- Referral vault claims: app PRs #544 and #573, backend PR #89 and the
  activated contract describe direct cBRL vault claims and the conditional
  25% post-activation bonus after 30 days of retained supporting principal.
  The referral UI is distinct from the initially pilot-only Reserva UI;
  app PR #640 and backend PR #148 subsequently opened Reserva itself to all
  eligible accounts.
- Daily Reserve yield: backend PRs #142 and #148 document public activation;
  backend PR #159 confirms the first production cBRL credits on 2026-09-28
  and records remaining scheduler reconciliation. This supports the existing
  6% APY explanation without promising any particular user's payout.
- Not yet a public availability claim: app `docs/agent-key-budgets.md` says
  agent management retains a username/account-mode pilot despite its 2026-09-19
  production deployment. App PR #419 describes BRS on Solana as a private
  pilot. App PR #484 keeps event QR creation on an allowlist. App PR #423
  leaves Base USDC link checkout disabled by default. A merged implementation
  or production deploy alone does not remove these gates.

- `contavc/conta`: `lib/privy/config.ts` confirms passkey access and an embedded
  wallet. `lib/evm/cbrl.ts` describes the cBRL wrapping model. The app and its
  existing payment documentation inform the high-level PIX and crypto explanation.
- `contavc/conta-backend`: the README describes shared services and a gradual
  migration. Infrastructure changes are not a product benefit or a public docs topic.
- `contavc/conta-contracts`: the README, `src/ContaBRL.sol`,
  `src/facets/StablecoinAdminFacet.sol`, `src/libraries/LibStablecoin.sol` and
  `deployments/base.json` describe backing, redemption and administrative powers.
  Wallet self-custody does not remove token-level freeze, pause or seizure powers.
- `contavc/conta-magic-router`: the README establishes its role in conversion
  quotes. The public explanation makes no promise that every token can be converted.
- [Avenia's BRLA page](https://avenia.io/brla) describes the issuer's 1:1 backing
  model and reserve reporting. Attribute these statements to the issuer.
- [Nora's BRS page](https://www.nora.finance/) and
  [token documentation](https://www.nora.finance/docs/integrate/core-concepts/brs-token)
  describe BRS and its real-denominated reference value.

The product owner clarified that cBRL wraps BRL stablecoins such as BRLA and BRS;
cBRL must not be described as government-regulated. Do not transfer a reserve
asset's or partner's regulatory status to the wrapper.

BRLA and BRS are examples of backing assets in the product model, not a statement
that every deployment holds both simultaneously. The reviewed Base manifest lists
BRLA as its reserve. No live reserve ratio or deployment-wide audit was performed
for this editorial update. The 1:1 example explains the model, before fees; it is
not a current reserve attestation or an unconditional redemption guarantee.

Public token records do not prove off-chain financial reserves. Avoid claims of
unrestricted access, immunity from compromise or universal superiority to banks.

## Scope after removing website duplication

The main website already covers product purpose, comparisons with banks,
passkey usage, PIX, digital-dollar receiving and pricing. These topics now
link or redirect to conta.vc instead of being repeated in docs. The public
docs retain wallet/authorisation concepts, token and reserve explanations,
transfers and money links.

Sources reviewed for overlap:

- https://www.conta.vc/sobre
- https://www.conta.vc/como-funciona
- https://www.conta.vc/seguranca
- https://www.conta.vc/ajuda
- https://www.conta.vc/receber-dolares
- https://www.conta.vc/precos

Usage metrics remain undecided and are not published. Business model, revenue,
fundraising and roadmap content remain out of scope. The public wallet page now names the relevant token-level administrative
powers without exposing operational runbooks or implying unrestricted assets.

## Why cBRL

The product owner identified provider redundancy as the main reason for cBRL:
a consistent user-facing balance while Conta integrates alternative BRL
stablecoins/providers. Describe routing new operations through an available,
compatible alternative without promising uninterrupted service, automatic retries
of in-flight payments, instant access to an unavailable issuer's reserves, or a
live multi-reserve deployment. Availability and capacity remain necessary.

This explanation records the product rationale, not a new live failover test.

## Guided reading, vaults and Magic Swap

The reader's sequence is wallet/self-custody → balance/stablecoins → cBRL →
BRLA/BRS → personal vault/Reserve → saving → Magic Swap → transfers.
The verification chapter was removed at the product owner's request. Its former
URLs redirect to the relevant wallet or backing concept page.
The numbered sidebar and the page transitions follow the same sequence.

Additional repository sources reviewed on 2026-09-27:

- `contavc/conta-contracts`, `docs/savings-vault.md`: one personal cBRL vault
  per owner, separate address, deposits and owner-directed withdrawals. The
  current design is upgradeable; do not describe these rules as immutable.
- `contavc/conta`, `docs/savings-general-availability.md`, PR #640, and
  `contavc/conta-backend` PR #148: both changes merged and deployed on
  2026-09-27, with the frontend username list and Worker savings roster
  removed for eligible accounts. The product owner confirmed public
  availability on 2026-09-28. The PRs verified live configuration and health
  but had no authenticated end-to-end browser smoke test. Public access still
  depends on profile readiness, authentication, wallet and cBRL eligibility;
  no automatic saving rule is activated without consent.
- `contavc/conta`, `docs/savings-apy.md` and `lib/i18n/messages/savings.en.ts`:
  manual deposits, optional round-ups and percentage saving, Match eligibility,
  withdrawal effects on pending Match, and separately Conta-funded interest.
  The public docs describe the currently displayed 6% APY and the
  backend's daily accrual, R$0.01 payout threshold and separate Conta-funded
  credits; see `contavc/conta-backend/docs/savings-yield.md`. This is a
  program rate, not yield generated by vault custody or the reserve backing.
  Pending interest is not spendable principal.
- `contavc/conta`, `lib/evm/magic-swap.ts` and
  `app/(app)/home/home-magic-card-content.tsx`: eligible asset conversion,
  estimated net amounts, route availability and completion/partial-result states.
- `contavc/conta-magic-router`, `README.md`: quote and conversion-route role.
  Public copy uses the product name Magic Swap and omits service architecture.

Current `contavc/conta/lib/evm/cbrl.ts` and the Base deployment manifest
identify BRLA as the current cBRL reserve token. BRS is an example of a
compatible alternative, not evidence of a live BRS-backed cBRL reserve.
The contract owner has token-level administrative powers, distinct from
wallet signing authority (`contavc/conta-contracts/src/ContaBRL.sol`).

Current `contavc/conta/app/(app)/send/page.tsx` keeps PIX send rails
available without approved KYC, while `phase54-foreign-pix-kyc.sql` limits
unverified Brazilian PIX receipts to R$500 per deposit and R$1,000 per
rolling 24 hours (including pending QR reservations), and requires approval
for foreign-account receipts. The current public `conta.vc/ajuda` text claims PIX is unavailable in
both directions before verification; it must be reconciled with the shipped
app behavior rather than copied into these docs.

Magic Swap is a conversion experience, distinct from cBRL's backing wrapper.
Do not promise universal token support, best execution, a fixed quoted amount,
instant completion or automatic success. The public page links to the main
website for receiving instructions instead of duplicating that guide.
