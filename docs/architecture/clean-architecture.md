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
- Só `src/app` e a composição em `application/market` conhecem o adaptador concreto.

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
| Estado da conta, favoritos, perfil | `application/hooks/` |

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
