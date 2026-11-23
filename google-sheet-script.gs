/**
 * Quiz lead tracker. Paste this into Google Sheets > Extensions > Apps Script.
 * It creates two tabs automatically:
 *   Leads  - one row per person who finished the quiz (plus "Booked?" filled in when they book on Calendly)
 *   Funnel - every event (start, halfway, lead, book_click, booked) so you can see where people drop off
 */

const LEAD_COLS = ["Time","Name","WhatsApp","Email","Hot lead","Weakest","Overall %","Nutrition %","Exercise %","Mindset %",
  "Goal","Why now","Start","Commitment","Invest","Meals","Drinks","Night eating","Exercise","Daily activity","Sleep & stress",
  "Emotional eating","Last attempt","Source","Language","Booked?"];

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const funnel = sheet_(ss, "Funnel", ["Time","Event","Source","Name","WhatsApp"]);
  funnel.appendRow([new Date(), d.type, d.source || "", d.name || "", d.whatsapp || ""]);

  const leads = sheet_(ss, "Leads", LEAD_COLS);
  if (d.type === "lead") {
    leads.appendRow([new Date(), d.name, "'" + d.whatsapp, d.email, d.hot, d.weakest, d.overall, d.nutritionPct, d.exercisePct, d.mindsetPct,
      d.goal, d.why, d.start, d.commit, d.invest, d.meals, d.drinks, d.night, d.exercise, d.steps, d.sleep,
      d.emotional, d.past, d.source, d.lang === "ms" ? "BM" : "EN", ""]);
  }
  if (d.type === "booked") {
    // mark the most recent row for this WhatsApp number as booked
    const data = leads.getDataRange().getValues();
    for (let r = data.length - 1; r >= 1; r--) {
      if (String(data[r][2]).replace(/\D/g, "") === String(d.whatsapp).replace(/\D/g, "")) {
        leads.getRange(r + 1, LEAD_COLS.length).setValue("YES " + new Date().toLocaleDateString());
        break;
      }
    }
  }
  return ContentService.createTextOutput("ok");
}

function sheet_(ss, name, header) {
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(header);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, header.length).setFontWeight("bold");
  }
  return sh;
}
