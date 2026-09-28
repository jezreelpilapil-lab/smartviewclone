// SmartView Web App JavaScript

let currentVideo = null;
let isPlaying = false;

// Sample content data
const featuredContent = [
    { title: 'Sample Stream 1', views: '1.2M views', duration: '2:15:30', emoji: '🎬' },
    { title: 'Sample Stream 2', views: '850K views', duration: '1:45:20', emoji: '📺' },
    { title: 'Sample Stream 3', views: '2.1M views', duration: '3:20:15', emoji: '🎵' },
    { title: 'Sample Stream 4', views: '950K views', duration: '1:30:45', emoji: '⚡' },
    { title: 'Sample Stream 5', views: '1.8M views', duration: '2:45:00', emoji: '🎮' },
    { title: 'Sample Stream 6', views: '720K views', duration: '1:15:30', emoji: '📰' },
];

const trendingContent = [
    { title: 'Trending 1', views: '3.5M views', duration: '2:30:00', emoji: '🔥' },
    { title: 'Trending 2', views: '2.8M views', duration: '1:55:15', emoji: '⭐' },
    { title: 'Trending 3', views: '4.2M views', duration: '3:10:45', emoji: '💎' },
    { title: 'Trending 4', views: '1.9M views', duration: '2:05:30', emoji: '🚀' },
    { title: 'Trending 5', views: '3.1M views', duration: '2:20:00', emoji: '✨' },
    { title: 'Trending 6', views: '2.5M views', duration: '1:40:20', emoji: '🌟' },
];

// Initialize the app
function init() {
    populateContent('contentGrid', featuredContent);
    populateContent('trendingGrid', trendingContent);
    setupEventListeners();
    
    // Check if service worker is supported
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker registered'))
            .catch(err => console.log('Service Worker registration failed'));
    }
}

// Populate content grids
function populateContent(gridId, content) {
    const grid = document.getElementById(gridId);
    grid.innerHTML = content.map(item => `
        <div class="content-card" onclick="playContent('${item.title}')">
            <div class="card-image">${item.emoji}</div>
            <div class="card-content">
                <div class="card-title">${item.title}</div>
                <div class="card-meta">
                    <span>👁️ ${item.views}</span>
                    <span>⏱️ ${item.duration}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    document.getElementById('urlInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            loadUrl();
        }
    });

    // Category chips
    document.querySelectorAll('.category-chip').forEach(chip => {
        chip.addEventListener('click', function() {
            document.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Handle search
function handleSearch() {
    const query = document.getElementById('searchInput').value.trim();
    
    if (query.startsWith('http://') || query.startsWith('https://')) {
        loadStreamUrl(query);
    } else {
        alert(`Searching for: ${query}\n\nIn a production app, this would search for content.`);
    }
}

// Show URL modal
function showUrlModal() {
    document.getElementById('urlModal').classList.add('show');
    document.getElementById('overlay').classList.add('show');
    document.getElementById('urlInput').focus();
}

// Close URL modal
function closeUrlModal() {
    document.getElementById('urlModal').classList.remove('show');
    document.getElementById('overlay').classList.remove('show');
}

// Load URL from modal
function loadUrl() {
    const url = document.getElementById('urlInput').value.trim();
    
    if (url) {
        if (url.startsWith('http://') || url.startsWith('https://')) {
            loadStreamUrl(url);
            closeUrlModal();
            document.getElementById('urlInput').value = '';
        } else {
            alert('Please enter a valid URL starting with http:// or https://');
        }
    }
}

// Load stream URL
function loadStreamUrl(url) {
    const videoContainer = document.getElementById('videoContainer');
    const videoPlayer = document.getElementById('videoPlayer');
    
    videoContainer.style.display = 'block';
    
    // Check if it's a video URL
    if (url.match(/\.(mp4|webm|ogg|m3u8)$/i)) {
        videoPlayer.innerHTML = `
            <video id="mainVideo" controls style="width: 100%; height: 100%;">
                <source src="${url}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
        currentVideo = document.getElementById('mainVideo');
    } else {
        // For other URLs, show in iframe
        videoPlayer.innerHTML = `
            <iframe src="${url}" style="width: 100%; height: 100%; border: none;" allowfullscreen></iframe>
        `;
    }
    
    // Scroll to video
    videoContainer.scrollIntoView({ behavior: 'smooth' });
}

// Play content
function playContent(title) {
    const videoContainer = document.getElementById('videoContainer');
    const videoPlayer = document.getElementById('videoPlayer');
    
    videoContainer.style.display = 'block';
    videoPlayer.innerHTML = `
        <div style="padding: 40px; text-align: center;">
            <h2 style="color: white; margin-bottom: 20px;">Now Playing: ${title}</h2>
            <p style="color: #aaa;">This is a demo. In a production app, actual video would play here.</p>
            <p style="color: #aaa; margin-top: 15px;">To test with real content, use the ➕ button to add a streaming URL.</p>
        </div>
    `;
    
    videoContainer.scrollIntoView({ behavior: 'smooth' });
}

// Play/Pause control
function playPause() {
    if (currentVideo) {
        if (isPlaying) {
            currentVideo.pause();
            isPlaying = false;
        } else {
            currentVideo.play();
            isPlaying = true;
        }
    } else {
        alert('No video loaded. Click ➕ to add a streaming URL.');
    }
}

// Toggle fullscreen
function toggleFullscreen() {
    const videoContainer = document.getElementById('videoContainer');
    
    if (!document.fullscreenElement) {
        videoContainer.requestFullscreen().catch(err => {
            alert(`Error attempting to enable fullscreen: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

// Toggle sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
}

// Close all modals and sidebars
function closeAll() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('overlay').classList.remove('show');
    closeUrlModal();
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
