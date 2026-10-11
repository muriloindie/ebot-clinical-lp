# Design System Da LP Ê-Bot Clinical

Este documento descreve a linha visual da landing page atual do **Ê-Bot Clinical** para orientar novas telas, páginas, peças e componentes do ecossistema Ê-Bot mantendo consistência de design.

## Objetivo

Criar novas interfaces com a mesma sensação da LP atual: tecnologia aplicada à saúde, atendimento humanizado, operação confiável, clareza comercial e visual premium sem parecer frio demais ou genérico.

Use este arquivo como referência antes de criar novas seções, páginas de produto, telas de dashboard, componentes comerciais, anúncios estáticos ou protótipos de interface.

## Direção Visual Em Uma Frase

Uma interface clínica, limpa e tecnológica, com atmosfera leve, vidro fosco, azul médico como acento principal, sombras suaves, grids assimétricos, mockups conversacionais e motion sutil para transmitir confiança, eficiência e humanização.

## Personalidade Visual

- **Setor:** saúde, clínicas, hospitais, atendimento e automação.
- **Sensação:** moderno, seguro, organizado, humano, acessível e confiável.
- **Densidade:** média-baixa, com bastante respiro entre blocos.
- **Contraste:** controlado, com fundos claros e seções escuras pontuais para temas críticos como segurança e CTA final.
- **Acabamento:** premium leve, com glassmorphism, sombras difusas e cantos arredondados.
- **Ritmo:** alternância entre seções claras, cinza-neve, seções com imagem e seções escuras.
- **Motion:** fluido e contínuo, usado para mostrar vida no produto, não para distrair.

## Princípios De Design

- Priorizar clareza e confiança acima de ornamentação.
- Usar azul como acento principal para ações, indicadores e destaques.
- Usar verde apenas quando fizer sentido com WhatsApp, confirmação, sucesso ou herança institucional.
- Evitar excesso de gradientes chamativos; usar gradientes suaves e atmosféricos.
- Usar cards com cantos grandes, sombra leve e borda translúcida.
- Preferir layouts assimétricos ou mosaicos em vez de linhas genéricas de cards iguais.
- Sempre mostrar o produto em contexto de conversa, agenda, recepção, gestão ou cuidado humano.
- Manter textos com tom profissional, direto e empático.
- Evitar visual de dashboard frio demais; o produto precisa parecer operacional e humano.

## Paleta De Cores

| Token | Valor | Uso |
| --- | --- | --- |
| Clinical Blue | `#2B9FE8` | Cor principal da LP, CTAs, links, indicadores, ícones e foco de inputs. |
| Clinical Blue Hover | `#1a7ebc` | Hover de botões e elementos ativos. |
| Clinical Blue Light | `rgba(43, 159, 232, 0.1)` | Fundos de badges, ícones, foco e detalhes suaves. |
| WhatsApp Green | `#25d366` | Elementos ligados ao WhatsApp, confirmação, bolhas de contato e botões flutuantes. |
| Institutional Green | `#88a72f` | Cor institucional global herdada, usar com cautela quando não for WhatsApp. |
| Dark Clinical | `#263532` | Cards escuros, seções de segurança, navegação escura e contraste de títulos. |
| Dark Header | `#2f3835` | Rodapé e bases institucionais escuras. |
| Deep Charcoal | `#111716` | Mockup de celular, sombras profundas e detalhes de hardware. |
| Canvas Snow | `#f6fafc` | Fundo principal da página Clinical. |
| Surface White | `#ffffff` | Cards, header em scroll, modais, bolhas e superfícies primárias. |
| Soft Gray | `#F5F5F5` | Seções cinza e divisões de conteúdo. |
| Body Slate | `#485653` | Texto base da página Clinical. |
| Muted Copy | `#52625f` | Parágrafos, descrições e textos secundários. |
| Subtle Border | `rgba(43, 159, 232, 0.12)` | Bordas de cards, inputs, seções e containers. |

## Regras De Cor

- Use `#2B9FE8` como acento principal em páginas do Clinical.
- Não misture muitos tons saturados; azul e verde já são suficientes.
- Não usar preto puro `#000000`; prefira `#111716`, `#15201e`, `#263532` ou `#2f3835`.
- Seções de segurança e CTA final devem usar fundos escuros com gradiente entre `#263532`, `#15201e` e `#1a252f`.
- Fundos claros devem ficar entre `#ffffff`, `#f6fafc`, `#f1f8fb` e `#eef7fb`.
- Bordas devem ser quase invisíveis, normalmente entre `rgba(43,159,232,0.12)` e `rgba(255,255,255,0.66)`.

## Tipografia

| Estilo | Regra Atual | Uso |
| --- | --- | --- |
| Fonte principal | `Inter`, sans-serif | Toda a LP atual usa Inter. Manter para consistência imediata. |
| H1 | `clamp(2.5rem, 5vw, 4.5rem)`, peso 800, `line-height: 1.1` | Hero e grandes CTAs. |
| H2 | `clamp(2rem, 4vw, 3rem)`, peso 700, `line-height: 1.2` | Títulos de seção. |
| H3 | `clamp(1.5rem, 3vw, 1.75rem)`, peso 600 | Subtítulos e cards importantes. |
| Body Large | `1.125rem`, `line-height: 1.6` | Descrições de seção e copy comercial. |
| Small | `0.875rem`, peso 500 | Rodapé, notas, textos auxiliares. |
| Micro | `0.75rem`, peso 600, uppercase, letter-spacing `0.05em` | Eyebrows, labels e categorias. |

## Regras Tipográficas

- Títulos devem ser fortes, compactos e com tracking levemente negativo quando grandes.
- Parágrafos devem ter leitura confortável, evitando blocos longos demais.
- O H1 pode ser grande, mas deve manter tom sóbrio e comercial.
- Eyebrows devem ser curtos, em uppercase, com cor azul ou badge discreto.
- Métricas e números devem usar `font-variant-numeric: tabular-nums`.
- Evitar muitas variações de fonte; a consistência atual vem do peso, escala e cor.
- Se em uma evolução futura a marca quiser mais personalidade, considerar `Satoshi`, `Geist` ou `Outfit`, mas não misturar com a LP atual sem migração global.

## Layout E Grid

- Container padrão: `max-width: 1280px`, padding horizontal `1.5rem`.
- Telas grandes: elevar container para `1440px` acima de `1600px` e `1600px` acima de `2000px`.
- Espaçamento de seção padrão: `6rem 0`.
- Hero usa split 55/45 no desktop, texto à esquerda e mockup à direita.
- Grids principais usam CSS Grid, não composições improvisadas com porcentagens complexas.
- Mosaicos são preferíveis a linhas simétricas de cards.
- Seções devem alternar entre blocos claros, blocos cinza, blocos escuros e blocos com imagem para manter ritmo.
- Evite centralizar tudo; a LP usa bastante alinhamento à esquerda em blocos estratégicos.

## Arquitetura De Seções

| Seção | Padrão Visual |
| --- | --- |
| Header | Fixo, transparente no topo, branco translúcido com blur ao rolar. |
| Hero | Split screen, headline forte, CTA, proof pills e mockup conversacional animado. |
| Problema | Cards claros com um card escuro destacado para criar tensão visual. |
| Fluxo | Trilho horizontal de etapas com divisórias finas e números circulares azuis. |
| Métricas | Fundo com imagem médica suavizada, overlay claro e cards em vidro fosco. |
| Recursos | Mosaico assimétrico com cards de tamanhos diferentes, visuais internos e microinterações. |
| Clientes | Cards grandes com foto, overlay escuro e texto branco no rodapé da imagem. |
| Parceiros | Cards compactos com imagem quadrada e texto forte. |
| Depoimentos | Card grande com foto lateral, fundo glass e frase em destaque. |
| Segurança | Fundo escuro em gradiente, badges azuis e lista com ícones técnicos. |
| Implantação | Cards brancos simples com ícones azuis e etapas por semana. |
| Demo IA | Chat container glass, header branco translúcido, mensagens com bolhas. |
| CTA final | Fundo escuro, headline branco, robô/ícone pulsante e bolhas conversacionais. |
| Footer | Fundo `#2f3835`, texto cinza, títulos brancos e links discretos. |

## Componentes

### Botões

- Botão primário usa fundo `#2B9FE8`, texto branco e sombra azul suave.
- Padding padrão: `0.875rem 1.75rem`.
- Border-radius padrão: `12px`.
- Hover deve subir levemente com `translateY(-2px)` e aumentar sombra.
- Botão outline usa borda azul de `2px`, texto azul e fundo translúcido no hover.
- CTAs principais podem ter sombra maior: `0 18px 34px rgba(43,159,232,0.24)`.
- Botões grandes de CTA final podem usar `1rem 2.5rem` e fonte `1.2rem`.

### Badges E Eyebrows

- Badges são pill, uppercase, `0.75rem`, peso 600, letter-spacing `0.05em`.
- Badge Clinical usa fundo branco, borda azul translúcida e sombra azul muito leve.
- Em seções escuras, usar badge com fundo `rgba(43,159,232,0.14)` e borda `rgba(43,159,232,0.24)`.

### Cards Claros

- Fundo branco ou branco translúcido entre `rgba(255,255,255,0.72)` e `rgba(255,255,255,0.86)`.
- Borda de `1px` em azul translúcido ou branco translúcido.
- Border-radius entre `20px`, `24px`, `28px` e `32px`, conforme tamanho do card.
- Sombra difusa azul/cinza, nunca sombra preta pesada em cards claros.
- Hover permitido: `translateY(-8px)` com sombra azul mais evidente.

### Cards Escuros

- Fundo principal: `#263532`.
- Texto branco com opacidade entre `0.72` e `0.90` para descrições.
- Usar para destaque de dor, lembretes, segurança e CTA final.
- Evitar excesso de cards escuros em uma mesma seção para não pesar a página.

### Glassmorphism

- Usar `backdrop-filter: blur(12px)` a `blur(18px)`.
- Fundo recomendado: `rgba(255,255,255,0.72)` a `rgba(255,255,255,0.82)`.
- Borda recomendada: `1px solid rgba(255,255,255,0.5)` ou `rgba(43,159,232,0.12)`.
- Usar em headers, métricas, chat, depoimentos e modais.
- Não aplicar glass em tudo; o efeito deve sinalizar camada, profundidade ou tecnologia.

### Inputs

- Inputs usam fundo branco quase opaco, borda sutil e radius grande.
- Input da demo usa padding `1rem 1.5rem`, radius `24px`, fonte `1rem`.
- Focus deve usar borda azul e ring azul claro: `0 0 0 4px rgba(43,159,232,0.1)`.
- Botão de envio circular usa `50px`, fundo azul e texto/ícone branco.

### Modais

- Overlay com fundo escuro translúcido e blur.
- Card branco, radius entre `20px` e `28px`, sombra grande e animação de escala/subida.
- Modal de WhatsApp deve ser centralizado, simples e com decisão clara.
- Modal de PDF deve preservar leitura, com header fixo e iframe limpo.

### Botão Flutuante De WhatsApp

- Deve ficar no canto inferior direito.
- Fundo `#25d366`, texto branco, pill radius `999px`.
- Usar brilho/reflexo animado discreto e sombra verde controlada.
- No mobile, ocultar o texto e manter apenas o ícone.

## Padrões Visuais Específicos Da Marca

### Mockup De Celular

- Usar como elemento hero ou demonstração principal quando a página falar de conversa.
- Hardware escuro com gradiente entre `#111716`, `#3a4642` e `#0d1110`.
- Radius alto, próximo de `54px` no frame e `43px` na tela.
- Tela clara com fundo `#eef6f9`, gradiente azul suave e pattern pontilhado.
- Bolhas do bot em branco e bolhas do usuário em azul claro `#dff1fb`.
- Manter indicador visual de WhatsApp em verde flutuando perto do mockup.

### Visual De Chat

- Bot deve aparecer à esquerda com bolha branca.
- Usuário deve aparecer à direita com bolha azul clara ou azul sólido em chat real.
- Bordas das bolhas devem ter raio grande com canto inferior reduzido para parecer mensagem.
- Usar typing dots quando houver simulação de conversa.
- Evitar chat genérico sem contexto; sempre inserir conteúdo operacional real da saúde.

### Métricas E Painéis

- Métricas devem ser grandes, azuis e com números tabulares.
- Cards de métrica devem ser translúcidos, com blur e borda clara.
- Mini dashboards usam barras azuis em gradiente suave, KPIs compactos e labels pequenos em peso alto.
- Evitar gráficos complexos demais na LP; mostrar apenas o suficiente para transmitir gestão.

### Fotos Humanas

- Usar fotos de clínicas, recepção, médicos, pacientes, hospitais e tecnologia em saúde.
- Aplicar overlays escuros em cards de imagem para garantir leitura.
- Fotos devem parecer reais e profissionais, não banco de imagem genérico demais.
- Preferir enquadramentos com pessoas em contexto de cuidado ou operação.

## Motion E Interação

- Reveals entram com `opacity` e `transform`, duração aproximada de `0.8s`.
- Elementos de lista podem usar delays em cascata de `0.1s` a `0.4s`.
- Hover de cards usa `translateY(-8px)`.
- Hover de elementos flutuantes pode usar `translateY(-10px) scale(1.02)`.
- Animações contínuas devem ser suaves, em loop, com `ease-in-out`.
- Elementos ativos podem pulsar, flutuar, preencher barras ou simular digitação.
- Animar preferencialmente `transform` e `opacity`.
- Evitar animações bruscas, tremidas, neon ou que pareçam jogo.

## Easing E Duração

| Uso | Duração | Easing |
| --- | --- | --- |
| Reveal de seção | `0.8s` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Hover simples | `0.2s` a `0.25s` | `ease` |
| Hover premium | `0.4s` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Modal | `0.28s` a `0.4s` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Loop visual | `3s` a `6s` | `ease-in-out` |
| Simulação de chat | `17s` | `cubic-bezier(0.45, 0, 0.2, 1)` |

## Responsividade

- Abaixo de `1100px`, grids complexos podem virar duas colunas.
- Abaixo de `768px`, todos os grids principais devem virar uma coluna.
- Hero no mobile mantém texto alinhado à esquerda, não centralizar automaticamente.
- CTAs do hero no mobile ocupam largura total.
- Mockup de celular no mobile remove rotação 3D e reduz tamanho.
- Mosaico de recursos vira sequência vertical: agenda, triagem, lembrete, documentos, painel e atendimento humano.
- Cards grandes de imagem devem manter altura suficiente, por volta de `340px` no mobile.
- Botão flutuante do WhatsApp no mobile deve manter apenas ícone.
- Evitar qualquer overflow horizontal.

## Acessibilidade

- Manter skip link para pular ao conteúdo.
- Botões devem ter área mínima confortável, idealmente acima de `44px`.
- Links e botões precisam de hover e foco visíveis.
- Imagens informativas precisam de `alt`; imagens decorativas podem ter `alt=""`.
- Contraste de texto em fotos deve ser garantido por overlay escuro.
- Modais devem bloquear scroll do body e permitir fechamento claro.
- Conteúdo animado não deve ser essencial para entender a mensagem.

## Linguagem Visual Por Tipo De Página

| Página | Direção Recomendada |
| --- | --- |
| Landing page de produto | Hero split, mockup conversacional, cards de dores, mosaico de recursos, CTA escuro. |
| Página institucional | Mais fotos humanas, menos dashboards, foco em confiança e história. |
| Página de produto técnico | Manter paleta, mas usar mais painéis, diagramas simples e listas de integração. |
| Página de segurança/LGPD | Fundo escuro, badges azuis, ícones lineares e copy mais sóbria. |
| Dashboard SaaS | Fundo `#f6fafc`, cards brancos, KPIs azuis, tabelas limpas e navegação discreta. |
| Demo interativa | Container glass, chat claro, estados de digitação e CTA de WhatsApp contextual. |

## Copy E Microcopy Visual

- Frases devem ser concretas e operacionais.
- Falar de recepção, agenda, pacientes, WhatsApp, confirmações, triagem e gestão.
- Evitar jargões vagos como "revolucione", "next-gen", "desbloqueie" e "sem limites".
- CTAs devem ser humanos e diretos: "Falar com especialista", "Agendar demonstração", "Ver como funciona".
- Badges devem explicar contexto: "Fluxo completo", "Impacto mensurável", "Segurança e operação".
- Números devem ser usados com parcimônia e, quando possível, acompanhados de contexto.

## Do's

- Usar fundos claros com leve gradiente azul.
- Usar um elemento visual forte por seção.
- Usar cards assimétricos e mosaicos para recursos.
- Usar fotos humanas para equilibrar tecnologia e cuidado.
- Usar ícones lineares com fundo azul translúcido.
- Usar CTAs azuis e WhatsApp verde apenas em contexto de contato.
- Usar motion para reforçar funcionamento do produto.
- Manter bastante espaço vertical entre seções.

## Don'ts

- Não criar seções com três cards iguais sem hierarquia.
- Não usar roxo neon, gradientes saturados ou glow artificial.
- Não usar preto puro.
- Não usar emojis como recurso visual da marca.
- Não usar sombras duras em cards claros.
- Não usar muitos estilos de botão na mesma página.
- Não misturar ilustrações cartoon com o visual clínico premium atual.
- Não transformar a LP em dashboard pesado demais.
- Não usar animações que movam layout ou causem instabilidade.
- Não prometer diagnóstico médico visualmente ou textualmente.

## Tokens CSS Recomendados

```css
:root {
  --primary: #2B9FE8;
  --primary-hover: #1a7ebc;
  --primary-light: rgba(43, 159, 232, 0.1);
  --whatsapp: #25d366;
  --dark: #263532;
  --dark-header: #2f3835;
  --deep-charcoal: #111716;
  --text-body: #485653;
  --text-muted: #52625f;
  --bg-page: #f6fafc;
  --bg-white: #ffffff;
  --bg-soft: #F5F5F5;
  --border-blue: rgba(43, 159, 232, 0.12);
  --border-subtle: rgba(0, 0, 0, 0.08);
  --font-main: 'Inter', sans-serif;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-xl: 28px;
  --radius-xxl: 32px;
  --shadow-soft: 0 8px 32px rgba(0,0,0,0.08);
  --shadow-clinical: 0 18px 50px rgba(33, 68, 86, 0.07);
  --shadow-blue: 0 18px 34px rgba(43, 159, 232, 0.24);
  --transition-fast: 0.2s ease;
  --transition-normal: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-premium: 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
```

## Checklist Para Novas Telas

- A tela usa azul Clinical como acento principal?
- O fundo principal está claro, limpo e com respiro suficiente?
- Existe pelo menos um elemento visual ligado a conversa, agenda, recepção, saúde ou gestão?
- Os cards têm radius grande, bordas sutis e sombra difusa?
- O layout evita sequência genérica de cards iguais?
- O CTA principal está claro e visualmente dominante?
- O WhatsApp verde aparece apenas onde faz sentido?
- A página funciona em mobile sem overflow horizontal?
- As animações usam transform/opacity e não atrapalham leitura?
- A linguagem transmite confiança e humanização sem exagero comercial?

## Referências Diretas No Projeto

- `css/variables.css`: tokens globais originais.
- `css/typography.css`: escala tipográfica base.
- `css/layout.css`: containers, seções e grids utilitários.
- `css/components.css`: botões, badges, modais e fundos em grid.
- `css/glassmorphism.css`: cards, painéis e header com vidro fosco.
- `css/animations.css`: reveal, stagger e float hover.
- `css/clinical-lp.css`: linguagem visual completa da LP Clinical.
- `index.html`: composição real das seções, CTAs, chat, depoimentos e rodapé.

## Resumo Final

Para seguir a linha da LP, pense em **saúde + IA + WhatsApp + gestão operacional**, com visual claro, azul, arredondado, respirado, glassmorphism controlado, fotos humanas e microanimações que demonstram atendimento acontecendo em tempo real.
