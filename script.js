const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const progressContainer = document.getElementById('progress');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeControl = document.getElementById('volume');

const songs = [
    {
        title: 'Valam',
        artist: 'Sachin-Jigar,Arijit Singh,Priyanka Saraiya',
        src: 'audio/song1.mp3',
        cover: 'images/cover1.jpg'
    },
    {
        title: 'Ada',
        artist: 'Sonu Nigam',
        src: 'audio/song2.mp3',
        cover: 'images/cover2.jpg'
    },
    {
        title: 'Chiggy Wiggy',
        artist: 'Kylie Minogue,Sonu Nigam,Suzanne',
        src: 'audio/song3.mp3',
        cover: 'images/cover3.jpg'
    },
    {
        title: 'Ashiqui 2',
        artist: 'Mithoon,Ankit Tiwari,Jeet Gannguli',
        src:'audio/song4.mp3',
        cover: 'images/cover4.jpg'
    },
    {
        title: 'Sajni',
        artist: 'Ram Sampath,Arijit Singh,Prashant Pandey',
        src:'audio/song5.mp3',
        cover: 'images/cover5.jpg'
    },
    {
        title: 'Janiye',
        artist: 'Vishal Mishra,Rashmeet Kaur',
        src:'audio/song6.mp3',
        cover: 'images/cover6.jpg'
    }
];

let songIndex = 0;

function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    audio.src = song.src;
    cover.src = song.cover;
}

function playSong() {
    audio.play();
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
}

function pauseSong() {
    audio.pause();
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;
    if (songIndex >= songs.length) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    let minutes = Math.floor(currentTime / 60);
    let seconds = Math.floor(currentTime % 60);
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    currentTimeEl.innerText = `${minutes}:${seconds}`;

    let durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
        durationSeconds = '0' + durationSeconds;
    }
    if (durationMinutes && durationSeconds) {
        durationEl.innerText = `${durationMinutes}:${durationSeconds}`;
    }
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

playBtn.addEventListener('click', () => {
    const isPlaying = playBtn.querySelector('i.fas').classList.contains('fa-pause');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);
volumeControl.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

loadSong(songs[songIndex]);
