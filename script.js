const audio = document.getElementById('audio');
const progressBar = document.getElementById('progressBar');
const songTitle = document.getElementById('songTitle');

const albums = {
  album1: {
    title: "My fav",
    songs: [
      { name: "Tommy the cat", src: "Music/Primus - Tommy The Cat.mp3" },
      { name: "My name is Mud", src: "Music/Primus_-_My_Name_is_Mud_(SkySound.cc).mp3" },
      { name: "Mr._Krinkle", src: "Music/Primus_-_Mr._Krinkle_(SkySound.cc).mp3" },
      { name: "American life", src: "Music/Primus_-_American_Life_(SkySound.cc).mp3" },
      { name: "Jerry Was A Race Car Driver", src: "Music/Primus_-_Jerry_Was_A_Race_Car_Driver_(SkySound.cc).mp3" },
      { name: "Wynona's Big Brown Beaver", src: "Music/Primus_-_Wynona_s_Big_Brown_Beaver_(SkySound.cc).mp3" },
      { name: "Lacquer head", src: "Music/Primus_-_Lacquer_Head_(SkySound.cc).mp3" },
      { name: "John the fisherman", src: "Music/Primus_-_John_the_Fisherman_(SkySound.cc).mp3" }
    ]
  }
};

function openAlbum(albumKey) {
  const album = albums[albumKey];

  let html = ``;
  html += `<h3>${album.title}</h3>`;

  album.songs.forEach(song => {
    html += `
      <div onclick="playSong('${song.src}')">
        ${song.name}
      </div>
    `;
  });

  document.querySelector('.col-md-10').innerHTML = html;

  history.pushState({ page: 'album', album: albumKey }, '', `#${albumKey}`);
}

function goBack() {
  history.back();
}

window.onpopstate = function(event) {
  if (!event.state || event.state.page === 'home') {
    loadHome();
  } else if (event.state.page === 'album') {
    openAlbum(event.state.album);
  }
};

function loadHome() {
  const html = `
    <h3>Альбомы</h3>

      <div class="row g-3">
        <div class="col-6 col-md-3">
          <div class="music-card" onclick="openAlbum('album1')">
            <img src="img/Primus.jpg" class="img-fluid rounded">
            <p style="text-align: center;">Primus</p>
          </div>
        </div>
      </div>
  `;

  document.querySelector('.col-md-10').innerHTML = html;

  history.replaceState({ page: 'home' }, '', '#home');
}

window.onload = loadHome;

function playSong(src) {
    audio.src = src;
    audio.play();
    songTitle.textContent = src;
}

function seek(e) {
  const progress = e.currentTarget;
  const rect = progress.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const width = rect.width;

  const percent = clickX / width;
  audio.currentTime = percent * audio.duration;
}

function togglePlay() {
  if (audio.paused) {
      audio.play();
    } 
  else {
      audio.pause();
    }
}

audio.addEventListener('timeupdate', () => {
  if (!audio.duration) return;

  const percent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = percent + '%';
});