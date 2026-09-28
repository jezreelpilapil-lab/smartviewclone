// Streaming API Integration for SmartView Web App
// This integrates with public APIs to provide real movie/TV content

const API_CONFIG = {
    // TMDB API for movie/TV metadata (free, requires API key)
    tmdb: {
        apiKey: 'YOUR_TMDB_API_KEY', // Get free key at https://www.themoviedb.org/settings/api
        baseUrl: 'https://api.themoviedb.org/3',
        imageBaseUrl: 'https://image.tmdb.org/t/p'
    }
};

// Popular free streaming sources (for educational purposes)
const STREAMING_SOURCES = {
    // These are example endpoints - actual implementation would need proper licensing
    vidsrc: 'https://vidsrc.to/embed',
    vidsrcPro: 'https://vidsrc.pro/embed',
    embedsu: 'https://embed.su/embed',
    autoembed: 'https://player.autoembed.cc/embed',
    superembed: 'https://multiembed.mov/directstream.php'
};

// Fetch trending content from TMDB
async function fetchTrending(mediaType = 'all', timeWindow = 'week') {
    const url = `${API_CONFIG.tmdb.baseUrl}/trending/${mediaType}/${timeWindow}?api_key=${API_CONFIG.tmdb.apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error fetching trending:', error);
        return [];
    }
}

// Fetch popular movies
async function fetchPopularMovies(page = 1) {
    const url = `${API_CONFIG.tmdb.baseUrl}/movie/popular?api_key=${API_CONFIG.tmdb.apiKey}&page=${page}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
}

// Fetch popular TV shows
async function fetchPopularTVShows(page = 1) {
    const url = `${API_CONFIG.tmdb.baseUrl}/tv/popular?api_key=${API_CONFIG.tmdb.apiKey}&page=${page}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error fetching TV shows:', error);
        return [];
    }
}

// Search for content
async function searchContent(query, page = 1) {
    const url = `${API_CONFIG.tmdb.baseUrl}/search/multi?api_key=${API_CONFIG.tmdb.apiKey}&query=${encodeURIComponent(query)}&page=${page}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error searching:', error);
        return [];
    }
}

// Get streaming URL for content
function getStreamingUrl(contentId, mediaType, provider = 'vidsrc') {
    // Different providers have different URL formats
    switch(provider) {
        case 'vidsrc':
            return `${STREAMING_SOURCES.vidsrc}/${mediaType}/${contentId}`;
        case 'vidsrcPro':
            return `${STREAMING_SOURCES.vidsrcPro}/${mediaType}/${contentId}`;
        case 'embedsu':
            return `${STREAMING_SOURCES.embedsu}/${mediaType}/${contentId}`;
        case 'autoembed':
            return mediaType === 'movie' 
                ? `${STREAMING_SOURCES.autoembed}/movie/${contentId}`
                : `${STREAMING_SOURCES.autoembed}/tv/${contentId}`;
        case 'superembed':
            return mediaType === 'movie'
                ? `${STREAMING_SOURCES.superembed}?video_id=${contentId}&tmdb=1`
                : `${STREAMING_SOURCES.superembed}?video_id=${contentId}&tmdb=1&s=1&e=1`;
        default:
            return `${STREAMING_SOURCES.vidsrc}/${mediaType}/${contentId}`;
    }
}

// Get poster image URL
function getPosterUrl(posterPath, size = 'w500') {
    if (!posterPath) return null;
    return `${API_CONFIG.tmdb.imageBaseUrl}/${size}${posterPath}`;
}

// Get backdrop image URL
function getBackdropUrl(backdropPath, size = 'w1280') {
    if (!backdropPath) return null;
    return `${API_CONFIG.tmdb.imageBaseUrl}/${size}${backdropPath}`;
}

// Format content for display
function formatContent(item) {
    const mediaType = item.media_type || (item.first_air_date ? 'tv' : 'movie');
    const title = item.title || item.name;
    const releaseDate = item.release_date || item.first_air_date || '';
    const year = releaseDate ? releaseDate.split('-')[0] : '';
    
    return {
        id: item.id,
        title: title,
        mediaType: mediaType,
        poster: getPosterUrl(item.poster_path),
        backdrop: getBackdropUrl(item.backdrop_path),
        rating: item.vote_average ? item.vote_average.toFixed(1) : 'N/A',
        year: year,
        overview: item.overview || '',
        genre: mediaType === 'tv' ? 'TV Show' : 'Movie'
    };
}

// Check if API is configured
function isApiConfigured() {
    return API_CONFIG.tmdb.apiKey !== 'YOUR_TMDB_API_KEY' && API_CONFIG.tmdb.apiKey !== '';
}

// Get free API key instructions
function getApiKeyInstructions() {
    return {
        title: 'Get Free TMDB API Key',
        steps: [
            '1. Go to https://www.themoviedb.org/signup',
            '2. Create a free account',
            '3. Go to Settings → API',
            '4. Request an API key (choose "Developer" option)',
            '5. Copy the API Key and paste it in streaming-api.js'
        ],
        note: 'This is 100% free and takes less than 2 minutes!'
    };
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        fetchTrending,
        fetchPopularMovies,
        fetchPopularTVShows,
        searchContent,
        getStreamingUrl,
        getPosterUrl,
        getBackdropUrl,
        formatContent,
        isApiConfigured,
        getApiKeyInstructions
    };
}
