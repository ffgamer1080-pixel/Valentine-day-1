/* ROTATE FIX */
const overlay = document.getElementById("rotateOverlay");

function checkOrientation() {
  const landscape = window.matchMedia("(orientation: landscape)").matches;
  overlay.style.display = landscape ? "none" : "flex";
}
addEventListener("resize", checkOrientation);
addEventListener("orientationchange", checkOrientation);
setInterval(checkOrientation, 500);
checkOrientation();

/* BACKGROUND RAIN */
const canvas = document.getElementById("textRain");
const ctx = canvas.getContext("2d");
let fontSize = 16;
const chars = "HAPPY VALENTINE ";
const hearts = ["❤️","💖"];
let drops = [];

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  drops = Array.from({ length: Math.floor(canvas.width / fontSize) },
    () => Math.random() * canvas.height);
}
resize();
addEventListener("resize", resize);

function rain() {
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.font = fontSize+"px monospace";
  drops.forEach((y,i)=>{
    ctx.fillStyle="#ff4da6";
    ctx.fillText(
      Math.random()<0.1 ? hearts[Math.floor(Math.random()*2)]
      : chars[Math.floor(Math.random()*chars.length)],
      i*fontSize,y
    );
    drops[i]+=fontSize;
    if(y>canvas.height) drops[i]=0;
  });
  requestAnimationFrame(rain);
}
rain();

/* CLICK HEART */
document.addEventListener("click", e=>{
  const h=document.createElement("div");
  h.className="heart-float";
  h.innerText="❤️";
  h.style.left=e.clientX+"px";
  h.style.top=e.clientY+"px";
  document.body.appendChild(h);
  setTimeout(()=>h.remove(),3000);
});

/* TEXT LOOP */
const mainText=document.getElementById("mainText");
const heartGlow=document.getElementById("heartGlow");

const mainLines=[
 "💛 HAPPY VALENTINE DAY 💛",
 "💚 MY 💚",
 "🩵 SWEETHEART 🩵",
 "🌎 YOU ARE MY WORLD 🌎"
];
const shayariLines=[
 "Benam mohabbat dil mein daba rakhi hai",
 "Teri chahat sapno mein saja rakhi hai",
 "Duniya badle par tum na badalna",
 "Yeh ummeed bas tum se laga rakhi hai"
];

let phase="main", index=0;
function playSequence(){
  heartGlow.style.opacity="1";
  if(phase==="main"){
    mainText.innerText=mainLines[index++];
    if(index>=mainLines.length){index=0;phase="shayari";}
  }else{
    mainText.innerText=shayariLines[index++];
    if(index>=shayariLines.length){index=0;phase="main";}
  }
}
playSequence();
setInterval(playSequence,4000);

/* 🎵 MUSIC LOGIC (ADDED) */
const bgMusic=document.getElementById("bgMusic");
const musicToggle=document.getElementById("musicToggle");
let musicStarted=false;

function tryStartMusic(){
  const landscape=window.matchMedia("(orientation: landscape)").matches;
  if(landscape && !musicStarted){
    bgMusic.play().then(()=>{
      musicStarted=true;
      musicToggle.classList.remove("paused");
    }).catch(()=>{});
  }
}
addEventListener("orientationchange",tryStartMusic);
addEventListener("resize",tryStartMusic);
setInterval(tryStartMusic,1000);

musicToggle.addEventListener("click",()=>{
  if(bgMusic.paused){
    bgMusic.play();
    musicToggle.classList.remove("paused");
  }else{
    bgMusic.pause();
    musicToggle.classList.add("paused");
  }
});
