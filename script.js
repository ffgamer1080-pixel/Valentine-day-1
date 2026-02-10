/* ROTATE */
const overlay = document.getElementById("rotateOverlay");
function checkOrientation() {
  if (innerWidth > innerHeight) {
    overlay.style.display = "none";
  } else {
    overlay.style.display = "flex";
  }
}
addEventListener("resize", checkOrientation);
addEventListener("orientationchange", checkOrientation);
checkOrientation();

/* TEXT RAIN */
const canvas = document.getElementById("textRain");
const ctx = canvas.getContext("2d");
let fontSize = 16;
const chars = "HAPPY VALENTINE ";
const hearts = ["❤️","💖"];
let drops = [];

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  drops = Array.from({length: Math.floor(canvas.width/fontSize)},
    () => Math.random()*canvas.height);
}
resize();
addEventListener("resize", resize);

function rain() {
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.font = fontSize+"px monospace";

  drops.forEach((y,i)=>{
    const isHeart = Math.random()<0.1;
    ctx.fillStyle = "#ff4da6";
    ctx.fillText(
      isHeart ? hearts[Math.floor(Math.random()*2)] :
      chars[Math.floor(Math.random()*chars.length)],
      i*fontSize,y
    );
    drops[i]+=fontSize;
    if(y>canvas.height) drops[i]=0;
  });
  requestAnimationFrame(rain);
}
rain();

/* CLICK HEART BALLOON */
document.addEventListener("click", e=>{
  const h=document.createElement("div");
  h.className="heart-float";
  h.innerText="❤️";
  h.style.left=e.clientX+"px";
  h.style.top=e.clientY+"px";
  document.body.appendChild(h);
  setTimeout(()=>h.remove(),3000);
});

/* MAIN TEXT (PLAY ONCE) */
const mainText=document.getElementById("mainText");
const heartGlow=document.getElementById("heartGlow");

mainText.innerText="HAPPY VALENTINE 💖";

setTimeout(()=>{
  heartGlow.style.opacity="1";
},3000);

/* SHAYARI */
const shayari=[
 "Benam mohabbat dil mein daba rakhi hai",
 "Teri chahat sapno mein saja rakhi hai",
 "Duniya badle par tum na badalna",
 "Yeh ummeed bas tum se laga rakhi hai"
];

let i=0;
setTimeout(()=>{
  const interval=setInterval(()=>{
    if(i>=shayari.length){
      clearInterval(interval);
      return;
    }
    mainText.innerText=shayari[i];
    i++;
  },8000);
},6000);
