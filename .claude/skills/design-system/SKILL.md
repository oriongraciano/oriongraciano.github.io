---
name: design-system
description: Sistema de design e convenções de front-end do portfólio pessoal de Orion Graciano (glassmorphism dark-tech, paleta ciano/azul, Sora+Inter, breakpoints responsivos, projetos dinâmicos via GitHub API). Use ao editar Index.html, Css/style.css, main.js ou ao criar novas seções/páginas neste projeto.
---

# Design System — Portfólio Orion Graciano

Mesma linguagem visual aplicada ao site institucional da OG Soluções em Tecnologia, adaptada para um portfólio pessoal. Mantém a paleta e os dados originais (bio, stacks, contatos); o que mudou foi a execução visual.

## Paleta (idêntica à da OG — é a identidade visual da marca pessoal)

```css
--white: #fff;
--dark1: #34344e;
--dark2: #3a415a;   /* superfície secundária (stacks, projects) */
--dark3: #566981;
--dark4: #89a7b1;
--dark5: #cbdad5;   /* texto suave sobre fundo escuro */
--dark6: #2f2f46;   /* fundo mais profundo (header, footer) */
--cyan1: #70e3ea;   /* acento — moderação */
```

Tons derivados: `--cyan-soft`, `--cyan-glow`, `--glass-bg`, `--glass-bg-strong`, `--glass-border`.

## Tipografia

- **Sora** (600/700) para títulos, **Inter** (400/500/600) para corpo.
- Importar via **HTTPS**, nunca HTTP (era um bug aqui antes).
- Escala com `clamp()`.

## Linguagem visual

- Glassmorphism sutil + glow ciano, sem sombra cinza genérica de "card kit".
- No hero, o elemento visual é a **sua foto real** emoldurada em `.hero-photo-frame` (glass + glow), não um ícone ou mockup genérico — para uma marca pessoal, o rosto é o elemento característico, equivalente ao grafo SVG usado no site da empresa.
- Stacks tecnológicas são **pills** (`.skill-pill`), não cards com ícone — é uma lista de tags plana, não precisa de descrição nem de hierarquia visual pesada.
- `border-radius`: 14px em cards/pills, 20px em frames de foto/modal.
- Motion: hover simples; respeitar `prefers-reduced-motion`.

## Componentes padrão

- **Header/nav/modal**: mesmas convenções do site da OG (header fixo com blur, `.nav-toggle` hambúrguer em `max-width: 768px`, modal com overlay + Esc + clique fora + foco automático no primeiro input).
- Este projeto tem **dois gatilhos** para abrir o modal de contato: `#open-modal` (header) e `#open-modal-hero` (CTA secundário do hero). `main.js` usa `querySelectorAll("#open-modal, #open-modal-hero")` — se adicionar um terceiro gatilho, inclua o id nesse seletor.
- **Botões**: `.btn-primary-cta` (gradiente ciano — ação principal, ex. baixar currículo) vs `.btn-secondary` (outline glass — ação secundária, ex. abrir contato).

## Projetos dinâmicos (GitHub API)

A seção `#my-projects` busca repositórios via `fetch('https://api.github.com/users/oriongraciano/repos?...')` em `main.js` e renderiza `.project-card` dinamicamente (não são elementos estáticos no HTML).

- Use sempre `repo.html_url` no link do card ("Ver repositório"), **nunca `repo.clone_url`** — `clone_url` é a URL `.git` para clonar, não a página navegável do GitHub. Isso já foi um bug aqui.
- Trate o estado de erro: se o `fetch` falhar, atualize o texto de `#loading` em vez de deixá-lo em "Carregando..." para sempre.
- Trate o estado vazio (`data.length === 0`) com uma mensagem, não deixe a seção em branco sem explicação.

## Breakpoints

Mesma estrutura do site da OG: `960px` (colunas → stack única), `768px` (menu hambúrguer), `560px` (paddings de seção + CTAs em largura total + inputs do modal a `16px` contra zoom no iOS), `380px` (ajustes finos).

### Mesmo gotcha do header cortando o hero no mobile

Vale a mesma observação do projeto da OG: o header pode quebrar em duas linhas em telas estreitas e cobrir o início do `.hero`. O `padding-top` do `.hero` nos breakpoints pequenos já tem margem de segurança — não reduza sem testar em ≤380px de largura real.

### Gotcha: remover um elemento do HTML pode travar `main.js` inteiro e quebrar "Meus Projetos"

`main.js` é um único script sequencial, sem módulos. Se um `document.querySelector(...)` no topo do arquivo (ex.: `#nav-toggle`, `#main-nav`, `#modal`, `#modal-overlay`) retornar `null` porque o elemento foi removido/renomeado no HTML, a primeira chamada de método nesse `null` (`.addEventListener`, `.querySelectorAll`, etc.) lança `TypeError` e **interrompe a execução do script a partir daquele ponto** — inclusive o `getProjects()`, que é chamado no final do arquivo. Foi exatamente assim que "Meus Projetos" parou de carregar depois do botão `#nav-toggle` ter sido removido do `Index.html` num commit manual.

Duas coisas a manter:
1. Qualquer `id` referenciado em `main.js` (`#nav-toggle`, `#main-nav`, `#open-modal`, `#open-modal-hero`, `#close-modal`, `#modal`, `#modal-overlay`, `#loading`, `#my-projects-list`) precisa continuar existindo no HTML com esse mesmo id. Se for remover ou renomear um elemento, atualize o `main.js` no mesmo commit.
2. Blocos de funcionalidade independentes (menu mobile, modal, projetos do GitHub) devem ser protegidos com `if (elemento) { ... }` antes de usar — assim a falta de um elemento quebra só aquela funcionalidade, não o script inteiro. Já aplicado no bloco do menu mobile; mantenha o padrão em qualquer novo bloco.

## Dados que não podem ser alterados sem perguntar

Bio em "Quem sou eu", lista de stacks, telefone/e-mails, links de redes sociais — são informação pessoal/profissional, não decoração.

## Pontos de atenção pendentes (identificados, não resolvidos)

1. Existe um arquivo `MeuCurriculo/OrionGracianoCurriculo(09.26).pdf` com **0 bytes** (provável resíduo de rename malsucedido) ao lado do currículo real `MeuCurriculo/Orion Graciano Currículo(09.26).pdf`, que é o usado no link "Saber Mais". Sugerir apagar o arquivo vazio quando o usuário confirmar — não apagar sozinho.
2. O nome de arquivo do currículo em uso tem espaços e acento (`Orion Graciano Currículo(09.26).pdf`). Funciona (o navegador faz o encode), mas é frágil — se precisar trocar o currículo no futuro, considere renomear para algo sem espaço/acento e atualizar o `href` no `Index.html`.
