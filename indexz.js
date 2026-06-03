import { LodeOnline } from "./lodeOnline.js";

document.addEventListener("DOMContentLoaded", async () => {
  console.log("START: indexz.js running");

  try {
    console.log("Calling LodeOnline.run()...");
    await LodeOnline.run();

    console.log("Done. Lines: " + LodeOnline.lines.length);
    console.log("First 3 lines: " + JSON.stringify(LodeOnline.lines.slice(0, 3)));

    document.getElementById("output").textContent = LodeOnline.lines.join("\n");
    console.log("DONE: output set");
  } catch (e) {
    console.error("ERROR:", e);
    document.getElementById("output").textContent = "Error: " + e.message;
  }
});
