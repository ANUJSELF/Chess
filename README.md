# Cyber5 Chess Live Tournament Display

A professional, production-ready Flask web application for live display and management of chess tournament matches. The application reads from an Excel workbook and provides real-time updates via WebSockets.

## 🎯 Features

- ✅ **Real-time Updates**: WebSocket-based live updates (no polling)
- ✅ **Excel Integration**: Automatic monitoring of Excel file for changes
- ✅ **Professional UI**: Modern, responsive dark-themed interface
- ✅ **Match Display**: Beautiful card-based layout for tournament matches
- ✅ **Winner Highlighting**: Automatic highlighting of match winners
- ✅ **Live Connection Status**: Real-time WebSocket connection indicator
- ✅ **Auto-refresh Toggle**: Manual and automatic refresh controls
- ✅ **Cross-platform**: Works on macOS, Linux, and Windows
- ✅ **Mobile Responsive**: Optimized for all screen sizes
- ✅ **Production Ready**: Proper error handling, logging, and performance optimization

## 📋 Requirements

- **Python 3.11+**
- **pip** (Python package manager)
- **Excel file** at: `~/Library/CloudStorage/OneDrive-AmericanExp/Cyber5 Indoor Sports Tournament 2026 – Chess Tournament.xlsx`

## 🚀 Installation & Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/ANUJSELF/Chess.git
cd Chess
```

### Step 2: Create Virtual Environment

```bash
# macOS/Linux
python3 -m venv venv
source venv/bin/activate

# Windows
python -m venv venv
venv\Scripts\activate
```

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 4: Verify Excel File Location

Ensure your Excel workbook exists at:
```
~/Library/CloudStorage/OneDrive-AmericanExp/Cyber5 Indoor Sports Tournament 2026 – Chess Tournament.xlsx
```

The Excel file should have a sheet named **"Match Tracker"** with the following columns:
- Column A: Match ID
- Column B: Player 1 Name
- Column C: Player 2 Name
- Column D: Winner Name (leave blank if no winner yet)
- Column E: Status (Pending, Ongoing, Completed)
- Column F: Round Number
- Column G: Result/Notes

### Step 5: Run the Application

```bash
python app.py
```

### Step 6: Access the Application

Open your web browser and navigate to:
```
http://localhost:5000
```

## 📖 Usage Guide

### Starting the Application

1. **Activate Virtual Environment**:
   ```bash
   source venv/bin/activate  # macOS/Linux
   ```

2. **Start the Server**:
   ```bash
   python app.py
   ```

3. **Open Browser**:
   - Navigate to `http://localhost:5000`
   - You should see the tournament display with matches from your Excel file

### Updating Tournament Data

1. **Edit Excel File**: Open the Excel workbook and update match information:
   - Enter player names
   - Fill in the "Winner" column for completed matches
   - Update status as needed

2. **Real-time Updates**:
   - The web application automatically detects Excel file changes
   - All connected clients receive updates via WebSocket within 2 seconds
   - No manual refresh needed

### UI Controls

- **🔄 Refresh Button**: Manually trigger an update from the Excel file
- **📱 Auto-Refresh Toggle**: Enable/disable automatic updates
- **Connection Indicator**: Green = connected, Red = disconnected
- **Timestamp**: Shows when the last update occurred

## 📁 Project Structure

```
Chess/
├── app.py                      # Main Flask application
├── requirements.txt            # Python dependencies
├── templates/
│   └── index.html             # Main HTML template
└── static/
    ├── css/
    │   ├── style.css          # Main styles
    │   └── animations.css      # Animations
    └── js/
        └── main.js            # Client-side logic
```

## 🔧 Configuration

### Excel File Path

To use a different Excel file location, edit `app.py`:

```python
WORKBOOK_PATH = os.path.expanduser(
    '~/path/to/your/Excel/file.xlsx'
)
```

### Sheet Name

To use a different sheet name, update:

```python
DEFAULT_SHEET_NAME = 'Your Sheet Name'
```

### Poll Interval

To change how frequently the app checks for Excel updates (in seconds):

```python
POLL_INTERVAL = 5  # Check every 5 seconds
```

### Server Port

To run on a different port, modify:

```python
socketio.run(
    app,
    host='127.0.0.1',
    port=8000,  # Change this
    ...
)
```

## 🌐 Accessing from Other Devices

To allow other devices on your network to access the application:

1. Find your computer's IP address:
   - macOS/Linux: `ifconfig` (look for inet address)
   - Windows: `ipconfig` (look for IPv4 Address)

2. Modify `app.py`:
   ```python
   socketio.run(
       app,
       host='0.0.0.0',  # Listen on all interfaces
       port=5000,
       ...
   )
   ```

3. Access from other devices using: `http://YOUR_IP:5000`

## 📊 Excel File Format Example

| Match ID | Player 1 | Player 2 | Winner | Status | Round | Result |
|----------|----------|----------|--------|--------|-------|--------|
| M001 | John Doe | Jane Smith | John Doe | Completed | 1 | Win |
| M002 | Bob Wilson | Alice Brown | | Pending | 1 | -- |
| M003 | Charlie Davis | Eve Johnson | | Ongoing | 1 | -- |

## 🐛 Troubleshooting

### Issue: Application won't start

**Solution:**
```bash
# Make sure you're in the virtual environment
source venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt --force-reinstall

# Try running again
python app.py
```

### Issue: Excel file not found

**Solution:**
```bash
# Check the file path
echo ~/Library/CloudStorage/OneDrive-AmericanExp/

# Verify the file exists
ls ~/Library/CloudStorage/OneDrive-AmericanExp/"Cyber5 Indoor Sports Tournament 2026 – Chess Tournament.xlsx"
```

### Issue: Updates not appearing

**Solution:**
1. Check browser console (F12) for errors
2. Verify Excel file has a "Match Tracker" sheet
3. Make sure column headers are correct
4. Click the "Refresh" button to manually trigger an update

### Issue: Port 5000 already in use

**Solution:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or use a different port in app.py
port=5001
```

## 🔒 Security Notes

- The application runs locally and doesn't transmit data externally
- CORS is enabled only for localhost by default
- No authentication is implemented (suitable for local use only)
- Always keep your Excel file backed up

## 📦 Dependencies

- **Flask**: Web framework
- **Flask-SocketIO**: WebSocket support
- **openpyxl**: Excel file reading
- **pandas**: Data manipulation
- **watchdog**: File system monitoring
- **python-socketio**: SocketIO client/server
- **python-engineio**: WebSocket engine
- **Werkzeug**: WSGI utilities

## 🎨 Customization

### Change Color Scheme

Edit `static/css/style.css` and modify CSS variables:

```css
:root {
    --primary-color: #1a1a2e;      /* Main background */
    --accent-color: #0f3460;        /* Accent color */
    --info-color: #3498db;          /* Info/highlight color */
    --success-color: #27ae60;       /* Success color */
    /* ... more colors ... */
}
```

### Customize Match Card Layout

Edit `static/js/main.js` in the `createMatchCard()` method to change the display format.

## 📝 Excel Sheet Setup

### Creating a New Match Tracker Sheet

1. Open the Excel workbook
2. Create a sheet named "Match Tracker" (if not already exists)
3. Add headers in the first row:
   - A1: Match ID
   - B1: Player 1
   - C1: Player 2
   - D1: Winner
   - E1: Status
   - F1: Round
   - G1: Result

4. Add match data starting from row 2
5. Save the file (no need to close it)

## 🚀 Performance Optimization

- Uses WebSockets instead of polling for efficiency
- Implements file change detection to avoid unnecessary reads
- Client-side rendering for quick UI updates
- CSS animations optimized for 60fps
- Proper error handling and connection recovery

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Verify your Excel file format
3. Check browser console for errors (F12)
4. Review application logs in terminal

## 📜 License

This project is provided as-is for the Cyber5 Chess Tournament 2026.

## 🔄 Updates & Maintenance

The application is production-ready with:
- Proper error handling
- Logging for debugging
- Automatic reconnection
- File change monitoring
- Clean code structure

## ✨ Version

**Version**: 1.0.0
**Last Updated**: July 15, 2026
**Status**: Production Ready

---

**Made with ❤️ for Cyber5 Indoor Sports Tournament 2026**
