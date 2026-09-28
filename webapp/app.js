// SmartView - Movie & TV Streaming Browser
let currentVideo = null;
let isPlaying = false;
let currentTab = 'home';

// Sample content database (in real app, this would come from an API)
const contentDatabase = {
    home: {
        featured: [
            { id: 1, title: 'Action Movie 2024', genre: 'Action', year: '2024', emoji: '🎬', rating: '8.5' },
            { id: 2, title: 'Comedy Special', genre: 'Comedy', year: '2024', emoji: '😂', rating: '7.8' },
            { id: 3, title: 'Sci-Fi Adventure', genre: 'Sci-Fi', year: '2024', emoji: '🚀', rating: '9.1' },
            { id: 4, title: 'Romantic Drama', genre: 'Romance', year: '2024', emoji: '💕', rating: '7.5' },
            { id: 5, title: 'Horror Night', genre: 'Horror', year: '2024', emoji: '👻', rating: '7.9' },
            { id: 6, title: 'Mystery Thriller', genre: 'Thriller', year: '2024', emoji: '🔍', rating: '8.2' },
        ],
        trending: [
            { id: 7, title: 'Top Series S01', genre: 'Drama', year: '2024', emoji: '📺', rating: '9.3' },
            { id: 8, title: 'Fantasy Quest', genre: 'Fantasy', year: '2024', emoji: '⚔️', rating: '8.8' },
            { id: 9, title: 'Documentary Special', genre: 'Documentary', year: '2024', emoji: '🌍', rating: '8.6' },
            { id: 10, title: 'Animation Movie', genre: 'Animation', year: '2024', emoji: '🎨', rating: '8.9' },
            { id: 11, title: 'Crime Series', genre: 'Crime', year: '2024', emoji: '🕵️', rating: '8.7' },
            { id: 12, title: 'Music Concert', genre: 'Music', year: '2024', emoji: '🎵', rating: '9.0' },
        ]
    },
    movies: [
        { id: 13, title: 'Blockbuster 2024', genre: 'Action', year: '2024', emoji: '💥', rating: '8.4' },
        { id: 14, title: 'Indie Film', genre: 'Drama', year: '2024', emoji: '🎭', rating: '7.6' },
        { id: 15, title: 'Family Movie', genre: 'Family', year: '2024', emoji: '👨‍👩‍👧‍👦', rating: '7.9' },
        { id: 16, title: 'Western Classic', genre: 'Western', year: '2024', emoji: '🤠', rating: '8.1' },
        { id: 17, title: 'War Epic', genre: 'War', year: '2024', emoji: '⚔️', rating: '8.5' },
        { id: 18, title: 'Heist Movie', genre: 'Crime', year: '2024', emoji: '💰', rating: '8.3' },
    ],
    shows: [
        { id: 19, title: 'Drama Series S03', genre: 'Drama', year: '2024', emoji: '📺', rating: '9.2' },
        { id: 20, title: 'Comedy Show S05', genre: 'Comedy', year: '2024', emoji: '🎤', rating: '8.7' },
        { id: 21, title: 'Mystery Series S02', genre: 'Mystery', year: '2024', emoji: '🔎', rating: '8.9' },
        { id: 22, title: 'Reality Show', genre: 'Reality', year: '2024', emoji: '📹', rating: '7.4' },
        { id: 23, title: 'Cooking Series', genre: 'Food', year: '2024', emoji: '🍳', rating: '8.1' },
        { id: 24, title: 'Travel Show', genre: 'Travel', year: '2024', emoji: '✈️', rating: '8.5' },
    ],
    anime: [
        { id: 25, title: 'Action Anime S01', genre: 'Action', year: '2024', emoji: '⚡', rating: '9.4' },
        { id: 26, title: 'Slice of Life', genre: 'Slice of Life', year: '2024', emoji: '🌸', rating: '8.6' },
        { id: 27, title: 'Mecha Series', genre: 'Mecha', year: '2024', emoji: '🤖', rating: '8.8' },
        { id: 28, title: 'Romance Anime', genre: 'Romance', year: '2024', emoji: '💖', rating: '8.3' },
        { id: 29, title: 'Fantasy Adventure', genre: 'Fantasy', year: '2024', emoji: '🐉', rating: '9.1' },
        { id: 30, title: 'Sports Anime', genre: 'Sports', year: '2024', emoji: '⚽', rating: '8.7' },
    ]
};

// Initialize app
function init() {
    loadContent('home');
    setupEventListeners();
    registerServiceWorker();
}

// Setup event listeners
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
}

// Load content for a tab
function loadContent(tab) {
    currentTab = tab;
    const mainContent = document.getElementById('mainContent');
    
    if (tab === 'home') {
        mainContent.innerHTML = `
            <div class="content-section">
                <div class="section-header">
                    <h2 class="section-title">Featured</h2>
                    <a href="#" class="see-all" onclick="event.preventDefault(); switchTab('movies')">See All</a>
                </div>
                <div class="content-grid">
                    ${contentDatabase.home.featured.map(item => createContentCard(item)).join('')}
                </div>
            </div>
            
            <div class="content-section">
                <div class="section-header">
                    <h2 class="section-title">Trending Now</h2>
                    <a href="#" class="see-all" onclick="event.preventDefault(); switchTab('trending')">See All</a>
                </div>
                <div class="content-grid">
                    ${contentDatabase.home.trending.map(item => createContentCard(item)).join('')}
                </div>
            </div>
        `;
    } else {
        const content = contentDatabase[tab] || [];
        mainContent.innerHTML = `
            <div class="content-section">
                <div class="section-header">
                    <h2 class="section-title">${capitalize(tab)}</h2>
                </div>
                <div class="content-grid">
                    ${content.map(item => createContentCard(item)).join('')}
                </div>
            </div>
        `;
    }
}

// Create content card HTML
function createContentCard(item) {
    return `
        <div class="content-card" onclick="playContent(${item.id})">
            <div class="card-poster">
                <span>${item.emoji}</span>
                <div class="play-overlay">
                    <span class="play-icon">▶</span>
                </div>
            </div>
            <div class="card-title">${item.title}</div>
            <div class="card-meta">⭐ ${item.rating} · ${item.year}</div>
        </div>
    `;
}

// Switch tab
function switchTab(tab, tabElement) {
    // Update tab active state
    if (tabElement) {
        document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
        tabElement.classList.add('active');
    }
    
    // Hide video player when switching tabs
    document.getElementById('videoContainer').classList.remove('show');
    
    // Load content
    loadContent(tab);
}

// Play content
function playContent(id) {
    // Find content by ID
    let content = null;
    for (let category in contentDatabase) {
        if (Array.isArray(contentDatabase[category])) {
            content = contentDatabase[category].find(item => item.id === id);
            if (content) break;
        } else {
            for (let subcat in contentDatabase[category]) {
                content = contentDatabase[category][subcat].find(item => item.id === id);
                if (content) break;
            }
            if (content) break;
        }
    }
    
    if (!content) return;
    
    const videoContainer = document.getElementById('videoContainer');
    const videoPlayer = document.getElementById('videoPlayer');
    
    // Show demo player
    videoPlayer.innerHTML = `
        <div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #000; padding: 40px; text-align: center;">
            <div style="font-size: 64px; margin-bottom: 20px;">${content.emoji}</div>
            <h2 style="color: white; margin-bottom: 12px; font-size: 28px;">${content.title}</h2>
            <p style="color: #b3b3b3; margin-bottom: 8px; font-size: 16px;">${content.genre} · ${content.year} · ⭐ ${content.rating}</p>
            <p style="color: #999; font-size: 14px; max-width: 600px; line-height: 1.5; margin-top: 20px;">
                This is a demo player. In the actual SmartView app, the full movie/show would play here.
            </p>
            <p style="color: #666; font-size: 13px; margin-top: 16px;">
                To load real content, enter a video URL in the search bar above.
            </p>
        </div>
    `;
    
    videoContainer.classList.add('show');
    videoContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Handle search
function handleSearch() {
    const query = document.getElementById('searchInput').value.trim();
    
    if (!query) return;
    
    // Check if it's a URL
    if (query.startsWith('http://') || query.startsWith('https://')) {
        loadStreamUrl(query);
    } else {
        // Search functionality
        alert(`Searching for: "${query}"\n\nIn the full app, this would search the content database.`);
    }
}

// Load stream URL
function loadStreamUrl(url) {
    const videoContainer = document.getElementById('videoContainer');
    const videoPlayer = document.getElementById('videoPlayer');
    
    // Check if it's a direct video URL
    if (url.match(/\.(mp4|webm|ogg|m3u8)$/i)) {
        videoPlayer.innerHTML = `
            <video id="mainVideo" controls autoplay style="width: 100%; height: 100%;">
                <source src="${url}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
        currentVideo = document.getElementById('mainVideo');
        
        // Setup video event listeners
        currentVideo.addEventListener('play', () => {
            isPlaying = true;
            document.getElementById('playPauseBtn').textContent = '⏸️';
        });
        
        currentVideo.addEventListener('pause', () => {
            isPlaying = false;
            document.getElementById('playPauseBtn').textContent = '▶️';
        });
        
        currentVideo.addEventListener('timeupdate', updateProgress);
    } else {
        // Load in iframe
        videoPlayer.innerHTML = `<iframe src="${url}" allowfullscreen style="width: 100%; height: 100%; border: none;"></iframe>`;
    }
    
    videoContainer.classList.add('show');
    videoContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Video controls
function playPause() {
    if (currentVideo) {
        if (isPlaying) {
            currentVideo.pause();
        } else {
            currentVideo.play();
        }
    }
}

function toggleMute() {
    if (currentVideo) {
        currentVideo.muted = !currentVideo.muted;
    }
}

function toggleFullscreen() {
    const videoContainer = document.getElementById('videoContainer');
    
    if (!document.fullscreenElement) {
        videoContainer.requestFullscreen().catch(err => {
            console.error('Fullscreen error:', err);
        });
    } else {
        document.exitFullscreen();
    }
}

function seek(event) {
    if (!currentVideo) return;
    
    const progressBar = event.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const percent = (event.clientX - rect.left) / rect.width;
    currentVideo.currentTime = percent * currentVideo.duration;
}

function updateProgress() {
    if (!currentVideo) return;
    
    const percent = (currentVideo.currentTime / currentVideo.duration) * 100;
    document.getElementById('progressFill').style.width = percent + '%';
    
    const current = formatTime(currentVideo.currentTime);
    const duration = formatTime(currentVideo.duration);
    document.getElementById('timeDisplay').textContent = `${current} / ${duration}`;
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
}

function closeAll() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('overlay').classList.remove('show');
}

// Menu actions
function showBookmarks() {
    alert('Bookmarks\n\nYour saved content would appear here in the full app.');
}

function showHistory() {
    alert('History\n\nYour recently watched content would appear here.');
}

function showDownloads() {
    alert('Downloads\n\nDownloaded content for offline viewing would appear here.');
}

function showSettings() {
    alert('Settings\n\n• Privacy mode\n• Ad blocking\n• Video quality\n• Subtitles\n• Playback settings');
}

function showAbout() {
    alert('SmartView v3.0.0\n\nFast Browsing & Privacy Protection\n• Optimized page loading\n• Incognito mode\n• Ad blocking\n• Bookmarks & History\n\nWeb version recreated from APK');
}

// Utility
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Service Worker
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker registered'))
            .catch(err => console.log('SW registration failed:', err));
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', init);
