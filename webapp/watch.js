// SmartView Web - REAL Streaming with TMDB + VidSrc
// NO SAMPLES - Real movies and TV shows only

const TMDB_API_KEY = ''; // Paste your free API key here from themoviedb.org
const TMDB_BASE = 'https://api.themoviedb.org/3';
const TMDB_IMG = 'https://image.tmdb.org/t/p';

// Real streaming providers
const PROVIDERS = {
    vidsrc: 'https://vidsrc.xyz/embed',
    vidsrc2: 'https://vidsrc.to/embed',
    embed2: 'https://www.2embed.cc/embed',
    superembed: 'https://multiembed.mov/directstream.php',
    autoembed: 'https://player.autoembed.cc/embed'
};

let currentTab = 'home';
let currentProvider = 'vidsrc';

// Check if API is configured
function hasApiKey() {
    return TMDB_API_KEY && TMDB_API_KEY !== '';
}

// Fetch from TMDB
async function fetchTMDB(endpoint) {
    if (!hasApiKey()) {
        return { results: [], error: 'API key not configured' };
    }
    
    try {
        const url = `${TMDB_BASE}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${TMDB_API_KEY}`;
        const res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.error('TMDB fetch error:', error);
        return { results: [] };
    }
}

// Popular content (works without API - using TMDB IDs)
const POPULAR = {
    movies: [
        {id: 278, title: "The Shawshank Redemption", year: "1994", poster: "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg"},
        {id: 238, title: "The Godfather", year: "1972", poster: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg"},
        {id: 240, title: "The Godfather Part II", year: "1974", poster: "/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg"},
        {id: 424, title: "Schindler's List", year: "1993", poster: "/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg"},
        {id: 19404, title: "Dilwale Dulhania Le Jayenge", year: "1995", poster: "/lfRkUr7DYdHldAqi3PwdQGBRBPM.jpg"},
        {id: 299534, title: "Avengers: Endgame", year: "2019", poster: "/or06FN3Dka5tukK1e9sl16pB3iy.jpg"},
        {id: 155, title: "The Dark Knight", year: "2008", poster: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg"},
        {id: 497, title: "The Green Mile", year: "1999", poster: "/8VG8fDNiy50H4FedGwdSVUPoaJe.jpg"},
        {id: 680, title: "Pulp Fiction", year: "1994", poster: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg"},
        {id: 13, title: "Forrest Gump", year: "1994", poster: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg"},
        {id: 769, title: "GoodFellas", year: "1990", poster: "/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg"},
        {id: 12, title: "Finding Nemo", year: "2003", poster: "/eHuGQ10FUzK1mdOY69wF5pGgEf5.jpg"}
    ],
    shows: [
        {id: 1396, title: "Breaking Bad", year: "2008", poster: "/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg"},
        {id: 1399, title: "Game of Thrones", year: "2011", poster: "/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg"},
        {id: 60735, title: "The Flash", year: "2014", poster: "/lJA2RCMfsWoskqlQhXPSLFQGXEJ.jpg"},
        {id: 82856, title: "The Mandalorian", year: "2019", poster: "/eU1i6eHXlzMOlEq0ku1Rzq7Y4wA.jpg"},
        {id: 85552, title: "Euphoria", year: "2019", poster: "/3Q0hd3heuWwDWpwcDkhQOA6TYWI.jpg"},
        {id: 63174, title: "Lucifer", year: "2016", poster: "/ekZobS8isE6mA53RAiGDG93hBxL.jpg"}
    ]
};

// Initialize
async function init() {
    setupEventListeners();
    
    if (!hasApiKey()) {
        showApiKeySetup();
    } else {
        loadHome();
    }
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
}

// Show API key setup
function showApiKeySetup() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="info-box">
            <h2>🔑 Setup Required (2 Minutes)</h2>
            <p>To stream thousands of real movies and TV shows, you need a free TMDB API key.</p>
            
            <div class="setup-steps">
                <h3 style="margin-bottom: 12px;">Quick Setup:</h3>
                <ol style="line-height: 2;">
                    <li>Go to <strong>themoviedb.org/signup</strong></li>
                    <li>Create free account (no payment needed)</li>
                    <li>Go to Settings → API</li>
                    <li>Request API Key → Choose "Developer"</li>
                    <li>Copy the API Key</li>
                    <li>Open <strong>watch.js</strong> in notepad</li>
                    <li>Line 4: Paste your key between the quotes</li>
                    <li>Save and reload this page</li>
                </ol>
            </div>
            
            <p style="margin-top: 20px; font-size: 14px; opacity: 0.9;">
                ⏱️ Takes 2 minutes • 🆓 100% Free • ✅ Legal
            </p>
            
            <button class="demo-button" onclick="showManualContent()" style="margin-top: 20px;">
                📺 Or Browse Popular Content (No API Needed)
            </button>
        </div>
    `;
}

// Show manual content (no API needed)
function showManualContent() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="content-section">
            <div class="section-header">
                <h2 class="section-title">🔥 Popular Movies</h2>
                <small style="color: var(--text-secondary);">Click any to watch now!</small>
            </div>
            <div class="content-grid" id="moviesGrid"></div>
        </div>
        
        <div class="content-section">
            <div class="section-header">
                <h2 class="section-title">📺 Popular TV Shows</h2>
            </div>
            <div class="content-grid" id="showsGrid"></div>
        </div>
    `;
    
    document.getElementById('moviesGrid').innerHTML = POPULAR.movies.map(m => createCard(m, 'movie')).join('');
    document.getElementById('showsGrid').innerHTML = POPULAR.shows.map(s => createCard(s, 'tv')).join('');
}

// Create content card
function createCard(item, type) {
    const posterUrl = item.poster ? `${TMDB_IMG}/w500${item.poster}` : '';
    return `
        <div class="content-card" onclick='play(${JSON.stringify(item)}, "${type}")'>
            <div class="card-poster">
                ${posterUrl ? `<img src="${posterUrl}" alt="${item.title}">` : 
                `<div class="card-poster-placeholder">${type === 'tv' ? '📺' : '🎬'}</div>`}
                <div class="play-overlay">
                    <span class="play-icon">▶</span>
                </div>
            </div>
            <div class="card-title">${item.title}</div>
            <div class="card-meta">${item.year || 'N/A'}</div>
        </div>
    `;
}

// Play content
function play(item, type) {
    const streamUrl = getStreamUrl(item.id, type);
    window.location.href = `player.html?url=${encodeURIComponent(streamUrl)}&title=${encodeURIComponent(item.title)}&type=embed`;
}

// Get streaming URL
function getStreamUrl(id, type) {
    // VidSrc format: https://vidsrc.xyz/embed/movie/299534
    return `${PROVIDERS[currentProvider]}/${type}/${id}`;
}

// Load home with API
async function loadHome() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = '<div class="loading"><div class="loading-spinner">⏳</div><div class="loading-text">Loading content...</div></div>';
    
    const trending = await fetchTMDB('/trending/all/week');
    const movies = await fetchTMDB('/movie/popular');
    const shows = await fetchTMDB('/tv/popular');
    
    mainContent.innerHTML = `
        <div class="content-section">
            <div class="section-header">
                <h2 class="section-title">🔥 Trending</h2>
            </div>
            <div class="content-grid">
                ${(trending.results || []).slice(0, 12).map(item => createCard({
                    id: item.id,
                    title: item.title || item.name,
                    year: (item.release_date || item.first_air_date || '').split('-')[0],
                    poster: item.poster_path
                }, item.media_type || 'movie')).join('')}
            </div>
        </div>
        
        <div class="content-section">
            <div class="section-header">
                <h2 class="section-title">🎬 Popular Movies</h2>
            </div>
            <div class="content-grid">
                ${(movies.results || []).slice(0, 12).map(item => createCard({
                    id: item.id,
                    title: item.title,
                    year: (item.release_date || '').split('-')[0],
                    poster: item.poster_path
                }, 'movie')).join('')}
            </div>
        </div>
        
        <div class="content-section">
            <div class="section-header">
                <h2 class="section-title">📺 Popular TV Shows</h2>
            </div>
            <div class="content-grid">
                ${(shows.results || []).slice(0, 12).map(item => createCard({
                    id: item.id,
                    title: item.name,
                    year: (item.first_air_date || '').split('-')[0],
                    poster: item.poster_path
                }, 'tv')).join('')}
            </div>
        </div>
    `;
}

// Handle search
async function handleSearch() {
    const query = document.getElementById('searchInput').value.trim();
    if (!query) return;
    
    if (!hasApiKey()) {
        alert('Please setup TMDB API key first to use search.');
        return;
    }
    
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = '<div class="loading"><div class="loading-spinner">⏳</div><div class="loading-text">Searching...</div></div>';
    
    const results = await fetchTMDB(`/search/multi?query=${encodeURIComponent(query)}`);
    
    mainContent.innerHTML = `
        <div class="content-section">
            <div class="section-header">
                <h2 class="section-title">Search: "${query}"</h2>
                <span style="color: var(--text-secondary);">${(results.results || []).length} results</span>
            </div>
            <div class="content-grid">
                ${(results.results || []).map(item => createCard({
                    id: item.id,
                    title: item.title || item.name,
                    year: (item.release_date || item.first_air_date || '').split('-')[0],
                    poster: item.poster_path
                }, item.media_type || 'movie')).join('')}
            </div>
        </div>
    `;
}

// Switch tab
function switchTab(tab) {
    currentTab = tab;
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    event.target?.classList.add('active');
    
    if (hasApiKey()) {
        loadTabContent(tab);
    } else {
        showManualContent();
    }
}

// Load tab content
async function loadTabContent(tab) {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = '<div class="loading"><div class="loading-spinner">⏳</div></div>';
    
    let endpoint = '';
    let type = 'movie';
    
    switch(tab) {
        case 'movies':
            endpoint = '/movie/popular';
            type = 'movie';
            break;
        case 'shows':
            endpoint = '/tv/popular';
            type = 'tv';
            break;
        case 'trending':
            endpoint = '/trending/all/week';
            break;
        default:
            loadHome();
            return;
    }
    
    const data = await fetchTMDB(endpoint);
    
    mainContent.innerHTML = `
        <div class="content-section">
            <div class="section-header">
                <h2 class="section-title">${tab.charAt(0).toUpperCase() + tab.slice(1)}</h2>
            </div>
            <div class="content-grid">
                ${(data.results || []).map(item => createCard({
                    id: item.id,
                    title: item.title || item.name,
                    year: (item.release_date || item.first_air_date || '').split('-')[0],
                    poster: item.poster_path
                }, item.media_type || type)).join('')}
            </div>
        </div>
    `;
}

// Show about
function showAbout() {
    alert('SmartView Web\\n\\nReal streaming on any device\\n• Powered by TMDB + VidSrc\\n• Works on phones, tablets, computers\\n• No Android required!');
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
