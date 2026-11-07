/* Formulário de inscrição da aula aberta → Google Planilhas → grupo do WhatsApp */
(function () {
  'use strict';

  var cfg = window.NOS_CONFIG || {};
  var form = document.getElementById('form-inscricao');
  var status = form.querySelector('.form-status');
  var botao = form.querySelector('button[type="submit"]');
  var obrigado = document.getElementById('obrigado');
  var linkWhats = document.getElementById('obrigado-whatsapp');

  /* ---------- Redes sociais no rodapé ---------- */
  var redes = document.getElementById('redes');
  var insta = cfg.instagram || {};
  [insta.nosEmNos, insta.ilo, insta.mari].forEach(function (user) {
    user = (user || '').replace(/^@/, '').trim();
    if (!user) return;
    var a = document.createElement('a');
    a.href = 'https://instagram.com/' + encodeURIComponent(user);
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = '@' + user;
    redes.appendChild(a);
  });

  /* ---------- Máscara do WhatsApp: (85) 99999-9999 ---------- */
  var tel = document.getElementById('f-whatsapp');
  tel.addEventListener('input', function () {
    var d = tel.value.replace(/\D/g, '').replace(/^55(?=\d{10,11}$)/, '').slice(0, 11);
    var out = d;
    if (d.length > 2) out = '(' + d.slice(0, 2) + ') ' + d.slice(2);
    if (d.length > 7) out = '(' + d.slice(0, 2) + ') ' + d.slice(2, d.length - 4) + '-' + d.slice(-4);
    tel.value = out;
  });

  /* ---------- Origem do visitante (UTMs dos links de divulgação) ---------- */
  var params = new URLSearchParams(location.search);
  var origem = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].forEach(function (k) {
    if (params.get(k)) origem[k] = params.get(k).slice(0, 100);
  });

  /* ---------- Validação ---------- */
  function validar() {
    var ok = true;
    var primeiroErro = null;
    var regras = {
      nome: function (v) { return v.trim().length >= 2; },
      whatsapp: function (v) { var n = v.replace(/\D/g, ''); return n.length >= 10 && n.length <= 13; },
      tempo_juntos: function (v) { return v.trim().length >= 1; }
    };
    Object.keys(regras).forEach(function (nome) {
      var campo = form.elements[nome];
      var valido = regras[nome](campo.value);
      campo.closest('.campo').classList.toggle('invalido', !valido);
      campo.setAttribute('aria-invalid', valido ? 'false' : 'true');
      if (!valido && !primeiroErro) primeiroErro = campo;
      ok = ok && valido;
    });
    if (primeiroErro) primeiroErro.focus();
    return ok;
  }
  form.addEventListener('input', function (e) {
    var c = e.target.closest('.campo');
    if (c && c.classList.contains('invalido')) {
      c.classList.remove('invalido');
      e.target.setAttribute('aria-invalid', 'false');
    }
  });

  /* ---------- Envio ---------- */
  function mostrarObrigado(nome) {
    form.hidden = true;
    obrigado.hidden = false;
    var primeiroNome = (nome || '').trim().split(/\s+/)[0];
    if (primeiroNome) obrigado.querySelector('h3').textContent = 'Inscrição feita, ' + primeiroNome + '!';
    if (cfg.whatsappGrupoUrl) {
      linkWhats.href = cfg.whatsappGrupoUrl;
      linkWhats.hidden = false;
      setTimeout(function () { window.location.href = cfg.whatsappGrupoUrl; }, 2500);
    } else {
      document.getElementById('obrigado-texto').textContent =
        'Em breve você recebe no seu WhatsApp o link da aula e os lembretes. Até terça, 17 de novembro, às 19h!';
    }
    obrigado.focus();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.textContent = '';
    if (form.elements.site.value) return; // robô
    if (!validar()) return;

    var dados = new URLSearchParams();
    ['nome', 'whatsapp', 'tempo_juntos', 'briga', 'ja_tentaram'].forEach(function (k) {
      dados.append(k, form.elements[k].value.trim());
    });
    Object.keys(origem).forEach(function (k) { dados.append(k, origem[k]); });
    dados.append('pagina', location.href.split('#')[0]);

    var nome = form.elements.nome.value;

    if (!cfg.planilhaUrl) {
      // Modo prévia: a planilha ainda não foi conectada (config.js).
      console.warn('[Nós em Nós] planilhaUrl vazio em config.js; inscrição NÃO foi salva.', Object.fromEntries(dados));
      mostrarObrigado(nome);
      return;
    }

    botao.disabled = true;
    botao.textContent = 'Enviando…';

    // O Apps Script não devolve cabeçalhos CORS; "no-cors" envia mesmo assim.
    fetch(cfg.planilhaUrl, { method: 'POST', mode: 'no-cors', body: dados })
      .then(function () { mostrarObrigado(nome); })
      .catch(function () {
        botao.disabled = false;
        botao.textContent = 'Quero participar';
        status.textContent = 'Não conseguimos enviar agora. Confira sua internet e tente de novo.';
      });
  });
})();
