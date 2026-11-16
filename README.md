# FinanceFlow

Controle financeiro pessoal em Next.js: receitas, despesas, cartões, investimentos e planilha do ano.
Trabalho em equipe da FAP (ADS, GTI e Redes).

> Estado atual: **scaffold**. A estrutura, os tokens do design system e as ferramentas estão prontos;
> nenhuma funcionalidade foi implementada ainda. O trabalho está organizado no Trello (épicos, features e histórias).

## Stack

- Next.js 16 (App Router) + React 19
- TypeScript
- Tailwind CSS 4 (tokens em `@theme`, `src/app/globals.css`)
- ESLint
- Vitest (testes unitários da camada de domínio)
- Fontes via `next/font`: Bricolage Grotesque (títulos e números) e Hanken Grotesk (texto)

Requer Node.js 20.9 ou superior (`.nvmrc` indica a 24).

## Como rodar

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm test           # Vitest
npm run build      # build de produção
```

## Estrutura

Segue `docs/architecture/feature.spec.md` e `docs/architecture/clean-architecture.md`.

```text
src/domain/          Regras de negócio puras (sem React, Next, fetch ou localStorage)
src/application/     Casos de uso, portas e hooks de estado
src/infrastructure/  Adaptadores: localStorage e APIs de mercado (Banco Central, AwesomeAPI)
src/components/      Apresentação: ui, layout, sections, data
src/app/             Rotas, layout e metadata (somente composição)
src/content/         Textos e dados estáticos da interface
src/types/           Tipos compartilhados
src/lib/             Utilitários genéricos de apresentação
public/images/       Imagens estáticas
docs/                PRD, landing, plataforma exemplo e especificações de arquitetura
```

Regra de dependência: `app -> components -> application -> domain`. `infrastructure` implementa as portas
definidas em `application`.

## Documentação

- `docs/Prd/2_PRD_FinanceFlow.html`: requisitos, regras de negócio, fluxos, telas, modelo de dados, design system e identidade
- `docs/Prd/1_Landing_FinanceFlow.html`: landing page de referência
- `docs/Prd/3_Plataforma_FinanceFlow.html`: plataforma exemplo funcionando em um único HTML
- `docs/architecture/`: spec, skills, template, arquitetura limpa e `system-design.md` (visão de system design)
- `docs/design-referencias/`: capturas de tela do PRD para usar de referência no Figma

## Enunciado

Aplicação web de controle financeiro pessoal com os 8 requisitos obrigatórios (cadastrar, informar campos,
totais, listar, excluir, diferenciar receita e despesa, filtros por tipo e categoria, interface responsiva),
`useState`, `map()` e `filter()`, persistência em `localStorage` como desafio extra e deploy na Vercel.
