// ===== BUFFER LOG FOR NODE / VERCEL =====
let __OUT__ = [];

function log(x) {
  __OUT__.push(String(x));
}

function resetLog() {
  __OUT__ = [];
}

function getLog() {
  return __OUT__.join("\n");
}

/* AUTO-CONVERTED FROM GOOGLE APPS SCRIPT (.gs) */
const Logger = { log: (...a)=>log(...a) };
const Utilities = {
  formatDate(d,t,f){
    if(f==="u"){ const x=new Date(d).getDay(); return x===0?"7":String(x); }
    return "";
  }
};

// =======================
// StreakAnalyzer - Google Apps Script version (có FIXED_49_1 → FIXED_49_7)
// =======================

// Dùng: 
// const days = [14, 58, 73, 22, 90, 11, 47];
// const resultAll = StreakAnalyzer.analyzeAllFormulas(days);
// Logger.log(JSON.stringify(resultAll, null, 2));

var StreakAnalyzer = {

  // ====== 0) DANH SÁCH CÔNG THỨC 50–50 + FIXED 49 ======
  getFormulaIds: function () {
    return [
      "CHAN_LE",              // 1) số chẵn / lẻ
      "LON_NHO",              // 2) 0-49 / 50-99
      "CHUC_CHAN_LE",         // 3) chục chẵn / chục lẻ
      "DONVI_NHO_LON5",       // 4) đơn vị 0-4 / 5-9
      "MOD4_01_23",           // 5) n%4 in {0,1} / {2,3}
      "MOD4_03_12",           // 6) n%4 in {0,3} / {1,2}
      "MOD10_01379",          // 7) đuôi 0,1,3,7,9 / còn lại
      "TONG_CHAN_LE",         // 8) tổng 2 chữ số chẵn / lẻ
      "HIEU_CHAN_LE",         // 9) |chục - đơn| chẵn / lẻ
      "DAO_CHAN_LE",          // 10) số đảo chẵn / lẻ
      "DAO_NHO_LON",          // 11) số đảo 0-49 / 50-99
      "DONVI_SET_02579",      // 12) đuôi thuộc {0,2,5,7,9}
      "CHUC_SET_03589",       // 13) chục thuộc {0,3,5,8,9}
      "CHUC_CHAN_DONVI_LE",   // 14) (chục chẵn & đơn vị lẻ) / phần còn lại
      "FIXED_49_1",
      "FIXED_49_2",
      "FIXED_49_3",
      "FIXED_49_4",
      "FIXED_49_5",
      "FIXED_49_6",
      "FIXED_49_7",
      "FIXED_49_789",
      "FIXED_49_66"
//       "FIXED_51_1",
// "FIXED_51_2",
// "FIXED_51_3",
// "FIXED_51_4",
// "FIXED_51_5",
// "FIXED_51_6",
// "FIXED_51_7",
// "FIXED_49_66"
    ];
  },

  // ====== 1) Định nghĩa 7 bộ FIXED_49 ======
  FIXED_49_1: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48],
  FIXED_49_2: [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95],
  FIXED_49_3: [2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90],
  FIXED_49_4: [5,6,7,8,9,10,11,12,13,14,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56],
  FIXED_49_5: [0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96],
  FIXED_49_6: [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95],
  FIXED_49_7: [0,1,2,3,4,10,11,12,13,14,20,21,22,23,24,30,31,32,33,34,40,41,42,43,44,50,51,52,53,54,60,61,62,63,64,70,71,72,73,74,80,81,82,83,84,90,91,92,93,94],
  FIXED_49_789: [
  7,8,9,
  17,18,19,
  27,28,29,
  37,38,39,
  47,48,49,
  57,58,59,
  67,68,69,
  70,71,72,73,74,75,76,77,78,79,
  80,81,82,83,84,85,86,87,88,89,
  90,91,92,93,94,95,96,97,98,99
],
FIXED_49_66: [
  0,1,2,3,4,5,6,
  10,11,12,13,14,15,16,
  20,21,22,23,24,25,26,
  30,31,32,33,34,35,36,
  40,41,42,43,44,45,46,
  50,51,52,53,54,55,56,
  60,61,62,63,64,65,66
],
FIXED_49_17: [
  11, 12, 13, 14, 15, 16, 17,
21, 22, 23, 24, 25, 26, 27,
31, 32, 33, 34, 35, 36, 37,
41, 42, 43, 44, 45, 46, 47,
51, 52, 53, 54, 55, 56, 57,
61, 62, 63, 64, 65, 66, 67,
71, 72, 73, 74, 75, 76, 77
],
FIXED_49_28: [
  22, 23, 24, 25, 26, 27, 28,
32, 33, 34, 35, 36, 37, 38,
42, 43, 44, 45, 46, 47, 48,
52, 53, 54, 55, 56, 57, 58,
62, 63, 64, 65, 66, 67, 68,
72, 73, 74, 75, 76, 77, 78,
82, 83, 84, 85, 86, 87, 88
],
FIXED_49_39: [
33, 34, 35, 36, 37, 38, 39,
43, 44, 45, 46, 47, 48, 49,
53, 54, 55, 56, 57, 58, 59,
63, 64, 65, 66, 67, 68, 69,
73, 74, 75, 76, 77, 78, 79,
83, 84, 85, 86, 87, 88, 89,
93, 94, 95, 96, 97, 98, 99
],
  // ====== 2) PHÂN LOẠI 1 SỐ THEO CÔNG THỨC ======
  classify: function (formulaId, n) {
    var d = n;
    if (d < 0) d = 0;
    if (d > 99) d = d % 100;

    var chuc = Math.floor(d / 10);
    var donvi = d % 10;
    var tong = chuc + donvi;

    // --- 50–50 công thức cũ ---
    if (formulaId === "CHAN_LE") return d % 2 === 0 ? "CHAN" : "LE";
    if (formulaId === "LON_NHO") return d <= 49 ? "NHO" : "LON";
    if (formulaId === "CHUC_CHAN_LE") return chuc % 2 === 0 ? "CHUC_CHAN" : "CHUC_LE";
    if (formulaId === "DONVI_NHO_LON5") return donvi <= 4 ? "DONVI_NHO" : "DONVI_LON";
    if (formulaId === "MOD4_01_23") return (d % 4 === 0 || d % 4 === 1) ? "MOD4_01" : "MOD4_23";
    if (formulaId === "MOD4_03_12") return (d % 4 === 0 || d % 4 === 3) ? "MOD4_03" : "MOD4_12";
    if (formulaId === "MOD10_01379") return [0,1,3,7,9].includes(donvi) ? "U01379" : "U24568";
    if (formulaId === "TONG_CHAN_LE") return tong % 2 === 0 ? "TONG_CHAN" : "TONG_LE";
    if (formulaId === "HIEU_CHAN_LE") return Math.abs(chuc - donvi) % 2 === 0 ? "HIEU_CHAN" : "HIEU_LE";
    if (formulaId === "DAO_CHAN_LE") return ((donvi*10 + chuc) % 2 === 0) ? "DAO_CHAN" : "DAO_LE";
    if (formulaId === "DAO_NHO_LON") return (donvi*10 + chuc) <= 49 ? "DAO_NHO" : "DAO_LON";
    if (formulaId === "DONVI_SET_02579") return [0,2,5,7,9].includes(donvi) ? "DONVI_02579" : "DONVI_OTHER";
    if (formulaId === "CHUC_SET_03589") return [0,3,5,8,9].includes(chuc) ? "CHUC_03589" : "CHUC_OTHER";
    if (formulaId === "CHUC_CHAN_DONVI_LE") return (chuc % 2 === 0 && donvi % 2 !== 0) ? "CC_DL" : "OTHER_CC_DL";

   if (formulaId.startsWith("FIXED_49")) {
      var idx = formulaId.split("_")[2];          // "1", "2", "789", "66", ...
      var arr49 = this["FIXED_49_" + idx];
      if (!arr49) return "";

      return arr49.includes(d)
        ? "IN_SET_49_" + idx
        : "OUT_SET_49_" + idx;
    }


    return "";
  },

  // ====== 3) NHÓM TƯƠNG ỨNG CHO MỖI CÔNG THỨC ======
  getGroupsForFormula: function (formulaId) {
    var groups = [];
    if (formulaId === "CHAN_LE") groups = ["CHAN","LE"];
    else if (formulaId === "LON_NHO") groups = ["NHO","LON"];
    else if (formulaId === "CHUC_CHAN_LE") groups = ["CHUC_CHAN","CHUC_LE"];
    else if (formulaId === "DONVI_NHO_LON5") groups = ["DONVI_NHO","DONVI_LON"];
    else if (formulaId === "MOD4_01_23") groups = ["MOD4_01","MOD4_23"];
    else if (formulaId === "MOD4_03_12") groups = ["MOD4_03","MOD4_12"];
    else if (formulaId === "MOD10_01379") groups = ["U01379","U24568"];
    else if (formulaId === "TONG_CHAN_LE") groups = ["TONG_CHAN","TONG_LE"];
    else if (formulaId === "HIEU_CHAN_LE") groups = ["HIEU_CHAN","HIEU_LE"];
    else if (formulaId === "DAO_CHAN_LE") groups = ["DAO_CHAN","DAO_LE"];
    else if (formulaId === "DAO_NHO_LON") groups = ["DAO_NHO","DAO_LON"];
    else if (formulaId === "DONVI_SET_02579") groups = ["DONVI_02579","DONVI_OTHER"];
    else if (formulaId === "CHUC_SET_03589") groups = ["CHUC_03589","CHUC_OTHER"];
    else if (formulaId === "CHUC_CHAN_DONVI_LE") groups = ["CC_DL","OTHER_CC_DL"];
   else if (formulaId.startsWith("FIXED_49")) {
    var idx = formulaId.split("_")[2];
    groups = ["IN_SET_49_" + idx, "OUT_SET_49_" + idx];
  }
    return groups;
  },

  // ====== 4) sort runs ======
  compareRuns: function (a,b) { return (b.length !== a.length) ? b.length - a.length : a.startIndex - b.startIndex; },
  pushRun: function (target, seq, startIndex) { target.push({length: seq.length, seq: [].concat(seq), startIndex: startIndex}); },

  // ====== 5) analyzeFormula ======
  analyzeFormula: function (days, formulaId) {
    var result = { formulaId: formulaId, groups:{}, current:null };
    if (!days || days.length === 0) return result;

    var groups = this.getGroupsForFormula(formulaId);
    for (var i=0;i<groups.length;i++) result.groups[groups[i]] = { runs: [], top3: [], maxLen:0 };

    var labels = days.map(d => this.classify(formulaId,d));

    var currentLabel = labels[0], currentSeq = [days[0]], currentStartIndex = 0;
    for (var i=1;i<labels.length;i++){
      if(labels[i]===currentLabel) currentSeq.push(days[i]);
      else { this.pushRun(result.groups[currentLabel].runs,currentSeq,currentStartIndex); currentLabel=labels[i]; currentSeq=[days[i]]; currentStartIndex=i;}
    }
    this.pushRun(result.groups[currentLabel].runs,currentSeq,currentStartIndex);

    // dây hiện tại
    var firstLabel = labels[0], runsOfFirst = result.groups[firstLabel].runs, currentLen=0;
    for (var j=0;j<runsOfFirst.length;j++){ if(runsOfFirst[j].startIndex===0){currentLen=runsOfFirst[j].length; break; } }

    // sort runs & maxLen + top3
    for (var i=0;i<groups.length;i++){
      var g = groups[i], runs = result.groups[g].runs;
      runs.sort(this.compareRuns.bind(this));
      var maxLen = 0;
      for(var j=0;j<runs.length;j++) if(runs[j].length>maxLen) maxLen=runs[j].length;
      result.groups[g].maxLen=maxLen;
      for(var j=0;j<Math.min(3,runs.length);j++) result.groups[g].top3.push(runs[j]);
    }

    // %
    var percent = (result.groups[firstLabel].maxLen>0) ? currentLen*100/result.groups[firstLabel].maxLen : 0;
    result.current = { label:firstLabel, length:currentLen, maxLen: result.groups[firstLabel].maxLen, percent: percent };
    return result;
  },

  // ====== 6) analyzeAllFormulas ======
  analyzeAllFormulas: function (days) {
    var ids = this.getFormulaIds(), out={};
    for(var i=0;i<ids.length;i++){ 
      var id=ids[i]; out[id]=this.analyzeFormula(days,id);
       }
    return out;
  }
};

// =======================
// Hàm test
// =======================

function sortByCurrentMiss(stats) {
  // stats = {0:{currentMiss,x}, 1:{...}, ...}
  const arr = [];

  for (let d = 0; d <= 9; d++) {
    arr.push({
      digit: d,
      currentMiss: stats[d].currentMiss,
      maxMiss: stats[d].maxMiss
    });
  }

  // Sắp xếp: lớn → nhỏ
  arr.sort((a, b) => b.currentMiss - a.currentMiss);

  return arr;
}
function testStreaks() {
  // Random 200 phần tử (0–99)
  const days = Array.from({ length: 200 }, () =>
    Math.floor(Math.random() * 100)
  );
  console.log("Days:", days.join(", "));

  // Hàng đơn vị
  const unitStats = analyzeUnitDigitStreaks(days);
    const sortedUnit = sortByCurrentMiss(unitStats);
  console.log("=== HÀNG ĐƠN VỊ (0–9) ===");
  for (let d = 0; d <= 9; d++) {
    const s = sortedUnit[d];
    console.log(`Unit ${d}: currentMiss=${s.currentMiss}, maxMiss=${s.maxMiss}`);
  }

  // Hàng chục
  const tenStats = analyzeTensDigitStreaks(days);
    const sortedTens = sortByCurrentMiss(tenStats);
  console.log("=== HÀNG CHỤC (0–9) ===");
  for (let d = 0; d <= 9; d++) {
    const s = sortedTens[d];
    console.log(`Tens ${d}: currentMiss=${s.currentMiss}, maxMiss=${s.maxMiss}`);
  }
}
/** 
 * LodeOnline - Google Apps Script version
 * Cần có StreakAnalyzer (GAS) đã khai báo trước đó.
 */
function analyzeUnitDigitStreaks(days) {
  const n = days.length;
  const units = days.map(v => Math.abs(v) % 10); // giữ y như bản gốc

  const result = {};

  for (let d = 0; d <= 9; d++) {

    // ---- 1) currentMiss: từ ngày mới nhất lùi về sau bao nhiêu ngày chưa gặp d ----
    let currentMiss = 0;
    for (let i = 0; i < n; i++) {
      if (units[i] === d) {
        break; // gặp lần đầu thì dừng
      }
      currentMiss++;
    }
    // nếu không gặp lần nào => currentMiss = n

    // ---- 2) Thu thập các dây "không có d" + tính maxMiss giống hệt hàm cũ ----
    const gaps = [];
    let run = 0;
    let maxMiss = 0;

    for (let i = 0; i < n; i++) {
      if (units[i] === d) {
        // kết thúc 1 dây không có d
        if (run > 0) {
          gaps.push(run);
        }
        run = 0;
      } else {
        run++;
        if (run > maxMiss) maxMiss = run; // y hệt hàm gốc
      }
    }
    // nếu kết thúc mà vẫn còn dây đang chạy
    if (run > 0) {
      gaps.push(run);
    }

    // nếu ngày nào cũng có d → không có dây miss nào
    if (gaps.length === 0) {
      gaps.push(0); // maxMiss lúc này cũng đang = 0 (giống hàm cũ)
    }

    // ---- 3) Sắp xếp và gom theo độ dài (len -> count) ----
    gaps.sort((a, b) => b - a); // giảm dần

    const lengthCounts = [];
    for (let i = 0; i < gaps.length; i++) {
      const len = gaps[i];
      const last = lengthCounts[lengthCounts.length - 1];
      if (!last || last.len !== len) {
        lengthCounts.push({ len: len, count: 1 });
      } else {
        last.count++;
      }
    }

    function getTop(idx) {
      return lengthCounts[idx] || { len: 0, count: 0 };
    }

    const top1 = getTop(0);
    const top2 = getTop(1);
    const top3 = getTop(2);
    const top4 = getTop(3);
    const top5 = getTop(4);

    // ---- 4) Lưu kết quả cho digit d ----
    result[d] = {
      // GIỮ Y NGUYÊN 2 TRƯỜNG NÀY:
      currentMiss: currentMiss,
      maxMiss: maxMiss,

      // thêm thống kê dây
      maxMissCount: top1.count,      // số lần xuất hiện dây dài nhất

      secondMiss: top2.len,
      secondMissCount: top2.count,

      thirdMiss: top3.len,
      thirdMissCount: top3.count,

      fourthMiss: top4.len,
      fourthMissCount: top4.count,

      fifthMiss: top5.len,
      fifthMissCount: top5.count
    };
  }

  return result;
}


function analyzeTensDigitStreaks(days) {
  const n = days.length;
  // hàng chục của mỗi số (ép Number cho chắc)
  const tens = days.map(v => Math.floor(Math.abs(Number(v)) / 10) % 10);

  const result = {};

  for (let d = 0; d <= 9; d++) {

    // ---- 1) currentMiss: bao nhiêu ngày mới nhất đến giờ chưa gặp d ----
    let currentMiss = 0;
    for (let i = 0; i < n; i++) {
      if (tens[i] === d) break;
      currentMiss++;
    }

    // ---- 2) Thu thập các dây "không có d" + tính maxMiss giống hệt hàm cũ ----
    const gaps = [];
    let run = 0;
    let maxMiss = 0;

    for (let i = 0; i < n; i++) {
      if (tens[i] === d) {
        // kết thúc 1 dây không có d
        if (run > 0) {
          gaps.push(run);
        }
        run = 0;
      } else {
        run++;
        if (run > maxMiss) maxMiss = run; // giữ nguyên logic cũ
      }
    }

    // nếu kết thúc vòng mà vẫn còn dây đang chạy
    if (run > 0) {
      gaps.push(run);
    }

    // nếu ngày nào cũng có d → không có dây miss nào
    if (gaps.length === 0) {
      gaps.push(0); // maxMiss lúc này = 0, đúng như hàm gốc
    }

    // ---- 3) Sắp xếp giảm dần và gom theo độ dài (len -> count) ----
    gaps.sort((a, b) => b - a);

    const lengthCounts = [];
    for (let i = 0; i < gaps.length; i++) {
      const len = gaps[i];
      const last = lengthCounts[lengthCounts.length - 1];
      if (!last || last.len !== len) {
        lengthCounts.push({ len: len, count: 1 });
      } else {
        last.count++;
      }
    }

    function getTop(idx) {
      return lengthCounts[idx] || { len: 0, count: 0 };
    }

    const top1 = getTop(0);
    const top2 = getTop(1);
    const top3 = getTop(2);
    const top4 = getTop(3);
    const top5 = getTop(4);

    // ---- 4) Lưu kết quả cho hàng chục d ----
    result[d] = {
      // 2 trường giống hệt bản cũ:
      currentMiss: currentMiss,
      maxMiss: maxMiss,

      // thêm thống kê dây
      maxMissCount: top1.count,

      secondMiss: top2.len,
      secondMissCount: top2.count,

      thirdMiss: top3.len,
      thirdMissCount: top3.count,

      fourthMiss: top4.len,
      fourthMissCount: top4.count,

      fifthMiss: top5.len,
      fifthMissCount: top5.count
    };
  }

  return result;
}
function generateRandomDays(numDays = 100, numsPerDay = 15) {
    const days = [];

    for (let d = 0; d < numDays; d++) {
        const set = new Set();
        while (set.size < numsPerDay) {
            const n = Math.floor(Math.random() * 100); // 0..99
            set.add(n);
        }
        days.push(Array.from(set));
    }

    // days[0] = ngày mới nhất (hôm nay)
    return days;
}

// Phân tích gap cho từng số 0..99
function analyzeGaps(days) {
    const numDays = days.length;
    const stats = [];

    // contains[n][day] = true nếu ngày đó có số n
    const contains = Array.from({ length: 100 }, () =>
        new Array(numDays).fill(false)
    );

    for (let day = 0; day < numDays; day++) {
        const nums = days[day] || [];
        for (let i = 0; i < nums.length; i++) {
            const v = Number(nums[i]);          // đảm bảo là số (10.0 -> 10)
            if (v >= 0 && v < 100) {
                contains[v][day] = true;
            }
        }
    }

    for (let n = 0; n < 100; n++) {
        // ===== 1) Thu thập tất cả chuỗi "không gặp n" =====
        const gaps = [];
        let runGap = 0;

        for (let day = 0; day < numDays; day++) {
            if (!contains[n][day]) {
                runGap++;
            } else {
                if (runGap > 0) {
                    gaps.push(runGap); // kết thúc 1 chuỗi không gặp
                    runGap = 0;
                }
            }
        }
        // Nếu kết thúc mà vẫn đang trong chuỗi không gặp
        if (runGap > 0) {
            gaps.push(runGap);
        }

        // Nếu không có gap nào (ngày nào cũng ra n)
        if (gaps.length === 0) {
            gaps.push(0);
        }

        // ===== 2) Sắp xếp giảm dần và gom nhóm (length -> count) =====
        gaps.sort(function (a, b) { return b - a; });

        const lengthCounts = [];
        for (let i = 0; i < gaps.length; i++) {
            const len = gaps[i];
            if (lengthCounts.length === 0 || lengthCounts[lengthCounts.length - 1].len !== len) {
                lengthCounts.push({ len: len, count: 1 });
            } else {
                lengthCounts[lengthCounts.length - 1].count++;
            }
        }

        // Lấy top 1..5 (nếu không đủ thì để 0 / 0)
        const top1 = lengthCounts[0] || { len: 0, count: 0 };
        const top2 = lengthCounts[1] || { len: 0, count: 0 };
        const top3 = lengthCounts[2] || { len: 0, count: 0 };
        const top4 = lengthCounts[3] || { len: 0, count: 0 };
        const top5 = lengthCounts[4] || { len: 0, count: 0 };

        // ===== 3) Tính currentGap: từ ngày 0 đến khi gặp n =====
        let currentGap = 0;
        for (let day = 0; day < numDays; day++) {
            if (!contains[n][day]) {
                currentGap++;
            } else {
                break;
            }
        }

        stats.push({
            n: n,

            // max + số lần xuất hiện max
            maxGap: top1.len,
            maxGapCount: top1.count,

            // chuỗi dài thứ 2..5 + số lần
            secondGap: top2.len,
            secondGapCount: top2.count,

            thirdGap: top3.len,
            thirdGapCount: top3.count,

            fourthGap: top4.len,
            fourthGapCount: top4.count,

            fifthGap: top5.len,
            fifthGapCount: top5.count,

            // gap hiện tại tính từ day = 0
            currentGap: currentGap
        });
    }

    return stats;
}
function combinations7(arr) {
  const result = [];
  const n = arr.length;

  for (let a = 0; a < n - 6; a++)
  for (let b = a + 1; b < n - 5; b++)
  for (let c = b + 1; c < n - 4; c++)
  for (let d = c + 1; d < n - 3; d++)
  for (let e = d + 1; e < n - 2; e++)
  for (let f = e + 1; f < n - 1; f++)
  for (let g = f + 1; g < n; g++) {
    result.push([arr[a], arr[b], arr[c], arr[d], arr[e], arr[f], arr[g]]);
  }

  return result;
}
function combinations6(arr) {
  const result = [];
  const n = arr.length;

  for (let a = 0; a < n - 5; a++)
  for (let b = a + 1; b < n - 4; b++)
  for (let c = b + 1; c < n - 3; c++)
  for (let d = c + 1; d < n - 2; d++)
  for (let e = d + 1; e < n - 1; e++)
  for (let f = e + 1; f < n; f++) {
    result.push([arr[a], arr[b], arr[c], arr[d], arr[e], arr[f]]);
  }

  return result;
}
function buildAllGroups6() {
  const digitSets = combinations6([0,1,2,3,4,5,6,7,8,9]);
  const groups = [];

  digitSets.forEach(digits => {
    const numbers = [];
    for (let a of digits)
      for (let b of digits)
        numbers.push(a * 10 + b);  // AB = 00..99 nhưng chỉ trong set

    groups.push({
      id: digits.join(""),    // ví dụ "012345"
      digits,
      numbers,
      set: new Set(numbers)
    });
  });

  return groups;
}
function buildAllGroups7() {
  const digitSets = combinations7([0,1,2,3,4,5,6,7,8,9]);
  const groups = [];

  digitSets.forEach(digits => {
    const numbers = [];

    for (let a of digits)
      for (let b of digits)
        numbers.push(a * 10 + b);

    groups.push({
      id: digits.join(""),
      digits,
      numbers,
      set: new Set(numbers)
    });
  });

  return groups;
}
function analyzeGroups7(days) {
  const n = days.length;
  const groups = buildAllGroups7();
  const stats = [];

  for (const g of groups) {
    const inSet = g.set;

    // === 1) currentMiss ===
    let currentMiss = 0;
    for (let i = 0; i < n; i++) {
      if (inSet.has(days[i])) break;
      currentMiss++;
    }

    // === 2) thu thập toàn bộ gap không về ===
    const gaps = [];
    let run = 0;

    for (let i = 0; i < n; i++) {
      if (inSet.has(days[i])) {
        if (run > 0) gaps.push(run);
        run = 0;
      } else {
        run++;
      }
    }
    if (run > 0) gaps.push(run);

    if (gaps.length === 0) gaps.push(0);

    // === 3) gom thành top1~3 ===
    gaps.sort((a, b) => b - a);

    const lengthCounts = [];
    for (let len of gaps) {
      const last = lengthCounts[lengthCounts.length - 1];
      if (!last || last.len !== len)
        lengthCounts.push({ len, count: 1 });
      else
        last.count++;
    }

    function top(i) { return lengthCounts[i] || { len: 0, count: 0 }; }

    const t1 = top(0), t2 = top(1), t3 = top(2);

    stats.push({
      groupId: g.id,
      digits: g.digits,
      currentMiss,

      maxMiss: t1.len,
      maxMissCount: t1.count,

      secondMiss: t2.len,
      secondMissCount: t2.count,

      thirdMiss: t3.len,
      thirdMissCount: t3.count,
       arrString: g.numbers
    .map(x => x.toString().padStart(2, "0"))
    .join(",")
    });
  }

  return stats;
}
function combinations3(arr) {
  const result = [];
  const n = arr.length;

  for (let a = 0; a < n - 2; a++)
  for (let b = a + 1; b < n - 1; b++)
  for (let c = b + 1; c < n; c++) {
    result.push([arr[a], arr[b], arr[c]]);
  }

  return result;
}
function analyzeGroups3(days) {
  const n = days.length;
  const groups = buildAllGroups3();
  const stats = [];

  for (const g of groups) {
    const inSet = g.set;

    // ===== 1) currentMiss =====
    let currentMiss = 0;
    for (let i = 0; i < n; i++) {
      if (inSet.has(days[i])) break;
      currentMiss++;
    }

    // ===== 2) Tính toàn bộ dây miss =====
    const gaps = [];
    let run = 0;

    for (let i = 0; i < n; i++) {
      if (inSet.has(days[i])) {
        if (run > 0) gaps.push(run);
        run = 0;
      } else {
        run++;
      }
    }
    if (run > 0) gaps.push(run);
    if (gaps.length === 0) gaps.push(0);

    // ===== 3) Sort gaps giảm dần =====
    gaps.sort((a, b) => b - a);

    // ===== 4) Gom top (lc) để HIỂN THỊ =====
    const lc = [];
    for (let len of gaps) {
      const last = lc[lc.length - 1];
      if (!last || last.len !== len) lc.push({ len, count: 1 });
      else last.count++;
    }

    const top = i => lc[i] || { len: 0, count: 0 };


    

    const t1 = top(0);
    const t2 = top(1);
    const t3 = top(2);
    const t4 = top(3);
    const t5 = top(4);
    const t6 = top(5);
    const t7 = top(6);
    const t8 = top(7);
const maxIndex = lc.length - 1;

// 1️⃣ tạo mảng top(0) → top(N)
const topArr = [];
for (let i = 0; i <= maxIndex; i++) {
  topArr.push(lc[i].len);
}

// 2️⃣ tạo mảng nhịp
const nhipArr = [];
for (let i = 0; i < topArr.length - 1; i++) {
  nhipArr.push(Math.abs(topArr[i] - topArr[i + 1]));
}

// 3️⃣ log giống hệt bạn nhập tay
// console.log("Nhịp =", nhipArr.join(" - "));

const nhipMax = Math.max(...nhipArr);
const nhipMaxCount = nhipArr.filter(x => x === nhipMax).length;

    // ===== 6) Push kết quả =====
    stats.push({
      groupId: g.id,
      digits: g.digits,

      currentMiss,

      // Top để hiển thị
      maxMiss: t1.len,
      maxMissCount: t1.count,
      nhip:nhipArr.join(" - "),
      lenT2: t2.len,
      countT2: t2.count,
      lenT3: t3.len,
      countT3: t3.count,
      lenT4: t4.len,
      countT4: t4.count,
      lenT5: t5.len,
      countT5: t5.count,
      lenT6: t6.len,
      countT6: t6.count,
      lenT7: t7.len,
      countT7: t7.count,
      lenT8: t8.len,
      countT8: t8.count,

      // Nhịp toàn bộ
      nhipMax,
      nhipMaxCount,

      arrString: g.numbers
        .map(x => x.toString().padStart(2, "0"))
        .join(",")
    });
  }

  return stats;
}

function buildAllGroups3() {
  const digitSets = combinations3([0,1,2,3,4,5,6,7,8,9]);
  const groups = [];

  digitSets.forEach(digits => {
    const numbers = [];

    for (let a of digits)
      for (let b of digits)
        numbers.push(a * 10 + b);

    groups.push({
      id: digits.join(""),      // ví dụ: "013"
      digits,
      numbers,
      set: new Set(numbers)
    });
  });

  return groups;
}
function analyzeGroups8(days) {
  const groups = buildAllGroups8();
  const n = days.length;
  const stats = [];

  for (const g of groups) {
    const set = g.set;

    // ===== 1) currentHit: từ ngày 0 tăng lên, tới khi gặp ngày KHÔNG thuộc tập
    let currentHit = 0;
    for (let i = 0; i < n; i++) {
      if (!set.has(days[i])) break;
      currentHit++;
    }

    // ===== 2) Thu thập tất cả chuỗi hit liên tục
    const hits = [];
    let run = 0;

    for (let i = 0; i < n; i++) {
      if (set.has(days[i])) {
        run++;
      } else {
        if (run > 0) hits.push(run);
        run = 0;
      }
    }
    if (run > 0) hits.push(run);

    if (hits.length === 0) hits.push(0);

    // ===== 3) Sort & gom nhóm
    hits.sort((a,b) => b - a);

    const lenCount = [];
    for (let h of hits) {
      const last = lenCount[lenCount.length - 1];
      if (!last || last.len !== h) lenCount.push({ len: h, count: 1 });
      else last.count++;
    }

    const t1 = lenCount[0] || { len:0,count:0 };
    const t2 = lenCount[1] || { len:0,count:0 };
    const t3 = lenCount[2] || { len:0,count:0 };

    // ===== 4) Push kết quả
    stats.push({
      groupId: g.id,
      digits: g.digits,
      currentHit,

      maxHit: t1.len,
      maxHitCount: t1.count,

      secondHit: t2.len,
      secondHitCount: t2.count,

      thirdHit: t3.len,
      thirdHitCount: t3.count,

      arrString: g.numbers
        .map(x => x.toString().padStart(2,"0"))
        .join(",")
    });
  }

  return stats;
}
function buildAllGroups8() {
  const digitSets = combinations8([0,1,2,3,4,5,6,7,8,9]);
  const groups = [];

  digitSets.forEach(digits => {
    const numbers = [];

    for (let a of digits)
      for (let b of digits)
        numbers.push(a * 10 + b);

    groups.push({
      id: digits.join(""),      // "01234567"
      digits,
      set: new Set(numbers),    // check nhanh
      numbers
    });
  });

  return groups;
}
function combinations8(arr) {
  const result = [];
  const n = arr.length;

  for (let a = 0; a < n - 7; a++)
  for (let b = a + 1; b < n - 6; b++)
  for (let c = b + 1; c < n - 5; c++)
  for (let d = c + 1; d < n - 4; d++)
  for (let e = d + 1; e < n - 3; e++)
  for (let f = e + 1; f < n - 2; f++)
  for (let g = f + 1; g < n - 1; g++)
  for (let h = g + 1; h < n; h++) {
    result.push([arr[a], arr[b], arr[c], arr[d], arr[e], arr[f], arr[g], arr[h]]);
  }

  return result;
}

function predictByOneNumber(data, todayIndex, x) {
  const freq = Array(100).fill(0);

  for (let d = todayIndex + 1; d < data.length - 1; d++) {
    if (data[d].includes(x)) {
      for (const n of data[d - 1]) {
        freq[n]++;
      }
    }
  }

  let best = 0;
  let bestScore = -1;
  for (let i = 0; i < 100; i++) {
    if (freq[i] > bestScore) {
      bestScore = freq[i];
      best = i;
    }
  }
  return best;
}
function calcStreak(data, indexInToday) {
  let maxLose = 0;
  let currentLose = 0;
  let tempLose = 0;

  for (let t = 0; t < data.length - 1; t++) {
    const x = data[t][indexInToday];
    const predicted = predictByOneNumber(data, t, x);
    const nextDay = data[t - 1];

    if (!nextDay || !nextDay.includes(predicted)) {
      tempLose++;
      currentLose = (t === 0) ? tempLose : currentLose;
    } else {
      maxLose = Math.max(maxLose, tempLose);
      tempLose = 0;
    }
  }

  maxLose = Math.max(maxLose, tempLose);

  return { maxLose, currentLose };
}
function mostFrequent(arr) {
  const freq = {};
  let max = 0, best = null;
  arr.forEach(n => {
    freq[n] = (freq[n] || 0) + 1;
    if (freq[n] > max) {
      max = freq[n];
      best = n;
    }
  });
  return best;
}
function cauQuarter(data) {
  const d1 = safeDay(data, 1);
  if (!d1) return null;

  const X = d1[0];
  const Q = Math.floor(X / 25);
  const bucket = [];

  for (let d = data.length - 1; d >= 2; d--) {
    const cur = safeDay(data, d);
    const next = safeDay(data, d - 1);
    if (!cur || !next) continue;

    if (Math.floor(cur[0] / 25) === Q) {
      bucket.push(...next);
    }
  }

  return bucket.length ? mostFrequent(bucket) : null;
}
function cauIntersection(data) {
  const d1 = safeDay(data, 1);
  const d2 = safeDay(data, 2);
  if (!d1 || !d2) return null;

  const inter = d1.filter(n => d2.includes(n));
  if (inter.length < 2) return null;

  const X = Math.min(...inter);
  const bucket = [];

  for (let d = data.length - 1; d >= 3; d--) {
    const a = safeDay(data, d);
    const b = safeDay(data, d - 1);
    const c = safeDay(data, d - 2);
    if (!a || !b || !c) continue;

    const g = a.filter(n => b.includes(n));
    if (g.length >= 2 && Math.min(...g) === X) {
      bucket.push(...c);
    }
  }

  return bucket.length ? mostFrequent(bucket) : null;
}
function cauDelay(data) {
  const d1 = safeDay(data, 1);
  if (!d1) return null;

  const delay = Array(100).fill(0);

  for (let n = 0; n < 100; n++) {
    for (let d = 1; d < data.length; d++) {
      const day = safeDay(data, d);
      if (!day) break;
      if (day.includes(n)) break;
      delay[n]++;
    }
  }

  let X = null;
  let maxDelay = -1;
  for (const n of d1) {
    if (delay[n] > maxDelay) {
      maxDelay = delay[n];
      X = n;
    }
  }
  if (X === null) return null;

  const bucket = [];
  for (let d = data.length - 1; d >= 2; d--) {
    const cur = safeDay(data, d);
    const next = safeDay(data, d - 1);
    if (!cur || !next) continue;

    if (cur.includes(X)) {
      bucket.push(...next);
    }
  }

  return bucket.length ? mostFrequent(bucket) : null;
}
function mirror(n) {
  return (n % 10) * 10 + Math.floor(n / 10);
}

function cauMirror(data) {
  const d1 = safeDay(data, 1);
  const d2 = safeDay(data, 2);
  if (!d1 || !d2) return null;

  for (const x of d1) {
    const mx = mirror(x);
    if (!d2.includes(mx)) continue;

    const bucket = [];

    for (let d = data.length - 1; d >= 3; d--) {
      const cur = safeDay(data, d);
      const prev = safeDay(data, d - 1);
      const prev2 = safeDay(data, d - 2);

      if (!cur || !prev || !prev2) continue;

      if (cur.includes(x) && prev.includes(mx)) {
        bucket.push(...prev2);
      }
    }

    return bucket.length ? mostFrequent(bucket) : null;
  }

  return null;
}

function cauHeadTail(data) {
    const d1 = safeDay(data, 1);
  if (!d1) return null;
  const X = data[1][0];
  const head = Math.floor(X / 10);
  const tail = X % 10;
  const bucket = [];

  for (let d = data.length - 1; d >= 2; d--) {
    const y = data[d][0];
    if (
      Math.floor(y / 10) === head ||
      y % 10 === tail
    ) {
      bucket.push(...data[d - 1]);
    }
  }

  return bucket.length ? mostFrequent(bucket) : null;
}
function digitSum(n) {
  return Math.floor(n / 10) + (n % 10);
}

function cauDigitSum(data) {
    const d1 = safeDay(data, 1);
  if (!d1) return null;
  const X = data[1][0];
  const s = digitSum(X);
  const bucket = [];

  for (let d = data.length - 1; d >= 2; d--) {
    if (digitSum(data[d][0]) === s) {
      bucket.push(...data[d - 1]);
    }
  }

  return bucket.length ? mostFrequent(bucket) : null;
}
function safeDay(data, i) {
  return Array.isArray(data[i]) ? data[i] : null;
}
function analyzeCau(data, cauFunc) {
  let maxFail = 0;
  let currentFail = 0;
  let tempFail = 0;
  let totalHit = 0;

  for (let t = data.length - 2; t >= 1; t--) {
    const slice = data.slice(t); // t là "ngày hiện tại" giả lập
    const predicted = cauFunc(slice);

    if (predicted === null) continue;

    totalHit++;

    const nextDay = data[t - 1];
    if (!nextDay.includes(predicted)) {
      tempFail++;
      if (t === data.length - 2) currentFail = tempFail;
    } else {
      maxFail = Math.max(maxFail, tempFail);
      tempFail = 0;
    }
  }

  maxFail = Math.max(maxFail, tempFail);

  return { maxFail, currentFail, totalHit };
}
function runAllCau(data) {
  const cauList = {
    Quarter: cauQuarter,
    Intersection: cauIntersection,
    Delay: cauDelay,
    Mirror: cauMirror,
    HeadTail: cauHeadTail,
    DigitSum: cauDigitSum
  };

  console.log("CAU | MaxFail | CurrentFail | TotalHit");

  for (const name in cauList) {
    const r = analyzeCau(data, cauList[name]);
    console.log(
      name + " | " +
      r.maxFail + " | " +
      r.currentFail + " | " +
      r.totalHit
    );
  }
}
function analyzeToday(data) {
  const today = data[0];
  const result = [];

  for (let i = 0; i < today.length; i++) {
    const x = today[i];
    const predicted = predictByOneNumber(data, 0, x);
    const streak = calcStreak(data, i);
     console.log(
    "STT | So_hom_nay | Du_doan | Max_sai | Sai_hien_tai"
  );
 console.log(
      (i + 1) + " | " +
      x + " | " +
      predicted + " | " +
      streak.maxLose + " | " +
      streak.currentLose
    );
    result.push([
      i + 1,            // dòng thứ mấy
      x,                // số hôm nay
      predicted,        // số dự đoán
      streak.maxLose,   // chuỗi sai dài nhất
      streak.currentLose // chuỗi sai hiện tại
    ]);
  }

  return result;
}
function analyzeGroups6(days) {
  const n = days.length;
  const groups = buildAllGroups6();
  const stats = [];

  for (const g of groups) {
    const inSet = g.set;

    // === 1) currentMiss ===
    let currentMiss = 0;
    for (let i = 0; i < n; i++) {
      if (inSet.has(days[i])) break;
      currentMiss++;
    }

    // === 2) toàn bộ chuỗi "không về" ===
    const gaps = [];
    let run = 0;

    for (let i = 0; i < n; i++) {
      if (inSet.has(days[i])) {
        if (run > 0) gaps.push(run);
        run = 0;
      } else {
        run++;
      }
    }
    if (run > 0) gaps.push(run);
    if (gaps.length === 0) gaps.push(0);

    // === 3) Gom & lấy top ===
    gaps.sort((a, b) => b - a);

    const lengthCounts = [];
    for (const len of gaps) {
      const last = lengthCounts[lengthCounts.length - 1];
      if (!last || last.len !== len)
        lengthCounts.push({ len, count: 1 });
      else
        last.count++;
    }


const maxIndex = lengthCounts.length - 1;

// 1️⃣ tạo mảng top(0) → top(N)
const topArr = [];
for (let i = 0; i <= maxIndex; i++) {
  topArr.push(lengthCounts[i].len);
}

// 2️⃣ tạo mảng nhịp
const nhipArr = [];
for (let i = 0; i < topArr.length - 1; i++) {
  nhipArr.push(Math.abs(topArr[i] - topArr[i + 1]));
}



const nhipMax = Math.max(...nhipArr);
const nhipMaxCount = nhipArr.filter(x => x === nhipMax).length;

    


    function top(i) { return lengthCounts[i] || { len: 0, count: 0 }; }

    const t1 = top(0), t2 = top(1), t3 = top(2);

    stats.push({
      groupId: g.id,
      digits: g.digits,

      currentMiss,
   nhipMax:nhipMax,
      nhip:nhipArr.join(" - "),
      nhipMaxCount:nhipMaxCount,
      maxMiss: t1.len,
      maxMissCount: t1.count,

      secondMiss: t2.len,
      secondMissCount: t2.count,

      thirdMiss: t3.len,
      
      thirdMissCount: t3.count,
       arrString: g.numbers
    .map(x => x.toString().padStart(2, "0"))
    .join(",")
    });
  }

  return stats;
}
function combinations5(arr) {
  const result = [];
  const n = arr.length;

  for (let i = 0; i < n - 4; i++)
    for (let j = i + 1; j < n - 3; j++)
      for (let k = j + 1; k < n - 2; k++)
        for (let l = k + 1; l < n - 1; l++)
          for (let m = l + 1; m < n; m++)
            result.push([arr[i], arr[j], arr[k], arr[l], arr[m]]);

  return result;
}
function buildAllGroups5() {
  const digitSets = combinations5([0,1,2,3,4,5,6,7,8,9]);
  const groups = [];

  digitSets.forEach(digits => {
    const numbers = [];

    for (let a of digits) {
      for (let b of digits) {
        numbers.push(a * 10 + b);
      }
    }

    groups.push({
      id: digits.join(""),
      digits,
      numbers,
      set: new Set(numbers)
    });
  });

  return groups;
}
function combinations4(arr) {
  const result = [];
  const n = arr.length;

  for (let a = 0; a < n - 3; a++)
  for (let b = a + 1; b < n - 2; b++)
  for (let c = b + 1; c < n - 1; c++)
  for (let d = c + 1; d < n; d++) {
    result.push([arr[a], arr[b], arr[c], arr[d]]);
  }

  return result;
}
function buildAllGroups4() {
  const digitSets = combinations4([0,1,2,3,4,5,6,7,8,9]);
  const groups = [];

  digitSets.forEach(digits => {
    const numbers = [];

    for (let a of digits) {
      for (let b of digits) {
        numbers.push(a * 10 + b);  // AB 2 chữ số
      }
    }

    groups.push({
      id: digits.join(""),          // "0123", "0247", ...
      digits,
      numbers,
      set: new Set(numbers)
    });
  });

  return groups;
}
function analyzeGroups4(days) {
  const n = days.length;
  const groups = buildAllGroups4();
  const stats = [];

  for (const g of groups) {
    const inSet = g.set;

    // 1) currentMiss: từ ngày hiện tại lùi về chưa gặp số thuộc bộ này
    let currentMiss = 0;
    for (let i = 0; i < n; i++) {
      if (inSet.has(days[i])) break;
      currentMiss++;
    }

    // 2) Thu thập toàn bộ dây "không về"
    const gaps = [];
    let run = 0;

    for (let i = 0; i < n; i++) {
      if (inSet.has(days[i])) {
        if (run > 0) gaps.push(run);
        run = 0;
      } else {
        run++;
      }
    }
    if (run > 0) gaps.push(run);
    if (gaps.length === 0) gaps.push(0); // ngày nào cũng dính bộ

    // 3) Gom top1,2,3
    gaps.sort((a,b) => b - a);

    const lengthCounts = [];
    for (let len of gaps) {
      const last = lengthCounts[lengthCounts.length - 1];
      if (!last || last.len !== len) {
        lengthCounts.push({ len, count: 1 });
      } else {
        last.count++;
      }
    }

const maxIndex = lengthCounts.length - 1;

// 1️⃣ tạo mảng top(0) → top(N)
const topArr = [];
for (let i = 0; i <= maxIndex; i++) {
  topArr.push(lengthCounts[i].len);
}

// 2️⃣ tạo mảng nhịp
const nhipArr = [];
for (let i = 0; i < topArr.length - 1; i++) {
  nhipArr.push(Math.abs(topArr[i] - topArr[i + 1]));
}

// 3️⃣ log giống hệt bạn nhập tay
// console.log("Nhịp =", nhipArr.join(" - "));

const nhipMax = Math.max(...nhipArr);
const nhipMaxCount = nhipArr.filter(x => x === nhipMax).length;



    const top = i => lengthCounts[i] || { len: 0, count: 0 };

    const t1 = top(0);
    const t2 = top(1);
    const t3 = top(2);

    stats.push({
      groupId: g.id,
      digits: g.digits,

      currentMiss,
            nhipMax:nhipMax,
      nhip:nhipArr.join(" - "),
      nhipMaxCount:nhipMaxCount,

      maxMiss: t1.len,
      maxMissCount: t1.count,

      secondMiss: t2.len,
      secondMissCount: t2.count,

      thirdMiss: t3.len,
      thirdMissCount: t3.count,

      arrString: g.numbers
        .map(x => x.toString().padStart(2, "0"))
        .join(",")
    });
  }

  return stats;
}
function analyzeGroups(days) {
  const n = days.length;
  const groups = buildAllGroups5();
  const stats = [];

  for (const g of groups) {
    const inSet = g.set;

    // === 1) currentMiss ===
    let currentMiss = 0;
    for (let i = 0; i < n; i++) {
      if (inSet.has(days[i])) break;
      currentMiss++;
    }

    // === 2) Tính tất cả gap không về ===
    const gaps = [];
    let run = 0;

    for (let i = 0; i < n; i++) {
      if (inSet.has(days[i])) {
        if (run > 0) gaps.push(run);
        run = 0;
      } else {
        run++;
      }
    }
    if (run > 0) gaps.push(run);
    if (gaps.length === 0) gaps.push(0);

    // === 3) Sắp gap giảm dần + gom nhóm ===
    gaps.sort((a, b) => b - a);

    const lengthCounts = [];
    for (let len of gaps) {
      const last = lengthCounts[lengthCounts.length - 1];
      if (!last || last.len !== len) {
        lengthCounts.push({ len, count: 1 });
      } else last.count++;
    }

    function top(i) {
      return lengthCounts[i] || { len: 0, count: 0 };
    }
 

const maxIndex = lengthCounts.length - 1;

// 1️⃣ tạo mảng top(0) → top(N)
const topArr = [];
for (let i = 0; i <= maxIndex; i++) {
  topArr.push(lengthCounts[i].len);
}

// 2️⃣ tạo mảng nhịp
const nhipArr = [];
for (let i = 0; i < topArr.length - 1; i++) {
  nhipArr.push(Math.abs(topArr[i] - topArr[i + 1]));
}

// 3️⃣ log giống hệt bạn nhập tay
// console.log("Nhịp =", nhipArr.join(" - "));

const nhipMax = Math.max(...nhipArr);
const nhipMaxCount = nhipArr.filter(x => x === nhipMax).length;

    const t1 = top(0), t2 = top(1), t3 = top(2);

    stats.push({
      groupId: g.id,
      digits: g.digits,
      currentMiss,
      nhipMax:nhipMax,
      nhip:nhipArr.join(" - "),
      nhipMaxCount:nhipMaxCount,

      maxMiss: t1.len,
      maxMissCount: t1.count,

      secondMiss: t2.len,
      secondMissCount: t2.count,

      thirdMiss: t3.len,
      thirdMissCount: t3.count,
       arrString: g.numbers
    .map(x => x.toString().padStart(2, "0"))
    .join(",")
    });
  }

  return stats;
}
// function saveLogToDrive(obj) {
//   var text = JSON.stringify(obj, null, 2);     // đẹp + dễ copy
//   DriveApp.createFile("log-output.txt", text);
// }
// ===== HÀM TEST RANDOM 100 NGÀY =====



// =======================
// CẤU HÌNH & LOGIC CHÍNH
// =======================
export const  LodeOnline = {
  // API gốc
  url:  "https://xoso188.net/api/front/open/lottery/history/low/all/game?page=1&pageSize=1000&gameCode=miba",
  url2: "https://xoso188.net/api/front/open/lottery/history/list/game?limitNum=10&gameCode=miba",

  lines: [],
  copy: "xoso",
      copy25  : "xoso",
        copy36  : "xoso",
                copy49  : "xoso",
                   copy16  : "xoso",
                          copy33  : "xoso",

  addLine: function (text) {
    this.lines.push(text);
  },

  flushToLog: function () {
    var combined = this.lines.join("\n");
    console.log("combined");
    console.log(combined);
    Logger.log(combined);
  },

  // ====== MAIN ======
  run: function () {
    console.log("hello=====");
     resetLog();        
    this.lines = [];
    this.copy  = "xoso";

    try {
      console.log("============================================1");
      var dataGoc = this.fetchJson(this.url);
      console.log("============================================2");
      var issueList = this.ensureIssueList(dataGoc);

      // Lấy 10 ngày gần nhất từ url2
      var history2 = this.lay10ngaygannhat();

      // Ghép thêm các bản ghi mới hơn
      var arzz = [];
      for (var i = 0; i < history2.length; i++) {
        if (history2[i]["openTimeStamp"] > issueList[0]["openTimeStamp"]) {
          arzz.push(history2[i]);
        }
      }
      // chèn lên đầu
      if (arzz.length > 0) {
        issueList.unshift.apply(issueList, arzz);
      }

      var history = this.extractHistory(issueList);

// var historyT = this.extractHistoryObject(issueList);
//  this.logAllRules(issueList);

      // Logger.log("History length = " + history.length);
       console.log(history);
       var listLo = this.extractHistoryLo(issueList);
var params = { recentWindow: 30, minSamples: 5 };
Logger.log("Lô ngắn ngày");
  var s = this.streakSummary2(listLo, params);
  console.log("🎯 2 2số đang chơi: " + (s.currentPick.length ? s.currentPick.join(", ") : "Không có"));
  this.addLine("📈 Dây hiện tại: " + s.current);
  this.addLine("🔥 Max WIN: " + s.maxWin);
 this.addLine("❄️ Max LOSS: " + s.maxLoss);
Logger.log("Lô theo giải đặc biệt 2");
const opt = {
  aGap: 1.4,   // thử 1.25 rồi 1.40 xem top10 có đổi không
  dF2: 2.4,
  eDec: 1.2,
  gapCap: 120,      // FIX quan trọng
  gapMode: "sqrt",  // "sqrt" hoặc "log"
  recentDays: 200
};
     const aaa = this.predictNextNumber(listLo,opt);
Logger.log("🎯 Dự đoán ngày mai: " + aaa.pick);
Logger.log("✅ Win rate (all): " + (aaa.estWinRate * 100).toFixed(2) + "%");
Logger.log("✅ Win rate (recent): " + (aaa.estWinRateRecent * 100).toFixed(2) + "%");
Logger.log(
  "📌 Dây hiện tại: " +
  (aaa.currentStreakType === "WIN"
    ? "🔥 WIN x" + aaa.currentStreakLen
    : aaa.currentStreakType === "LOSS"
      ? "❄️ LOSS x" + aaa.currentStreakLen
      : "NONE")
);

Logger.log("🔥 Max WIN: " + aaa.maxWIN);
Logger.log("❄️ Max LOSS: " + aaa.maxLOSS);


// var kq = this.trangTrinh_1so(1988,9,18);
// //  this.addLine(JSON.stringify(kq, null, 2));
//      this.addLine("TRẠNG TRÌNH PHÁN ngày hôm nay ngũ hành: " + kq.ngu_hanh_ngay + " can chi: " + kq.canchi_ngay );
//  this.addLine("Cho cháu PHỞ đẻ vào ngày " + kq.birth_lunar +  "con " + (kq.so_choi ));


// var kq2 = this.trangTrinh_1so(1989,9,27);
// //  this.addLine(JSON.stringify(kq2, null, 2));
//       this.addLine("TRẠNG TRÌNH PHÁN ngày hôm nay ngũ hành: " + kq2.ngu_hanh_ngay + " can chi: " + kq2.canchi_ngay );
//  this.addLine("Cho cháu TOMMY đẻ vào ngày " + kq2.birth_lunar +  "con " + (kq2.so_choi ));
   


// var kq3 = this.trangTrinh_1so(1988,6,15);
// //  this.addLine(JSON.stringify(kq3, null, 2));
//       this.addLine("TRẠNG TRÌNH PHÁN ngày hôm nay ngũ hành: " + kq3.ngu_hanh_ngay + " can chi: " + kq3.canchi_ngay );
//  this.addLine("Cho cháu BALUON đẻ vào ngày " + kq3.birth_lunar +  "con " + (kq3.so_choi ));

     this.addLine("===== ĐẦU ĐÍT =====");
   var resultszz = this.analyzeCau50(history);
   
    //  this.addLine("===== ĐẦU BÉ" +  result.);
   resultszz.table.forEach(s => {
        this.addLine(s.name + "  Hiện tại:" + s.currentStreak + " Dài nhất" + s.maxStreakOverall) ;
});
 this.addLine("===== ĐỀ KÉP =====");
var zzz = this.top5DayKepChuaVe(history);

  this.addLine('Dây hiện tại chưa về: ' + zzz.dayHienTai + ' ngày');
  this.addLine('TOP 5 DÂY KÉP CHƯA VỀ:');

  zzz.top5.forEach((d, i) => {
    let mark = (d === zzz.dayHienTai[0]) ? ' <-- DÂY HIỆN TẠI' : '';
    this.addLine(`#${i + 1}: ${d} ngày${mark}`);
  });
  
// console.log("=== Thống kê lô (current/max * 100) ===");
// stats.forEach(s => {
//   if(s.ratio>50){
//  this.addLine(
//             `Số ${s.n.toString().padStart(2, "0")}: ` +
//         ` currentGap = ${s.currentGap} ,Max Chưa về = ${s.maxGap},${s.maxGapCount}lần , Top2 = ${s.secondGap},${s.secondGapCount}lần, Top2 = ${s.thirdGap},${s.thirdGapCount }lần, Top4 = ${s.fourthGap},${s.fourthGapCount}lần, Top5 = ${s.fifthGap},${s.fifthGapCount}lần,` +
//         `ratio = ${s.ratio.toFixed(2)}%`
//     );
//      console.log(
//          `Số ${s.n.toString().padStart(2, "0")}: ` +
//         ` Hiện tại = ${s.currentGap} ,Max Chưa về = ${s.maxGap},${s.maxGapCount}lần , Top2 = ${s.secondGap},${s.secondGapCount}lần, Top2 = ${s.thirdGap},${s.thirdGapCount }lần, Top4 = ${s.fourthGap},${s.fourthGapCount}lần, Top5 = ${s.fifthGap},${s.fifthGapCount}lần,` +
//         `ratio = ${s.ratio.toFixed(2)}%`
//     );
//   }
  
   
// });

// runAllCau(listLo);


console.log("=== Thống kê bộ đề 9 số  ===");
this.addLine("=== Thống kê bộ đề 9 số  ===");
 const stats33 = analyzeGroups3(history);

  // Sắp xếp tập theo maxMiss giảm dần
  stats33.sort((a, b) => b.currentMiss/b.maxMiss - a.currentMiss/a.maxMiss);


 
  stats33.forEach(s => {
 if(s.currentMiss/s.maxMiss>=0.8){
console.log(
  `Tập ${s.groupId} (digits=${s.digits.join("")}): ` +
  `currentMiss=${s.currentMiss}, ` +
  `Top1=${s.maxMiss} (${s.maxMissCount} lần), ` +
  `Top2=${s.lenT2} (${s.countT2} lần), ` +
  `Top3=${s.lenT3} (${s.countT3} lần), ` +
  `Top4=${s.lenT4} (${s.countT4} lần), ` +
  `Top5=${s.lenT5} (${s.countT5} lần), ` +
  `Top6=${s.lenT6} (${s.countT6} lần), ` +
  `Top7=${s.lenT7} (${s.countT7} lần), ` +
  `Top8=${s.lenT8} (${s.countT8} lần), ` +
  `\nNhịp = ` +
  `${s.nhip} ` +
    `\nNhịp Max = ` +
 `${s.nhipMax} - Xuất hiện ${s.nhipMaxCount} lần` +
  `Đạt = ${((s.currentMiss / s.maxMiss) * 100).toFixed(2)}%`
);
    this.addLine(
     `Tập ${s.groupId} (digits=${s.digits.join("")}): ` +
  `currentMiss=${s.currentMiss}, ` +
  `Top1=${s.maxMiss} (${s.maxMissCount} lần), ` +
  `Top2=${s.lenT2} (${s.countT2} lần), ` +
  `Top3=${s.lenT3} (${s.countT3} lần), ` +
  `Top4=${s.lenT4} (${s.countT4} lần), ` +
  `Top5=${s.lenT5} (${s.countT5} lần), ` +
  `Top6=${s.lenT6} (${s.countT6} lần), ` +
  `Top7=${s.lenT7} (${s.countT7} lần), ` +
  `Top8=${s.lenT8} (${s.countT8} lần), ` +
  `\nNhịp = ` +
  `${s.nhip} ` +
    `\nNhịp Max = ` +
`${s.nhipMax} - Xuất hiện ${s.nhipMaxCount} lần` +
  `Đạt = ${((s.currentMiss / s.maxMiss) * 100).toFixed(2)}%`
    );
 }
    
  });

console.log("=== Thống kê bộ đề 16 số  ===");
this.addLine("=== Thống kê bộ đề 16 số  ===");
 const stats44 = analyzeGroups4(history);

  // Sắp xếp tập theo maxMiss giảm dần
  stats44.sort((a, b) => b.currentMiss/b.maxMiss - a.currentMiss/a.maxMiss);


 
  stats44.forEach(s => {
 if(s.currentMiss/s.maxMiss>=0.8){
console.log(
      `Tập ${s.groupId} (digits=${s.digits.join("")}): ` +
      `currentMiss=${s.currentMiss}, ` +
      `Top1=${s.maxMiss} (${s.maxMissCount} lần), ` +
      `Top2=${s.secondMiss} (${s.secondMissCount} lần), ` +
      `Top3=${s.thirdMiss} (${s.thirdMissCount} lần)` +
      `\nNhịp = ` +
  `${s.nhip} ` +
    `\nNhịp Max = ` +
 `${s.nhipMax} - Xuất hiện ${s.nhipMaxCount} lần` +
      `Đạt =${((s.currentMiss/s.maxMiss)*100).toFixed(2)}%`
    );
    this.addLine(
      `Tập ${s.groupId} (digits=${s.digits.join("")}): ` +
      `currentMiss=${s.currentMiss}, ` +
      `Top1=${s.maxMiss} (${s.maxMissCount} lần), ` +
      `Top2=${s.secondMiss} (${s.secondMissCount} lần), ` +
      `Top3=${s.thirdMiss} (${s.thirdMissCount} lần)` +
      `\nNhịp = ` +
  `${s.nhip} ` +
    `\nNhịp Max = ` +
 `${s.nhipMax} - Xuất hiện ${s.nhipMaxCount} lần` +
      `Đạt =${((s.currentMiss/s.maxMiss)*100).toFixed(2)}%`
    );
 }
    
  });

console.log("=== Thống kê bộ đề 25 số  ===");
this.addLine("=== Thống kê bộ đề 25 số  ===");
 const stats16 = analyzeGroups(history);

  // Sắp xếp tập theo maxMiss giảm dần
  stats16.sort((a, b) => b.currentMiss/b.maxMiss - a.currentMiss/a.maxMiss);


 
  stats16.forEach(s => {
 if(s.currentMiss/s.maxMiss>=0.8){
console.log(
      `Tập ${s.groupId} (digits=${s.digits.join("")}): ` +
      `currentMiss=${s.currentMiss}, ` +
      `Top1=${s.maxMiss} (${s.maxMissCount} lần), ` +
      `Top2=${s.secondMiss} (${s.secondMissCount} lần), ` +
      `Top3=${s.thirdMiss} (${s.thirdMissCount} lần)` +
      `\nNhịp = ` +
  `${s.nhip} ` +
    `\nNhịp Max = ` +
 `${s.nhipMax} - Xuất hiện ${s.nhipMaxCount} lần` +
      `Đạt =${((s.currentMiss/s.maxMiss)*100).toFixed(2)}%`
    );
    this.addLine(
      `Tập ${s.groupId} (digits=${s.digits.join("")}): ` +
      `currentMiss=${s.currentMiss}, ` +
      `Top1=${s.maxMiss} (${s.maxMissCount} lần), ` +
      `Top2=${s.secondMiss} (${s.secondMissCount} lần), ` +
      `Top3=${s.thirdMiss} (${s.thirdMissCount} lần)` +
      `\nNhịp = ` +
  `${s.nhip} ` +
    `\nNhịp Max = ` +
 `${s.nhipMax} - Xuất hiện ${s.nhipMaxCount} lần` +
      `Đạt =${((s.currentMiss/s.maxMiss)*100).toFixed(2)}%`
    );
 }
    
  });
console.log("=== Thống kê bộ đề 36 số  ===");
this.addLine("=== Thống kê bộ đề 36 số  ===");
 const stats36 = analyzeGroups6(history);

  // Sắp xếp tập theo maxMiss giảm dần
  stats36.sort((a, b) => b.currentMiss/b.maxMiss - a.currentMiss/a.maxMiss);


 
  stats36.forEach(s => {
 if(s.currentMiss/s.maxMiss>=0.8){
console.log(
      `Tập ${s.groupId} (digits=${s.digits.join("")}): ` +
      `currentMiss=${s.currentMiss}, ` +
      `Top1=${s.maxMiss} (${s.maxMissCount} lần), ` +
      `Top2=${s.secondMiss} (${s.secondMissCount} lần), ` +
      `Top3=${s.thirdMiss} (${s.thirdMissCount} lần)` +
          `\nNhịp = ` +
  `${s.nhip} ` +
    `\nNhịp Max = ` +
 `${s.nhipMax} - Xuất hiện ${s.nhipMaxCount} lần` +
      `Đạt =${((s.currentMiss/s.maxMiss)*100).toFixed(2)}%`
    );
    this.addLine(
      `Tập ${s.groupId} (digits=${s.digits.join("")}): ` +
      `currentMiss=${s.currentMiss}, ` +
      `Top1=${s.maxMiss} (${s.maxMissCount} lần), ` +
      `Top2=${s.secondMiss} (${s.secondMissCount} lần), ` +
      `Top3=${s.thirdMiss} (${s.thirdMissCount} lần)` +
      `\nNhịp = ` +
  `${s.nhip} ` +
    `\nNhịp Max = ` +
 `${s.nhipMax} - Xuất hiện ${s.nhipMaxCount} lần` +
      `Đạt =${((s.currentMiss/s.maxMiss)*100).toFixed(2)}%`
    );
 }
    
  });

  console.log("=== Thống kê bộ đề 49 số  ===");
    this.addLine("=== Thống kê bộ đề 49 số  ===");
 const stats49 = analyzeGroups7(history);

  // Sắp xếp tập theo maxMiss giảm dần
  stats49.sort((a, b) => b.currentMiss/b.maxMiss - a.currentMiss/a.maxMiss);

this.copy49 = stats49[0].arrString;
this.copy36 = stats36[0].arrString;
this.copy25 = stats16[0].arrString;
this.copy16 = stats44[0].arrString;
this.copy33 = stats33[0].arrString;
 
  stats49.forEach(s => {
 if(s.currentMiss/s.maxMiss>=0.8){
console.log(
      `Tập ${s.groupId} (digits=${s.digits.join("")}): ` +
      `currentMiss=${s.currentMiss}, ` +
      `Top1=${s.maxMiss} (${s.maxMissCount} lần), ` +
      `Top2=${s.secondMiss} (${s.secondMissCount} lần), ` +
      `Top3=${s.thirdMiss} (${s.thirdMissCount} lần)` +
      `Đạt =${((s.currentMiss/s.maxMiss)*100).toFixed(2)}%`
    );
    this.addLine(
      `Tập ${s.groupId} (digits=${s.digits.join("")}): ` +
      `currentMiss=${s.currentMiss}, ` +
      `Top1=${s.maxMiss} (${s.maxMissCount} lần), ` +
      `Top2=${s.secondMiss} (${s.secondMissCount} lần), ` +
      `Top3=${s.thirdMiss} (${s.thirdMissCount} lần)` +
      `Đạt =${((s.currentMiss/s.maxMiss)*100).toFixed(2)}%`
    );
 }
    
  });

  console.log("=== Thống kê bộ đề 64 số  ===");
    this.addLine("=== Thống kê bộ đề 64số  ===");

  const stats64 = analyzeGroups8(history);

  stats64.sort((a,b) => b.maxHit - a.maxHit);



  stats64.forEach(s => {
    console.log(
      `Bộ ${s.groupId} (${s.digits.join(",")}): ` +
      `currentHit=${s.currentHit}, ` +
      `maxHit=${s.maxHit} (${s.maxHitCount}), ` +
      `2nd=${s.secondHit} (${s.secondHitCount}), ` +
      `3rd=${s.thirdHit} (${s.thirdHitCount})`
    );
    if(s.currentHit/s.maxHit>=0.8){
  this.addLine(
      `Bộ ${s.groupId} (${s.digits.join(",")}): ` +
      `currentHit=${s.currentHit}, ` +
      `maxHit=${s.maxHit} (${s.maxHitCount}), ` +
      `2nd=${s.secondHit} (${s.secondHitCount}), ` +
      `3rd=${s.thirdHit} (${s.thirdHitCount})`
    );
    }
   
  });
      // Phân tích tất cả công thức
      var result = StreakAnalyzer.analyzeAllFormulas(history);

      // ====== 3. Đưa về mảng để sort theo % dây hiện tại ======
      var list = [];
      for (var key in result) {
        if (!result.hasOwnProperty(key)) continue;
        var r = result[key];
        if (!r.current) continue;
        list.push({
          id: key,
          data: r
        });
      }

      // sort theo percent giảm dần
      list.sort(function (a, b) {
        var pa = a.data.current ? a.data.current.percent : 0;
        var pb = b.data.current ? b.data.current.percent : 0;
        return pb - pa;
      });

        this.addLine("daudit────────────────────────────────────────────");

        const unitStats = analyzeUnitDigitStreaks(history);
          
const sorted = Object.keys(unitStats)
  .map(k => {
    const v = unitStats[k];
    return {
      digit: Number(k),
      ...v,
      ratio: v.maxMiss > 0 ? (v.currentMiss / v.maxMiss) : 0
    };
  })
  .sort((a, b) => b.ratio - a.ratio);

    console.log("=== HÀNG ĐƠN VỊ (0–9) ===");
    this.addLine("=== HÀNG ĐƠN VỊ (0–9) ===");
  sorted.forEach(s => {
        if(s.currentMiss/s.maxMiss>0.5){
 console.log(
              `ĐÍT ${s.digit}: currentMiss=${s.currentMiss}, Top1=${s.maxMiss},${s.maxMissCount},Top2=${s.secondMiss},${s.secondMissCount},Top3=${s.thirdMiss},${s.thirdMissCount},Top4=${s.fourthMiss},${s.fourthMissCount},Top5=${s.fifthMiss},${s.fifthMissCount},  Tile= ${(s.currentMiss/s.maxMiss*100).toFixed(2)}%`
              );

            this.addLine(
               `ĐÍT ${s.digit}: currentMiss=${s.currentMiss}, Top1=${s.maxMiss},${s.maxMissCount},Top2=${s.secondMiss},${s.secondMissCount},Top3=${s.thirdMiss},${s.thirdMissCount},Top4=${s.fourthMiss},${s.fourthMissCount},Top5=${s.fifthMiss},${s.fifthMissCount},  Tile= ${(s.currentMiss/s.maxMiss*100).toFixed(2)}%`
               );
        }
           
        });  

  
  // Hàng chục
  const tenStats = analyzeTensDigitStreaks(history);
  console.log("=== HÀNG CHỤC (0–9) ===");
    this.addLine("=== HÀNG CHỤC (0–9) ===");
    const sortedTes = Object.keys(tenStats)
  .map(k => {
    const v = tenStats[k];
    return {
      digit: Number(k),
      ...v,
      ratio: v.maxMiss > 0 ? (v.currentMiss / v.maxMiss) : 0
    };
  })
  .sort((a, b) => b.ratio - a.ratio);
   sortedTes.forEach(s => {
       if(s.currentMiss/s.maxMiss>0.5){
console.log(
              `ĐẦU ${s.digit}: currentMiss=${s.currentMiss}, Top1=${s.maxMiss},${s.maxMissCount},Top2=${s.secondMiss},${s.secondMissCount},Top3=${s.thirdMiss},${s.thirdMissCount},Top4=${s.fourthMiss},${s.fourthMissCount},Top5=${s.fifthMiss},${s.fifthMissCount},  Tile= ${(s.currentMiss/s.maxMiss*100).toFixed(2)}%`
              );

            this.addLine(
               `ĐẦU ${s.digit}: currentMiss=${s.currentMiss}, Top1=${s.maxMiss},${s.maxMissCount},Top2=${s.secondMiss},${s.secondMissCount},Top3=${s.thirdMiss},${s.thirdMissCount},Top4=${s.fourthMiss},${s.fourthMissCount},Top5=${s.fifthMiss},${s.fifthMissCount},  Tile= ${(s.currentMiss/s.maxMiss*100).toFixed(2)}%`
               );
       }
            
        });  
  // for (let d = 0; d <= 9; d++) {
  //   const s = tenStats[d];
  //   console.log(`ĐẦU ${d}: currentMiss=${s.currentMiss}, Top1=${s.maxMiss},${s.maxMissCount},Top2=${s.secondMiss},${s.secondMissCount},Top3=${s.thirdMiss},${s.thirdMissCount},Top4=${s.fourthMiss},${s.fourthMissCount},Top5=${s.fifthMiss},${s.fifthMissCount}, Tile= ${(s.currentMiss/s.maxMiss*100).toFixed(2)}%`);
  //       // if(s.currentMiss/s.maxMiss>0.5){ 
  //          this.addLine(`Tens ${d}: currentMiss=${s.currentMiss}, maxMiss=${s.maxMiss} , Tile= ${(s.currentMiss/s.maxMiss*100).toFixed(2)}%` );
  //   // }
   
  // }

      Logger.log("============================================");
      Logger.log("CÁC CÔNG THỨC XẾP THEO % DÂY HIỆN TẠI (GIẢM DẦN)");
      Logger.log("============================================");

      // ====== 4. Duyệt theo thứ tự đã sort và log chi tiết ======
      for (var idx = 0; idx < list.length; idx++) {
        var item = list[idx];
        var id = item.id;
        var data = item.data;
        var cur = data.current;
        if (!cur) continue;

        var labelCurrent = cur.label;
        var groupData = data.groups[labelCurrent];

        // Lấy bộ 50 số của nhóm đang chạy & 50 số còn lại
        var groupsNum = this.buildNumberGroupsForFormula(StreakAnalyzer, id, labelCurrent);
        var groupCurrentNums = groupsNum.currentNums;
        var groupOtherNums = groupsNum.otherNums;

        // Logger.log("────────────────────────────────────────────");
        this.addLine("────────────────────────────────────────────");

        // Logger.log((idx + 1) + ".", "CÔNG THỨC:", id);
        // Logger.log(
        //   "   👉 Dây hiện tại:"+
        //   labelCurrent+
        //   "| Độ dài:"+ cur.length,
        //   "| Max:"+ cur.maxLen,
        //   "| ="+ cur.percent.toFixed(1) + "%"
        // );
  if(cur.length/cur.maxLen>0.8){
  this.addLine(
          "Dây hiện tại:" +
          labelCurrent +
          " | Độ dài:" + cur.length +
          " | Max:" + cur.maxLen +
          " | = " + cur.percent.toFixed(1) + "%"
        );
 
      

        // Dùng Top2 nếu có, nếu không có thì thôi
        var top2Len = (groupData && groupData.top3 && groupData.top3[1])
          ? groupData.top3[1].length
          : 0;

        if (top2Len > 0) {
          var top2Percent = ((cur.length / top2Len) * 100).toFixed(1);
          // Logger.log(
          //   "   👉 Dây hiện tại: Top2 "+
          //   labelCurrent+
          //   "| Độ dài:"+cur.length+
          //   "| Top2:"+ top2Len+
          //   "| ="+ top2Percent + "%"
          // );

          this.addLine(
            "Dây hiện tại (so Top2): " +
            labelCurrent +
            " | Độ dài:" + cur.length +
            " | Top2:" + top2Len +
            " | = " + top2Percent + "%"
          );
        }

        // ====== TOP 1,2,3 của NHÓM ĐANG CHẠY ======
        if (groupData && groupData.top3 && groupData.top3.length > 0) {
          // Logger.log("   TOP 1–3 dây của nhóm đang chạy (" + labelCurrent + "):");
          this.addLine("TOP 1–3 dây của nhóm đang chạy (" + labelCurrent + "):");

          for (var j = 0; j < groupData.top3.length; j++) {
            var t = groupData.top3[j];
            // Logger.log(
            //   "      TOP"+ (j + 1)+
            //   "→ Len:"+ t.length+
            //   "| StartIndex:"+ t.startIndex+
            //   "| Seq:"+ this.formatArray(t.seq)
            // );
            this.addLine(
              "TOP " + (j + 1) +
              " → Len:" + t.length +
              " | StartIndex:" + t.startIndex +
              " | Seq:" + this.formatArray(t.seq)
            );
          }
        } else {
          // Logger.log("   🔝 Nhóm " + labelCurrent + " chưa có dữ liệu dây (top3 rỗng).");
          this.addLine("Nhóm " + labelCurrent + " chưa có dữ liệu dây (top3 rỗng).");
        }

        // ====== Bộ 50 số CHỌN (như code bạn đang dùng là lấy mảng còn lại) ======
        // Logger.log("   🎯 Bộ 50 số được CHỌN:");
        // Logger.log("      " + this.formatArray(groupOtherNums));
        this.addLine("Bộ 50 số được CHỌN:");
        this.addLine(this.formatArray(groupOtherNums));

        // Chuẩn bị chuỗi copy (00,01,02,...)
        this.copy = this.formatCopy(groupOtherNums);
   
      }
 }
      this.flushToLog();

      // Logger.log("✅ Xong: đã sort theo % và log 2 mảng 50 số cho từng công thức.");
      Logger.log("Chuỗi copy (50 số): " + this.copy);

    } catch (e) {
      Logger.log("ERROR: " + e);
      Logger.log(e.stack);
    }
      return getLog();  
  },

  // =======================
  // HÀM LẤY 10 NGÀY GẦN NHẤT
  // =======================
  lay10ngaygannhat: function () {
    Logger.log("lay10ngaygannhat: gọi API 10 ngày gần nhất...");
    var data = this.fetchJson(this.url2);
    var issueList = this.ensureIssueLis2t(data);
    return issueList;
  },

  // =======================
  // FETCH JSON (server-side, KHÔNG cần CORS / proxy)
  // =======================
  fetchJson: function (url) {
    const options = {
    method: "get",
    muteHttpExceptions: true,
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
      "Accept": "application/json",
      "Referer": "https://xoso188.net/"
    }
  };
    var res = UrlFetchApp.fetch(url, options);
    
    var code = res.getResponseCode();
    Logger.log(res.getResponseCode());
Logger.log(res.getContentText());
    if (code >= 200 && code < 300) {
      return JSON.parse(res.getContentText());
    }
    throw new Error("HTTP " + code + " khi gọi " + url);
  },

  // =======================
  // PARSE DỮ LIỆU API
  // =======================
  ensureIssueList: function (data) {
    if (data && data.rows) return data.rows;
    if (Array.isArray(data)) return data;
    throw new Error("Không tìm thấy issueList (rows)");
  },

  ensureIssueLis2t: function (data) {
    if (data && data.t && data.t.issueList) return data.t.issueList;
    if (Array.isArray(data)) return data;
    throw new Error("Không tìm thấy issueList trong data.t.issueList");
  },
  shouldBet:function(currentStreak, maxStreak) {
  if (!currentStreak || !maxStreak) return null;

  var ratio = currentStreak / maxStreak;
  return ratio >= 0.8;
},
getOppositeSet:function(ruleCode, currentGroup) {
  return currentGroup === "A" ? "50 số nhóm B" : "50 số nhóm A";
},
 getWeekdayVN:function(timestamp) {
    if (!timestamp) return null;

  // ISO: 1=Mon ... 7=Sun
  var iso = Utilities.formatDate(
    new Date(timestamp),
    "Asia/Ho_Chi_Minh",
    "u"
  );

  iso = Number(iso);

  // đổi về: 1=CN, 2=T2, ..., 7=T7
  return iso === 7 ? 1 : iso + 1;
},
get50NumbersByRule:function(ruleCode, group) {
  var arr = [];

  for (var i = 0; i < 100; i++) {
    var n = ("0" + i).slice(-2);
    var num = parseInt(n, 10);
    var g = null;

    switch (ruleCode) {

      case "EVEN_ODD":
        g = num % 2 === 0 ? "A" : "B";
        break;

      case "00_49__50_99":
        g = num <= 49 ? "A" : "B";
        break;

      case "HEAD_SMALL_BIG": // đầu bé / đầu to
        g = Math.floor(num / 10) <= 4 ? "A" : "B";
        break;

      case "TAIL_SMALL_BIG": // đít bé / đít to
        g = (num % 10) <= 4 ? "A" : "B";
        break;
    }

    if (g === group) {
      arr.push(n);
    }
  }

  return arr;
},

getWeekdayVN: function(timestamp) {
  var d = new Date(timestamp);
  var iso = Utilities.formatDate(d, "Asia/Ho_Chi_Minh", "u"); // 1=Mon..7=Sun
  return iso === "7" ? 1 : Number(iso) + 1;
},
classify50: function(number, rule) {
  var head = Math.floor(number / 10);
  var tail = number % 10;

  switch (rule) {
case "EVEN_ODD":
  return number % 2 === 0 ? "A" : "B";
    case "LOW_HIGH":
      return number < 50 ? "A" : "B";

    case "HEAD":
      return head <= 4 ? "A" : "B";

    case "HEAD_EVEN_ODD":
      return head % 2 === 0 ? "A" : "B";

    case "TAIL":
      return tail <= 4 ? "A" : "B";

    case "TAIL_EVEN_ODD":
      return tail % 2 === 0 ? "A" : "B";

    case "HEAD_TAIL_BB_TT":
      return (head <= 4 && tail <= 4) || (head >= 5 && tail >= 5)
        ? "A" : "B";

    case "SUM":
      return (head + tail) <= 9 ? "A" : "B";

    case "MOD4":
      return number % 4 <= 1 ? "A" : "B";
  }
},
 analyzeFromT1ToT7: function(history) {
    var stats = this.initWeekStats();
    if (!history || !history.length) return stats;

    var byDay = {};
    for (var d = 1; d <= 7; d++) byDay[d] = [];

    history.forEach(function(h) {
      if (h.weekday >= 1 && h.weekday <= 7) {
        byDay[h.weekday].push(h);
      }
    });

    for (var d = 1; d <= 7; d++) {
      var list = byDay[d];
      if (!list.length) continue;

      var s = stats[d];
      s.totalCount = list.length;

      var tempA = 0;
      var tempB = 0;

     list.forEach(function(x) {
  if (x.group === "A") {
    tempA++;
    tempB = 0;
    s.maxAStreak = Math.max(Number(s.maxAStreak || 0), tempA);
  } else {
    tempB++;
    tempA = 0;
    s.maxBStreak = Math.max(Number(s.maxBStreak || 0), tempB);
  }
});

      // current = lần gần nhất của chính thứ đó
      var last = list[0];
      var type = last.group;
      var streak = 1;

      for (var i = 1; i < list.length; i++) {
        if (list[i].group === type) streak++;
        else break;
      }

      s.currentType = type;
      s.currentStreak = streak;
    }

    return stats;
  },
RULES_50: [
  { code: "EVEN_ODD", name: "Chẵn / Lẻ" },
    { code: "LOW_HIGH", name: "00–49 / 50–99" },
    { code: "HEAD", name: "Đầu bé / Đầu to" },
    { code: "HEAD_EVEN_ODD", name: "Đầu chẵn / Đầu lẻ" },
    { code: "TAIL", name: "Đít bé / Đít to" },
    { code: "TAIL_EVEN_ODD", name: "Đít chẵn / Đít lẻ" },
    { code: "HEAD_TAIL_BB_TT", name: "Đầu+Đít (BB/TT)" },
    { code: "SUM", name: "Tổng bé / Tổng to" },
    { code: "MOD4", name: "Mod 4" }
  ],
  thongKeNgaySau: function (listLo, topN) {
    topN = topN || 3;

    if (!Array.isArray(listLo) || listLo.length < 2) return null;

    // tìm target = ngày đầu tiên hợp lệ
    var target = null;
    for (var t = 0; t < listLo.length; t++) {
      if (Array.isArray(listLo[t]) && typeof listLo[t][0] !== 'undefined') {
        target = listLo[t][0];
        break;
      }
    }

    if (target === null) return null;

    var demTarget = 0;
    var counter = {};

    // duyệt từ ngày thứ 2 trở đi (bỏ ngày hiện tại)
    for (var i = 1; i < listLo.length; i++) {

      var ngay = listLo[i];
      var ngayTruoc = listLo[i - 1];

      // bỏ mọi ngày không hợp lệ
      if (
        !Array.isArray(ngay) ||
        !Array.isArray(ngayTruoc) ||
        typeof ngay[0] === 'undefined'
      ) {
        continue;
      }

      // chỉ quan tâm số đầu tiên
      if (ngay[0] === target) {
        demTarget++;

        // thống kê TOÀN BỘ phần tử ngày trước
        for (var j = 0; j < ngayTruoc.length; j++) {
          var so = ngayTruoc[j];
          if (typeof so === 'undefined') continue;

          counter[so] = (counter[so] || 0) + 1;
        }
      }
    }

    if (demTarget === 0) {
      return {
        target: target,
        message: 'Không có dữ liệu lịch sử hợp lệ'
      };
    }

    var ketQua = Object.keys(counter).map(function (k) {
      return {
        so: Number(k),
        soLan: counter[k],
        tiLe: (counter[k] / demTarget * 100).toFixed(2)
      };
    });

    ketQua.sort(function (a, b) {
      if (b.tiLe !== a.tiLe) return b.tiLe - a.tiLe;
      return b.soLan - a.soLan;
    });

    return {
      target: target,
      soLanDuDoan: demTarget,
      top: ketQua.slice(0, topN),
      full: ketQua
    };
  },
  predictTop1ForNextDay: function (data, i) {
    if (!data || !data.length || !data[i] || data[i].length === 0) return null;

    var target = data[i][0];
    var prevDays = [];

    // tìm các lần target xuất hiện trong tương lai (j > i), lấy ngày trước đó (j-1)
    for (var j = i + 1; j < data.length; j++) {
      if (data[j] && data[j][0] === target) {
        if (data[j - 1]) prevDays.push(data[j - 1]);
      }
    }

    if (prevDays.length === 0) return null;

    var freq = {};
    for (var k = 0; k < prevDays.length; k++) {
      var day = prevDays[k];
      for (var t = 0; t < day.length; t++) {
        var num = day[t];
        freq[num] = (freq[num] || 0) + 1;
      }
    }

    // tìm top1 theo (rate desc, count desc, num asc)
    var best = null;
    var totalPrev = prevDays.length;

    for (var key in freq) {
      var numVal = Number(key);
      var count = freq[key];
      var rate = count / totalPrev;

      if (
        best == null ||
        rate > best.rate ||
        (rate === best.rate && count > best.count) ||
        (rate === best.rate && count === best.count && numVal < best.num)
      ) {
        best = { num: numVal, count: count, rate: rate };
      }
    }

    return best ? best.num : null;
  },
predictTop1ForNextDay: function (data, i) {
    if (!data || !data.length || !data[i] || data[i].length === 0) return null;

    var target = data[i][0];
    var prevDays = [];

    for (var j = i + 1; j < data.length; j++) {
      if (data[j] && data[j][0] === target) {
        if (data[j - 1]) prevDays.push(data[j - 1]);
      }
    }

    if (prevDays.length === 0) return null;

    var freq = {};
    for (var k = 0; k < prevDays.length; k++) {
      var day = prevDays[k];
      for (var t = 0; t < day.length; t++) {
        var num = day[t];
        freq[num] = (freq[num] || 0) + 1;
      }
    }

    var best = null;
    var totalPrev = prevDays.length;

    for (var key in freq) {
      var numVal = Number(key);
      var count = freq[key];
      var rate = count / totalPrev;

      if (
        best == null ||
        rate > best.rate ||
        (rate === best.rate && count > best.count) ||
        (rate === best.rate && count === best.count && numVal < best.num)
      ) {
        best = { num: numVal, count: count, rate: rate };
      }
    }

    return best ? best.num : null;
  },
predictTopListForNextDay: function (data, i, topK) {
  topK = topK || 2;
  if (!data || !data.length || !data[i] || data[i].length === 0) return [];

  var target = data[i][0];
  var prevDays = [];

  for (var j = i + 1; j < data.length; j++) {
    if (data[j] && data[j][0] === target) {
      if (data[j - 1]) prevDays.push(data[j - 1]);
    }
  }

  if (prevDays.length === 0) return [];

  var freq = {};
  for (var k = 0; k < prevDays.length; k++) {
    var day = prevDays[k];
    for (var t = 0; t < day.length; t++) {
      var num = day[t];
      freq[num] = (freq[num] || 0) + 1;
    }
  }

  var totalPrev = prevDays.length;
  var stats = [];
  for (var key in freq) {
    var numVal = Number(key);
    var count = freq[key];
    var rate = count / totalPrev;
    stats.push({ num: numVal, count: count, rate: rate });
  }

  stats.sort(function (a, b) {
    return (b.rate - a.rate) || (b.count - a.count) || (a.num - b.num);
  });

  var out = [];
  for (var p = 0; p < stats.length && out.length < topK; p++) {
    out.push(stats[p].num);
  }
  return out; // vd: [02, 65] hoặc [02]
},
predictTop2ForNextDay: function (data, i) {
    if (!data || data.length < 2 || !data[i] || data[i].length === 0) return [];

    var target = Number(data[i][0]);

    // lấy các mẫu trong quá khứ: k < i có target, và lấy ngày sau (k+1)
    var samples = [];
    for (var k = 0; k < i; k++) {
      if (data[k] && Number(data[k][0]) === target && data[k + 1]) {
        samples.push(data[k + 1]);
      }
    }
    if (samples.length === 0) return [];

    // đếm tần suất
    var freq = {};
    for (var s = 0; s < samples.length; s++) {
      var day = samples[s];
      for (var t = 0; t < day.length; t++) {
        var num = Number(day[t]);
        freq[num] = (freq[num] || 0) + 1;
      }
    }

    // sort ra top
    var total = samples.length;
    var stats = [];
    for (var key in freq) {
      var n = Number(key);
      var c = freq[key];
      stats.push({ num: n, count: c, rate: c / total });
    }

    stats.sort(function (a, b) {
      return (b.rate - a.rate) || (b.count - a.count) || (a.num - b.num);
    });

    // lấy top1 + top2 (lọc trùng)
    var out = [];
    var seen = {};
    for (var i2 = 0; i2 < stats.length && out.length < 2; i2++) {
      var val = stats[i2].num;
      if (!seen[val]) { seen[val] = true; out.push(val); }
    }
    return out; // [] / [top1] / [top1, top2]
  },

  // kiểm tra trúng 1 trong picks
  hitAny: function (nextDay, picks) {
    if (!picks || picks.length === 0) return false;
    for (var a = 0; a < picks.length; a++) {
      var p = picks[a];
      for (var m = 0; m < nextDay.length; m++) {
        if (Number(nextDay[m]) === p) return true;
      }
    }
    return false;
  },

  predictTop2ForNextDay: function (data, i) {
    if (!data || data.length < 2 || !data[i] || data[i].length === 0) return [];

    var target = Number(data[i][0]);
    var samples = [];

    // tìm các lần target xuất hiện ở các ngày cũ hơn (k > i)
    // lấy "hôm sau" theo thời gian = data[k-1] (mới hơn, đứng trước trong mảng)
    for (var k = i + 1; k < data.length; k++) {
      if (data[k] && Number(data[k][0]) === target) {
        if (data[k - 1]) samples.push(data[k - 1]);
      }
    }

    if (samples.length === 0) return [];

    var freq = {};
    for (var s = 0; s < samples.length; s++) {
      var day = samples[s];
      for (var t = 0; t < day.length; t++) {
        var num = Number(day[t]);
        freq[num] = (freq[num] || 0) + 1;
      }
    }

    var total = samples.length;
    var stats = [];
    for (var key in freq) {
      var n = Number(key);
      var c = freq[key];
      stats.push({ num: n, count: c, rate: c / total });
    }

    // sort: rate desc, count desc, num asc
    stats.sort(function (a, b) {
      return (b.rate - a.rate) || (b.count - a.count) || (a.num - b.num);
    });

    // lấy top1 + top2 (lọc trùng)
    var out = [];
    var seen = {};
    for (var p = 0; p < stats.length && out.length < 2; p++) {
      var val = stats[p].num;
      if (!seen[val]) { seen[val] = true; out.push(val); }
    }
    return out; // [] / [top1] / [top1, top2]
  },

  hitAny: function (nextDay, picks) {
    if (!picks || picks.length === 0) return false;
    for (var a = 0; a < picks.length; a++) {
      var p = picks[a];
      for (var m = 0; m < nextDay.length; m++) {
        if (Number(nextDay[m]) === p) return true;
      }
    }
    return false;
  },

  // Trúng 1 trong 2 số ngày hôm sau => WIN
  streakSummaryTop2: function (data) {
    if (!data || data.length < 2) {
      return { currentPick: [], current: "N/A", maxWin: 0, maxLoss: 0 };
    }

    var types = [];

    for (var i = 0; i < data.length - 1; i++) {
      var picks = this.predictTop2ForNextDay(data, i); // 0..2 số
      var nextDay = data[i + 1] || [];

      var win = this.hitAny(nextDay, picks);
      types.push(win ? "W" : "L");
    }

    var maxWin = 0, maxLoss = 0, curType = null, curLen = 0;
    for (var x = 0; x < types.length; x++) {
      var t = types[x];
      if (t === curType) curLen++;
      else { curType = t; curLen = 1; }
      if (t === "W" && curLen > maxWin) maxWin = curLen;
      if (t === "L" && curLen > maxLoss) maxLoss = curLen;
    }

    // current streak tính từ ngày mới nhất (types[0])
    var currentType = types[0];
    var currentLen = 1;
    for (var y = 1; y < types.length; y++) {
      if (types[y] === currentType) currentLen++;
      else break;
    }

    // 2 số đang chơi cho lượt gần nhất (ngày 0 -> ngày 1)
    var currentPick = this.predictTop2ForNextDay(data, 0);

    return {
      currentPick: currentPick,
      current: (currentType === "W" ? "WIN x" : "LOSS x") + currentLen,
      maxWin: maxWin,
      maxLoss: maxLoss
    };
  },
   _hitAny: function (nextDay, picks) {
    if (!picks || picks.length === 0) return false;
    for (var a = 0; a < picks.length; a++) {
      var p = Number(picks[a]);
      for (var m = 0; m < nextDay.length; m++) {
        if (Number(nextDay[m]) === p) return true;
      }
    }
    return false;
  },

  _topFromFreq: function (freq, k, excludeMap) {
    excludeMap = excludeMap || {};
    var arr = [];
    for (var key in freq) {
      var n = Number(key);
      if (excludeMap[n]) continue;
      arr.push({ num: n, count: freq[key] });
    }
    arr.sort(function (a, b) { return b.count - a.count || a.num - b.num; });

    var out = [];
    for (var i = 0; i < arr.length && out.length < k; i++) out.push(arr[i].num);
    return out;
  },

  _recentFreq: function (data, startIndex, windowDays) {
    // startIndex: vị trí ngày hiện tại i, window lấy từ i+1 .. i+windowDays (cũ hơn)
    var freq = {};
    var end = Math.min(data.length - 1, startIndex + windowDays);
    for (var d = startIndex + 1; d <= end; d++) {
      var day = data[d];
      if (!day) continue;
      for (var t = 0; t < day.length; t++) {
        var num = Number(day[t]);
        freq[num] = (freq[num] || 0) + 1;
      }
    }
    return freq;
  },

  // ===== cầu theo số đầu: tìm các lần target xuất hiện ở ngày cũ hơn (k > i),
  // lấy "ngày sau" theo thời gian = data[k-1] làm mẫu =====
  _conditionalFreqByFirst: function (data, i) {
    var target = Number(data[i][0]);
    var freq = {};
    var sampleCount = 0;

    for (var k = i + 1; k < data.length; k++) {
      if (data[k] && Number(data[k][0]) === target) {
        var nextDayInTime = data[k - 1]; // vì mảng đang mới -> cũ
        if (!nextDayInTime) continue;
        sampleCount++;

        for (var t = 0; t < nextDayInTime.length; t++) {
          var num = Number(nextDayInTime[t]);
          freq[num] = (freq[num] || 0) + 1;
        }
      }
    }
    return { freq: freq, samples: sampleCount };
  },

  // ===== dự đoán 2 số: 1 theo cầu + 1 hedge theo tần suất gần đây =====
  // params:
  // - recentWindow: số ngày gần đây để hedge (vd 30)
  // - minSamples: tối thiểu bao nhiêu mẫu cầu mới tin (vd 5)
  predict2: function (data, i, params) {
    params = params || {};
    var recentWindow = params.recentWindow || 30;
    var minSamples = params.minSamples || 5;

    if (!data || data.length < 2 || !data[i] || data[i].length === 0) return [];

    var cond = this._conditionalFreqByFirst(data, i);
    var recent = this._recentFreq(data, i, recentWindow);

    var picks = [];
    var used = {};

    // pick1: nếu cầu đủ mẫu thì lấy top từ cầu, else lấy top từ recent
    var pick1List;
    if (cond.samples >= minSamples) pick1List = this._topFromFreq(cond.freq, 1, used);
    else pick1List = this._topFromFreq(recent, 1, used);

    if (pick1List.length) {
      picks.push(pick1List[0]);
      used[pick1List[0]] = true;
    }

    // pick2: hedge từ recent (để cắt dây thua), loại trừ pick1
    var pick2List = this._topFromFreq(recent, 1, used);
    if (pick2List.length) {
      picks.push(pick2List[0]);
      used[pick2List[0]] = true;
    }

    // nếu vẫn chưa đủ 2 số, lấy thêm từ cầu/recent cho đủ (nếu có)
    if (picks.length < 2) {
      var extra = this._topFromFreq(cond.freq, 2 - picks.length, used);
      for (var e = 0; e < extra.length && picks.length < 2; e++) {
        picks.push(extra[e]);
        used[extra[e]] = true;
      }
    }

    return picks; // [x] hoặc [x,y] (luôn cố gắng có)
  },

  // ===== streak summary: win nếu trúng 1 trong 2 =====
  streakSummary2: function (data, params) {
    if (!data || data.length < 2) {
      return { currentPick: [], current: "N/A", maxWin: 0, maxLoss: 0 };
    }

    var types = [];
    for (var i = 0; i < data.length - 1; i++) {
      var picks = this.predict2(data, i, params);
      var nextDay = data[i + 1] || [];
      var win = this._hitAny(nextDay, picks);
      types.push(win ? "W" : "L");
    }

    var maxWin = 0, maxLoss = 0, curType = null, curLen = 0;
    for (var x = 0; x < types.length; x++) {
      var t = types[x];
      if (t === curType) curLen++;
      else { curType = t; curLen = 1; }
      if (t === "W" && curLen > maxWin) maxWin = curLen;
      if (t === "L" && curLen > maxLoss) maxLoss = curLen;
    }

    var currentType = types[0];
    var currentLen = 1;
    for (var y = 1; y < types.length; y++) {
      if (types[y] === currentType) currentLen++;
      else break;
    }

    return {
      currentPick: this.predict2(data, 0, params),
      current: (currentType === "W" ? "WIN x" : "LOSS x") + currentLen,
      maxWin: maxWin,
      maxLoss: maxLoss
    };
  },
  // Trả ra: đang ở dây nào + max win/loss
  streakSummary: function (data) {
    if (!data || data.length < 2) {
      return { current: "N/A", maxWin: 0, maxLoss: 0 };
    }

    // tạo chuỗi W/L (null predict => L)
    var types = [];
    for (var i = 0; i < data.length - 1; i++) {
      var predict = this.predictTop1ForNextDay(data, i);
      var nextDay = data[i + 1] || [];

      var hit = false;
      if (predict != null) {
        for (var m = 0; m < nextDay.length; m++) {
          if (nextDay[m] === predict) { hit = true; break; }
        }
      }

      types.push((predict != null && hit) ? "W" : "L");
    }

    // max win/loss
    var maxWin = 0, maxLoss = 0;
    var curType = null, curLen = 0;

    for (var a = 0; a < types.length; a++) {
      var t = types[a];
      if (t === curType) curLen++;
      else { curType = t; curLen = 1; }

      if (t === "W" && curLen > maxWin) maxWin = curLen;
      if (t === "L" && curLen > maxLoss) maxLoss = curLen;
    }

    // current streak từ ngày gần nhất (types[0]) đi xuống
    var currentType = types[0];
    var currentLen = 1;
    for (var b = 1; b < types.length; b++) {
      if (types[b] === currentType) currentLen++;
      else break;
    }

    return {
      current: (currentType === "W" ? "WIN x" : "LOSS x") + currentLen,
      maxWin: maxWin,
      maxLoss: maxLoss
    };
  },
  predictTopListForNextDay: function (data, i, topK) {
  topK = topK || 2;
  if (!data || !data.length || !data[i] || data[i].length === 0) return [];

  var target = data[i][0];
  var prevDays = [];

  for (var j = i + 1; j < data.length; j++) {
    if (data[j] && data[j][0] === target) {
      if (data[j - 1]) prevDays.push(data[j - 1]);
    }
  }

  if (prevDays.length === 0) return [];

  var freq = {};
  for (var k = 0; k < prevDays.length; k++) {
    var day = prevDays[k];
    for (var t = 0; t < day.length; t++) {
      var num = day[t];
      freq[num] = (freq[num] || 0) + 1;
    }
  }

  var totalPrev = prevDays.length;
  var stats = [];
  for (var key in freq) {
    var numVal = Number(key);
    var count = freq[key];
    var rate = count / totalPrev;
    stats.push({ num: numVal, count: count, rate: rate });
  }

  // sort: rate desc, count desc, num asc
  stats.sort(function (a, b) {
    return (b.rate - a.rate) || (b.count - a.count) || (a.num - b.num);
  });

  var out = [];
  for (var p = 0; p < stats.length && out.length < topK; p++) {
    out.push(stats[p].num);
  }
  return out; // ví dụ: [02,65]
},

  // Backtest chuỗi thắng/thua khi luôn chọn top1 để chơi
  analyzeWinLossStreaks: function (data) {
    if (!data || data.length < 2) {
      return {
        results: [],
        maxWinStreak: 0,
        maxLoseStreak: 0,
        currentStreakType: null,
        currentStreakLen: 0
      };
    }

    var results = []; // mỗi phần tử: {dayIndex, predict, nextDay, hit, type}

    for (var i = 0; i < data.length - 1; i++) {
      var predict = this.predictTop1ForNextDay(data, i);
      var nextDay = data[i + 1] || [];
      var hit = false;

      if (predict != null) {
        // thắng nếu predict xuất hiện trong ngày i+1 (bất kỳ vị trí nào)
        for (var m = 0; m < nextDay.length; m++) {
          if (nextDay[m] === predict) { hit = true; break; }
        }
      }

      var type = (predict != null && hit) ? "W" : "L"; // null => L theo yêu cầu
      results.push({
        dayIndex: i,
        predict: predict,       // số top1 (hoặc null)
        nextDay: nextDay,       // mảng ngày i+1
        hit: hit,
        type: type
      });
    }

    // tính max streak
    var maxW = 0, maxL = 0;
    var curType = null, curLen = 0;

    for (var r = 0; r < results.length; r++) {
      var t = results[r].type;
      if (t === curType) curLen++;
      else { curType = t; curLen = 1; }

      if (t === "W" && curLen > maxW) maxW = curLen;
      if (t === "L" && curLen > maxL) maxL = curLen;
    }

    // current streak tính từ ngày gần nhất (results[0]) đi xuống
    var currentType = results[0].type;
    var currentLen = 1;
    for (var c = 1; c < results.length; c++) {
      if (results[c].type === currentType) currentLen++;
      else break;
    }

    return {
      results: results,
      maxWinStreak: maxW,
      maxLoseStreak: maxL,
      currentStreakType: currentType,
      currentStreakLen: currentLen
    };
  },

top3AfterSameFirst: function (data, topN) {
    topN = topN || 3;

    var target = data[0][0];
    var prevDays = [];

    for (var i = 1; i < data.length; i++) {
      if (data[i][0] === target) {
        prevDays.push(data[i - 1]);
      }
    }

    var totalPrev = prevDays.length;
    if (totalPrev === 0) {
      return {
        target: target,
        prevDays: [],
        stats: [],
        top: []
      };
    }

    var freq = {};

    prevDays.forEach(function (day) {
      day.forEach(function (num) {
        freq[num] = (freq[num] || 0) + 1;
      });
    });

    var stats = [];
    for (var num in freq) {
      stats.push({
        num: Number(num),
        count: freq[num],
        rate: (freq[num] / totalPrev) * 100
      });
    }

    stats.sort(function (a, b) {
      return b.rate - a.rate || b.count - a.count || a.num - b.num;
    });

    return {
      target: target,
      prevDays: prevDays,
      stats: stats,
      top: stats.slice(0, topN),
      totalPrev: totalPrev
    };
  }
,
  danhGiaDayThangThua: function (listLo) {
    if (!Array.isArray(listLo) || listLo.length < 3) return null;

    var winStreak = 0;
    var loseStreak = 0;
    var maxWin = 0;
    var maxLose = 0;

    var coLanTinh = false;

    // duyệt từ quá khứ → hiện tại
    for (var i = listLo.length - 2; i >= 1; i--) {

      var subData = listLo.slice(i + 1);
      var ngay = listLo[i];

      if (!Array.isArray(ngay)) continue;

      var top = this.thongKeNgaySau(subData, 1);

      // ❗ KHÔNG có dự đoán → BỎ QUA
      if (
        !Array.isArray(top) ||
        top.length === 0 ||
        !top[0] ||
        typeof top[0].so === 'undefined'
      ) {
        continue;
      }

      coLanTinh = true;

      var soDanh = top[0].so;
      var isWin = ngay.indexOf(soDanh) !== -1;

      if (isWin) {
        winStreak++;
        loseStreak = 0;
        maxWin = Math.max(maxWin, winStreak);
      } else {
        loseStreak++;
        winStreak = 0;
        maxLose = Math.max(maxLose, loseStreak);
      }
    }

    if (!coLanTinh) return null;

    return {
      trangThai: winStreak > 0 ? 'ĐANG THẮNG' : 'ĐANG THUA',
      dayThangHienTai: winStreak,
      dayThuaHienTai: loseStreak,
      maxDayThang: maxWin,
      maxDayThua: maxLose
    };
  },
logAllRules:function(issueList) {
  var rules = this.RULES_50;
  var today = this.getWeekdayVN(Date.now()); // 1 = CN, 2 = T2 ... 7 = T7

  for (var r = 0; r < rules.length; r++) {
    var rule = rules[r];

    Logger.log("========== RULE: " + rule.name + " ==========");
this.addLine("========== RULE: " + rule.name + " ==========");
    // lấy lịch sử + phân tích
    var history = this.extractHistoryObject(issueList, rule.code);
    var stats = this.analyzeFromT1ToT7(history);

    // log từng thứ
    for (var d = 1; d <= 7; d++) {
      var s = stats[d];
      if (!s) continue;

      var label =
        d === 1 ? "CN" :
        d === 2 ? "T2" :
        d === 3 ? "T3" :
        d === 4 ? "T4" :
        d === 5 ? "T5" :
        d === 6 ? "T6" : "T7";

      var line =
        label +
        " : maxA " + s.maxAStreak +
        " | maxB " + s.maxBStreak;

      if (d === today && s.currentType) {
        line += " | hiện tại: " + s.currentType + " (" + s.currentStreak + ")";
      }

      Logger.log(line);
       this.addLine(line);
    }

    // ===== KẾT LUẬN CHO NGÀY HIỆN TẠI =====
    var todayStat = stats[today];

    if (todayStat && todayStat.currentType) {
      var current = Number(todayStat.currentStreak || 0);
      var maxStreak =
        todayStat.currentType === "A"
          ? Number(todayStat.maxAStreak || 0)
          : Number(todayStat.maxBStreak || 0);

      if (maxStreak > 0 && current > 0) {
        var ratio = current / maxStreak;
        var percent = Math.round(ratio * 100);

        if (ratio >= 0.8) {
          Logger.log(
            "👉 KẾT LUẬN: NÊN ĐÁNH + 50 số nhóm " +
            (todayStat.currentType === "A" ? "B" : "A") +
            " (cắt cầu " + todayStat.currentType + ", " + percent + "%)"
          );
          this.addLine(
            "👉 KẾT LUẬN: NÊN ĐÁNH + 50 số nhóm " +
            (todayStat.currentType === "A" ? "B" : "A") +
            " (cắt cầu " + todayStat.currentType + ", " + percent + "%)"
          );
        } else {
          Logger.log(
            "👉 KẾT LUẬN: KHÔNG NÊN ĐÁNH (" + percent + "%)"
          );
         
         this.addLine(
            "👉 KẾT LUẬN: KHÔNG NÊN ĐÁNH (" + percent + "%)"
          );
         
        }
  var oppositeGroup = todayStat.currentType === "A" ? "B" : "A";
  var numbers = this.get50NumbersByRule(rule.code, oppositeGroup);
  this.addLine("🎯 50 SỐ ĐỀ XUẤT:");
  this.addLine(numbers.join(", "));

      } else {
        Logger.log("👉 KẾT LUẬN: KHÔNG CÓ CẦU");
      }
    } else {
      Logger.log("👉 KẾT LUẬN: KHÔNG CÓ CẦU");
    }

    Logger.log(""); // dòng trống giữa các rule
  }
},

logResult: function(stats, ruleName) {
  var name = {
    1: "CN",
    2: "T2",
    3: "T3",
    4: "T4",
    5: "T5",
    6: "T6",
    7: "T7"
  };

  Logger.log("========== RULE2: %s ==========", ruleName);
  this.addLine("========== RULE: %s ==========", ruleName);

  for (var d = 1; d <= 7; d++) {
    var s = stats[d];
    Logger.log(
      "%s : 2maxA %s | 2maxB %s | hiện tại: %s (%s)",
      name[d],
      s.maxAStreak,
      s.maxBStreak,
      s.currentType || "-",
      s.currentStreak
    );
    this.addLine(
      "%s : maxA %s | maxB %s | hiện tại: %s (%s)",
      name[d],
      s.maxAStreak,
      s.maxBStreak,
      s.currentType || "-",
      s.currentStreak
    );
  }
},
 extractHistoryObject: function(issueList, rule) {
  var arr = [];

  for (var i = 0; i < issueList.length; i++) {
    var it = issueList[i];
    try {
      var data = JSON.parse(it.detail);
      var first = data[0].replace(/\D/g, "");
      var number = parseInt(first.slice(-2), 10);

      if (!isNaN(number)) {
        arr.push({
          value: number,
          group: this.classify50(number, rule),   // ← dùng this
          weekday: this.getWeekdayVN(it.openTimeStamp),
          timestamp: it.openTimeStamp
        });
      }
    } catch (e) {
      // bỏ qua item lỗi
    }
  }

  // đảm bảo mới nhất trước
  arr.sort(function(a, b) {
    return b.timestamp - a.timestamp;
  });

  return arr;
},

 analyzeOneWeekday:function(history, weekday) {
  var list = history.filter(function (x) {
    return x.weekday === weekday;
  });

  var maxEven = 0;
  var maxOdd = 0;
  var tempEven = 0;
  var tempOdd = 0;

  var curEven = 0;
  var curOdd = 0;

  for (var i = 0; i < list.length; i++) {
    var item = list[i];

    // max streak
    if (item.even) {
      tempEven++;
      tempOdd = 0;
      maxEven = Math.max(maxEven, tempEven);
    } else {
      tempOdd++;
      tempEven = 0;
      maxOdd = Math.max(maxOdd, tempOdd);
    }

    // current streak (tính từ phần tử 0)
    if (i === 0) {
      if (item.even) curEven = 1;
      else curOdd = 1;
    } else {
      var prev = list[i - 1];
      if (item.even && prev.even && curEven > 0) {
        curEven++;
      } else if (!item.even && !prev.even && curOdd > 0) {
        curOdd++;
      } else {
        break;
      }
    }
  }

  return {
    weekday: weekday,
    maxEvenStreak: maxEven,
    maxOddStreak: maxOdd,
    currentType: list.length
      ? (list[0].even ? "chẵn" : "lẻ")
      : null,
    currentStreak: list.length
      ? (list[0].even ? curEven : curOdd)
      : 0,
    totalCount: list.length
  };
},
 
 initWeekStats:function() {
    var o = {};
  for (var d = 1; d <= 7; d++) {
    o[d] = {
      weekday: d,
      totalCount: 0,
      maxEvenStreak: 0,
      maxOddStreak: 0,
      currentType: null,
      currentStreak: 0
    };
  }
  return o;
},
  analyzeFromT2ToT7:function(history) {
  var stats = this.initWeekStats();
  if (!history || !history.length) return stats;

  var todayWeekday = this.getTodayWeekdayVN(); // 1..7

  // gom history theo weekday
  var byDay = {};
  for (var i = 1; i <= 7; i++) byDay[i] = [];

  for (var i = 0; i < history.length; i++) {
    var h = history[i];
    if (h.weekday >= 1 && h.weekday <= 7) {
      byDay[h.weekday].push(h);
    }
  }

  // xử lý từng thứ
  for (var d = 1; d <= 7; d++) {
    var list = byDay[d];
    if (!list.length) continue;

    var s = stats[d];
    s.totalCount = list.length;

    var tempEven = 0;
    var tempOdd = 0;

    for (var i = 0; i < list.length; i++) {
      if (list[i].even) {
        tempEven++;
        tempOdd = 0;
        s.maxEvenStreak = Math.max(s.maxEvenStreak, tempEven);
      } else {
        tempOdd++;
        tempEven = 0;
        s.maxOddStreak = Math.max(s.maxOddStreak, tempOdd);
      }
    }

    // 👉 current CHỈ cho hôm nay
    if (d === todayWeekday) {
      var last = list[0]; // gần nhất
      var type = last.even ? "chẵn" : "lẻ";
      var streak = 1;

      for (var i = 1; i < list.length; i++) {
        if (list[i].even === last.even) {
          streak++;
        } else {
          break;
        }
      }

      s.currentType = type;
      s.currentStreak = streak;
    }
  }

  return stats;
}

,


 weekdayLabel:function(d) {
  return d === 1 ? "CN" : "T" + d;
},
  extractHistory: function (issueList) {
    var arr = [];
    for (var i = 0; i < issueList.length; i++) {
      var it = issueList[i];
      try {
        var data = JSON.parse(it.detail);
        var first = data[0];

        // loại ký tự không phải số
        first = first.replace(/\D/g, "");

        // lấy 2 số cuối
        var last2 = first.slice(-2);

        // chuyển thành số
        var result = parseInt(last2, 10);
        if (!isNaN(result)) {
          arr.push(result);
        }
      } catch (e) {
        // bỏ qua lỗi 1 item
      }
    }
    return arr;
  },

  reduceTo2Digits: function (numStr) {
  let arr = numStr.split('').map(Number);

  while (arr.length > 2) {
    let next = [];
    for (let i = 0; i < arr.length - 1; i++) {
      next.push((arr[i] + arr[i + 1]) % 10);
    }
    arr = next;
  }
  return arr.join('');
},
  extractHistoryTheoGiaiNhatDacBiet: function (issueList) {
    var arr = [];
    for (var i = 0; i < issueList.length; i++) {
      var it = issueList[i];
      try {
        var data = JSON.parse(it.detail);
   var zzzDoan  = reduceTo2Digits(data[0]+data[1]);
    
        var first = data[0];

        // loại ký tự không phải số
        first = first.replace(/\D/g, "");

        // lấy 2 số cuối
        var last2 = first.slice(-2);

        // chuyển thành số
        var result = parseInt(last2, 10);
        var result2 = parseInt(zzzDoan, 10);
        if (!isNaN(result) && !isNaN(result2)) {
          arr.push(result);
          []

        }
      } catch (e) {
        // bỏ qua lỗi 1 item
      }
    }
    return arr;
  },
extractLO:function (arr) {
  // console.log("extractLO");
    const seen = new Set();
    const result = [];

    arr.forEach(item => {
        const parts = item.split(",");

        parts.forEach(p => {
            p = p.trim();
            if (p.length >= 2) {
                let last2 = p.slice(-2);
                let num = parseInt(last2, 10);
                if (isNaN(num)) num = 0;

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
      var it = issueList[i];
      try {
           
        var zz  = this.extractLO( JSON.parse(it.detail));

    
       
        // if (!isNaN(zz)) {
          arr.push(zz);
        // }
      } catch (e) {
        // bỏ qua lỗi 1 item
      }
    }
    return arr;
  },

  predictNextNumber: function (history, opt) {
    opt = opt || {};

    // windows
    const W7 = opt.w7 ?? 7;
    const W30 = opt.w30 ?? 30;
    const W2 = opt.w2 ?? 2;
    const WDECADE = opt.wDecade ?? 14;

    // weights (bạn chỉnh ở đây)
    const A_GAP = opt.aGap ?? 1.4;     // trọng số gap (đã nén gap nên aGap sẽ "ăn" rõ)
    const B_F7  = opt.bF7  ?? 1.30;
    const C_F30 = opt.cF30 ?? 0.30;
    const D_F2  = opt.dF2  ?? 2.40;
    const E_DEC = opt.eDec ?? 1.20;

    // gap control (FIX quan trọng)
    const GAP_CAP = opt.gapCap ?? 120;            // cap gap để tránh bão hòa
    const GAP_MODE = opt.gapMode ?? "sqrt";       // "sqrt" | "log" | "raw"

    const RECENT = opt.recentDays ?? 200;         // win rate gần đây

    function normNum(x) {
      const n = (typeof x === "string") ? parseInt(x, 10) : x;
      const m = (n % 100 + 100) % 100;
      return Number.isFinite(m) ? m : 0;
    }
    function pad2(n) { return String(n).padStart(2, "0"); }
    function tens(n) { return Math.floor(n / 10); }

    if (!Array.isArray(history) || history.length < 40) {
      return {
        pick: "00",
        estWinRate: null,
        estWinRateRecent: null,
        rounds: 0,
        maxWIN: 0,
        maxLOSS: 0,
        currentStreakType: "NONE",
        currentStreakLen: 0,
        note: "Need more history (>=40 days recommended)"
      };
    }

    // history[0]=today,... => chrono oldest->newest
    const chrono = history.slice().map(day => (day || []).map(normNum)).reverse();
    const N = chrono.length;

    function gapEff(gap) {
      if (gap < 0) gap = 0;
      if (gap > GAP_CAP) gap = GAP_CAP;

      if (GAP_MODE === "log") return Math.log(gap + 1);
      if (GAP_MODE === "raw") return gap;
      // default sqrt
      return Math.sqrt(gap);
    }

    function freqInWindow(uptoIdx, win) {
      const start = Math.max(0, uptoIdx - win + 1);
      const freq = Array(100).fill(0);
      for (let d = start; d <= uptoIdx; d++) {
        const set = new Set(chrono[d]);
        set.forEach(n => { freq[n]++; });
      }
      return freq;
    }

    function decadeStrength(uptoIdx) {
      const startDec = Math.max(0, uptoIdx - WDECADE + 1);
      const decadeFreq = Array(10).fill(0);
      for (let d = startDec; d <= uptoIdx; d++) {
        const set = new Set(chrono[d]);
        set.forEach(n => { decadeFreq[tens(n)]++; });
      }
      return decadeFreq;
    }

    function lastSeenArr(uptoIdx) {
      const lastSeen = Array(100).fill(-1e9);
      // scan vừa đủ để lấy lastSeen tốt
      const startAll = Math.max(0, uptoIdx - 400);
      for (let d = startAll; d <= uptoIdx; d++) {
        const set = new Set(chrono[d]);
        set.forEach(n => { lastSeen[n] = d; });
      }
      return lastSeen;
    }

    function scoreTable(uptoIdx) {
      const lastSeen = lastSeenArr(uptoIdx);
      const f7 = freqInWindow(uptoIdx, W7);
      const f30 = freqInWindow(uptoIdx, W30);
      const f2 = freqInWindow(uptoIdx, W2);
      const decFreq = decadeStrength(uptoIdx);

      const table = [];
      for (let n = 0; n < 100; n++) {
        let gap = uptoIdx - lastSeen[n];
        if (!isFinite(gap) || gap < 0) gap = GAP_CAP; // chưa từng thấy thì cho là rất lâu
        if (gap > GAP_CAP) gap = GAP_CAP;

        const ge = gapEff(gap);
        const dec = decFreq[tens(n)];

        const termGap = A_GAP * ge;
        const term7 = B_F7 * f7[n];
        const term30 = C_F30 * f30[n];
        const term2 = D_F2 * f2[n];
        const termDec = E_DEC * dec;

        const score = termGap + term7 + term30 - term2 + termDec;

        table.push({
          n,
          score,
          gap, gapEff: ge,
          f7: f7[n], f30: f30[n], f2: f2[n],
          dec,
          terms: { termGap, term7, term30, term2, termDec }
        });
      }
      table.sort((a, b) => b.score - a.score);
      return table;
    }

    function pickByScore(uptoIdx) {
      return scoreTable(uptoIdx)[0].n;
    }

    // walk-forward backtest
    let wins = 0, rounds = 0;
    let winRun = 0, lossRun = 0, maxWIN = 0, maxLOSS = 0;

    let recentWins = 0, recentRounds = 0;

    // newest->older results for current streak
    const newestFirst = [];

    for (let d = 0; d <= N - 2; d++) {
      const pick = pickByScore(d);
      const nextSet = new Set(chrono[d + 1]);
      const isWin = nextSet.has(pick);

      rounds++;
      if (isWin) {
        wins++;
        winRun++; lossRun = 0;
        if (winRun > maxWIN) maxWIN = winRun;
      } else {
        lossRun++; winRun = 0;
        if (lossRun > maxLOSS) maxLOSS = lossRun;
      }

      const idxFromEnd = (N - 2) - d; // 0 = prediction gần nhất
      if (idxFromEnd < RECENT) {
        recentRounds++;
        if (isWin) recentWins++;
      }
      if (idxFromEnd < 400) newestFirst.unshift(isWin); // [0] là newest
    }

    const estWinRate = rounds ? wins / rounds : 0;
    const estWinRateRecent = recentRounds ? recentWins / recentRounds : null;

    // current streak from newest backward
    let currentStreakType = "NONE";
    let currentStreakLen = 0;
    if (newestFirst.length > 0) {
      const newest = newestFirst[0];
      currentStreakType = newest ? "WIN" : "LOSS";
      for (let i = 0; i < newestFirst.length; i++) {
        if (newestFirst[i] === newest) currentStreakLen++;
        else break;
      }
    }

    // final prediction for tomorrow (after today)
    const topTableToday = scoreTable(N - 1);
    const pickTomorrow = topTableToday[0].n;

    return {
      pick: pad2(pickTomorrow),
      estWinRate,
      estWinRateRecent,
      rounds,
      maxWIN,
      maxLOSS,
      currentStreakType,
      currentStreakLen,
      // để log top candidates (không log toàn bộ)
      topCandidatesToday: topTableToday.slice(0, 10).map(x => ({
        n: pad2(x.n),
        score: Number(x.score.toFixed(4)),
        gap: x.gap,
        gapEff: Number(x.gapEff.toFixed(4)),
        f7: x.f7,
        f30: x.f30,
        f2: x.f2,
        dec: x.dec,
        terms: {
          gap: Number(x.terms.termGap.toFixed(4)),
          f7: Number(x.terms.term7.toFixed(4)),
          f30: Number(x.terms.term30.toFixed(4)),
          f2_penalty: Number(x.terms.term2.toFixed(4)),
          dec: Number(x.terms.termDec.toFixed(4))
        }
      }))
    };
  }
,

analyzePredictionArray: function (A) {
  function norm(x) {
    // giữ "01" nếu là string, number thì pad 2 chữ số
    if (typeof x === "string") return x.padStart(2, "0");
    return String(x).padStart(2, "0");
  }

  const out = {
    rounds: 0,
    currentWinStreak: 0,    // dây WIN hiện tại (tính từ hôm qua)
    currentLossStreak: 0,   // dây LOSS hiện tại
    maxWIN: 0,
    maxLOSS: 0,
    results: []             // log chi tiết
  };

  if (!Array.isArray(A) || A.length < 2) return out;

  let winRun = 0;
  let lossRun = 0;

  // i=1 là hôm qua → so với kết quả hôm nay (i-1)
  for (let i = 1; i < A.length; i++) {
    const pred = norm(A[i][0]);
    const nextActuals = (A[i - 1][1] || []).map(norm);

    const isWin = new Set(nextActuals).has(pred);

    out.results.push({
      predDayIndex: i,     // ngày dự đoán
      nextDayIndex: i - 1, // ngày kiểm tra
      pred: pred,
      nextActuals: nextActuals,
      isWin: isWin
    });

    if (isWin) {
      winRun++;
      lossRun = 0;
      if (winRun > out.maxWIN) out.maxWIN = winRun;
    } else {
      lossRun++;
      winRun = 0;
      if (lossRun > out.maxLOSS) out.maxLOSS = lossRun;
    }
  }

  out.rounds = out.results.length;

  // dây hiện tại (bắt đầu từ hôm qua)
  if (out.rounds > 0) {
    if (out.results[0].isWin) {
      for (let i = 0; i < out.results.length; i++) {
        if (out.results[i].isWin) out.currentWinStreak++;
        else break;
      }
    } else {
      for (let i = 0; i < out.results.length; i++) {
        if (!out.results[i].isWin) out.currentLossStreak++;
        else break;
      }
    }
  }

  return out;
},
   
   extractHistoryLoDacbiet: function (issueList) {
    var arr = [];
    for (var i = 0; i < issueList.length-1; i++) {
      var it = issueList[i];
      try {
           var data = JSON.parse(it.detail);
   var zzzDoan  = this.reduceTo2Digits(data[0]+data[1]);
        var zz  = this.extractLO( JSON.parse(it.detail));

        var temp = [];
        temp.push(parseInt(zzzDoan, 10));
        temp.push(zz);
        // if (!isNaN(zz)) {
          arr.push(temp);
        // }
      } catch (e) {
        // bỏ qua lỗi 1 item
      }
    }
    return arr;
  },
   top5DayKepChuaVe:function(data) {

 let days = [];
  let count = 0;

  for (let i = 0; i < data.length; i++) {
    let so = data[i].toString().padStart(2, '0');

    if (so[0] === so[1]) {
      days.push(count); // kết thúc 1 dây
      count = 0;
    } else {
      count++;
    }
  }

  // nếu hết mảng mà chưa gặp kép
  if (count > 0) {
    days.push(count);
  }

  // ===== days[0] CHÍNH LÀ DÂY HIỆN TẠI =====

  // ===== SẮP XẾP GIẢM DẦN =====
  let sorted = [...days].sort((a, b) => b - a);

  // ===== TOP 5 =====
  let top5 = sorted.slice(0, 5);

  Logger.log('Dây hiện tại chưa về: ' + days[0] + ' ngày');
  Logger.log('TOP 5 DÂY KÉP CHƯA VỀ:');

  top5.forEach((d, i) => {
    let mark = (d === days[0]) ? ' <-- DÂY HIỆN TẠI' : '';
    Logger.log(`#${i + 1}: ${d} ngày${mark}`);
  });

  return {
    dayHienTai: days[0],
    top5: top5
  };
},
   analyzeCau50:function(arr) {
  if (!Array.isArray(arr) || arr.length === 0) throw new Error("arr phải là mảng và không rỗng");

  // ---------- helpers ----------
  function norm(n) {
    n = Number(n);
    if (!Number.isFinite(n) || n < 0 || n > 99) throw new Error("Mỗi phần tử phải là số 0..99");
    return Math.floor(n);
  }
  function head(n) { return Math.floor(n / 10); }
  function tail(n) { return n % 10; }

  function headBig(n) { return head(n) >= 5; }   // 5-9
  function headSmall(n) { return head(n) <= 4; } // 0-4
  function tailBig(n) { return tail(n) >= 5; }   // 5-9
  function tailSmall(n) { return tail(n) <= 4; } // 0-4

  function currentStreak(a, pred) {
    var c = 0;
    for (var i = 0; i < a.length; i++) {
      if (pred(a[i])) c++;
      else break;
    }
    return c;
  }

  function maxStreakOverall(a, pred) {
    var best = 0, run = 0;
    for (var i = 0; i < a.length; i++) {
      if (pred(a[i])) { run++; if (run > best) best = run; }
      else run = 0;
    }
    return best;
  }

  // Thống kê “sau khi đang có run = k thì ngày tiếp theo có giữ cầu không?”
  // Duyệt theo chiều thời gian: quá khứ -> hiện tại cho đúng “ngày tiếp theo”.
  // arr đang là hiện tại->quá khứ, nên đảo lại.
  function continuationStats(a_now_to_past, pred) {
    var t = a_now_to_past.slice().reverse(); // quá khứ -> hiện tại
    var cont = {}; // cont[k] = {keep: x, break: y}
    var run = 0;

    for (var i = 0; i < t.length; i++) {
      if (pred(t[i])) {
        run++;
      } else {
        run = 0;
      }

      // nhìn “ngày tiếp theo” (i+1) nếu tồn tại
      if (i + 1 < t.length) {
        var k = run; // run tại ngày i
        if (k > 0) {
          if (!cont[k]) cont[k] = { keep: 0, break: 0 };
          if (pred(t[i + 1])) cont[k].keep++;
          else cont[k].break++;
        }
      }
    }
    return cont; // dùng để tính xác suất giữ cầu ở k
  }

  function probKeep(cont, k) {
    var x = cont[k];
    if (!x) return null;
    var total = x.keep + x.break;
    if (total === 0) return null;
    return x.keep / total; // 0..1
  }

  // “ngưỡng hiếm” = percentile 90% của độ dài run trong lịch sử (ước lượng)
  function runLengthHistogram(a, pred) {
    var hist = {}; // len -> count
    var run = 0;
    for (var i = 0; i < a.length; i++) {
      if (pred(a[i])) run++;
      else {
        if (run > 0) hist[run] = (hist[run] || 0) + 1;
        run = 0;
      }
    }
    if (run > 0) hist[run] = (hist[run] || 0) + 1;
    return hist;
  }

  function percentile90FromHist(hist) {
    var lengths = Object.keys(hist).map(Number).sort(function(a,b){return a-b;});
    if (lengths.length === 0) return 0;
    var total = 0;
    lengths.forEach(function(l){ total += hist[l]; });
    var target = total * 0.90;
    var cum = 0;
    for (var i = 0; i < lengths.length; i++) {
      cum += hist[lengths[i]];
      if (cum >= target) return lengths[i];
    }
    return lengths[lengths.length - 1];
  }

  // ---------- 4 cầu 50 ----------
  var a = arr.map(norm);

  var cau50 = [
    { key: "cau50_dau_be",  name: "Cầu 50 đầu bé (00–49)", pred: (n)=> headSmall(n) },
    { key: "cau50_dau_to",  name: "Cầu 50 đầu to (50–99)", pred: (n)=> headBig(n) },
    { key: "cau50_dit_be",  name: "Cầu 50 đít bé (*0–*4)", pred: (n)=> tailSmall(n) },
    { key: "cau50_dit_to",  name: "Cầu 50 đít to (*5–*9)", pred: (n)=> tailBig(n) },
  ];

  // ---------- compute metrics ----------
  cau50.forEach(function(c) {
    c.current = currentStreak(a, c.pred);
    c.maxAll = maxStreakOverall(a, c.pred);

    c.cont = continuationStats(a, c.pred);
    c.pKeepAtCurrent = probKeep(c.cont, c.current); // xác suất giữ cầu sau khi đạt current

    c.hist = runLengthHistogram(a, c.pred);
    c.p90 = percentile90FromHist(c.hist); // ngưỡng “hiếm”
  });

  // 1) log cầu 50 đang chạy dài nhất
  var bestCurrent = cau50.slice().sort(function(x,y){
    return y.current - x.current;
  })[0];

  // 2) tự động chọn 1 cầu ưu tiên cho ngày tiếp theo
  // Tiêu chí:
  // - current cao nhất
  // - nếu hòa: chọn cầu có pKeepAtCurrent cao hơn (nếu null thì -1)
  // - nếu vẫn hòa: chọn cầu có maxAll lớn hơn (bền hơn)
  var pick = cau50.slice().sort(function(x,y){
    if (y.current !== x.current) return y.current - x.current;
    var px = (x.pKeepAtCurrent == null ? -1 : x.pKeepAtCurrent);
    var py = (y.pKeepAtCurrent == null ? -1 : y.pKeepAtCurrent);
    if (py !== px) return py - px;
    return y.maxAll - x.maxAll;
  })[0];

  // 3) báo hiệu “sắp gãy cầu” (risk score 0..100)
  // Risk tăng khi:
  // - current vượt/tiệm cận p90 (ngưỡng hiếm) trong lịch sử
  // - pKeepAtCurrent thấp
  // - current càng dài
  function riskScore(c) {
    var r = 0;

    // (A) độ dài so với ngưỡng hiếm
    if (c.p90 > 0) {
      var ratio = c.current / c.p90; // >1 là vượt ngưỡng hiếm
      // map ratio ~ [0..1.5] -> [0..50]
      var aScore = Math.max(0, Math.min(50, ratio * 35)); // vừa đủ nhạy
      if (ratio >= 1) aScore = Math.min(50, 35 + (ratio - 1) * 30);
      r += aScore;
    }

    // (B) xác suất giữ cầu sau current
    // pKeep cao => risk thấp
    if (c.pKeepAtCurrent != null) {
      r += (1 - c.pKeepAtCurrent) * 35; // 0..35
    } else {
      r += 12; // không đủ dữ liệu thì cho risk trung bình nhẹ
    }

    // (C) current tuyệt đối
    r += Math.min(15, c.current * 2); // max 15

    return Math.round(Math.max(0, Math.min(100, r)));
  }

  cau50.forEach(function(c){ c.risk = riskScore(c); });

  // sort để log đẹp
  var table = cau50.slice().sort(function(x,y){
    return y.current - x.current;
  }).map(function(c){
    return {
      key: c.key,
      name: c.name,
      currentStreak: c.current,
      maxStreakOverall: c.maxAll,
      pKeepAtCurrent: (c.pKeepAtCurrent == null ? null : Number(c.pKeepAtCurrent.toFixed(3))),
      p90RunLength: c.p90,
      risk0to100: c.risk
    };
  });

  Logger.log("=== CẦU 50 ĐANG CHẠY DÀI NHẤT (từ hôm nay) ===");
  Logger.log(bestCurrent.name + " | currentStreak=" + bestCurrent.current);

  Logger.log("=== GỢI Ý CẦU ƯU TIÊN CHO NGÀY TIẾP THEO ===");
  Logger.log(pick.name +
             " | currentStreak=" + pick.current +
             " | pKeepAtCurrent=" + (pick.pKeepAtCurrent == null ? "null" : pick.pKeepAtCurrent.toFixed(3)) +
             " | risk=" + pick.risk + "/100");

  Logger.log("=== BẢNG TỔNG HỢP 4 CẦU 50 ===");
  Logger.log(JSON.stringify(table, null, 2));

  return { bestCurrent: bestCurrent, pick: pick, table: table };
},
 analyzeStreaks:function(arr) {
  if (!Array.isArray(arr) || arr.length === 0) throw new Error("arr phải là mảng và không rỗng");

  // Helpers
  function norm(n) {
    n = Number(n);
    if (!Number.isFinite(n) || n < 0 || n > 99) throw new Error("Mỗi phần tử phải là số 0..99");
    return Math.floor(n);
  }
  function head(n) { return Math.floor(n / 10); } // hàng chục
  function tail(n) { return n % 10; }             // hàng đơn vị

  function isEven(n) { return (n % 2) === 0; }
  function isOdd(n) { return (n % 2) === 1; }

  // "đầu to/bé" dựa theo hàng chục: bé 0-4, to 5-9
  function headBig(n) { return head(n) >= 5; }
  function headSmall(n) { return head(n) <= 4; }

  // "đít to/bé" dựa theo hàng đơn vị: bé 0-4, to 5-9
  function tailBig(n) { return tail(n) >= 5; }
  function tailSmall(n) { return tail(n) <= 4; }

  // Tính dây từ ngày hiện tại (arr[0] -> arr[1] -> ...)
  function currentStreak(arrNorm, predicate) {
    var c = 0;
    for (var i = 0; i < arrNorm.length; i++) {
      if (predicate(arrNorm[i])) c++;
      else break;
    }
    return c;
  }

  // Tính dây dài nhất toàn mảng (mọi vị trí)
  function maxStreakOverall(arrNorm, predicate) {
    var best = 0, run = 0;
    for (var i = 0; i < arrNorm.length; i++) {
      if (predicate(arrNorm[i])) {
        run++;
        if (run > best) best = run;
      } else {
        run = 0;
      }
    }
    return best;
  }

  var a = arr.map(norm);

  var rules = {
    even: (n) => isEven(n),                                  // 1) dây chẵn
    odd: (n) => isOdd(n),                                    // 2) dây lẻ
    headBig_tailSmall: (n) => headBig(n) && tailSmall(n),    // 3) đầu to đít bé
    headSmall_tailBig: (n) => headSmall(n) && tailBig(n),    // 4) đầu bé đít to
    headBig_tailBig: (n) => headBig(n) && tailBig(n),        // 5) đầu to đít to
    headSmall_tailSmall: (n) => headSmall(n) && tailSmall(n) // 6) đầu bé đít bé
  };

  var out = {};
  Object.keys(rules).forEach(function(key) {
    out[key] = {
      currentStreak: currentStreak(a, rules[key]),
      maxStreakOverall: maxStreakOverall(a, rules[key])
    };
  });

  return out;
},
    
    trangTrinhSo:function() {
 
  Logger.log("===== BẮT ĐẦU TÍNH TRẠNG TRÌNH =====");

  // ====== INPUT ======
  const birthYear = 1988; // năm sinh dương
  const today = new Date();

  // ====== NGÀY HIỆN TẠI ======
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  Logger.log("Ngày hiện tại: " + day + "/" + month + "/" + year);

  // ====== TUỔI ÂM ======
  const ageLunar = year - birthYear + 1;


  // ====== TỔNG NGÀY ======
  let total = day + month + year + ageLunar;


  // ====== XÉT ÂM DƯƠNG ======
  let nenDanh = total % 2 === 0;


  // ====== RÚT GỌN SỐ ======
  function rutGon(n) {
  
    while (n >= 10) {
      n = n.toString().split('').reduce((a, b) => a + Number(b), 0);
   
    }
    return n;
  }

  const soGoc = rutGon(total);


  // ====== BỘ SỐ CHÍNH (TRẠNG TRÌNH) ======
  const boSoChinh = [
    soGoc,
    soGoc + 10,
    soGoc + 30,
    soGoc + 40
  ].filter(n => n < 100);

  // ====== BỘ SỐ PHỤ (MỆNH MỘC) ======
  const boSoPhu = [3, 13, 30, 34];



  // ====== OUTPUT ======
  return {
    ngay: `${day}/${month}/${year}`,
    tuoi_am: ageLunar,
    tong: total,
    nen_danh: nenDanh ? "NÊN ĐÁNH" : "KHÔNG NÊN ĐÁNH",
    so_goc: soGoc,
    bo_so_chinh: boSoChinh,
    bo_so_phu: boSoPhu
  };
},

 trangTrinh_1so:function(birthY, birthM, birthD, todaySolarOpt) {
  // ====== timezone VN GMT+7 (Hà Nội) ======
  const TZ = 7;

  // ====== CAN CHI ======
  const CAN = ["Giáp","Ất","Bính","Đinh","Mậu","Kỷ","Canh","Tân","Nhâm","Quý"];
  const CHI = ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"];

  function canToHanh(can) {
    if (can === "Giáp" || can === "Ất") return "Mộc";
    if (can === "Bính" || can === "Đinh") return "Hỏa";
    if (can === "Mậu" || can === "Kỷ") return "Thổ";
    if (can === "Canh" || can === "Tân") return "Kim";
    return "Thủy"; // Nhâm, Quý
  }
  function chiToHanh(chi) {
    if (chi === "Dần" || chi === "Mão") return "Mộc";
    if (chi === "Tỵ" || chi === "Ngọ") return "Hỏa";
    if (chi === "Thân" || chi === "Dậu") return "Kim";
    if (chi === "Hợi" || chi === "Tý") return "Thủy";
    return "Thổ"; // Thìn, Tuất, Sửu, Mùi
  }
  const hanhToSo = { "Mộc":3, "Hỏa":9, "Thổ":5, "Kim":7, "Thủy":1 };

  // ====== HELPERS ======
  function INT(d) { return Math.floor(d); }

  function rutGon1(n) {
    n = Math.abs(n);
    while (n >= 10) {
      let s = 0;
      String(n).split("").forEach(ch => s += (ch.charCodeAt(0) - 48));
      n = s;
    }
    return n;
  }

  // ====== Julian day from date (Gregorian) ======
  function jdFromDate(dd, mm, yy) {
    const a = INT((14 - mm) / 12);
    const y = yy + 4800 - a;
    const m = mm + 12*a - 3;
    let jd = dd + INT((153*m + 2)/5) + 365*y + INT(y/4) - INT(y/100) + INT(y/400) - 32045;
    return jd;
  }

  // ====== Astronomical parts (Ho Ngoc Duc-style) ======
  function getNewMoonDay(k, timeZone) {
    const T = k/1236.85;
    const T2 = T*T;
    const T3 = T2*T;
    const dr = Math.PI/180;
    let Jd1 = 2415020.75933 + 29.53058868*k + 0.0001178*T2 - 0.000000155*T3;
    Jd1 += 0.00033*Math.sin((166.56 + 132.87*T - 0.009173*T2)*dr);

    const M = 359.2242 + 29.10535608*k - 0.0000333*T2 - 0.00000347*T3;
    const Mpr = 306.0253 + 385.81691806*k + 0.0107306*T2 + 0.00001236*T3;
    const F = 21.2964 + 390.67050646*k - 0.0016528*T2 - 0.00000239*T3;

    let C1 = (0.1734 - 0.000393*T)*Math.sin(M*dr) + 0.0021*Math.sin(2*dr*M);
    C1 -= 0.4068*Math.sin(Mpr*dr) + 0.0161*Math.sin(2*dr*Mpr);
    C1 -= 0.0004*Math.sin(3*dr*Mpr);
    C1 += 0.0104*Math.sin(2*dr*F) - 0.0051*Math.sin((M+Mpr)*dr);
    C1 -= 0.0074*Math.sin((M-Mpr)*dr) + 0.0004*Math.sin((2*F+M)*dr);
    C1 -= 0.0004*Math.sin((2*F-M)*dr) - 0.0006*Math.sin((2*F+Mpr)*dr);
    C1 += 0.0010*Math.sin((2*F-Mpr)*dr) + 0.0005*Math.sin((2*Mpr+M)*dr);

    let deltat;
    if (T < -11) {
      deltat = 0.001 + 0.000839*T + 0.0002261*T2 - 0.00000845*T3 - 0.000000081*T*T3;
    } else {
      deltat = -0.000278 + 0.000265*T + 0.000262*T2;
    }

    const JdNew = Jd1 + C1 - deltat;
    return INT(JdNew + 0.5 + timeZone/24);
  }

  function getSunLongitude(jdn, timeZone) {
    const T = (jdn - 2451545.5 - timeZone/24) / 36525;
    const T2 = T*T;
    const dr = Math.PI/180;
    const M = 357.52910 + 35999.05030*T - 0.0001559*T2 - 0.00000048*T*T2;
    const L0 = 280.46645 + 36000.76983*T + 0.0003032*T2;

    let DL = (1.914600 - 0.004817*T - 0.000014*T2)*Math.sin(dr*M);
    DL += (0.019993 - 0.000101*T)*Math.sin(dr*2*M) + 0.000290*Math.sin(dr*3*M);

    let L = L0 + DL;
    L = L*dr;
    L = L - Math.PI*2*(INT(L/(Math.PI*2)));
    return INT(L / Math.PI * 6); // 0..11 (each = 30°)
  }

  function getLunarMonth11(yy, timeZone) {
    const off = jdFromDate(31, 12, yy) - 2415021;
    const k = INT(off / 29.530588853);
    let nm = getNewMoonDay(k, timeZone);
    const sunLong = getSunLongitude(nm, timeZone);
    if (sunLong >= 9) nm = getNewMoonDay(k-1, timeZone);
    return nm;
  }

  function getLeapMonthOffset(a11, timeZone) {
    const k = INT((a11 - 2415021.076998695) / 29.530588853 + 0.5);
    let last = 0;
    let i = 1;
    let arc = getSunLongitude(getNewMoonDay(k+i, timeZone), timeZone);
    do {
      last = arc;
      i++;
      arc = getSunLongitude(getNewMoonDay(k+i, timeZone), timeZone);
    } while (arc !== last && i < 14);
    return i - 1;
  }

  // ====== Solar -> Lunar (dd/mm/yyyy) ======
  function solarToLunar(dd, mm, yy, timeZone) {
    const dayNumber = jdFromDate(dd, mm, yy);
    const k = INT((dayNumber - 2415021.076998695) / 29.530588853);
    let monthStart = getNewMoonDay(k+1, timeZone);
    if (monthStart > dayNumber) monthStart = getNewMoonDay(k, timeZone);

    let a11 = getLunarMonth11(yy, timeZone);
    let b11 = a11;
    let lunarYear;

    if (a11 >= monthStart) {
      lunarYear = yy;
      a11 = getLunarMonth11(yy-1, timeZone);
    } else {
      lunarYear = yy + 1;
      b11 = getLunarMonth11(yy+1, timeZone);
    }

    const lunarDay = dayNumber - monthStart + 1;
    let diff = INT((monthStart - a11) / 29);
    let lunarMonth = diff + 11;
    let lunarLeap = 0;

    if (b11 - a11 > 365) {
      const leapMonthDiff = getLeapMonthOffset(a11, timeZone);
      if (diff >= leapMonthDiff) {
        lunarMonth = diff + 10;
        if (diff === leapMonthDiff) lunarLeap = 1;
      }
    }
    if (lunarMonth > 12) lunarMonth -= 12;
    if (lunarMonth >= 11 && diff < 4) lunarYear -= 1;

    return { day: lunarDay, month: lunarMonth, year: lunarYear, leap: lunarLeap, jd: dayNumber };
  }

  // ====== Can-Chi ngày từ JDN ======
  function canChiNgayFromJd(jd) {
    const can = CAN[(jd + 9) % 10];
    const chi = CHI[(jd + 1) % 12];
    return { can, chi, canIndex: (jd + 9) % 10, chiIndex: (jd + 1) % 12 };
  }

  // ====== input today ======
  const today = todaySolarOpt ? new Date(todaySolarOpt) : new Date();
  const d = today.getDate();
  const m = today.getMonth() + 1;
  const y = today.getFullYear();

  // ====== convert to lunar ======
  const birthL = solarToLunar(birthD, birthM, birthY, TZ);
  const todayL = solarToLunar(d, m, y, TZ);

  // ====== tuổi âm ======
  const ageLunar = todayL.year - birthL.year + 1;

  // ====== CanChi & Ngũ hành ngày ======
  const ccToday = canChiNgayFromJd(todayL.jd);
  const hanhNgay = canToHanh(ccToday.can); // ưu tiên Can của ngày
  const hanhSo = hanhToSo[hanhNgay];

  // ====== "Trạng Trình" kiểu luận số: âm + tuổi âm + can-chi + ngũ hành -> 00..99 ======
  // (mục tiêu: ra 1 số duy nhất và không bị bó hàng chục)
  const total =
    todayL.day
    + todayL.month * 2
    + todayL.year
    + ageLunar * 3
    + hanhSo * 7
    + ccToday.canIndex * 11
    + ccToday.chiIndex * 13;

  // thêm 1 lớp rút gọn để "có nét thuật số" nhưng vẫn ra 00..99
  const seed = rutGon1(total) + (total % 97); // 0..(9+96)=105
  let number = (seed * 7 + (birthL.year % 100) + birthL.month * 3 + birthL.day) % 100;

  // format 2 chữ số
  const soChoi = String(number).padStart(2, "0");

  // ====== return debug ======
  return {
    birth_solar: `${birthD}/${birthM}/${birthY}`,
    today_solar: `${d}/${m}/${y}`,
    birth_lunar: `${birthL.day}/${birthL.month}/${birthL.year}${birthL.leap ? " (nhuận)" : ""}`,
    today_lunar: `${todayL.day}/${todayL.month}/${todayL.year}${todayL.leap ? " (nhuận)" : ""}`,
    tuoi_am: ageLunar,
    canchi_ngay: `${ccToday.can} ${ccToday.chi}`,
    ngu_hanh_ngay: hanhNgay,
    hanh_so: hanhSo,
    tong: total,
    so_choi: soChoi
  };
},

  // =======================
  // FORMAT UTILS
  // =======================
  formatArray: function (arr) {
    if (!arr || arr.length === 0) return "[]";
    var out = arr.map(function (x) {
      var s = x.toString();
      return s.padStart(2, "0");
    });
    return "[" + out.join(",") + "]";
  },

  formatCopy: function (arr) {
    if (!arr || arr.length === 0) return "";
    var out = arr.map(function (x) {
      var s = x.toString();
      return s.padStart(2, "0");
    });
    return out.join(",");
  },

  buildNumberGroupsForFormula: function (analyzer, formulaId, labelCurrent) {
    var currentNums = [];
    var otherNums = [];
    for (var n = 0; n < 100; n++) {
      var lab = analyzer.classify(formulaId, n);
      if (lab === labelCurrent) {
        currentNums.push(n);
      } else {
        otherNums.push(n);
      }
    }
    return {
      currentNums: currentNums,
      otherNums: otherNums
    };
  },

  // =======================
  // DỰ ĐOÁN TO / BÉ (nếu cần dùng sau)
  // =======================
  duDoanKeTiepTobe: function (arr) {
    var n = arr && arr.length ? arr.length : 0;
    if (n === 0)
      return { duDoan: "to", doTinCay: 0, ghiChu: "mảng rỗng" };

    var lastIsTo = arr[n - 1] > 50;

    var len = 1;
    for (var j = n - 2; j >= 0; j--) {
      if ((arr[j] > 50) === lastIsTo) len++;
      else break;
    }

    var duDoan;
    if (len >= 3) duDoan = lastIsTo ? "bé" : "to";
    else duDoan = lastIsTo ? "to" : "bé";

    var doTinCay = Math.min(1, len / 10);

    return {
      duDoan: duDoan,
      doTinCay: doTinCay,
      dayCuoiLa: lastIsTo ? "to" : "bé",
      doDaiDayCuoi: len
    };
  },

  // ====== CÁC HÀM CHO PREDICT (nếu muốn dùng sau) ======
  isEven: function (n) { return n % 2 === 0 ? 1 : 0; },
  isSmall: function (n) { return n < 50 ? 1 : 0; },
  tailGroup: function (n) { return (n % 10) <= 4 ? 1 : 0; },
  digitSum: function (n) { return Math.floor(n / 10) + (n % 10); },

  norm: function (x, min, max) {
    if (max <= min) return 0;
    var v = (x - min) / (max - min);
    if (v < 0) v = 0;
    if (v > 1) v = 1;
    return v;
  },

  absence: function (h, fn) {
    var s = 0;
    for (var i = h.length - 1; i >= 0; i--) {
      if (fn(h[i])) break;
      s++;
    }
    return s;
  },

  lastSeen: function (h, fn) {
    for (var i = 0; i < h.length; i++) {
      if (fn(h[h.length - 1 - i])) return i;
    }
    return h.length;
  },

  predict: function (history, k) {
    var H = history.length;
    var s_even = this.norm(this.absence(history, function (n) { return LodeOnline.isEven(n) === 1; }), 0, H);
    var s_odd  = this.norm(this.absence(history, function (n) { return LodeOnline.isEven(n) === 0; }), 0, H);
    var s_small= this.norm(this.absence(history, function (n) { return LodeOnline.isSmall(n) === 1; }), 0, H);
    var s_big  = this.norm(this.absence(history, function (n) { return LodeOnline.isSmall(n) === 0; }), 0, H);
    var s_lo   = this.norm(this.absence(history, function (n) { return LodeOnline.tailGroup(n) === 1; }), 0, H);
    var s_hi   = this.norm(this.absence(history, function (n) { return LodeOnline.tailGroup(n) === 0; }), 0, H);

    var freq = new Array(100).fill(0);
    for (var i = 0; i < history.length; i++) {
      var x = history[i];
      if (x >= 0 && x < 100) freq[x]++;
    }
    var maxf = Math.max.apply(null, freq.concat([1]));

    var picks = [];
    for (var n = 0; n < 100; n++) {
      var sp = this.isEven(n) ? s_even : s_odd;
      var ss = this.isSmall(n) ? s_small : s_big;
      var st = this.tailGroup(n) ? s_lo : s_hi;
      var ov = this.norm(this.lastSeen(history, function (x) { return x === n; }), 0, H);
      var rr = 1 - this.norm(freq[n], 0, maxf);

      var score = sp + ss + st + 1.2 * ov + 0.6 * rr;
      picks.push({ n: n, score: score });
    }

    picks.sort(function (a, b) { return b.score - a.score; });
    return picks.slice(0, k);
  }
};


