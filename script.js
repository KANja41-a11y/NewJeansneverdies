// NewJeans Never Dies Gallery - Ready for GitHub Pages

const members = [
  { name: "Minji", role: "Leader", img: "images/members/minji.jpg", caption: "Minji 💙" },
  { name: "Hanni", role: "Vocal", img: "images/members/hanni.jpg", caption: "Hanni 🐰" },
  { name: "Danielle", role: "Vocal", img: "images/members/danielle.jpg", caption: "Danielle ✨" },
  { name: "Haerin", role: "Visual", img: "images/members/haerin.jpg", caption: "Haerin 🐱" },
  { name: "Hyein", role: "Maknae", img: "images/members/hyein.jpg", caption: "Hyein 🌸" }
];

// My Bias - tanggal lahir member
const favorites = [
  { name: "Minji", role: "12 Maret 2004", img: "images/members/minji.jpg", caption: "Minji 💙" },
  { name: "Hanni", role: "6 Oktober 2004", img: "images/members/hanni.jpg", caption: "Hanni 🐰" },
  { name: "Danielle", role: "11 April 2005", img: "images/members/danielle.jpg", caption: "Danielle ✨" },
  { name: "Haerin", role: "15 Mei 2006", img: "images/members/haerin.jpg", caption: "Haerin 🐱" },
  { name: "Hyein", role: "21 April 2008", img: "images/members/hyein.jpg", caption: "Hyein 🌸" }
];

const groupPhotos = [
  { name: "Ditto Era", role: "School Concept", img: "images/group/ditto-era.jpg", caption: "Ditto Era" },
  { name: "NewJeans", role: "Group Photo", img: "images/group/group1.jpg", caption: "NewJeans Group" },
  { name: "OMG Era", role: "Emoji Bunny", img: "images/group/my-love.jpg", caption: "OMG Era • Emoji Bunny" },
  { name: "My Love", role: "Street Concept", img: "images/group/omg-era.jpg", caption: "My Love • Street Concept" }
];

const albums = [
  { name: "New Jeans", year: "2022", img: "images/albums/newjeans.jpg", caption: "1st EP • New Jeans" },
  { name: "OMG", year: "2023", img: "images/albums/omg.jpg", caption: "1st Single • OMG" },
  { name: "Ditto", year: "2022", img: "images/albums/ditto.jpg", caption: "Ditto (Digital Single)" },
  { name: "Get Up", year: "2023", img: "images/albums/getup.jpg", caption: "2nd EP • Get Up" },
  { name: "How Sweet", year: "2024", img: "images/albums/howsweet.jpg", caption: "How Sweet & Bubble Gum" },
  { name: "Supernatural", year: "2024", img: "images/albums/supernatural.jpg", caption: "Supernatural (Japan)" }
];

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const closeBtn = document.querySelector(".close");
const tabBtns = document.querySelectorAll(".tab-btn");
const sections = document.querySelectorAll(".gallery-section");

const bgMusic = document.getElementById("bgMusic");
const playBtn = document.getElementById("playBtn");
const volumeSlider = document.getElementById("volume");
let isPlaying = false;

function createCard(item, isAlbum = false, isBias = false) {
  const card = document.createElement("div");
  card.className = isAlbum ? "card album-card" : "card";
  
  const loveBtn = isBias ? `<button class="love-btn" title="Love">♡</button>` : "";
  
  card.innerHTML = `
    ${loveBtn}
    <img src="${item.img}" alt="${item.name}" loading="lazy" />
    <div class="card-info">
      <h3>${item.name}</h3>
      <p>${item.role || item.year || ""}</p>
    </div>
  `;
  
  // Love button toggle
  if (isBias) {
    const btn = card.querySelector(".love-btn");
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      btn.classList.toggle("loved");
      btn.textContent = btn.classList.contains("loved") ? "♥" : "♡";
    });
  }
  
  card.addEventListener("click", () => openLightbox(item.img, item.caption));
  return card;
}

function renderAll() {
  const membersEl = document.getElementById("members-gallery");
  const favoriteEl = document.getElementById("favorite-gallery");
  const groupEl = document.getElementById("group-gallery");
  const albumsEl = document.getElementById("albums-gallery");

  membersEl.innerHTML = "";
  favoriteEl.innerHTML = "";
  groupEl.innerHTML = "";
  albumsEl.innerHTML = "";

  members.forEach(m => membersEl.appendChild(createCard(m)));
  favorites.forEach(f => favoriteEl.appendChild(createCard(f, false, true)));
  groupPhotos.forEach(g => groupEl.appendChild(createCard(g)));
  albums.forEach(a => albumsEl.appendChild(createCard(a, true)));
}

tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    tabBtns.forEach(b => b.classList.remove("active"));
    sections.forEach(s => s.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

function openLightbox(src, caption) {
  lightboxImg.src = src;
  lightboxCaption.textContent = caption;
  lightbox.classList.add("active");
}

closeBtn.addEventListener("click", () => lightbox.classList.remove("active"));
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.classList.remove("active");
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") lightbox.classList.remove("active");
});

playBtn.addEventListener("click", () => {
  if (isPlaying) {
    bgMusic.pause();
    playBtn.textContent = "▶ Play Ditto";
    playBtn.classList.remove("playing");
  } else {
    bgMusic.play().catch(() => {
      alert("Musik belum bisa diputar.");
    });
    playBtn.textContent = "❚❚ Pause";
    playBtn.classList.add("playing");
  }
  isPlaying = !isPlaying;
});

volumeSlider.addEventListener("input", () => {
  bgMusic.volume = volumeSlider.value;
});
bgMusic.volume = 0.45;

const cursor = document.getElementById("custom-cursor");
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
  cursor.classList.add("visible");
});
document.addEventListener("mousedown", () => cursor.classList.add("click"));
document.addEventListener("mouseup", () => cursor.classList.remove("click"));
document.addEventListener("mouseleave", () => cursor.classList.remove("visible"));

renderAll();
