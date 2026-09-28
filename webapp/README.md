# SmartView Web App

A Progressive Web App (PWA) version of SmartView - Smart Streaming Browser.

## Features

- 🎬 **Video Streaming**: Load and play video streams from URLs
- 📺 **Content Browser**: Browse featured and trending content
- 🔍 **Search**: Search for content or enter direct URLs
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- ⚡ **Progressive Web App**: Can be installed on your device
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations

## How to Use

### Running Locally

1. Open `app.html` in your web browser
2. Or use a local web server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   ```
3. Navigate to `http://localhost:8000/webapp/app.html`

### Features Guide

**Add Streaming URL:**
- Click the ➕ button in the header
- Enter a streaming URL (supports .mp4, .webm, .m3u8, or any web URL)
- Click "Load" to start streaming

**Search:**
- Type in the search bar
- Enter a URL to load it directly
- Or search for content (in demo mode)

**Browse Content:**
- Click on any content card to view it
- Use category filters to browse different types of content

**Menu:**
- Click the ☰ button to open the sidebar
- Access Library, Favorites, Downloads, History, and Settings

### Supported URL Types

- Direct video files: `.mp4`, `.webm`, `.ogg`
- HLS streams: `.m3u8`
- Any web page via iframe
- YouTube, Vimeo, and other embeddable content

### Examples to Try

```
# Direct MP4
https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4

# HLS Stream
https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8

# YouTube (embed format)
https://www.youtube.com/embed/VIDEO_ID
```

## Installation as PWA

### Desktop (Chrome/Edge)
1. Open the app in your browser
2. Look for the install icon in the address bar
3. Click "Install"

### Mobile (Android)
1. Open the app in Chrome
2. Tap the menu (⋮)
3. Select "Add to Home screen"

### Mobile (iOS)
1. Open the app in Safari
2. Tap the Share button
3. Select "Add to Home Screen"

## Project Structure

```
webapp/
├── app.html              # Main HTML file
├── app.js                # JavaScript logic
├── sw.js                 # Service Worker for PWA
├── manifest.webmanifest  # PWA manifest
└── README.md             # This file
```

## Technologies Used

- Pure HTML5, CSS3, and JavaScript (no frameworks)
- Service Workers for offline capability
- HTML5 Video API
- Responsive CSS Grid and Flexbox
- Progressive Web App (PWA) standards

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (with some PWA limitations on iOS)
- Opera: Full support

## Notes

- This is a web-based recreation inspired by the SmartView Android app
- Some features are in demo mode (sample content)
- Real streaming requires valid video URLs
- CORS restrictions may apply to some external URLs

## Development

To modify the app:
1. Edit `app.html` for structure and styling
2. Edit `app.js` for functionality
3. Edit `manifest.webmanifest` for PWA settings
4. Test in multiple browsers

## License

Converted from SmartView Android APK for educational purposes.
