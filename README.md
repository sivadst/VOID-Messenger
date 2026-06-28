<div align="center">

```
██╗   ██╗ ██████╗ ██╗██████╗ 
██║   ██║██╔═══██╗██║██╔══██╗
██║   ██║██║   ██║██║██║  ██║
╚██╗ ██╔╝██║   ██║██║██║  ██║
 ╚████╔╝ ╚██████╔╝██║██████╔╝
  ╚═══╝   ╚═════╝ ╚═╝╚═════╝ 
```

# **M E S S E N G E R**

**Real-time messaging. Zero noise. Pure signal.**

[![React](https://img.shields.io/badge/React-18.2-000000?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-000000?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.7-000000?style=flat-square&logo=socketdotio&logoColor=white)](https://socket.io)
[![Vite](https://img.shields.io/badge/Vite-5.2-000000?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-000000?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

---

*A brutalist, ultra-minimal real-time messaging app built with a pitch-black design philosophy.*
*No rounded corners. No gradients. No shadows. Just raw, stripped-back communication.*

</div>

---

## ⚡ What is VOID?

VOID is a real-time messaging application that rejects modern UI bloat. It strips away every unnecessary pixel to create a communication experience that feels like talking through a terminal into the void — raw, fast, and distraction-free.

Every design decision is intentional:
- **Black `#000000` backgrounds** — nothing else
- **White `#FFFFFF` text** — maximum contrast, maximum readability
- **Zero `border-radius`** — sharp edges only
- **Zero `box-shadow`** — flatness is a feature
- **Zero gradients** — the void doesn't shimmer

---

## 🏗️ Architecture

```
┌────────────────────────────────────────────────────────┐
│                     VOID CLIENT                        │
│                                                        │
│  ┌──────────┐  ┌────────────┐  ┌───────────────────┐  │
│  │  React   │  │  Zustand   │  │  Framer Motion    │  │
│  │  Router  │──│  Store     │──│  Page Transitions │  │
│  │  v6      │  │  Global    │  │  & Animations     │  │
│  └────┬─────┘  └─────┬──────┘  └───────────────────┘  │
│       │              │                                  │
│       │    ┌─────────┴──────────┐                      │
│       │    │   useSocket Hook   │                      │
│       │    │   Socket.IO Client │                      │
│       │    └─────────┬──────────┘                      │
│       │              │                                  │
└───────┼──────────────┼──────────────────────────────────┘
        │              │ WebSocket
        │              │
┌───────┼──────────────┼──────────────────────────────────┐
│       │    ┌─────────┴──────────┐     VOID SERVER      │
│       │    │   Socket.IO        │                      │
│       │    │   Event Handler    │                      │
│       │    └─────────┬──────────┘                      │
│       │              │                                  │
│       │    ┌─────────┴──────────┐                      │
│       │    │   In-Memory Store  │                      │
│       │    │   Users + Messages │                      │
│       │    └────────────────────┘                      │
│       │                                                │
│  ┌────┴─────┐  ┌────────────────┐                      │
│  │ Express  │  │  Auto-Reply    │                      │
│  │ Health   │  │  Simulator     │                      │
│  └──────────┘  └────────────────┘                      │
│                                                        │
└────────────────────────────────────────────────────────┘
```

---

## ✨ Features

### Core Messaging
| Feature | Description |
|:---|:---|
| **Real-Time Chat** | Instant message delivery via WebSocket (Socket.IO) |
| **Message Status** | Triple-state tracking: `SENT` → `DELIVERED` → `READ` |
| **Typing Indicators** | See when someone is composing a message |
| **Auto-Reply Bot** | Server-side simulated responses with realistic delays |
| **Unread Counts** | Per-conversation unread message badges |

### UI / UX
| Feature | Description |
|:---|:---|
| **Brutalist Design** | Pitch-black, zero-radius, zero-shadow aesthetic |
| **Page Transitions** | Framer Motion `AnimatePresence` for smooth navigation |
| **Staggered Lists** | Chat list & contacts animate in with sequential delays |
| **Shake Validation** | Auth input shakes on empty submission |
| **Message Animations** | Bubbles slide up on arrival with fade-in |
| **Custom Scrollbar** | 2px thin, white thumb on dark track |
| **Pull-to-Refresh** | Mobile-friendly scroll-to-top refresh indicator |

### Design System
| Token | Value |
|:---|:---|
| **Primary Font** | `Space Grotesk` — body text, labels, buttons |
| **Display Font** | `DotGothic16` — the VOID logo, rendered as a dot-matrix texture |
| **Mono Font** | `JetBrains Mono` — timestamps, status text, metadata |
| **Background** | `#000000` (pure black) |
| **Foreground** | `#FFFFFF` (pure white) |
| **Muted** | `#888888` (grey) |
| **Subtle** | `#444444` (dark grey) |

---

## 📦 Tech Stack

| Layer | Technology | Purpose |
|:---|:---|:---|
| **Frontend** | React 18 + TypeScript | Component-based UI with type safety |
| **Routing** | React Router v6 | SPA navigation with protected routes |
| **State** | Zustand | Lightweight global state management |
| **Animations** | Framer Motion | Page transitions & micro-interactions |
| **Styling** | Tailwind CSS 3 | Utility-first styling with custom design tokens |
| **Icons** | Lucide React | Minimal, consistent iconography |
| **Real-Time** | Socket.IO (client + server) | Bi-directional WebSocket communication |
| **Backend** | Express + Node.js | HTTP server & WebSocket gateway |
| **Bundler** | Vite 5 | Lightning-fast HMR & builds |
| **Language** | TypeScript 5.4 | End-to-end type safety (client + server) |

---

## 🗂️ Project Structure

```
VOID Messenger/
│
├── server/                    # ── Backend ──────────────────
│   ├── index.ts               # Express + Socket.IO server
│   ├── store.ts               # In-memory user & message store
│   └── tsconfig.json          # Server TypeScript config
│
├── src/                       # ── Frontend ─────────────────
│   ├── main.tsx               # React entry point
│   ├── App.tsx                # Router + protected routes
│   ├── index.css              # Global styles + fonts + scrollbar
│   │
│   ├── pages/                 # ── Screens ──────────────────
│   │   ├── AuthScreen.tsx     # Phone number login
│   │   ├── HomeScreen.tsx     # Chat list with search
│   │   ├── ChatScreen.tsx     # Message thread view
│   │   ├── ContactsScreen.tsx # Contact directory
│   │   └── SettingsScreen.tsx # App configuration
│   │
│   ├── components/            # ── Reusable Components ──────
│   │   ├── AnimatedPage.tsx   # Framer Motion page wrapper
│   │   ├── BottomNav.tsx      # Tab bar (chats/contacts/settings)
│   │   ├── ChatListItem.tsx   # Chat preview in home list
│   │   ├── CustomToggle.tsx   # Brutalist toggle switch
│   │   ├── DottedText.tsx     # Dot-matrix text renderer
│   │   ├── Header.tsx         # Flexible 3-slot header
│   │   ├── InputBar.tsx       # Message composer
│   │   └── MessageBubble.tsx  # Individual message display
│   │
│   ├── hooks/                 # ── Custom Hooks ─────────────
│   │   └── useSocket.ts       # Socket.IO connection manager
│   │
│   ├── store/                 # ── State Management ─────────
│   │   └── useAppStore.ts     # Zustand global store
│   │
│   ├── data/                  # ── Mock Data ────────────────
│   │   └── mockData.ts        # Contacts & message generators
│   │
│   └── types/                 # ── TypeScript Types ─────────
│       └── index.ts           # Message, Contact, Chat, AppState
│
├── index.html                 # HTML shell
├── vite.config.ts             # Vite configuration
├── tailwind.config.js         # Custom colors, fonts, spacing
├── postcss.config.js          # PostCSS / Tailwind pipeline
├── tsconfig.json              # Client TypeScript config
├── tsconfig.node.json         # Node/Vite TypeScript config
├── package.json               # Dependencies & scripts
└── .gitignore                 # node_modules, dist, build, .env
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/VOID-Messenger.git
cd VOID-Messenger

# Install dependencies
npm install
```

### Development

```bash
# Start both frontend (Vite) and backend (Express + Socket.IO) concurrently
npm run dev
```

| Service | URL |
|:---|:---|
| Frontend (Vite) | `http://localhost:5173` |
| Backend (Socket.IO) | `http://localhost:3001` |
| Health Check | `http://localhost:3001/health` |

### Production Build

```bash
npm run build
npm run preview
```

---

## 🔌 Socket Events

### Client → Server

| Event | Payload | Description |
|:---|:---|:---|
| `join` | `phone: string` | Register user's phone to their socket |
| `send_message` | `{ to, from, text, timestamp }` | Send a message to another user |
| `typing` | `{ to, from }` | Notify recipient that sender is typing |
| `mark_read` | `{ chatId, from, to }` | Mark conversation messages as read |

### Server → Client

| Event | Payload | Description |
|:---|:---|:---|
| `receive_message` | `{ chatId, message }` | Incoming message from another user |
| `message_status` | `{ chatId, messageId, status }` | Status update: sent/delivered/read |
| `typing` | `{ from }` | Typing indicator from another user |

---

## 🎨 Design Philosophy

> *"The best interface is the one you forget you're using."*

VOID follows a **brutalist design philosophy** — the digital equivalent of raw concrete architecture. Every element serves a purpose. Nothing decorates.

### The Rules
```
1. BACKGROUND  →  Always #000000. No exceptions.
2. TEXT        →  #FFFFFF for primary. #888888 for secondary. #444444 for hints.
3. BORDERS    →  1px solid when needed. Never rounded.
4. SHADOWS    →  None. Flatness is enforced globally via CSS.
5. ANIMATIONS →  Subtle, functional. Never decorative.
6. FONTS      →  3 typefaces. Each with a clear role. No more.
7. SPACING    →  Consistent. Derived from a 4px base unit.
```

### The Dot-Matrix Logo

The `VOID` wordmark uses `DotGothic16` with a `radial-gradient` mask that renders text as a matrix of tiny dots — like a retro LED display bleeding white light through black glass.

```css
background-image: radial-gradient(circle, #ffffff 1px, transparent 1px);
background-size: 3px 3px;
-webkit-background-clip: text;
color: transparent;
```

---

## 🛡️ Message Status System

Messages flow through three states, visualized with minimal square indicators:

```
┌─────────┐     ┌───────────┐     ┌──────────┐
│  SENT   │────▶│ DELIVERED │────▶│   READ   │
│   ■     │     │   ■ ■     │     │   □ □    │
│  grey   │     │   grey    │     │  white   │
└─────────┘     └───────────┘     └──────────┘
```

- **Sent**: Single dark square (`#444`)
- **Delivered**: Two dark squares (`#444`)
- **Read**: Two white squares (`#FFF`)

No checkmarks. No blue ticks. Just squares in the void.

---

## 🤖 Auto-Reply System

The server includes a built-in auto-reply simulator that creates realistic conversation flow:

1. **Receive**: Server gets your message
2. **Wait**: Random delay (2–5 seconds) to simulate human latency
3. **Typing**: Sends `typing` event to the sender
4. **Reply**: After 1.5s of "typing", sends a contextual response

**VOID Bot Responses**: `SYSTEM ONLINE` · `SIGNAL SECURE` · `TRANSMISSION RECEIVED` · `VOID ACKNOWLEDGED`

**Generic Responses**: `Got it` · `On my way` · `Haha nice` · `Sure, sounds good` · `I'll check later`

---

## 📱 Screens

| Screen | Route | Description |
|:---|:---|:---|
| **Auth** | `/auth` | Minimal phone-number entry with shake validation |
| **Home** | `/` | Chat list with search, pull-to-refresh, unread badges |
| **Chat** | `/chat/:id` | Full message thread with typing indicators |
| **Contacts** | `/contacts` | Alphabetical contact directory with monogram avatars |
| **Settings** | `/settings` | Toggles for notifications & read receipts, logout |

---

## ⚙️ Available Scripts

| Script | Command | Description |
|:---|:---|:---|
| `dev` | `npm run dev` | Start frontend + backend concurrently |
| `dev:frontend` | `npm run dev:frontend` | Vite dev server only |
| `dev:backend` | `npm run dev:backend` | Express server with nodemon |
| `build` | `npm run build` | TypeScript compile + Vite production build |
| `preview` | `npm run preview` | Preview production build locally |

---

## 🔮 Roadmap

- [ ] End-to-end encryption (E2EE)
- [ ] Persistent message storage (SQLite / PostgreSQL)
- [ ] Media messaging (images, voice notes)
- [ ] Group conversations
- [ ] User presence (online / last seen)
- [ ] Push notifications
- [ ] Desktop app (Electron / Tauri)
- [ ] Self-destruct messages
- [ ] QR code contact sharing

---

<div align="center">

```
┌──────────────────────────────────────┐
│                                      │
│   BUILT WITH OBSESSION.              │
│   DESIGNED WITH RESTRAINT.           │
│   DEPLOYED INTO THE VOID.            │
│                                      │
└──────────────────────────────────────┘
```

**VOID** — *because the best design is the absence of everything unnecessary.*

---

Made with 🖤 and way too much coffee

</div>
