# Reverse: 1999 Discord RPC

Display your Reverse: 1999 game activity directly in **Discord Rich Presence**: session time, chapter, difficulty, and featured character — all updated in real time.

---

## Features

- **Real-time Rich Presence:** Updates automatically when you enter battles, return to the lobby, or switch stages.  
- **Detailed info:** Shows chapter/stage name, difficulty, elapsed playtime, and highlighted Arcana.  
- **Customizable assets:** Large/small icons, tooltips, and buttons (Join/Watch).  
- **Lightweight & safe:** Reads game state only; does not modify the game client.  
- **Cross-platform:** Works on Windows, macOS, and Linux.  

---

## Requirements

- **Discord Desktop** (running and logged in).  
- **Reverse: 1999** installed on your PC.  
- **Executable release** of this project (download from Releases).  

---

## Installation

1. Download the latest release from the **Releases** section.  
2. Extract the files to any folder.  
3. Start Discord Desktop.  
4. Run the provided executable file.  

---

## Configuration

Edit the `config.json` file to customize your presence:

```json
{
  "discordClientId": "123456789012345678",
  "updateIntervalMs": 3000,
  "locale": "en-US",
  "assets": {
    "largeImageKey": "reverse1999_logo",
    "largeImageText": "Reverse: 1999",
    "smallImageKey": "arcana_flame",
    "smallImageText": "Arcana"
  },
  "presence": {
    "showChapter": true,
    "showDifficulty": true,
    "showElapsed": true
  },
  "features": {
    "buttons": [
      { "label": "Watch Stream", "url": "https://twitch.tv/<your_channel>" },
      { "label": "Join Community", "url": "https://discord.gg/<invite>" }
    ]
  },
  "source": {
    "mode": "auto",
    "gameProcessName": "Reverse1999.exe",
    "logPath": "C:/Games/Reverse1999/logs/latest.log",
    "apiEndpoint": "http://localhost:1999/state"
  }
}
