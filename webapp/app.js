// SmartView - Movie & TV Streaming Browser v1.1
let currentVideo = null;
let isPlaying = false;
let currentTab = 'home';

console.log('SmartView Web App v1.1 loaded');
console.log('Content database loaded:', Object.keys(contentDatabase || {}).length > 0 ? 'YES' : 'NO');

// Sample content database (in real app, this would come from an API)
const contentDatabase = {
    home: {
        featured: [
            { id: 1, title: 'The Last Guardian', genre: 'Action', year: '2024', emoji: '⚔️', rating: '8.5' },
            { id: 2, title: 'Laugh Out Loud', genre: 'Comedy', year: '2024', emoji: '😂', rating: '7.8' },
            { id: 3, title: 'Space Odyssey 2099', genre: 'Sci-Fi', year: '2024', emoji: '🚀', rating: '9.1' },
            { id: 4, title: 'Forever Love', genre: 'Romance', year: '2024', emoji: '💕', rating: '7.5' },
            { id: 5, title: 'Midnight Terror', genre: 'Horror', year: '2024', emoji: '👻', rating: '7.9' },
            { id: 6, title: 'The Hidden Truth', genre: 'Thriller', year: '2024', emoji: '🔍', rating: '8.2' },
        ],
        trending: [
            { id: 7, title: 'Breaking Chains S01', genre: 'Drama', year: '2024', emoji: '📺', rating: '9.3' },
            { id: 8, title: 'Kingdom of Dragons', genre: 'Fantasy', year: '2024', emoji: '🐉', rating: '8.8' },
            { id: 9, title: 'Planet Earth 2024', genre: 'Documentary', year: '2024', emoji: '🌍', rating: '8.6' },
            { id: 10, title: 'Magical Journey', genre: 'Animation', year: '2024', emoji: '🎨', rating: '8.9' },
            { id: 11, title: 'Dark City Crimes', genre: 'Crime', year: '2024', emoji: '🕵️', rating: '8.7' },
            { id: 12, title: 'Live at Madison', genre: 'Music', year: '2024', emoji: '🎵', rating: '9.0' },
        ]
    },
    movies: [
        { id: 13, title: 'Explosive Revenge', genre: 'Action', year: '2024', emoji: '💥', rating: '8.4' },
        { id: 14, title: 'The Silent Garden', genre: 'Drama', year: '2024', emoji: '🎭', rating: '7.6' },
        { id: 15, title: 'Adventures Together', genre: 'Family', year: '2024', emoji: '👨‍👩‍👧‍👦', rating: '7.9' },
        { id: 16, title: 'Wild West Justice', genre: 'Western', year: '2023', emoji: '🤠', rating: '8.1' },
        { id: 17, title: 'Battle of Nations', genre: 'War', year: '2024', emoji: '⚔️', rating: '8.5' },
        { id: 18, title: 'The Perfect Heist', genre: 'Crime', year: '2024', emoji: '💰', rating: '8.3' },
        { id: 31, title: 'Speed Racer', genre: 'Action', year: '2024', emoji: '🏎️', rating: '7.8' },
        { id: 32, title: 'Mystery Island', genre: 'Mystery', year: '2023', emoji: '🏝️', rating: '8.0' },
        { id: 33, title: 'Cyber Attack', genre: 'Thriller', year: '2024', emoji: '💻', rating: '8.2' },
        { id: 34, title: 'Love in Paris', genre: 'Romance', year: '2024', emoji: '🗼', rating: '7.7' },
        { id: 35, title: 'Ghost Hunter', genre: 'Horror', year: '2024', emoji: '👽', rating: '7.4' },
        { id: 36, title: 'Stand Up Special', genre: 'Comedy', year: '2024', emoji: '🎤', rating: '8.6' },
    ],
    shows: [
        { id: 19, title: 'Family Matters S03', genre: 'Drama', year: '2024', emoji: '📺', rating: '9.2' },
        { id: 20, title: 'The Funny Hour S05', genre: 'Comedy', year: '2024', emoji: '😄', rating: '8.7' },
        { id: 21, title: 'Detective Files S02', genre: 'Mystery', year: '2024', emoji: '🔎', rating: '8.9' },
        { id: 22, title: 'Survival Challenge', genre: 'Reality', year: '2024', emoji: '📹', rating: '7.4' },
        { id: 23, title: 'Master Chef', genre: 'Food', year: '2024', emoji: '🍳', rating: '8.1' },
        { id: 24, title: 'World Explorer', genre: 'Travel', year: '2024', emoji: '✈️', rating: '8.5' },
        { id: 37, title: 'Medical Drama S04', genre: 'Drama', year: '2024', emoji: '⚕️', rating: '8.8' },
        { id: 38, title: 'Tech Startup Story', genre: 'Drama', year: '2024', emoji: '💼', rating: '8.3' },
        { id: 39, title: 'Nature Watch', genre: 'Documentary', year: '2024', emoji: '🦁', rating: '9.0' },
        { id: 40, title: 'Fashion Week', genre: 'Reality', year: '2024', emoji: '👗', rating: '7.6' },
    ],
    anime: [
        { id: 25, title: 'Demon Slayer Chronicles', genre: 'Action', year: '2024', emoji: '⚡', rating: '9.4' },
        { id: 26, title: 'School Days', genre: 'Slice of Life', year: '2024', emoji: '🌸', rating: '8.6' },
        { id: 27, title: 'Mecha Warriors', genre: 'Mecha', year: '2024', emoji: '🤖', rating: '8.8' },
        { id: 28, title: 'First Love Story', genre: 'Romance', year: '2024', emoji: '💖', rating: '8.3' },
        { id: 29, title: 'Dragon Quest Legends', genre: 'Fantasy', year: '2024', emoji: '🐉', rating: '9.1' },
        { id: 30, title: 'Victory Volleyball', genre: 'Sports', year: '2024', emoji: '⚽', rating: '8.7' },
        { id: 41, title: 'Ninja Academy', genre: 'Action', year: '2024', emoji: '🥷', rating: '8.9' },
        { id: 42, title: 'Magic School', genre: 'Fantasy', year: '2024', emoji: '✨', rating: '8.5' },
        { id: 43, title: 'Racing Thunder', genre: 'Sports', year: '2024', emoji: '🏁', rating: '8.4' },
        { id: 44, title: 'Time Travelers', genre: 'Sci-Fi', year: '2023', emoji: '⏰', rating: '9.0' },
    ],
    trending: [
        { id: 45, title: 'Viral Hit 2024', genre: 'Action', year: '2024', emoji: '🔥', rating: '9.5' },
        { id: 46, title: 'Most Watched Series', genre: 'Drama', year: '2024', emoji: '📊', rating: '9.2' },
        { id: 47, title: 'Blockbuster Movie', genre: 'Action', year: '2024', emoji: '🎬', rating: '8.9' },
        { id: 48, title: 'Award Winner', genre: 'Drama', year: '2024', emoji: '🏆', rating: '9.4' },
        { id: 49, title: 'Fan Favorite', genre: 'Fantasy', year: '2024', emoji: '⭐', rating: '9.1' },
        { id: 50, title: 'Critics Choice', genre: 'Thriller', year: '2024', emoji: '🎯', rating: '8.8' },
    ]
};

// Initialize app
function init() {
    loadContent('home');
    setupEventListeners();
    registerServiceWorker();
    showQuickStartTip();
}

// Show quick start tip
function showQuickStartTip() {
    const mainContent = document.getElementById('mainContent');
    const tip = document.createElement('div');
    tip.style.cssText = 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 16px; margin: 16px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);';
    tip.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 32px;">💡</span>
            <div style="flex: 1;">
                <strong style="font-size: 16px; display: block; margin-bottom: 4px;">How to Watch Videos</strong>
                <p style="font-size: 13px; margin: 0; opacity: 0.95;">
                    Paste a video URL in the search bar above and press Enter
                </p>
                <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                        style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 6px 12px; border-radius: 5px; cursor: pointer; margin-top: 8px; font-size: 12px;">
                    Got it!
                </button>
                <button onclick="showExampleVideos()" 
                        style="background: rgba(255,255,255,0.3); border: none; color: white; padding: 6px 12px; border-radius: 5px; cursor: pointer; margin-top: 8px; margin-left: 8px; font-size: 12px;">
                    Show Example Videos
                </button>
            </div>
        </div>
    `;
    mainContent.insertBefore(tip, mainContent.firstChild);
}

// Show example videos
function showExampleVideos() {
    const exampleVideos = [
        {
            title: 'Big Buck Bunny',
            url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            desc: 'Animated short film (MP4)'
        },
        {
            title: 'Elephants Dream',
            url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            desc: 'Open source movie (MP4)'
        },
        {
            title: 'Sintel',
            url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
            desc: 'Blender Foundation (MP4)'
        },
        {
            title: 'For Bigger Blazes',
            url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            desc: 'Sample video (MP4)'
        },
        {
            title: 'Tears of Steel',
            url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
            desc: 'Sci-fi short film (MP4)'
        },
        {
            title: 'Test Stream (HLS)',
            url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
            desc: 'HLS streaming test'
        }
    ];
    
    const mainContent = document.getElementById('mainContent');
    document.getElementById('videoContainer').classList.remove('show');
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    
    mainContent.innerHTML = `
        <div class="content-section">
            <div class="section-header">
                <h2 class="section-title">🎬 Example Videos You Can Watch Now</h2>
            </div>
            <p style="color: var(--text-secondary); margin-bottom: 20px;">
                Click any video below to start playing, or paste your own video URL in the search bar above.
            </p>
            ${exampleVideos.map(video => `
                <div onclick="loadStreamUrl('${video.url}')" 
                     style="background: var(--bg-card); padding: 16px; margin-bottom: 12px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 16px; transition: transform 0.2s;"
                     onmouseover="this.style.transform='translateX(5px)'"
                     onmouseout="this.style.transform='translateX(0)'">
                    <span style="font-size: 32px;">▶️</span>
                    <div style="flex: 1;">
                        <div style="font-size: 16px; font-weight: 600; margin-bottom: 4px;">${video.title}</div>
                        <div style="font-size: 13px; color: var(--text-secondary);">${video.desc}</div>
                    </div>
                    <span style="color: var(--accent); font-size: 14px; font-weight: 600;">PLAY</span>
                </div>
            `).join('')}
            
            <div style="background: rgba(229, 9, 20, 0.1); border: 1px solid var(--accent); padding: 16px; border-radius: 8px; margin-top: 24px;">
                <div style="display: flex; align-items: start; gap: 12px;">
                    <span style="font-size: 24px;">📝</span>
                    <div>
                        <strong style="display: block; margin-bottom: 8px;">Want to Watch Your Own Videos?</strong>
                        <p style="margin: 0; font-size: 14px; color: var(--text-secondary); line-height: 1.5;">
                            Just paste any video URL in the search bar. Supports: MP4, WebM, M3U8 (HLS), and most streaming URLs.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Setup event listeners
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    
    // Clear search on escape
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            loadContent(currentTab);
        }
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
    } else if (tab === 'browse') {
        // Show all categories
        mainContent.innerHTML = `
            <div class="content-section">
                <div class="section-header">
                    <h2 class="section-title">Browse All</h2>
                </div>
                <div style="display: grid; gap: 16px; padding: 0;">
                    ${createBrowseCategories()}
                </div>
            </div>
        `;
    } else {
        const content = contentDatabase[tab] || [];
        const title = tab === 'shows' ? 'TV Shows' : capitalize(tab);
        mainContent.innerHTML = `
            <div class="content-section">
                <div class="section-header">
                    <h2 class="section-title">${title}</h2>
                </div>
                <div class="content-grid">
                    ${content.map(item => createContentCard(item)).join('')}
                </div>
            </div>
        `;
    }
}

// Create browse categories
function createBrowseCategories() {
    const categories = [
        { name: 'Action', emoji: '💥', count: 8 },
        { name: 'Comedy', emoji: '😂', count: 6 },
        { name: 'Drama', emoji: '🎭', count: 10 },
        { name: 'Horror', emoji: '👻', count: 4 },
        { name: 'Romance', emoji: '💕', count: 5 },
        { name: 'Sci-Fi', emoji: '🚀', count: 6 },
        { name: 'Fantasy', emoji: '🐉', count: 7 },
        { name: 'Thriller', emoji: '🔪', count: 5 },
        { name: 'Animation', emoji: '🎨', count: 4 },
        { name: 'Documentary', emoji: '🌍', count: 3 },
    ];
    
    return categories.map(cat => `
        <div onclick="searchContent('${cat.name}')" style="background: var(--bg-card); padding: 20px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 16px; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
            <span style="font-size: 32px;">${cat.emoji}</span>
            <div style="flex: 1;">
                <div style="font-size: 18px; font-weight: 600;">${cat.name}</div>
                <div style="font-size: 14px; color: var(--text-secondary);">${cat.count} titles</div>
            </div>
            <span style="font-size: 20px; color: var(--text-secondary);">›</span>
        </div>
    `).join('');
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
        // Search content
        searchContent(query);
    }
}

// Search content function
function searchContent(query) {
    const searchTerm = query.toLowerCase();
    const allContent = [];
    
    // Gather all content from database
    for (let category in contentDatabase) {
        if (Array.isArray(contentDatabase[category])) {
            allContent.push(...contentDatabase[category]);
        } else {
            for (let subcat in contentDatabase[category]) {
                if (Array.isArray(contentDatabase[category][subcat])) {
                    allContent.push(...contentDatabase[category][subcat]);
                }
            }
        }
    }
    
    console.log('Total content items:', allContent.length);
    console.log('Searching for:', searchTerm);
    
    // Filter content by search term
    const results = allContent.filter(item => 
        item.title.toLowerCase().includes(searchTerm) ||
        item.genre.toLowerCase().includes(searchTerm) ||
        item.year.includes(searchTerm)
    );
    
    console.log('Results found:', results.length);
    
    // Display search results
    displaySearchResults(query, results);
}

// Display search results
function displaySearchResults(query, results) {
    const mainContent = document.getElementById('mainContent');
    
    // Hide video player
    document.getElementById('videoContainer').classList.remove('show');
    
    // Update active tab
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    
    if (results.length === 0) {
        mainContent.innerHTML = `
            <div class="content-section">
                <div class="section-header">
                    <h2 class="section-title">Search: "${query}"</h2>
                </div>
                <div style="text-align: center; padding: 60px 20px; color: var(--text-secondary);">
                    <div style="font-size: 64px; margin-bottom: 16px;">🔍</div>
                    <h3 style="font-size: 20px; margin-bottom: 8px; color: var(--text-primary);">No results found</h3>
                    <p style="font-size: 15px;">Try searching for movies, shows, anime, or genres</p>
                    <p style="font-size: 14px; margin-top: 16px;">Examples: "Action", "2024", "Anime", "Comedy"</p>
                </div>
            </div>
        `;
    } else {
        mainContent.innerHTML = `
            <div class="content-section">
                <div class="section-header">
                    <h2 class="section-title">Search: "${query}"</h2>
                    <span style="color: var(--text-secondary); font-size: 14px;">${results.length} result${results.length !== 1 ? 's' : ''}</span>
                </div>
                <div class="content-grid">
                    ${results.map(item => createContentCard(item)).join('')}
                </div>
            </div>
        `;
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Load stream URL
function loadStreamUrl(url) {
    const videoContainer = document.getElementById('videoContainer');
    const videoPlayer = document.getElementById('videoPlayer');
    
    // Show loading
    videoPlayer.innerHTML = `
        <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #000;">
            <div style="text-align: center;">
                <div style="font-size: 48px; margin-bottom: 16px;">⏳</div>
                <div style="color: white; font-size: 18px;">Loading video...</div>
            </div>
        </div>
    `;
    
    videoContainer.classList.add('show');
    videoContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Load video after a short delay
    setTimeout(() => {
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
            
            currentVideo.addEventListener('error', () => {
                videoPlayer.innerHTML = `
                    <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #000; padding: 40px;">
                        <div style="text-align: center; max-width: 500px;">
                            <div style="font-size: 64px; margin-bottom: 16px;">⚠️</div>
                            <h3 style="color: white; margin-bottom: 12px;">Unable to Load Video</h3>
                            <p style="color: #999; font-size: 14px;">
                                The video URL may be invalid or the server doesn't allow embedding.
                            </p>
                            <button onclick="showExampleVideos()" style="background: var(--accent); color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; margin-top: 16px; font-size: 14px;">
                                Try Example Videos
                            </button>
                        </div>
                    </div>
                `;
            });
        } else {
            // Load in iframe
            videoPlayer.innerHTML = `<iframe src="${url}" allowfullscreen style="width: 100%; height: 100%; border: none;"></iframe>`;
        }
    }, 300);
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
