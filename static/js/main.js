/**
 * Cyber5 Chess Tournament Display - Main JavaScript
 * Handles real-time WebSocket communication and UI updates
 */

class ChessTournamentDisplay {
    constructor() {
        this.socket = null;
        this.matches = [];
        this.autoRefresh = true;
        this.init();
    }

    /**
     * Initialize the application
     */
    init() {
        console.log('Initializing Chess Tournament Display...');
        this.setupWebSocket();
        this.setupEventListeners();
        this.loadInitialData();
    }

    /**
     * Set up WebSocket connection
     */
    setupWebSocket() {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        this.socket = io({
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: Infinity,
            transports: ['websocket', 'polling']
        });

        // Connection events
        this.socket.on('connect', () => {
            console.log('WebSocket connected');
            this.updateConnectionStatus(true);
        });

        this.socket.on('disconnect', () => {
            console.log('WebSocket disconnected');
            this.updateConnectionStatus(false);
        });

        this.socket.on('connect_error', (error) => {
            console.error('WebSocket error:', error);
            this.updateConnectionStatus(false);
        });

        // Tournament data events
        this.socket.on('initial_data', (data) => {
            console.log('Received initial data:', data);
            this.handleMatchesUpdate(data);
        });

        this.socket.on('matches_updated', (data) => {
            console.log('Matches updated:', data);
            this.handleMatchesUpdate(data);
        });
    }

    /**
     * Set up event listeners for UI elements
     */
    setupEventListeners() {
        // Refresh button
        document.getElementById('refreshBtn').addEventListener('click', () => {
            this.requestRefresh();
        });

        // Auto-refresh toggle
        document.getElementById('autoRefreshToggle').addEventListener('click', () => {
            this.autoRefresh = !this.autoRefresh;
            this.updateAutoRefreshButton();
            if (this.autoRefresh) {
                this.requestRefresh();
            }
        });
    }

    /**
     * Load initial data from server
     */
    loadInitialData() {
        fetch('/api/matches')
            .then(response => response.json())
            .then(data => {
                console.log('Initial data loaded:', data);
                this.handleMatchesUpdate(data);
            })
            .catch(error => {
                console.error('Error loading initial data:', error);
                this.showEmptyState('Failed to load tournament data');
            });
    }

    /**
     * Handle matches data update
     */
    handleMatchesUpdate(data) {
        if (data.matches && Array.isArray(data.matches)) {
            this.matches = data.matches;
            this.renderMatches();
            this.updateTimestamp(data.timestamp);
            this.updateMatchCount();
        }
    }

    /**
     * Request refresh from server
     */
    requestRefresh() {
        console.log('Requesting refresh...');
        if (this.socket && this.socket.connected) {
            this.socket.emit('request_refresh');
        } else {
            this.loadInitialData();
        }
    }

    /**
     * Render matches to the DOM
     */
    renderMatches() {
        const container = document.getElementById('matchesContainer');
        
        if (!this.matches || this.matches.length === 0) {
            this.showEmptyState('No matches found. Please ensure Excel file is properly configured.');
            return;
        }

        // Clear container
        container.innerHTML = '';

        // Create match cards
        this.matches.forEach((match, index) => {
            const matchCard = this.createMatchCard(match, index);
            container.appendChild(matchCard);
        });
    }

    /**
     * Create a match card element
     */
    createMatchCard(match, index) {
        const card = document.createElement('div');
        card.className = 'match-card';
        card.style.animationDelay = `${index * 0.1}s`;

        const status = this.getMatchStatus(match);
        const statusClass = `status-${status.toLowerCase().replace(/\s+/g, '')}`;
        const player1Winner = match.winner === match.player1 && match.winner;
        const player2Winner = match.winner === match.player2 && match.winner;

        card.innerHTML = `
            <div class="match-header">
                <div class="match-id">Match #${this.escapeHtml(String(match.id || 'N/A'))}</div>
                <div class="match-status ${statusClass}">${this.escapeHtml(status)}</div>
            </div>

            <div class="players-section">
                <div class="player ${player1Winner ? 'winner' : ''}">
                    ${player1Winner ? '<span class="crown">👑</span>' : ''}
                    <span class="player-name">${this.escapeHtml(match.player1 || 'TBD')}</span>
                    ${player1Winner ? '<span class="player-badge">WINNER</span>' : ''}
                </div>
                <div style="text-align: center; color: var(--border-color); font-weight: 500;">VS</div>
                <div class="player ${player2Winner ? 'winner' : ''}">
                    ${player2Winner ? '<span class="crown">👑</span>' : ''}
                    <span class="player-name">${this.escapeHtml(match.player2 || 'TBD')}</span>
                    ${player2Winner ? '<span class="player-badge">WINNER</span>' : ''}
                </div>
            </div>

            <div class="match-info">
                ${match.round ? `<div class="info-item">
                    <span class="info-label">Round</span>
                    <span class="info-value">${this.escapeHtml(String(match.round))}</span>
                </div>` : ''}
                ${match.result ? `<div class="info-item">
                    <span class="info-label">Result</span>
                    <span class="info-value">${this.escapeHtml(String(match.result))}</span>
                </div>` : ''}
                <div class="info-item">
                    <span class="info-label">Status</span>
                    <span class="info-value">${this.escapeHtml(status)}</span>
                </div>
            </div>
        `;

        return card;
    }

    /**
     * Determine match status
     */
    getMatchStatus(match) {
        if (match.winner) {
            return 'Completed';
        }
        if (match.status) {
            return match.status;
        }
        if (match.player1 !== 'TBD' && match.player2 !== 'TBD') {
            return 'Ongoing';
        }
        return 'Pending';
    }

    /**
     * Update connection status display
     */
    updateConnectionStatus(connected) {
        const statusEl = document.getElementById('connectionStatus');
        const indicator = document.getElementById('statusIndicator');
        const statusText = document.getElementById('statusText');

        if (connected) {
            statusEl.classList.add('connected');
            indicator.classList.remove('pulse');
            statusText.textContent = 'Connected';
        } else {
            statusEl.classList.remove('connected');
            indicator.classList.add('pulse');
            statusText.textContent = 'Disconnected';
        }
    }

    /**
     * Update timestamp display
     */
    updateTimestamp(timestamp) {
        const timestampEl = document.getElementById('timestamp');
        if (timestamp) {
            try {
                const date = new Date(timestamp);
                const time = date.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit', 
                    second: '2-digit',
                    hour12: true 
                });
                timestampEl.textContent = `Updated: ${time}`;
            } catch (e) {
                timestampEl.textContent = 'Updated: --:--:--';
            }
        }
    }

    /**
     * Update match count display
     */
    updateMatchCount() {
        const countEl = document.getElementById('matchCount');
        const count = this.matches.length;
        const completedCount = this.matches.filter(m => m.winner).length;
        countEl.textContent = `${count} matches | ${completedCount} completed`;
    }

    /**
     * Update auto-refresh button text
     */
    updateAutoRefreshButton() {
        const btn = document.getElementById('autoRefreshToggle');
        btn.textContent = this.autoRefresh ? '📱 Auto-Refresh: ON' : '📱 Auto-Refresh: OFF';
    }

    /**
     * Show empty state message
     */
    showEmptyState(message) {
        const container = document.getElementById('matchesContainer');
        container.innerHTML = `
            <div class="empty-state">
                <h2>📋 No Matches Available</h2>
                <p>${this.escapeHtml(message)}</p>
            </div>
        `;
    }

    /**
     * Escape HTML special characters
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new ChessTournamentDisplay();
});
