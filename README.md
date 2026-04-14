# SigmaGPT

A full-stack ChatGPT-like application built with Node.js and React. This project provides a modern chat interface powered by OpenAI API with persistent thread management.

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **OpenAI API** - AI chat completions

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **CSS** - Styling

## Project Structure

```
SIGMAGPT/
├── Backend/
│   ├── models/
│   │   └── Thread.js          # MongoDB Thread model
│   ├── routes/
│   │   └── chat.js            # Chat API endpoints
│   ├── utils/
│   │   └── openai.js          # OpenAI API integration
│   ├── server.js              # Express server setup
│   ├── package.json           # Backend dependencies
│   └── .gitignore
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chat.jsx       # Chat interface
│   │   │   ├── ChatWindow.jsx # Chat display
│   │   │   ├── Sidebar.jsx    # Thread sidebar
│   │   └── App.jsx            # Main app component
│   ├── package.json           # Frontend dependencies
│   ├── vite.config.js         # Vite configuration
│   └── .gitignore
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB connection string
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YourUsername/SIGMAGPT.git
   cd SIGMAGPT
   ```

2. **Install Backend Dependencies**
   ```bash
   cd Backend
   npm install
   cd ..
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd Frontend
   npm install
   cd ..
   ```

### Environment Variables

#### Backend (.env)
Create a `.env` file in the `Backend/` directory:
```
OPENAI_API_KEY=your_openai_api_key_here
PORT=5000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
```

#### Frontend (.env)
Create a `.env` file in the `Frontend/` directory:
```
VITE_API_URL=http://localhost:5000
```

## Running the Application

### Development Mode

**Terminal 1 - Start Backend Server:**
```bash
cd Backend
npm start
```
Server runs at `http://localhost:5000`

**Terminal 2 - Start Frontend Dev Server:**
```bash
cd Frontend
npm run dev
```
App runs at `http://localhost:5173`

### Production Build

**Build Frontend:**
```bash
cd Frontend
npm run build
```

## API Endpoints

### POST /api/chat
Send a message and get a response from ChatGPT.

**Request:**
```json
{
  "message": "Your question here",
  "threadId": "existing_thread_id_or_null"
}
```

**Response:**
```json
{
  "threadId": "thread_id",
  "response": "Assistant response",
  "messages": [...]
}
```

## Features

- ✅ Chat with ChatGPT API
- ✅ Persistent conversation threads
- ✅ Sidebar for thread management
- ✅ Real-time message streaming
- ✅ Clean and modern UI

## Future Enhancements

- [ ] User authentication
- [ ] Chat history and search
- [ ] Custom system prompts
- [ ] Multiple AI models support
- [ ] Conversation sharing
- [ ] Mobile responsive design

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m 'Add your feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues or questions, please open an issue on GitHub.

---

**Happy Coding! 🚀**
