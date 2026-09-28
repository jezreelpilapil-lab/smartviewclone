# SmartView Web - Full Streaming App

A complete web clone of the SmartView Android app that works on **any device** - phones, tablets, computers, and Smart TVs.

## 🎬 What This Does

This is a **real streaming web app** that lets you watch:
- ✅ Thousands of movies
- ✅ TV shows with all episodes
- ✅ Latest releases
- ✅ HD quality streaming
- ✅ Works on ANY device with a browser

## 🚀 Quick Start - Start Watching Now!

1. Open `watch.html` in your browser
2. Click "Start Watching Now"
3. Pick any movie or show and enjoy!

**That's it!** No registration, no payment, no API setup required for basic streaming.

## 📁 Files Overview

```
webapp/
├── watch.html          → Main streaming app (START HERE!)
├── watch.js            → App logic
├── player.html         → Video player page
├── streaming-api.js    → Optional API integration
└── STREAMING-README.md → This file
```

## 🎯 How It Works

### Current Features (Working Now!)

The app uses **free embedding services** to stream content:

1. **VidSrc** - Aggregates streaming links from multiple sources
2. **2Embed** - Alternative embedding service  
3. **AutoEmbed** - Automatic source detection
4. **Direct Videos** - Sample HD videos for testing

### Streaming Sources

When you click a movie, the app:
1. Gets the movie ID (from TMDB database)
2. Creates an embed URL (e.g., `vidsrc.xyz/embed/movie/299534`)
3. Opens the player with that source
4. The embed service finds and plays the stream

**No hosting, no illegal downloads - just embedding public sources!**

## 🔥 What You Can Watch

### Without Any Setup:
- ✅ Popular movies (Avengers, Godfather, etc.)
- ✅ Popular TV shows (Breaking Bad, Game of Thrones, etc.)
- ✅ Sample HD videos
- ✅ All embedded streams

### With TMDB API (Optional):
- ✅ Search any movie/show by name
- ✅ See poster images
- ✅ Browse latest releases
- ✅ Filter by genre
- ✅ See ratings and descriptions

## 🎨 Optional: Add Full Features with TMDB API

To add search, posters, and more content:

### Step 1: Get Free API Key (2 minutes)

1. Go to https://www.themoviedb.org/signup
2. Create a free account
3. Go to Settings → API
4. Click "Request an API Key"
5. Choose "Developer" option
6. Fill in the form (use your website or "Personal Project")
7. Copy the API Key

### Step 2: Add to App

1. Open `streaming-api.js`
2. Find line 7: `apiKey: 'YOUR_TMDB_API_KEY'`
3. Replace with your key: `apiKey: 'abc123your-actual-key-here'`
4. Save and reload the app

**Done!** Now you have full search, posters, and all features!

## 🌐 Deploy Online (Make it a Real Website)

### Option 1: GitHub Pages (Free)

1. Push to GitHub (already done!)
2. Go to repo Settings → Pages
3. Select branch: `main`
4. Your app will be at: `https://yourusername.github.io/smartviewclone/webapp/watch.html`

### Option 2: Netlify (Free)

1. Go to netlify.com
2. Drag the `webapp` folder
3. Get instant URL: `https://yourapp.netlify.app`

### Option 3: Vercel (Free)

```bash
cd webapp
npx vercel
```

## 📱 Install as App

### On Android/iOS:
1. Open `watch.html` in Chrome/Safari
2. Tap menu → "Add to Home Screen"
3. Now it works like a native app!

### On Desktop:
1. Open in Chrome/Edge
2. Look for install icon in address bar
3. Click to install as desktop app

## 🎮 Using the App

### Keyboard Shortcuts (in player):
- `Space` - Play/Pause
- `←` - Rewind 10s
- `→` - Forward 10s
- `F` - Fullscreen
- `Esc` - Exit player

### URL Parameters:
You can link directly to content:
```
player.html?url=VIDEO_URL&title=MOVIE_NAME&type=embed
```

## 🔧 Customization

### Change Streaming Provider

In `watch.js`, line 5-10, you can switch providers:

```javascript
const STREAMING_PROVIDERS = {
    vidsrc: 'https://vidsrc.xyz/embed',        // Default
    vidsrcto: 'https://vidsrc.to/embed',       // Alternative
    embedsu: 'https://embed.su/embed',         // Alternative
    autoembed: 'https://player.autoembed.cc/embed',
    twoembed: 'https://www.2embed.cc/embed'
};
```

Change line in `playContent()`:
```javascript
const provider = STREAMING_PROVIDERS.vidsrcto;  // Use different provider
```

### Add More Content

In `watch.js`, add to `DEMO_CONTENT`:

```javascript
popular: [
    { id: 550, title: 'Fight Club', year: '1999', rating: '8.4', mediaType: 'movie' },
    // Add more TMDB IDs here
]
```

Find TMDB IDs at: themoviedb.org (in the URL)

## ⚠️ Legal Notice

This app uses:
- ✅ TMDB API (licensed, free, legal)
- ✅ Public embedding services (like YouTube embed)
- ✅ Sample public domain videos

**No copyrighted content is hosted.** The app only provides links to third-party embedding services, similar to how Google shows search results.

## 🆚 Comparison with Android APK

| Feature | Android APK | Web App |
|---------|-------------|---------|
| Works on any device | ❌ Android only | ✅ All devices |
| Installation | ❌ APK install | ✅ Just open URL |
| Updates | ❌ Manual | ✅ Automatic |
| Storage | 60MB | <1MB |
| Streaming | ✅ | ✅ |
| HD Quality | ✅ | ✅ |
| Search | ✅ | ✅ (with API) |
| Subtitles | ✅ | ✅ (embedded) |

## 🐛 Troubleshooting

### Video won't play?
- Try different streaming provider
- Check internet connection
- Some content may not be available in all regions

### No search results?
- Make sure TMDB API key is added
- Check browser console for errors

### Player not loading?
- Disable ad blockers temporarily
- Try different browser
- Check if embedding is allowed

## 🚀 Next Steps

1. **Deploy it online** - Make it accessible from anywhere
2. **Add TMDB API** - Get full search and posters
3. **Share with friends** - Works on all their devices!
4. **Customize design** - Edit CSS to your liking

## 📧 Support

For issues:
1. Check browser console (F12)
2. Try different streaming provider
3. Test with demo videos first

## 🎉 You're Done!

Just open **`watch.html`** and start watching! 

No Android device needed - works on **everything**! 🎬📱💻📺
