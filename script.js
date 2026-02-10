const mainText = document.getElementById("mainText");
const heartGlow = document.getElementById("heartGlow");

/* MAIN LINES */
const mainLines = [
  "💛 HAPPY VALENTINE DAY 💛",
  "💚 MY 💚",
  "🩵 SWEETHEART 🩵",
  "🌎 YOU ARE MY WORLD 🌎"
];

/* SHAYARI */
const shayariLines = [
  "Benam mohabbat dil mein daba rakhi hai",
  "Teri chahat sapno mein saja rakhi hai",
  "Duniya badle par tum na badalna",
  "Yeh ummeed bas tum se laga rakhi hai"
];

let index = 0;
let phase = "main"; // main → shayari

function playSequence() {
  heartGlow.style.opacity = "1";

  if (phase === "main") {
    mainText.innerText = mainLines[index];
    index++;

    if (index >= mainLines.length) {
      index = 0;
      phase = "shayari";
    }

  } else if (phase === "shayari") {
    mainText.innerText = shayariLines[index];
    index++;

    if (index >= shayariLines.length) {
      index = 0;
      phase = "main"; // 🔁 restart
    }
  }
}

/* START LOOP */
playSequence();
setInterval(playSequence, 4000); // ⏱️ 4 sec per line
