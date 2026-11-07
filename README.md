# Nós em Nós · landing pages

Site estático (HTML + CSS + JS, sem build) publicado no GitHub Pages.

| Página | Arquivo | Status |
|---|---|---|
| Aula aberta 17/11 (captação de leads) | `index.html` | no ar |

## Editar sem mexer no código
Tudo que muda com frequência fica em **[`config.js`](config.js)**:

- `planilhaUrl`: para onde vão as inscrições ([como conectar ao Google Planilhas](docs/google-planilhas.md))
- `whatsappGrupoUrl`: grupo para onde a pessoa vai depois de se inscrever
- `instagram`: perfis que aparecem no rodapé

Enquanto `planilhaUrl` estiver vazio, a página funciona em **modo prévia**: o formulário mostra a confirmação, mas **não salva** a inscrição.

## Estrutura
```
index.html              página da aula aberta
config.js               links e configurações
assets/css/style.css    visual (cores da marca em :root)
assets/js/inscricao.js  formulário: validação, envio, redirecionamento
assets/img, assets/fonts
apps-script/Code.gs     script que grava as inscrições na planilha
docs/                   guias
```

## Testar localmente
```bash
python3 -m http.server 8000
```
e abra http://localhost:8000
