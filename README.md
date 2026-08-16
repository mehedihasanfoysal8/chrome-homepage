# Mehedi Hasan's New Tab

Personal Chrome New Tab dashboard with quick links, focus tasks, notes, a Pomodoro timer, weekly habits, and a time tracker.

## Features

- Custom greeting, clock, and daily quote
- Quick launcher for favorite apps/sites
- Search bar with engine switcher
- Focus tasks / to-do list
- Notes
- Pomodoro timer
- Weekly habit tracker
- Time tracker
- Light/dark theme toggle

## Installation (Load Unpacked in Chrome)

This is an unpacked Chrome extension — no build step is required.

1. Download or clone this repository to your computer.
   ```bash
   git clone https://github.com/mehedihasanfoysal8/chrome-homepage.git
   ```
2. Open Chrome and go to `chrome://extensions`.
3. Turn on **Developer mode** (toggle in the top-right corner).
4. Click **Load unpacked**.
5. Select the project folder (the folder containing `manifest.json`).
6. Open a new tab — the dashboard should now load automatically.

## Updating

After pulling new changes, go to `chrome://extensions`, find **Mehedi Hasan's New Tab**, and click the reload icon.

## Project Structure

```
├── icons/          # Extension icons (16, 48, 128 px)
├── index.html      # New tab page markup
├── style.css        # Styles
├── script.js        # Dashboard logic
└── manifest.json    # Chrome extension manifest (MV3)
```

## License

Personal project — no license specified.
