import { LodeOnline } from "./lodeOnline.js";

function escapeHtml(s) {
  if (!s) return "";
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

window.addEventListener("DOMContentLoaded", () => {
  LodeOnline.run();

  document.getElementById("output").innerHTML =
    escapeHtml(LodeOnline.lines.join("\n"));

  const map = {
    copyBtn: LodeOnline.copy,
    copyBtn2: LodeOnline.copy25,
    copyBtn3: LodeOnline.copy36,
    copyBtn4: LodeOnline.copy49,
    copyBtn5: LodeOnline.copy16,
    copyBtn6: LodeOnline.copy33
  };

  Object.keys(map).forEach(id => {
    document.getElementById(id).onclick = async () => {
      await navigator.clipboard.writeText(map[id] || "");
      alert("✅ Đã copy!");
    };
  });
});
