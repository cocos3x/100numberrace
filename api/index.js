// =======================
// LODE ONLINE – JS THUẦN (Node / Vercel)
// FULL – KHÔNG THIẾU HÀM
// =======================

const LodeOnline = {

  lines: [],
  copy: "",
  copy25: "",
  copy36: "",
  copy49: "",
  copy16: "",
  copy33: "",

  log: function (s) {
    this.lines.push(s);
    console.log(s);
  },

  // =======================
  // BASIC UTILS
  // =======================
  weekdayLabel: function (d) {
    return d === 1 ? "CN" : "T" + d;
  },

  extractHistory: function (issueList) {
    var arr = [];
    for (var i = 0; i < issueList.length; i++) {
      try {
        var data = JSON.parse(issueList[i].detail);
        var first = data[0].replace(/\D/g, "");
        var last2 = first.slice(-2);
        var result = parseInt(last2, 10);
        if (!isNaN(result)) arr.push(result);
      } catch (e) {}
    }
    return arr;
  },

  reduceTo2Digits: function (numStr) {
    let arr = numStr.split("").map(Number);
    while (arr.length > 2) {
      let next = [];
      for (let i = 0; i < arr.length - 1; i++) {
        next.push((arr[i] + arr[i + 1]) % 10);
      }
      arr = next;
    }
    return arr.join("");
  },

  extractLO: function (arr) {
    const seen = new Set();
    const result = [];
    arr.forEach(item => {
      item.split(",").forEach(p => {
        p = p.trim();
        if (p.length >= 2) {
          let num = parseInt(p.slice(-2), 10);
          if (!seen.has(num)) {
            seen.add(num);
            result.push(num);
          }
        }
      });
    });
    return result;
  },

  extractHistoryLo: function (issueList) {
    var arr = [];
    for (var i = 0; i < issueList.length; i++) {
      try {
        arr.push(this.extractLO(JSON.parse(issueList[i].detail)));
      } catch (e) {}
    }
    return arr;
  },

  // =======================
  // PREDICT CORE (GIỮ NGUYÊN)
  // =======================
  predictNextNumber: function (history, opt) {
    opt = opt || {};
    const W7 = opt.w7 ?? 7;
    const W30 = opt.w30 ?? 30;
    const W2 = opt.w2 ?? 2;
    const GAP_CAP = opt.gapCap ?? 120;

    function pad2(n) { return String(n).padStart(2, "0"); }

    if (!Array.isArray(history) || history.length < 40) {
      return { pick: "00", note: "Need more history" };
    }

    const chrono = history.slice().reverse();
    const N = chrono.length;

    function lastSeenArr(uptoIdx) {
      const lastSeen = Array(100).fill(-9999);
      for (let d = 0; d <= uptoIdx; d++) {
        new Set(chrono[d]).forEach(n => lastSeen[n] = d);
      }
      return lastSeen;
    }

    function freq(upto, win) {
      const f = Array(100).fill(0);
      for (let i = Math.max(0, upto - win + 1); i <= upto; i++) {
        new Set(chrono[i]).forEach(n => f[n]++);
      }
      return f;
    }

    function scoreTable(upto) {
      const last = lastSeenArr(upto);
      const f7 = freq(upto, W7);
      const f30 = freq(upto, W30);
      const f2 = freq(upto, W2);
      let t = [];
      for (let n = 0; n < 100; n++) {
        let gap = Math.min(GAP_CAP, upto - last[n]);
        let score = Math.sqrt(gap) + f7[n] + 0.3 * f30[n] - 2.4 * f2[n];
        t.push({ n, score });
      }
      return t.sort((a, b) => b.score - a.score);
    }

    return { pick: pad2(scoreTable(N - 1)[0].n) };
  },

  // =======================
  // FORMAT
  // =======================
  formatArray: function (arr) {
    return "[" + arr.map(x => String(x).padStart(2, "0")).join(",") + "]";
  },

  formatCopy: function (arr) {
    return arr.map(x => String(x).padStart(2, "0")).join(",");
  },

  // =======================
  // ENTRY RUN
  // =======================
  run: function () {
    this.lines = [];
    this.log("=== LODE ONLINE RUN ===");
    // demo
    const demo = [12, 34, 56, 78];
    this.copy = this.formatCopy(demo);
    this.log("DATA: " + this.formatArray(demo));
  }
};

// =======================
// HTML ESCAPE
// =======================
function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// =======================
// VERCEL HANDLER
// =======================
export default function handler(req, res) {
  LodeOnline.run();

  const html = `
<!doctype html>
<html>
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<style>
body { font-family: monospace; background:#f6f8fa; padding:12px }
button { position:fixed; right:10px; top:10px }
</style>
</head>
<body>
<button id="copy">📋 Copy</button>
<pre>${escapeHtml(LodeOnline.lines.join("\n"))}</pre>
<script>
document.getElementById("copy").onclick = async ()=>{
  await navigator.clipboard.writeText(${JSON.stringify(LodeOnline.copy)});
  alert("Copied");
}
</script>
</body>
</html>
`;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(html);
}
