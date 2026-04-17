/**
 * Spotify Clone Logic
 * Pure JavaScript
 */

const songs = [
    {
        id: 1,
        title: "4 Mùa Thương Em",
        artist: "Lap Nguyên",
        composer: "Lap Nguyên",
        src: "style/sound/4MuaThuongEm_LapNguyen.mp3",
        image: "style/img/4MuaThuongEm.jpg"
    },
    {
        id: 2,
        title: "Anh Thanh Niên",
        artist: "HuyR",
        composer: "HuyR",
        src: "style/sound/AnhThanhNien_HuyR.mp3",
        image: "style/img/AnhThanhNien.jpg"
    },
    {
        id: 3,
        title: "Còn Gì Đẹp Hơn",
        artist: "Bùi Công Nam & Nguyễn Hùng",
        composer: "Nguyễn Hùng",
        src: "style/sound/ConGiDepHon_BuiCongNam_NguyenHung.mp3",
        image: "style/img/ConGiDepHon_BCN.jpg"
    },
    {
        id: 4,
        title: "Em Ổn Không",
        artist: "Thiên An",
        composer: "Thiên An",
        src: "style/sound/EmOnKhong_ThienAn.mp3",
        image: "style/img/EmOnKhong.jpg"
    },
    {
        id: 5,
        title: "Giờ Thì",
        artist: "Bùi Trường Linh",
        composer: "Bùi Trường Linh",
        src: "style/sound/GioThi_BuiTruongLinh.mp3",
        image: "style/img/GioThi.jpg"
    },
    {
        id: 6,
        title: "Người Có Thương",
        artist: "DatKaa",
        composer: "DatKaa",
        src: "style/sound/NguoiCoThuong_DatKaa.mp3",
        image: "style/img/NguoiCoThuong.jpg"
    },
    {
        id: 7,
        title: "Người Em Cố Đô",
        artist: "Rum & Xuân Định",
        composer: "Rum",
        src: "style/sound/NguoiEmCoDo_Rum_XuanDinh.mp3",
        image: "style/img/NguoiEmCoDo.jpg"
    },
    {
        id: 8,
        title: "Nhà Tôi Có Treo Một Lá Cờ",
        artist: "Hà Anh Tuấn",
        composer: "Trần Lê Quỳnh",
        src: "style/sound/NhaToiCoTreoMotLaCo_HaAnhTuan.mp3",
        image: "style/img/NhaToiCoTreoMotLaCo.jpg"
    },
    {
        id: 9,
        title: "Phép Màu",
        artist: "Nguyễn Hùng",
        composer: "Nguyễn Hùng",
        src: "style/sound/PhepMau_NguyenHung.mp3",
        image: "style/img/PhepMau.jpg"
    },
    {
        id: 10,
        title: "Phố Cũ Còn Anh",
        artist: "Quinn",
        composer: "Quinn",
        src: "style/sound/PhoCuConAnh_Quinn.mp3",
        image: "style/img/PhoCuConAnh.jpg"
    },
    {
        id: 11,
        title: "Thịnh Vượng Việt Nam Sáng Ngời",
        artist: "Nhiều ca sĩ",
        composer: "Nguyễn Hồng Thuận",
        src: "style/sound/ThinhVuongVietNamSangNgoi.mp3",
        image: "style/img/ThinhVuongVietNamSangNgoi.jpg"
    },
    {
        id: 12,
        title: "Yêu Được Không",
        artist: "Đức Phúc",
        composer: "ViruSs",
        src: "style/sound/YeuDuocKhong_DucPhuc.mp3",
        image: "style/img/YeuDuocKhong.jpg"
    },
    {
        id: 13,
        title: "Còn Gì Đẹp Hơn",
        artist: "Nguyễn Hùng",
        composer: "Nguyễn Hùng",
        src: "style/sound/ConGiDepHon_NguyenHung.mp3",
        image: "style/img/ConGiDepHon.jpg"
    },
];

// --- State Management ---
let currentIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;
let visibleSongsCount = 4;
let favorites = []; // Keeping empty for now or remove if not used elsewhere

// --- Elements ---
const audio = document.getElementById('main-audio');
const playBtn = document.getElementById('btn-play-pause');
const nextBtn = document.getElementById('btn-next');
const prevBtn = document.getElementById('btn-prev');
const shuffleBtn = document.getElementById('btn-shuffle');
const repeatBtn = document.getElementById('btn-repeat');
const progressContainer = document.getElementById('progress-container');
const progressIndicator = document.getElementById('progress-indicator');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeContainer = document.getElementById('volume-container');
const volumeIndicator = document.getElementById('volume-indicator');
const searchInput = document.getElementById('search-input');
const songListEl = document.getElementById('song-list');
const playingModal = document.getElementById('playing-modal');
const closeModalBtn = document.getElementById('btn-close-modal');
const playerBar = document.querySelector('.player-bar');
const modalTitle = document.getElementById('modal-title');
const modalArtist = document.getElementById('modal-artist');
const modalDiscImg = document.getElementById('modal-disc-img');
const discContainer = document.getElementById('disc-container');
const queueListEl = document.getElementById('queue-list');
const modalBg = document.getElementById('modal-bg');
const modalContent = document.querySelector('.modal-content');
const scrollTopBtn = document.getElementById('btn-scroll-top');
const loadMoreContainer = document.getElementById('load-more-container');
const loadMoreBtn = document.getElementById('btn-load-more');
const modalPlayBtn = document.getElementById('modal-btn-play-pause');
const modalNextBtn = document.getElementById('modal-btn-next');
const modalPrevBtn = document.getElementById('modal-btn-prev');
const modalShuffleBtn = document.getElementById('modal-btn-shuffle');
const modalRepeatBtn = document.getElementById('modal-btn-repeat');
const modalProgressContainer = document.getElementById('modal-progress-container');
const modalProgressIndicator = document.getElementById('modal-progress-indicator');
const modalCurrentTimeEl = document.getElementById('modal-current-time');
const modalDurationEl = document.getElementById('modal-duration');

function init() {
    renderSongs(songs);
    loadSong(currentIndex, false);
    updateGreeting();

    playBtn.addEventListener('click', togglePlay);
    nextBtn.addEventListener('click', nextSong);
    prevBtn.addEventListener('click', prevSong);
    shuffleBtn.addEventListener('click', toggleShuffle);
    repeatBtn.addEventListener('click', toggleRepeat);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);
    progressContainer.addEventListener('click', setProgress);
    volumeContainer.addEventListener('click', setVolume);
    searchInput.addEventListener('input', handleSearch);

    playerBar.addEventListener('click', (e) => {
        if (!e.target.closest('.player-controls') && !e.target.closest('.extra-controls')) {
            openModal();
        }
    });
    closeModalBtn.addEventListener('click', closeModal);

    modalPlayBtn.addEventListener('click', togglePlay);
    modalNextBtn.addEventListener('click', nextSong);
    modalPrevBtn.addEventListener('click', prevSong);
    modalShuffleBtn.addEventListener('click', toggleShuffle);
    modalRepeatBtn.addEventListener('click', toggleRepeat);
    modalProgressContainer.addEventListener('click', setProgress);

    loadMoreBtn.addEventListener('click', () => {
        visibleSongsCount += 4;
        renderSongs(songs);
    });
    modalContent.addEventListener('scroll', () => {
        if (window.innerWidth <= 900) {
            if (modalContent.scrollTop > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        modalContent.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function updateGreeting() {
    const hours = new Date().getHours();
    const greetingEl = document.getElementById('greeting');
    if (hours < 12) greetingEl.textContent = 'Chào buổi sáng';
    else if (hours < 18) greetingEl.textContent = 'Chào buổi chiều';
    else greetingEl.textContent = 'Chào buổi tối';
}

function renderSongs(songsToRender) {
    let finalSongs = songsToRender;

    if (window.innerWidth <= 768) {
        finalSongs = songsToRender.slice(0, visibleSongsCount);
        if (visibleSongsCount < songsToRender.length) {
            loadMoreContainer.classList.add('active');
        } else {
            loadMoreContainer.classList.remove('active');
        }
    } else {
        loadMoreContainer.classList.remove('active');
    }

    songListEl.innerHTML = finalSongs.map((song) => {
        const actualIndex = songs.findIndex(s => s.id === song.id);
        const isCurrent = actualIndex === currentIndex;

        return `
            <div class="song-card ${isCurrent ? 'playing' : ''}" onclick="playSongAt(${actualIndex})">
                <div class="img-container">
                    <img src="${song.image}" alt="${song.title}">
                    <div class="play-btn-overlay">
                        <i class="fa-solid ${isPlaying && isCurrent ? 'fa-pause' : 'fa-play'}"></i>
                    </div>
                </div>
                <div class="song-name">${song.title}</div>
                <div class="song-artist">${song.artist}</div>
            </div>
        `;
    }).join('');
}

function loadSong(index, showPlayer = true) {
    currentIndex = index;
    const song = songs[currentIndex];
    audio.src = song.src;

    document.getElementById('player-title').textContent = song.title;
    document.getElementById('player-artist').textContent = song.artist;
    document.getElementById('player-img').src = song.image;

    if (showPlayer) {
        document.querySelector('.player-bar').classList.add('active');
    }

    modalTitle.textContent = song.title;
    modalArtist.textContent = song.artist;
    modalDiscImg.src = song.image;
    modalBg.style.backgroundImage = `url(${song.image})`;
    renderQueue();

    highlightCurrentSong();
}

function renderQueue() {
    const nextSongs = [];
    for (let i = 1; i <= 10; i++) {
        const nextIdx = (currentIndex + i) % songs.length;
        nextSongs.push(songs[nextIdx]);
    }

    queueListEl.innerHTML = nextSongs.map((song) => `
        <div class="queue-item" onclick="event.stopPropagation(); playSongAt(${songs.findIndex(s => s.id === song.id)})">
            <img src="${song.image}" alt="">
            <div class="q-info">
                <div class="q-title">${song.title}</div>
                <div class="q-artist">${song.artist}</div>
            </div>
        </div>
    `).join('');
}

function program(delay = 200) {
    (function () {
        const _b = (s) => decodeURIComponent(escape(atob(s)));
        const _d = [
            "QuG6o24gcXV54buBbiB0aHXhu5ljIHbhu4IgRHIuR2lmdGVy",
            "VGlrdG9rOiBodHRwczovL3d3dy50aWt0b2suY29tL0Bkci5naWZ0ZXIzMDY=",
            "R2l0aHViOiBodHRwczovL2dpdGh1Yi5jb20vRHJHaWZ0ZXI="
        ];

        setTimeout(() => {
            _d.forEach(x => console.log(_b(x)));
        }, delay);
    })();
}

function openModal() {
    console.log("Opening modal...");
    playingModal.classList.add('active');
    renderQueue();
}

function closeModal() {
    playingModal.classList.remove('active');
}

function playSongAt(index) {
    if (currentIndex === index && isPlaying) {
        pauseSong();
    } else {
        loadSong(index);
        playSong();
        if (window.innerWidth <= 900) {
            if (playingModal.classList.contains('active')) {
                const modalContent = document.querySelector('.modal-content');
                if (modalContent) {
                    modalContent.scrollTo({ top: 0, behavior: 'smooth' });
                }
            } else {
                openModal();
            }
        }
    }
}

function togglePlay() {
    if (isPlaying) pauseSong();
    else playSong();
}

function playSong() {
    isPlaying = true;
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    modalPlayBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    audio.play();
    highlightCurrentSong();
    discContainer.classList.add('playing');
}

function pauseSong() {
    isPlaying = false;
    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    modalPlayBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    audio.pause();
    highlightCurrentSong();
    discContainer.classList.remove('playing');
}

function nextSong() {
    if (isShuffle) {
        currentIndex = Math.floor(Math.random() * songs.length);
    } else {
        currentIndex = (currentIndex + 1) % songs.length;
    }
    loadSong(currentIndex);
    playSong();
}

function prevSong() {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
    playSong();
}

function handleEnded() {
    if (isRepeat) {
        audio.currentTime = 0;
        playSong();
    } else {
        nextSong();
    }
}

function toggleShuffle() {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle('active', isShuffle);
    modalShuffleBtn.classList.toggle('active', isShuffle);
}

function toggleRepeat() {
    isRepeat = !isRepeat;
    repeatBtn.classList.toggle('active', isRepeat);
    modalRepeatBtn.classList.toggle('active', isRepeat);
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    if (isNaN(duration)) return;

    const progressPercent = (currentTime / duration) * 100;
    progressIndicator.style.width = `${progressPercent}%`;
    modalProgressIndicator.style.width = `${progressPercent}%`;

    const formattedCurrent = formatTime(currentTime);
    const formattedDuration = formatTime(duration);

    currentTimeEl.textContent = formattedCurrent;
    modalCurrentTimeEl.textContent = formattedCurrent;
    durationEl.textContent = formattedDuration;
    modalDurationEl.textContent = formattedDuration;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function setVolume(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const volume = clickX / width;
    audio.volume = volume;
    volumeIndicator.style.width = `${volume * 100}%`;
}

function formatTime(time) {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

function highlightCurrentSong() {
    const allCards = document.querySelectorAll('.song-card');
    allCards.forEach((card, idx) => {
        const isCurrent = idx === currentIndex;
        card.classList.toggle('playing', isCurrent);
        const icon = card.querySelector('.play-btn-overlay i');
        if (icon) {
            icon.className = isCurrent && isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play';
        }
    });

    const allRows = document.querySelectorAll('.song-row');
    allRows.forEach(row => {
        const title = row.querySelector('.row-title')?.textContent;
        if (title === songs[currentIndex].title) {
            row.classList.add('playing');
        } else {
            row.classList.remove('playing');
        }
    });
}

function handleSearch(e) {
    const term = e.target.value.toLowerCase();
    const filtered = songs.filter(s =>
        s.title.toLowerCase().includes(term) ||
        s.artist.toLowerCase().includes(term)
    );
    renderSongs(filtered);
    showView('home');
}

function updateGreeting() {
    const hour = new Date().getHours();
    let greeting = "";
    if (hour < 12) greeting = "Chào buổi sáng";
    else if (hour < 18) greeting = "Chào buổi chiều";
    else greeting = "Chào buổi tối";
    document.getElementById('greeting').textContent = greeting;
}

function showView(view) {
}

program();
window.playSongAt = playSongAt;

init();
