// SmartView Web - Real Streaming App
let currentTab = 'home';

// Free streaming sources (no authentication needed)
const STREAMING_PROVIDERS = {
    vidsrc: 'https://vidsrc.xyz/embed',
    vidsrcto: 'https://vidsrc.to/embed',
    embedsu: 'https://embed.su/embed',
    autoembed: 'https://player.autoembed.cc/embed',
    twoembed: 'https://www.2embed.cc/embed'
};

// Demo content for testing without API
const DEMO_CONTENT = {
    movies: [
        { id: 'demo1', title: 'Big Buck Bunny', year: '2008', rating: '7.5', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', type: 'direct' },
        { id: 'demo2', title: 'Elephants Dream', year: '2006', rating: '6.8', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', type: 'direct' },
        { id: 'demo3', title: 'Sintel', year: '2010', rating: '7.9', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4', type: 'direct' },
        { id: 'demo4', title: 'Tears of Steel', year: '2012', rating: '7.2', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', type: 'direct' },
        { id: 'demo5', title: 'For Bigger Blazes', year: '2015', rating: '6.5', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', type: 'direct' },
        { id: 'demo6', title: 'For Bigger Escape', year: '2015', rating: '6.8', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', type: 'direct' },
    ],
    // Real streaming using TMDB IDs (works without API key)
    popular: [
        { id: 299534, title: 'Avengers: Endgame', year: '2019', rating: '8.3', mediaType: 'movie' },
        { id: 238, title: 'The Godfather', year: '1972', rating: '8.7', mediaType: 'movie' },
        { id: 424, title: 'Schindler\'s List', year: '1993', rating: '8.6', mediaType: 'movie' },
        { id: 19404, title: 'Dilwale Dulhania Le Jayenge', year: '1995', rating: '8.7', mediaType: 'movie' },
        { id: 278, title: 'The Shawshank Redemption', year: '1994', rating: '8.7', mediaType: 'movie' },
        { id: 240, title: 'The Godfather Part II', year: '1974', rating: '8.6', mediaType: 'movie' },
        { id: 335787, title: 'Uncharted', year: '2022', rating: '7.1', mediaType: 'movie' },
        { id: 634649, title: 'Spider-Man: No Way Home', year: '2021', rating: '8.1', mediaType: 'movie' },
    ],
    shows: [
        { id: 1396, title: 'Breaking Bad', year: '2008', rating: '8.9', mediaType: 'tv' },
        { id: 1399, title: 'Game of Thrones', year: '2011', rating: '8.4', mediaType: 'tv' },
        { id: 60735, title: 'The Flash', year: '2014', rating: '7.7', mediaType: 'tv' },
        { id: 82856, title: 'The Mandalorian', year: '2019', rating: '8.5', mediaType: 'tv' },
        { id: 85552, title: 'Euphoria', year: '2019', rating: '8.3', mediaType: 'tv' },
        { id: 63174, title: 'Lucifer', year: '2016', rating: '8.1', mediaType: 'tv' },
    ]
};

// Initialize
function init() {
    setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
}

// Switch tab
function switchTab(tab) {
    currentTab = tab;
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    event.target?.classList.add('active');
    
    if (tab === 'home') {
        showHome();
    } else {
        loadDemoContent();
    }
}

// Show home
function showHome() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="info-box">
            <h2>🎬 Welcome to SmartView Web</h2>
            <p>Stream thousands of movies and TV shows on any device!</p>
            <p style="font-size: 14px; opacity: 0.9;">
                This web app streams real content using free embedding services.<br>
                No registration or payment required!
            </p>
            <button class="demo-button" onclick="loadDemoContent()">▶️ Start Watching Now</button>
            <button onclick="showSetupGuide()" style="background: rgba(255,255,255,0.2); border: 2px solid white; color: white; padding: 12px 24px; border-radius: 6px; cursor: pointer; font-size: 15px; font-weight: 600; margin-left: 12px;">
                ℹ️ How It Works
            </button>
        </div>
    `;
}

// Load demo content
function loadDemoContent() {
    const mainContent = document.getElementById('mainContent');
    
    mainContent.innerHTML = `
        <div class="content-section">
            <div class="section-header">
                <h2 class="section-title">🎬 Free Sample Videos</h2>
            </div>
            <div class="content-grid">
                ${DEMO_CONTENT.movies.map(item => createContentCard(item)).join('')}
            </div>
        </div>
        
        <div class="content-section">
            <div class="section-header">
                <h2 class="section-title">🔥 Popular Movies (Embedded Streaming)</h2>
            </div>
            <div class="content-grid">
                ${DEMO_CONTENT.popular.map(item => createContentCard(item)).join('')}
            </div>
        </div>
        
        <div class="content-section">
            <div class="section-header">
                <h2 class="section-title">📺 Popular TV Shows</h2>
            </div>
            <div class="content-grid">
                ${DEMO_CONTENT.shows.map(item => createContentCard(item)).join('')}
            </div>
        </div>
    `;
}

// Create content card
function createContentCard(item) {
    const emoji = item.type === 'direct' ? '🎥' : (item.mediaType === 'tv' ? '📺' : '🎬');
    return `
        <div class="content-card" onclick='playContent(${JSON.stringify(item)})'>
            <div class="card-poster">
                <div class="card-poster-placeholder">${emoji}</div>
                <div class="play-overlay">
                    <span class="play-icon">▶</span>
                </div>
            </div>
            <div class="card-title">${item.title}</div>
            <div class="card-meta">⭐ ${item.rating} • ${item.year}</div>
        </div>
    `;
}

// Play content
function playContent(item) {
    let streamUrl;
    
    if (item.type === 'direct') {
        // Direct video file
        streamUrl = item.url;
        window.location.href = `player.html?url=${encodeURIComponent(streamUrl)}&title=${encodeURIComponent(item.title)}`;
    } else {
        // Embedded streaming
        const provider = STREAMING_PROVIDERS.vidsrc;
        streamUrl = `${provider}/${item.mediaType}/${item.id}`;
        window.location.href = `player.html?url=${encodeURIComponent(streamUrl)}&title=${encodeURIComponent(item.title)}&type=embed`;
    }
}

// Handle search
function handleSearch() {
    const query = document.getElementById('searchInput').value.trim();
    if (!query) return;
    
    alert(`Search: "${query}"\n\nIn full version with API, this would search TMDB database.\n\nFor now, try browsing the demo content!`);
}

// Show setup guide
function showSetupGuide() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="content-section">
            <h2 class="section-title">📖 How SmartView Web Works</h2>
            
            <div style="background: var(--bg-card); padding: 20px; border-radius: 10px; margin-bottom: 20px; line-height: 1.6;">
                <h3 style="margin-bottom: 12px;">✅ Current Features (Working Now!)</h3>
                <ul style="margin-left: 20px; color: var(--text-secondary);">
                    <li>Stream popular movies and TV shows</li>
                    <li>Free embedded streaming (no signup required)</li>
                    <li>Works on any device with a browser</li>
                    <li>Sample HD videos for testing</li>
                </ul>
            </div>

            <div style="background: var(--bg-card); padding: 20px; border-radius: 10px; margin-bottom: 20px; line-height: 1.6;">
                <h3 style="margin-bottom: 12px;">🎯 Streaming Sources Used</h3>
                <p style="color: var(--text-secondary); margin-bottom: 12px;">
                    This app uses free embedding services that aggregate streaming links:
                </p>
                <ul style="margin-left: 20px; color: var(--text-secondary);">
                    <li><strong>VidSrc</strong> - Popular embedding service</li>
                    <li><strong>2Embed</strong> - Alternative streaming source</li>
                    <li><strong>AutoEmbed</strong> - Automatic source finder</li>
                    <li><strong>Direct MP4</strong> - Sample video files</li>
                </ul>
            </div>

            <div style="background: var(--bg-card); padding: 20px; border-radius: 10px; margin-bottom: 20px; line-height: 1.6;">
                <h3 style="margin-bottom: 12px;">🚀 Optional: Add TMDB API for Full Features</h3>
                <p style="color: var(--text-secondary); margin-bottom: 12px;">
                    For search, posters, and latest releases, get a free TMDB API key:
                </p>
                <div class="setup-steps">
                    <ol>
                        <li>Go to <strong>themoviedb.org/signup</strong></li>
                        <li>Create a free account</li>
                        <li>Go to Settings → API</li>
                        <li>Request API key (choose "Developer")</li>
                        <li>Copy API key to streaming-api.js</li>
                    </ol>
                </div>
                <p style="color: var(--text-secondary); margin-top: 12px; font-size: 14px;">
                    ⏱️ Takes 2 minutes • 🆓 Completely free • 🔓 No payment required
                </p>
            </div>

            <div style="text-align: center; margin-top: 30px;">
                <button class="demo-button" onclick="loadDemoContent()">
                    ▶️ Start Watching Demo Content
                </button>
            </div>
        </div>
    `;
}

// Show about
function showAbout() {
    alert('SmartView Web v1.0\n\nWeb clone of SmartView Android app\n• Stream movies & TV shows\n• Works on any device\n• Free embedded streaming\n• No registration required');
}

// Toggle sidebar
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('show');
}

// Close all
function closeAll() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('overlay').classList.remove('show');
}

// Initialize on load
document.addEventListener('DOMContentLoaded', init);
