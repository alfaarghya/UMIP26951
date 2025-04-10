# Clone the repo

```bash
git clone https://github.com/alfaarghya/UMIP26951.git

# or

git clone git@github.com:alfaarghya/UMIP26951.git

```

# 01.WeatherApp

![Weather](01.WeatherApp/public/weather-demo.png)

### Features

- Search Bar
- weather, Temperature, Humidity, Wind Speed
- Sunrise & Sunset time

### How to run app locally

1. install the dependency

```bash
#go to the 01.WeatherApp
cd 01.WeatherApp

#install dependency
yarn install

```

2. copy `.env.example` as `.env` and fill up the data

```bash
#openweathermap API key
VITE_API_KEY=
```

3. Now run the app

```bash
yarn run dev
```

# 02.Calculator

![calculator](02.Calculator/public/calculator-demo.png)

### Features

- Perform basic operations(addition, subtraction, multiplication, and division.)
- Calculate with BODMAS rule.
- Perform advance operations(square root, percentage, Exponentiation (xʸ), Common Logarithm (log), and Exponential Function (eˣ)).
- Store history on local storage.
- toggle between light & dark mode.

### Run the App locally

```bash
#go to the 02.Calculator
cd 02.Calculator

#install dependency
yarn install

#run the app
yarn run dev

```

# 03.Tic-Tac-Toe

<div style="display: flex; justify-content: space-between;">
  <img src='03.tic-tac-toe/apps/tic-tac-toe/public/ui-1.png' width="48%">
  <img src='03.tic-tac-toe/apps/tic-tac-toe/public/ui-2.png' width="48%">
</div>

### Features

#### Multiplayer Support

- Play real-time Tic-Tac-Toe with another player in a shared game room.
- Players are assigned X or O automatically when they join.

#### Room-Based Gameplay

- Create or join a unique game room using a Room ID.
- When a player leaves, their name is removed from the room.
- If both players leave, the room is deleted automatically.

#### Real-Time Updates

- **Instant Move Syncing:** Each move updates the board in real-time for both players.
- **Turn-Based System:** Displays whose turn it is dynamically.
- **Game Restart:** Restart the match without leaving the room.

#### Game Result Handling

- **Winner Display:** Shows the winner’s name when the game ends.
- **Draw Handling:** Displays "It's a Tie!" when there’s no winner.

![tic-tac-toe-1](03.tic-tac-toe/apps/tic-tac-toe/public/example-1.png)
![tic-tac-toe-2](03.tic-tac-toe/apps/tic-tac-toe/public/example-2.png)

### Run the App locally

```bash
#go to the 03.tic-tac-toe
cd 03.tic-tac-toe

#install dependency
yarn install

#run the app
yarn run dev

```

# 04.chat-app

![chat-app](04.chat-app/public/chat-app-demo.png)

### Features

#### Authentication

- secure user signin/signup with api routes
- successful signin/signup generate `auth token` that will be store on cookies
- all routes are protected, only register user can access chat, create room, join room etc.
- when user logout all cookies will by default

#### Real-time Chat System

- Send and receive messages instantly using WebSocket
- Messages are updated live without needing to refresh

#### Chat Room Functionality

- Users can create public chat rooms with unique names
- Users can join existing rooms by entering the room name
- Messages are visible to everyone in the room
- Each message shows sender name, timestamp, and message content
- when any user is not present in room, message will store on db

#### Direct Messaging (DM)

- Debounced search bar for username search, Users can search for other users by username
- Initiate private one-on-one chats
- DM conversations are private between two users

#### Message Formatting

- Support for bold (**text**), italic (_text_) and code(`text`) styles using markdown-like syntax

### Run the App locally

#### 1. Go to the `04.chat-app` & install all dependency

```bash
#go to the 04.chat-app
cd 04.chat-app

#install dependency
yarn install

```

#### 2. Create .env files

```bash
#db's env
cd packages/db/
cp .env.example .env
cd ../..

#server's env
cd apps/server/
cp .env.example .env
cd ../..
```

#### 3. connect the db

```bash
#starting the postgres db with docker
docker run --name chatDB -e POSTGRES_PASSWORD=chatappadminpassword -p 5432:5432 -d postgres

#migrate db
yarn run db:migrate

#generate client
yarn run db:generate

#optional - show the actual db
yarn run db:show
```

#### 4. run all applications

```bash
yarn run dev
```

Now visit the website `localhost:3000`

#### **optional** - some predefined credentials for login & testing

```bash
#user 1
username: alice
password: password123

#user 2
username: bob
password: password456

#user 3
username: charlie
password: password789
```

### Demos

#### 1. Sign up page

![signup-1](04.chat-app/public/signup-1.png)
![signup-1](04.chat-app/public/signup-2.png)

#### 2. Sign in page

![signin](04.chat-app/public/signin.png)

#### 3. Chat page

![chat](04.chat-app/public/chat.png)

#### 4. create room page

![create-room](04.chat-app/public/create-room.png)

#### 5. join room page

![join-room](04.chat-app/public/join-room.png)

#### 6. room chat page

![room-chat](04.chat-app/public/room-chat.png)

#### 7. Search by username

![search](04.chat-app/public/search-user.png)

#### 8. inbox chat

![dm-chat](04.chat-app/public/dm-chat.png)
