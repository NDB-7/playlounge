# 🎮  PlayLounge - Real-Time Multiplayer Games

Play real-time multiplayer games with friends, straight from your browser!



Try it out [here](https://playlounge.vercel.app). _(NOTE: After a period of inactivity, the server takes about 60 seconds to start up.)_

## 🧠 Purpose and Technical Challenges

I built PlayLounge to set up quick, casual gaming sessions with little overhead. Schedules don’t always align, so with PlayLounge, I can enjoy simple but fun social games with friends, even on limited time.

### 1. Real-Time State Synchronization

The core of this application is **real-time communication** and **event-driven architecture**. The Node.js server maintains and validates the game state, communicating to clients with WebSockets.

- When a player makes a move, the browser emits an event to the server.
- The server validates the move, updates the game state, and  broadcasts it to all clients in-game.
- Components in the React front-end re-render based on this state, ensuring a synchronized game state between players that is reflected in the UI.

### 2. Session Management & Reconnection

To handle network errors or refreshes, I implemented a **session token system**. When a user first joins a lobby, they’re assigned a unique token saved in localStorage. If they disconnect, they’re re-authenticated into the active game with their state intact.

## 🛠️  Tech Stack

- **React + Next.js** on the frontend for smooth UI updates

- **Node.js + Express.js** on the backend for managing game logic and lobbies

- **Socket.io** for real-time communication and game state updates

## ⚙️ Quick Start

Follow these steps to run the project locally:

1. **Clone the repository:**

```
git clone https://github.com/NDB-7/PlayLounge.git
cd PlayLounge
```


2. **Install dependencies:** This project has separate client and server directories.

```
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```


3. **Set up environment variables:** Create a .env file in the server directory with these keys.

```
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
WEBHOOK_URL=<webhook_url_here> # This is the webhook to which feedback is sent
```

4. **Run the application:** You’ll need two separate terminals.

```
# (terminal in /server directory)
npm start

# (terminal in /client directory)
npm run dev
```

5. **Running Tests:** To run  backend unit tests, navigate to  /server and run:
```
npm test
```
