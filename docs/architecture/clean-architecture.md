# Arquitetura Limpa - FinanceFlow

Complementa `feature.spec.md`. Define as camadas de código, a regra de dependência e onde cada tipo de lógica mora.

## Camadas

```text
src/domain/          Regras de negócio puras (sem React, Next, fetch ou localStorage)
src/application/     Casos de uso, portas (interfaces) e hooks de estado
src/infrastructure/  Adaptadores: Banco Central, AwesomeAPI, localStorage
src/components/      Apresentação (React): ui, layout, sections
src/app/             Rotas, layout e metadata (somente composição)
src/content/         Textos e dados estáticos da interface
src/lib/             Utilitários genéricos de apresentação (formatação, cn)
```

## Regra de dependência

As setas apontam sempre para dentro. Camadas internas não conhecem as externas.

```text
app -> components -> application -> domain
                         ^
infrastructure ----------+   (implementa as portas definidas em application)
```

- `domain` não importa nada de fora de `domain`.
- `application` importa `domain`. Define portas (ex.: `MarketRepository`).
- `infrastructure` implementa as portas e importa `domain` e `application/ports`.
- `components` importam `application`, `domain` (tipos e funções puras), `content` e `lib`.
- Os adaptadores concretos do Banco Central e da AwesomeAPI só são ligados em `infrastructure/composition.ts`, usado por `components/data/market-data.tsx`.

### Exceção documentada

Os hooks de `application/hooks` persistem estado no navegador usando `infrastructure/storage` diretamente
(via `usePersistedState`). Isso é um desvio consciente da regra: no cliente, o storage faz parte do runtime
de UI e abstraí-lo com uma porta extra só adicionaria indireção. A regra de negócio continua toda em
`domain`, e os hooks apenas orquestram: leem o estado, chamam uma função pura e gravam o resultado.

## Onde fica cada lógica

| Lógica | Local |
| --- | --- |
| Adicionar, excluir e restaurar movimentação; aporte e resgate | `domain/account/operations.ts` |
| Totais e saldo (RN01, RN12) | `domain/account/summary.ts` |
| Filtros e ordenação de movimentações | `domain/account/transactions.ts` |
| Cartões, fatura aberta e vencimento | `domain/account/cards.ts` |
| Divisão em parcelas | `domain/account/installments.ts` |
| Investimentos, total investido e meta | `domain/account/portfolio.ts` |
| Mês, sobra e saldo anterior | `domain/account/monthly.ts` |
| Grade da planilha do ano | `domain/account/spreadsheet.ts` |
| Rendimento estimado | `domain/market/yield.ts` |
| Série e rótulos dos gráficos | `domain/market/chart.ts` |
| Validação do que vem do storage | `domain/account/parse.ts` |
| HTTP do Banco Central e da AwesomeAPI | `infrastructure/market/` |
| localStorage reativo | `infrastructure/storage/` |
| Estado das movimentações, cartões, investimentos e tema | `application/hooks/` |
| Casos de uso de mercado (+ porta `MarketRepository`) | `application/market/`, `application/ports/` |
| Ligação porta → adaptador | `infrastructure/composition.ts` |

## Regras de qualidade

- Funções de domínio são puras, pequenas, com um único motivo para mudar, e retornam `Result` em vez de lançar exceção para erros esperados.
- Valores monetários são arredondados a centavos no domínio; nunca na UI.
- Dados externos (API, storage) são tratados como não confiáveis e validados na borda.
- Componentes de UI não contêm regra de negócio: recebem dados prontos ou chamam funções do domínio.
- Todo texto visível fica em `src/content`.
- Lógica de domínio tem teste unitário (`npm test`).

## Comandos de verificação

```bash
npm run lint
npm run typecheck
npm test
npm run build
```
