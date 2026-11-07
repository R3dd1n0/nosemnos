/**
 * Nós em Nós — recebe as inscrições da landing page e grava na planilha.
 *
 * Como instalar: veja docs/google-planilhas.md
 * (Extensões → Apps Script → colar este código → Implantar como App da Web).
 */

var ABA = 'Inscrições';
var COLUNAS = [
  'Data/hora', 'Nome', 'WhatsApp', 'Tempo juntos / moram juntos?',
  'Briga que mais se repete', 'O que já tentaram',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'Página'
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var p = (e && e.parameter) || {};
    if (p.site) return resposta_({ ok: true }); // campo armadilha preenchido = robô

    var aba = obterAba_();
    aba.appendRow([
      new Date(),
      limpar_(p.nome),
      limpar_(p.whatsapp),
      limpar_(p.tempo_juntos),
      limpar_(p.briga),
      limpar_(p.ja_tentaram),
      limpar_(p.utm_source),
      limpar_(p.utm_medium),
      limpar_(p.utm_campaign),
      limpar_(p.utm_content),
      limpar_(p.pagina)
    ]);
    return resposta_({ ok: true });
  } catch (err) {
    return resposta_({ ok: false, erro: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Abrir a URL /exec no navegador mostra isto: serve para testar se está no ar.
function doGet() {
  return resposta_({ ok: true, mensagem: 'Formulário Nós em Nós no ar.' });
}

function obterAba_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var aba = ss.getSheetByName(ABA) || ss.insertSheet(ABA);
  if (aba.getLastRow() === 0) {
    aba.appendRow(COLUNAS);
    aba.setFrozenRows(1);
    aba.getRange(1, 1, 1, COLUNAS.length).setFontWeight('bold');
  }
  return aba;
}

// Limita o tamanho e impede que um texto começando com = + - @ vire fórmula.
function limpar_(v) {
  v = String(v || '').slice(0, 2000);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function resposta_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
