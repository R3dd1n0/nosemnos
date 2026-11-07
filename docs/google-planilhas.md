# Conectar o formulário ao Google Planilhas

Leva uns 5 minutos e só precisa ser feito uma vez. Use a conta Google que vai ser a "dona" dos leads.

## 1. Criar a planilha
1. Acesse <https://sheets.new> e dê um nome, por exemplo **Nós em Nós · Inscrições aula aberta**.

## 2. Colar o script
1. Na planilha: menu **Extensões → Apps Script**.
2. Apague o conteúdo que aparecer e cole **todo** o conteúdo de [`apps-script/Code.gs`](../apps-script/Code.gs).
3. Clique no ícone de disquete (**Salvar**).

## 3. Publicar como App da Web
1. Botão azul **Implantar → Nova implantação**.
2. Na engrenagem ao lado de "Selecione o tipo", escolha **App da Web**.
3. Preencha:
   - **Executar como:** *Eu (seu e-mail)*
   - **Quem pode acessar:** **Qualquer pessoa**
4. **Implantar** → o Google pede autorização: **Autorizar acesso** → escolha sua conta → *Avançado* → *Acessar (não seguro)* → **Permitir**.
   (O aviso aparece porque o script é seu e não passou por verificação do Google; é normal.)
5. Copie a **URL do app da Web** (termina em `/exec`).

## 4. Colar a URL no site
No arquivo [`config.js`](../config.js), preencha:

```js
planilhaUrl: "https://script.google.com/macros/s/XXXXXXXX/exec",
```

Se preferir, mande a URL para quem cuida do site que ela é colada lá.

## 5. Testar
1. Abra a URL `/exec` no navegador: deve aparecer `{"ok":true,...}`.
2. Faça uma inscrição de teste na página. A aba **Inscrições** é criada sozinha na planilha com a primeira linha.

## Se mudar o script depois
**Implantar → Gerenciar implantações → lápis (editar) → Versão: Nova versão → Implantar.**
Assim a URL continua a mesma.

## Dica: saber de onde vêm as inscrições
Divulgue links com UTM, e a planilha registra a origem de cada inscrição:

- Bio do Instagram: `…/?utm_source=instagram&utm_medium=bio`
- Stories: `…/?utm_source=instagram&utm_medium=stories`
- Podcast: `…/?utm_source=podcast`
- WhatsApp: `…/?utm_source=whatsapp`

## Privacidade (LGPD)
A planilha guarda nome, telefone e respostas sobre a relação das pessoas. Compartilhe só com quem precisa, e não baixe cópias para computadores de terceiros.
