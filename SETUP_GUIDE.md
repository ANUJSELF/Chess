# Complete Setup Guide - Cyber5 Chess Tournament Display

## 📋 Quick Start (5 minutes)

### Prerequisites Check

Before starting, ensure you have:
- Python 3.11 or higher installed
- Git installed
- Excel file located at: `~/Library/CloudStorage/OneDrive-AmericanExp/Cyber5 Indoor Sports Tournament 2026 – Chess Tournament.xlsx`

### Step-by-Step Installation

#### 1. Clone the Repository

```bash
# Open Terminal/Command Prompt
git clone https://github.com/ANUJSELF/Chess.git
cd Chess
```

#### 2. Create Virtual Environment

```bash
# macOS/Linux
python3 -m venv venv
source venv/bin/activate

# Windows (PowerShell)
python -m venv venv
.\venv\Scripts\Activate.ps1

# Windows (Command Prompt)
python -m venv venv
venv\Scripts\activate.bat
```

#### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

#### 4. Verify Excel File

```bash
# macOS/Linux - Check if file exists
ls ~/Library/CloudStorage/OneDrive-AmericanExp/

# Should show: Cyber5 Indoor Sports Tournament 2026 – Chess Tournament.xlsx
```

#### 5. Start Application

```bash
python app.py
```

You should see:
```
Starting Cyber5 Chess Tournament Display on http://localhost:5000
```

#### 6. Open in Browser

- Open your web browser
- Go to: `http://localhost:5000`
- You should see the tournament display!

---

## 🔍 Detailed Setup Instructions

### System Requirements

**macOS:**
```bash
# Check Python version
python3 --version  # Should be 3.11+

# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Python if needed
brew install python@3.11
```

**Windows:**
1. Download Python 3.11+ from [python.org](https://www.python.org/downloads/)
2. During installation, **CHECK** "Add Python to PATH"
3. Click "Install Now"

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install python3.11 python3.11-venv
```

### Detailed Git Setup

```bash
# If you don't have git, install it:
# macOS:
brew install git

# Then clone:
git clone https://github.com/ANUJSELF/Chess.git
cd Chess
```

### Virtual Environment Setup

**What is a Virtual Environment?**

A virtual environment is an isolated Python workspace for this project. It prevents conflicts with other Python projects.

**Create Virtual Environment:**

```bash
# macOS/Linux
python3 -m venv venv

# Windows
python -m venv venv
```

**Activate Virtual Environment:**

```bash
# macOS/Linux
source venv/bin/activate

# Windows PowerShell
.\venv\Scripts\Activate.ps1

# Windows Command Prompt
venv\Scripts\activate.bat
```

**You know it's activated when:**
- Your terminal shows `(venv)` at the beginning of the line
- Example: `(venv) ~/Chess$`

### Install Dependencies

```bash
# Make sure you're in the Chess directory
cd Chess

# Make sure virtual environment is activated (you see (venv) in terminal)

# Install all dependencies
pip install -r requirements.txt
```

**What gets installed:**
- Flask (web framework)
- Flask-SocketIO (real-time WebSocket support)
- openpyxl (Excel file reading)
- pandas (data processing)
- watchdog (file monitoring)
- And other supporting libraries

### Verify Excel File Setup

**Location Check:**

```bash
# macOS/Linux
ls -la ~/Library/CloudStorage/OneDrive-AmericanExp/

# Should show:
# Cyber5 Indoor Sports Tournament 2026 – Chess Tournament.xlsx
```

**File Requirements:**

1. Open the Excel file in Excel or Numbers
2. Check for a sheet named **"Match Tracker"**
3. Ensure it has these columns:
   - **A**: Match ID (required)
   - **B**: Player 1 Name
   - **C**: Player 2 Name
   - **D**: Winner Name
   - **E**: Status
   - **F**: Round
   - **G**: Result

**Example Data:**

```
Row 1 (Header):  Match ID | Player 1 | Player 2 | Winner | Status | Round | Result
Row 2:           M001     | Alice    | Bob      | Alice  | Completed | 1    | Win
Row 3:           M002     | Charlie  | Diana    |        | Pending   | 1    | --
```

---

## ▶️ Running the Application

### Starting the Server

```bash
# 1. Navigate to project directory
cd Chess

# 2. Activate virtual environment
# macOS/Linux:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# 3. Start the application
python app.py
```

**Expected Output:**

```
 * Running on http://127.0.0.1:5000
 * Debug mode: on
(Press CTRL+C to quit)
```

### Accessing the Application

1. **Open Web Browser**
2. **Go to**: `http://localhost:5000` or `http://127.0.0.1:5000`
3. **You should see**:
   - Header with "Cyber5 Chess Tournament 2026"
   - Connection status indicator
   - Match cards with player information
   - Refresh buttons and controls

### Stopping the Application

```bash
# In the terminal where the app is running:
CTRL+C

# Then deactivate the virtual environment (optional):
deactivate
```

---

## 🔄 Updating Match Data

### Method 1: Live Updates from Excel

1. **Keep the app running** (no need to restart)
2. **Open the Excel file** in Excel or another spreadsheet app
3. **Edit match data**:
   - Add player names in columns B and C
   - Enter winner names in column D
   - Update status in column E
4. **Save the file** (Ctrl+S or Cmd+S)
5. **Watch the web app update automatically** (within 2 seconds)

### Method 2: Manual Refresh

- Click the **🔄 Refresh** button in the web application
- This immediately fetches the latest data from the Excel file

---

## 🌐 Network Access

### Access from Another Computer on Same Network

**Step 1: Find Your Computer's IP Address**

```bash
# macOS/Linux
ifconfig | grep "inet " | grep -v 127.0.0.1

# Windows
ipconfig
```

Look for something like `192.168.1.xxx` or `10.0.0.xxx`

**Step 2: Edit app.py**

Change this line in `app.py`:

```python
# From:
socketio.run(app, host='127.0.0.1', port=5000)

# To:
socketio.run(app, host='0.0.0.0', port=5000)
```

**Step 3: Restart Application**

```bash
CTRL+C  # Stop current server
python app.py  # Start again
```

**Step 4: Access from Other Computer**

- On another computer, open browser
- Go to: `http://YOUR_IP:5000`
- Example: `http://192.168.1.100:5000`

---

## 🐛 Troubleshooting

### Problem: "ModuleNotFoundError: No module named 'flask'"

**Solution:**
```bash
# Make sure virtual environment is activated
source venv/bin/activate  # macOS/Linux
# or
venv\Scripts\activate  # Windows

# Reinstall dependencies
pip install -r requirements.txt
```

### Problem: "Excel file not found"

**Solution:**
```bash
# Verify the file exists
ls ~/Library/CloudStorage/OneDrive-AmericanExp/

# Check if path is correct in app.py
# Edit app.py and verify WORKBOOK_PATH matches your setup
```

### Problem: "Port 5000 already in use"

**Solution:**

```bash
# macOS/Linux - Find and kill process
lsof -i :5000
kill -9 <PID>

# Or use different port in app.py:
# Change: socketio.run(app, host='127.0.0.1', port=5000)
# To: socketio.run(app, host='127.0.0.1', port=5001)
```

### Problem: Data not updating automatically

**Solution:**
1. Save the Excel file (make sure it's actually saved)
2. Click the "Refresh" button in the web app
3. Check browser console (F12) for errors
4. Verify Excel sheet is named "Match Tracker"
5. Verify data is in rows 2+ (row 1 is header)

### Problem: WebSocket connection fails

**Solution:**
1. Check browser console (F12)
2. Make sure Python app is still running
3. Try refreshing the browser page
4. Check firewall settings
5. Try using a different browser

### Problem: "Permission denied" error

**Solution:**
```bash
# Make sure you have read access to Excel file
chmod 644 ~/Library/CloudStorage/OneDrive-AmericanExp/"Cyber5 Indoor Sports Tournament 2026 – Chess Tournament.xlsx"

# Or make it readable and writable
chmod 666 ~/Library/CloudStorage/OneDrive-AmericanExp/"Cyber5 Indoor Sports Tournament 2026 – Chess Tournament.xlsx"
```

---

## 📱 Mobile Access

The application is fully responsive and works on mobile devices!

### Access from Mobile Phone (Same Network)

1. **Modify app.py** (if not already done):
   ```python
   socketio.run(app, host='0.0.0.0', port=5000)
   ```

2. **Find Computer IP**:
   - macOS/Linux: `ifconfig | grep inet`
   - Example: `192.168.1.100`

3. **On Mobile Phone**:
   - Open browser
   - Go to: `http://192.168.1.100:5000`
   - Bookmark it for quick access!

---

## 🔒 Firewall & Security

### Allow Local Network Access

**macOS:**
```bash
# When prompted, click "Allow"
# Or manually:
# System Preferences → Security & Privacy → Firewall Options → Add Python
```

**Windows:**
```bash
# Windows Defender Firewall will prompt
# Click "Allow access"
# Or manually add exception in Firewall settings
```

---

## 📚 File Structure Explained

```
Chess/
├── app.py                      # Main application - handles Excel reading & WebSockets
├── requirements.txt            # List of Python packages to install
├── README.md                   # Full documentation
├── SETUP_GUIDE.md             # This file!
│
├── templates/
│   └── index.html             # Web page HTML
│
└── static/
    ├── css/
    │   ├── style.css          # Page styling (colors, layout, etc)
    │   └── animations.css      # Smooth animations
    └── js/
        └── main.js            # JavaScript for interactivity & WebSocket
```

---

## 🔧 Configuration Options

### Change Excel File Location

Edit `app.py`:

```python
# Find this line (around line 40):
WORKBOOK_PATH = os.path.expanduser(
    '~/Library/CloudStorage/OneDrive-AmericanExp/Cyber5 Indoor Sports Tournament 2026 – Chess Tournament.xlsx'
)

# Change to your path:
WORKBOOK_PATH = os.path.expanduser(
    '~/path/to/your/file.xlsx'
)
```

### Change Sheet Name

Edit `app.py`:

```python
# Find this line:
DEFAULT_SHEET_NAME = 'Match Tracker'

# Change to your sheet name:
DEFAULT_SHEET_NAME = 'Your Sheet Name'
```

### Change Port Number

Edit `app.py`:

```python
# Find the bottom of the file:
socketio.run(
    app,
    host='127.0.0.1',
    port=5000,  # Change this number
    ...
)
```

### Change Update Interval

Edit `app.py`:

```python
# Find this line:
POLL_INTERVAL = 2  # seconds

# Change to check more or less frequently:
POLL_INTERVAL = 5  # Check every 5 seconds
```

---

## ✅ Verification Checklist

Before considering setup complete, verify:

- [ ] Python 3.11+ installed: `python3 --version`
- [ ] Virtual environment created: `ls venv/`
- [ ] Virtual environment activated: Terminal shows `(venv)`
- [ ] Dependencies installed: `pip list | grep Flask`
- [ ] Excel file exists and is accessible
- [ ] Excel file has "Match Tracker" sheet
- [ ] App starts without errors: `python app.py`
- [ ] Browser loads page: `http://localhost:5000`
- [ ] Matches display correctly
- [ ] Refresh button works
- [ ] Connection indicator shows green (connected)

---

## 📞 Quick Reference

### Common Commands

```bash
# Activate virtual environment
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Start application
python app.py

# Stop application
CTRL+C

# Deactivate virtual environment
deactivate

# Check Python version
python3 --version

# List installed packages
pip list

# Upgrade pip
pip install --upgrade pip
```

### Important URLs

- Application: `http://localhost:5000`
- API: `http://localhost:5000/api/matches`
- Health Check: `http://localhost:5000/api/health`

---

## 🎉 You're All Set!

You now have a fully functional live chess tournament display system:

✅ Updates automatically from Excel
✅ Real-time WebSocket updates
✅ Beautiful responsive UI
✅ Production-ready code
✅ Easy to maintain and customize

**Enjoy your Cyber5 Chess Tournament 2026 display! ♟**

---

**Questions?** Check the README.md or review the troubleshooting section above.
