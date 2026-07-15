# Cyber5 Chess Tournament - Bracket View (v2.0)

## 🎮 What's New - Professional Full Bracket Display

This is the **upgraded version** with a professional tournament bracket view featuring:

✅ **Full Bracket Visualization** - Tournament-style bracket layout with rounds  
✅ **Tournament Rules Section** - Professional rules display  
✅ **Chess Theme** - Golden & silver chess-themed design  
✅ **Tournament Name** - Large, prominent title at the top  
✅ **Real-Time Updates** - WebSocket updates every 1-2 seconds  
✅ **Match Status Display** - Completed, Pending, Ongoing matches  
✅ **Winner Highlighting** - 👑 Crown emoji for winners  
✅ **Auto-Refresh** - Toggle real-time updates on/off  
✅ **Responsive Design** - Works on desktop, tablet, and mobile  

---

## 🚀 Quick Start (3 Easy Steps)

### Step 1: Clone & Setup
```bash
git clone https://github.com/ANUJSELF/Chess.git
cd Chess
python3 -m venv venv
source venv/bin/activate  # macOS/Linux
# OR: venv\Scripts\activate  # Windows
```

### Step 2: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 3: Run the Application
```bash
python app.py
```

**Then open browser:** `http://localhost:5000`

---

## 📊 Bracket View Layout

The bracket displays:
- **Tournament Header** with Cyber5 branding and live status
- **Control Panel** with Refresh & Auto-Refresh buttons
- **Tournament Rules** - 4 rule cards with icons
- **Full Bracket** - Matches organized by rounds
- **Match Nodes** - Player names, status, and winners

### Bracket Colors & Meanings:

| Color | Meaning |
|-------|---------|
| 🟡 Gold Border | Match ready to be played |
| 🟠 Orange | Match pending/scheduled |
| 🟢 Green | Match completed |
| 👑 Crown | Winner of the match |

---

## 📋 Excel File Setup

Ensure your Excel file has a **"Match Tracker"** sheet with:

| Column | Header | Description |
|--------|--------|-------------|
| A | Match ID | Unique match identifier (M001, M002, etc.) |
| B | Player 1 | First player name |
| C | Player 2 | Second player name |
| D | Winner | Winner's name (leave blank if no winner) |
| E | Status | Pending / Ongoing / Completed |
| F | Round | Round number (1, 2, 3, etc.) |
| G | Result | Match result or notes |

### Example Excel Data:

```
Match ID | Player 1     | Player 2     | Winner      | Status    | Round | Result
---------|--------------|--------------|-------------|-----------|-------|--------
M001     | Alice Smith  | Bob Wilson   | Alice Smith | Completed | 1     | Win
M002     | Charlie Lee  | Diana Brown  | (empty)     | Pending   | 1     | -
M003     | Eve Johnson  | Frank Davis  | (empty)     | Ongoing   | 1     | -
M004     | Grace Park   | Henry Miller | Grace Park  | Completed | 2     | Win
```

---

## 🔄 Real-Time Updates Explained

The application monitors your Excel file **automatically**:

1. **Edit Excel** → Update match data
2. **Save File** → Ctrl+S (Cmd+S on Mac)
3. **See Updates** → Browser updates within 2 seconds automatically
4. **No Manual Refresh Needed** → WebSocket handles it!

### How Fast Are Updates?

- **File Change Detection**: ~1 second
- **WebSocket Broadcasting**: Instant to all connected browsers
- **UI Animation**: Smooth fade-in transitions
- **Total Time**: 1-2 seconds from Excel save to screen

---

## 🎮 Using the Application

### View Tournament Bracket
1. Open `http://localhost:5000`
2. See all matches organized by round
3. Winners highlighted with 👑 crown emoji
4. Match status shown at bottom of each match box

### Update Matches
1. Open Excel file
2. Edit player names in columns B & C
3. Add winner name in column D when match is complete
4. Save file (Ctrl+S)
5. Watch bracket update automatically!

### Control Buttons

- **🔄 Refresh Now** - Force immediate update from Excel
- **⚡ Auto-Refresh: ON** - Toggle automatic updates (usually already on)

### Status Indicators

- **🟢 Connected** (Green dot) - Live connection active
- **🔴 Disconnected** (Red dot) - No connection, but will retry
- **Updated: HH:MM:SS** - Last update timestamp

---

## 📱 Access from Other Devices

### Same Network (WiFi)

1. **Find your computer's IP:**
   ```bash
   # macOS/Linux
   ifconfig | grep "inet " | grep -v 127.0.0.1
   
   # Windows
   ipconfig
   ```
   Look for something like `192.168.1.xxx`

2. **Edit `app.py`:**
   ```python
   # Change from:
   socketio.run(app, host='127.0.0.1', port=5000)
   
   # To:
   socketio.run(app, host='0.0.0.0', port=5000)
   ```

3. **Restart the app:**
   ```bash
   CTRL+C
   python app.py
   ```

4. **On other device:**
   Open browser → `http://YOUR_IP:5000`
   Example: `http://192.168.1.100:5000`

---

## 🐛 Troubleshooting

### Issue: "Excel file not found"
```bash
# Verify file path
ls ~/Library/CloudStorage/OneDrive-AmericanExp/
```
Or edit `app.py` line 35 to set correct path.

### Issue: Updates not showing
1. Check Excel file has "Match Tracker" sheet
2. Click "🔄 Refresh Now" button
3. Verify column headers match (A, B, C, D, E, F, G)
4. Check browser console (F12) for errors

### Issue: Port 5000 already in use
```bash
# Find what's using port 5000
lsof -i :5000

# Kill it (on macOS/Linux)
kill -9 <PID>

# Or use different port in app.py:
socketio.run(app, host='127.0.0.1', port=5001)
```

### Issue: WebSocket Connection Error
- Close browser & reopen
- Check firewall isn't blocking port 5000
- Restart the Python app
- Try different browser (Chrome, Firefox, Safari)

---

## 📂 Project Files

```
Chess/
├── app.py                          # Main Flask app with Excel monitoring
├── requirements.txt                # Python dependencies
├── BRACKET_README.md              # This file
├── README.md                      # Original documentation
├── SETUP_GUIDE.md                 # Detailed setup instructions
│
├── templates/
│   └── index.html                 # Bracket view HTML
│
└── static/
    ├── css/
    │   ├── bracket.css            # Bracket styling (NEW)
    │   ├── animations.css          # Animations
    │   └── style.css               # Old card view styles
    │
    └── js/
        ├── bracket.js              # Bracket display logic (NEW)
        └── main.js                 # Old card view logic
```

---

## 🎨 Customization

### Change Tournament Name
Edit `templates/index.html`:
```html
<h1 class="tournament-title">Your Tournament Name 2026</h1>
```

### Change Rules
Edit `templates/index.html` in the rules section:
```html
<div class="rule-card">
    <div class="rule-icon">⏱️</div>
    <h3>Your Rule Name</h3>
    <p>Your rule description here</p>
</div>
```

### Change Colors (Chess Theme)
Edit `static/css/bracket.css`:
```css
:root {
    --accent-gold: #d4af37;      /* Main gold color */
    --accent-silver: #c0c0c0;    /* Silver accents */
    --status-active: #00d084;    /* Completed (green) */
    --status-pending: #ffa502;   /* Pending (orange) */
}
```

### Change Update Interval
Edit `app.py` line 38:
```python
POLL_INTERVAL = 1  # Check Excel every 1 second (default is 2)
```

---

## ⚡ Performance Tips

1. **Keep Excel file open** - Makes updates faster
2. **Keep browser tab active** - Some browsers throttle background tabs
3. **Use Chrome/Firefox** - Best WebSocket performance
4. **Close other apps** - Reduces system load
5. **Keep matches < 100** - Very large tournaments may need optimization

---

## 🔐 Security Notes

- ✅ Runs locally - No data sent to internet
- ✅ WebSocket encrypted over HTTPS if deployed
- ✅ No authentication needed (local-only)
- ✅ Always backup your Excel file!

---

## 📊 Excel Update Flow

```
Your Computer          Browser                Server
    |                    |                      |
    | Edit Excel         |                      |
    |-----------|         |                      |
    |  Save     |         |                      |
    |-----------|         |                      |
    |           |         |    Check file       |
    |           |         |<--------------------|
    |           |         |    WebSocket event  |
    |           |         |<--------------------|
    |           |     Update UI                 |
    |           |    with new data              |
    |           |         |                      |
```

---

## 🚀 Deployment (Optional)

To run on a public server, use Gunicorn:

```bash
pip install gunicorn
gunicorn --worker-class eventlet -w 1 -b 0.0.0.0:5000 app:app
```

Or use Docker (advanced):

```dockerfile
FROM python:3.11
WORKDIR /chess
COPY . .
RUN pip install -r requirements.txt
CMD ["python", "app.py"]
```

---

## 📞 Support

If issues occur:

1. **Check console logs** - Terminal where you ran `python app.py`
2. **Check browser logs** - F12 → Console tab
3. **Verify Excel format** - Column headers and data layout
4. **Restart app** - Sometimes fixes connection issues
5. **Check firewall** - Port 5000 may be blocked

---

## ✅ Verification Checklist

Before running, verify:

- [ ] Python 3.11+ installed: `python3 --version`
- [ ] Virtual environment created: `ls venv/`
- [ ] Dependencies installed: `pip list | grep Flask`
- [ ] Excel file exists and accessible
- [ ] Excel has "Match Tracker" sheet
- [ ] Column headers: Match ID, Player 1, Player 2, Winner, Status, Round, Result
- [ ] Excel file has at least one match (row 2+)

---

## 🎯 Next Steps

1. **Download/Clone** the repository
2. **Set up** virtual environment
3. **Install** dependencies with `pip install -r requirements.txt`
4. **Verify** Excel file format
5. **Run** with `python app.py`
6. **Open** browser to `http://localhost:5000`
7. **Enjoy** the live bracket display!

---

## 📈 Version History

| Version | Date | Changes |
|---------|------|---------|
| v2.0 | Jul 15, 2026 | Full bracket view, rules section, chess theme |
| v1.0 | Jul 15, 2026 | Card grid view, basic WebSocket |

---

**Ready to go! 🚀 Download and run it now!**

Made with ♟️ for Cyber5 Indoor Sports Tournament 2026
