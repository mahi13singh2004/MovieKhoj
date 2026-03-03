# MovieKhoj 🎬

**AI-Powered Movie Sentiment Analysis Platform**

MovieKhoj is a modern web application that provides instant AI-powered audience sentiment insights for movies using IMDb IDs. Simply enter an IMDb ID and get comprehensive movie information along with intelligent sentiment analysis of audience reviews.

![MovieKhoj Demo](https://via.placeholder.com/800x400/040816/6366f1?text=MovieKhoj+Demo)

## ✨ Features

- **🔍 IMDb ID Search**: Enter any IMDb ID to get instant movie insights
- **🤖 AI Sentiment Analysis**: Powered by Google Gemini AI for intelligent review analysis
- **📊 Comprehensive Data**: Movie details, cast, ratings, and plot summaries
- **🎨 Beautiful UI**: Modern, responsive design with animated components
- **⚡ Health Check System**: Smart backend wake-up for Render hosting
- **📱 Mobile Responsive**: Optimized for all device sizes

## 🚀 Live Demo

- **Frontend**: [https://moviekhoj-frontendd.onrender.com](https://moviekhoj-frontendd.onrender.com)
- **Backend API**: [https://moviekhoj-backend.onrender.com](https://moviekhoj-backend.onrender.com)

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with modern features
- **Vite** - Fast build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Google Gemini AI** - AI-powered sentiment analysis
- **TMDB API** - Movie database and information
- **CORS** - Cross-origin resource sharing

### Deployment
- **Render** - Cloud hosting platform
- **Environment Variables** - Secure API key management

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **TMDB API Key** - Get from [TMDB](https://www.themoviedb.org/settings/api)
- **Google Gemini API Key** - Get from [Google AI Studio](https://aistudio.google.com/app/apikey)

## 🔧 Setup Instructions

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd moviekhoj
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Add your API keys to .env
TMDB_API_KEY=your_tmdb_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
```

### 3. Frontend Setup
```bash
cd ../frontend

# Install dependencies
npm install
```

### 4. Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

### 5. Production Build

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## 🌐 Deployment

### Render Deployment

1. **Backend Deployment:**
   - Connect your GitHub repository to Render
   - Set build command: `npm install`
   - Set start command: `npm start`
   - Add environment variables: `TMDB_API_KEY`, `GEMINI_API_KEY`

2. **Frontend Deployment:**
   - Set build command: `npm install && npm run build`
   - Set publish directory: `dist`
   - Update API URLs in `axiosService.js`

## 🔑 Environment Variables

### Backend (.env)
```env
TMDB_API_KEY=your_tmdb_api_key
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
```

## 📚 API Documentation

### Health Check
```http
GET /api/health
```
Returns backend status and uptime information.

### Movie Insights
```http
GET /api/movie/insight/:imdbId
```
Get comprehensive movie data with AI sentiment analysis.

**Example:**
```bash
curl https://moviekhoj-backend.onrender.com/api/movie/insight/tt0133093
```

### Movie Comments
```http
GET /api/movie/comments/:imdbId
```
Get movie reviews and comments from TMDB.

### Find IMDb ID
```http
POST /api/movie/find-id
Content-Type: application/json

{
  "name": "The Matrix",
  "year": "1999"
}
```

## 🎯 Usage Examples

1. **The Matrix**: `tt0133093`
2. **Inception**: `tt1375666`
3. **Interstellar**: `tt0816692`
4. **The Dark Knight**: `tt0468569`

## 🏗️ Tech Stack Rationale

### Why React 19?
- **Latest Features**: Concurrent rendering and improved performance
- **Modern Hooks**: Better state management and lifecycle handling
- **Developer Experience**: Excellent tooling and debugging capabilities

### Why Vite?
- **Fast Development**: Lightning-fast HMR and build times
- **Modern Bundling**: ESM-first approach with optimized production builds
- **Plugin Ecosystem**: Rich ecosystem with React integration

### Why Tailwind CSS 4?
- **Utility-First**: Rapid UI development with consistent design
- **Performance**: Purged CSS for minimal bundle size
- **Responsive Design**: Mobile-first approach with breakpoint utilities

### Why Zustand?
- **Lightweight**: Minimal boilerplate compared to Redux
- **TypeScript Support**: Excellent type inference
- **Simple API**: Easy to learn and implement

### Why Google Gemini AI?
- **Advanced NLP**: Superior sentiment analysis capabilities
- **Cost-Effective**: Competitive pricing for API usage
- **Reliability**: Google's robust infrastructure

### Why TMDB API?
- **Comprehensive Data**: Extensive movie database with reviews
- **Free Tier**: Generous free usage limits
- **Active Community**: Well-documented with community support

## ⚠️ Assumptions & Limitations

### Current Limitations
1. **Movies Only**: Currently optimized for movies, not TV series
2. **IMDb ID Required**: Requires valid IMDb ID format (tt1234567)
3. **English Reviews**: Sentiment analysis optimized for English reviews
4. **Review Limit**: Analyzes up to 5 most recent reviews for performance
5. **Cold Start**: Render free tier has ~30-second cold start delay

### Known Issues
- **Series Support**: TV series sentiment analysis may be inconsistent
- **Non-English Content**: Limited support for non-English movie reviews
- **Rate Limiting**: API rate limits may affect high-traffic usage
- **Cache**: No caching implemented - each request hits external APIs

### Future Enhancements
- [ ] TV series support with episode-level analysis
- [ ] Multi-language sentiment analysis
- [ ] Caching layer for improved performance
- [ ] User authentication and favorites
- [ ] Batch processing for multiple movies
- [ ] Advanced filtering and search options

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for movie data
- [Google Gemini AI](https://ai.google.dev/) for sentiment analysis
- [Render](https://render.com/) for hosting
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React](https://react.dev/) for the frontend framework

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

---

**Made with ❤️ for movie enthusiasts**