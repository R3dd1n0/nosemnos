# Ligar o domínio soltandonos.com.br ao site

São duas partes: **Registro.br** (DNS) e **GitHub** (Pages). Faça nessa ordem.

## 1. Registro.br: apontar o domínio para o GitHub
1. Entre em <https://registro.br> → **Painel** → clique em `soltandonos.com.br`.
2. Em **DNS**, clique em **Configurar zona DNS** (se pedir, escolha **Utilizar os servidores DNS do Registro.br**).
3. Clique em **Nova entrada** e crie estas entradas:

| Tipo | Nome | Valor |
|---|---|---|
| A | *(vazio)* | 185.199.108.153 |
| A | *(vazio)* | 185.199.109.153 |
| A | *(vazio)* | 185.199.110.153 |
| A | *(vazio)* | 185.199.111.153 |
| AAAA | *(vazio)* | 2606:50c0:8000::153 |
| AAAA | *(vazio)* | 2606:50c0:8001::153 |
| AAAA | *(vazio)* | 2606:50c0:8002::153 |
| AAAA | *(vazio)* | 2606:50c0:8003::153 |
| CNAME | www | r3dd1n0.github.io |

4. **Salvar alterações**. A propagação costuma levar de 15 minutos a algumas horas. Domínio recém-comprado no Registro.br pode levar até 24h.

## 2. GitHub: informar o domínio
1. <https://github.com/R3dd1n0/nosemnos/settings/pages>
2. Em **Custom domain**, digite `soltandonos.com.br` → **Save**.
3. Espere o check verde ("DNS check successful") e marque **Enforce HTTPS**.
   (O certificado HTTPS pode levar até 1h para ficar disponível depois do DNS.)

Pronto: `soltandonos.com.br` e `www.soltandonos.com.br` abrem o site, e o endereço antigo `r3dd1n0.github.io/nosemnos` redireciona para o novo.

> Faça o passo 2 **só depois** do passo 1. Se o domínio for informado ao GitHub antes do DNS existir, o endereço antigo passa a redirecionar para um domínio que ainda não funciona.
