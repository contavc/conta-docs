# Editorial sources

The public docs explain Conta's main concepts to prospective users and investors.
Repository names and implementation details belong here, not in the reader's journey.

Reviewed on 2026-09-27:

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
fundraising and roadmap content remain out of scope. Token administration details
are omitted from the public concept pages; this does not justify claims of
unrestricted or risk-free assets.

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
- `contavc/conta`, `docs/savings-general-availability.md`: intent to make savings
  available to everyone without activating saving rules without consent.
  This is source documentation, not a verification of production rollout.
- `contavc/conta`, `docs/savings-apy.md` and `lib/i18n/messages/savings.en.ts`:
  manual deposits, optional round-ups and percentage saving, Match eligibility,
  withdrawal effects on pending Match, and separately Conta-funded interest.
  The public docs explain these concepts without fixing a rate or claiming that
  vault custody generates yield on its own. Pending interest is not a credited balance.
- `contavc/conta`, `lib/evm/magic-swap.ts` and
  `app/(app)/home/home-magic-card-content.tsx`: eligible asset conversion,
  estimated net amounts, route availability and completion/partial-result states.
- `contavc/conta-magic-router`, `README.md`: quote and conversion-route role.
  Public copy uses the product name Magic Swap and omits service architecture.

Magic Swap is a conversion experience, distinct from cBRL's backing wrapper.
Do not promise universal token support, best execution, a fixed quoted amount,
instant completion or automatic success. The public page links to the main
website for receiving instructions instead of duplicating that guide.
