# Wordle Fullstack Game

A fullstack Wordle-inspired web game built with React, Express, Bootstrap, and MongoDB.

## Features

- Play a Wordle-style game with customizable word length and duplicate letter settings
- Get color-coded feedback per letter (green = correct, yellow = misplaced, gray = wrong)
- Save your score to a highscore list with name, time, attempts, and game settings
- View highscores on a separate server-rendered page
- Static About page with project and author info
- Fully responsive layout using Bootstrap 5
- Integration tests for full game flow using Jest and Supertest

## Technologies

- **Frontend**: React 19, Vite, Bootstrap 5
- **Backend**: Node.js, Express, EJS
- **Database**: MongoDB
- **Testing**: Jest, Supertest

## Installation

```bash
npm install
```

## Run (Production)

```bash
npm start
```

Open your browser at: [http://localhost:5080](http://localhost:5080)

## Build Frontend

```bash
npm run build
```

## Run Tests

```bash
npm test
```

## Project Routes

- `/` – Game
- `/about` – About page
- `/highscores` – Highscore list (SSR with EJS)

## Author

Jan Elia  
📧 jan.elia995@hotmail.com  
🔗 [LinkedIn](https://www.linkedin.com/in/jan-elia-8001a7231/)  
🐙 [GitHub](https://github.com/jan-elia-24)