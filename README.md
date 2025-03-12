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
