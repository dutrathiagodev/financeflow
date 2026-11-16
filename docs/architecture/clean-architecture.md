# Arquitetura Limpa - FinanceFlow

Complementa `feature.spec.md`. Define as camadas de código, a regra de dependência e onde cada tipo de lógica mora.

## Camadas

```text
src/domain/          Regras de negócio puras (sem React, Next, fetch ou localStorage)
src/application/     Casos de uso, portas (interfaces) e hooks de estado
src/infrastructure/  Adaptadores: CoinGecko, localStorage
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
- O adaptador concreto da CoinGecko só é ligado em `infrastructure/composition.ts`, usado por `components/data/market-data.tsx` e pela rota `app/api/history`.

### Exceção documentada

Os hooks de `application/hooks` persistem estado no navegador usando `infrastructure/storage` diretamente
(via `usePersistedState`). Isso é um desvio consciente da regra: no cliente, o storage faz parte do runtime
de UI e abstraí-lo com uma porta extra só adicionaria indireção. A regra de negócio continua toda em
`domain`, e os hooks apenas orquestram: leem o estado, chamam uma função pura e gravam o resultado.

## Onde fica cada lógica

| Lógica | Local |
| --- | --- |
| Comprar, vender, depositar, sacar | `domain/account/operations.ts` |
| Avaliação de posições e lucro | `domain/account/portfolio.ts` |
| Filtro de transações | `domain/account/transactions.ts` |
| Filtros e ordenação de moedas | `domain/market/coin-queries.ts` |
| Insights do mercado | `domain/market/insights.ts` |
| Série e rótulos do gráfico | `domain/market/chart.ts` |
| Validação do que vem do storage | `domain/account/parse.ts` |
| HTTP da CoinGecko | `infrastructure/coingecko/` |
| localStorage reativo | `infrastructure/storage/` |
| Estado da conta, favoritos, perfil, tickets | `application/hooks/` |
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
