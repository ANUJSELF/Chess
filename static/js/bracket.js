/**
 * Cyber5 Chess Tournament - Bracket View with Real-Time Updates
 * Displays matches in bracket format with live WebSocket synchronization
 */

class ChessBracketDisplay {
    constructor() {
        this.socket = null;
        this.matches = [];
        this.bracketRounds = {};
        this.autoRefresh = true;
        this.updateTimeout = null;
        this.lastUpdate = null;
        
        this.init();
    }

    init() {
        console.log('🎮 Initializing Chess Bracket Display...');
        this.setupEventListeners();
        this.setupWebSocket();
        this.loadInitialData();
    }

    setupEventListeners() {
        document.getElementById('refreshBtn').addEventListener('click', () => {
            this.requestRefresh();
        });

        document.getElementById('toggleAutoRefresh').addEventListener('click', () => {
            this.toggleAutoRefresh();
        });
    }

    setupWebSocket() {
        this.socket = io({
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: Infinity,
            transports: ['websocket', 'polling']
        });

        this.socket.on('connect', () => {
            console.log('✅ WebSocket Connected');
            this.updateConnectionStatus(true);
        });

        this.socket.on('disconnect', () => {
            console.log('❌ WebSocket Disconnected');
            this.updateConnectionStatus(false);
        });

        this.socket.on('connect_error', (error) => {
            console.error('⚠️ WebSocket Error:', error);
            this.updateConnectionStatus(false);
        });

        this.socket.on('initial_data', (data) => {
            console.log('📦 Initial data received:', data);
            this.handleMatchesUpdate(data);
        });

        this.socket.on('matches_updated', (data) => {
            console.log('🔄 Matches updated:', data);
            this.handleMatchesUpdate(data);
            this.showUpdateNotification();
        });
    }

    loadInitialData() {
        fetch('/api/matches')
            .then(response => response.json())
            .then(data => {
                console.log('📥 Initial data from API:', data);
                this.handleMatchesUpdate(data);
            })
            .catch(error => {
                console.error('❌ Error loading initial data:', error);
                this.showEmptyBracket();
            });
    }

    handleMatchesUpdate(data) {
        if (data.matches && Array.isArray(data.matches)) {
            this.matches = data.matches;
            this.lastUpdate = data.timestamp;
            
            // Organize matches into rounds
            this.organizeBracket();
            
            // Render the bracket
            this.renderBracket();
            
            // Update timestamp and stats
            this.updateTimestamp(data.timestamp);
            this.updateMatchStats();
            
            console.log(`📊 Bracket updated: ${this.matches.length} matches organized`);
        }
    }

    organizeBracket() {
        this.bracketRounds = {};
        
        // Group matches by round
        this.matches.forEach(match => {
            const round = match.round || 'Unknown';
            
            if (!this.bracketRounds[round]) {
                this.bracketRounds[round] = [];
            }
            
            this.bracketRounds[round].push(match);
        });

        // Sort rounds numerically
        const sortedRounds = Object.keys(this.bracketRounds).sort((a, b) => {
            const numA = parseInt(a) || Infinity;
            const numB = parseInt(b) || Infinity;
            return numA - numB;
        });

        const sorted = {};
        sortedRounds.forEach(round => {
            sorted[round] = this.bracketRounds[round];
        });
        this.bracketRounds = sorted;
    }

    renderBracket() {
        const container = document.getElementById('bracketContainer');
        
        if (!this.matches || this.matches.length === 0) {
            this.showEmptyBracket();
            return;
        }

        // Create bracket structure
        let bracketHTML = '<div class="bracket-visualization" style="display: flex; gap: 2rem; overflow-x: auto; width: 100%;">';

        Object.entries(this.bracketRounds).forEach(([round, matches], index) => {
            bracketHTML += this.createRoundColumn(round, matches, index);
        });

        bracketHTML += '</div>';
        container.innerHTML = bracketHTML;

        // Add animations
        this.animateMatches();
    }

    createRoundColumn(round, matches, columnIndex) {
        let columnHTML = `<div class="bracket-column" style="animation-delay: ${columnIndex * 0.1}s;">`;
        columnHTML += `<div style="text-align: center; margin-bottom: 1rem; color: var(--accent-gold); font-weight: 700; font-size: 0.9rem;">Round ${round}</div>`;

        matches.forEach((match, matchIndex) => {
            const status = this.getMatchStatus(match);
            const hasWinner = !!match.winner;
            const statusClass = hasWinner ? 'completed' : 'upcoming';
            
            columnHTML += `
                <div class="match-node ${statusClass}" style="animation-delay: ${matchIndex * 0.05}s;">
                    <div class="match-node-id">Match #${this.escapeHtml(String(match.id || 'N/A'))}</div>
                    <div class="match-players">
                        ${this.createPlayerElement(match.player1, match.player1 === match.winner)}
                        <div style="text-align: center; color: var(--text-secondary); font-size: 0.75rem; font-weight: 700; margin: 0.25rem 0;">VS</div>
                        ${this.createPlayerElement(match.player2, match.player2 === match.winner)}
                    </div>
                    <div class="match-status-badge ${statusClass}">
                        ${this.escapeHtml(status)}
                    </div>
                </div>
            `;
        });

        columnHTML += '</div>';
        return columnHTML;
    }

    createPlayerElement(playerName, isWinner) {
        const displayName = playerName || 'TBD';
        const winnerClass = isWinner && displayName !== 'TBD' ? 'winner' : '';
        const winnerBadge = isWinner && displayName !== 'TBD' ? '<span class="winner-badge">👑</span>' : '';
        
        return `
            <div class="player-item ${winnerClass}">
                <span class="player-name">${this.escapeHtml(displayName)}</span>
                ${winnerBadge}
            </div>
        `;
    }

    getMatchStatus(match) {
        if (match.winner && match.winner !== 'TBD') {
            return '✓ COMPLETED';
        }
        if (match.status && match.status.toLowerCase() === 'ongoing') {
            return '▶ ONGOING';
        }
        if (match.status) {
            return match.status.toUpperCase();
        }
        return 'PENDING';
    }

    animateMatches() {
        const matchNodes = document.querySelectorAll('.match-node');
        matchNodes.forEach((node, index) => {
            node.style.animation = `fadeInUp 0.5s ease-out ${index * 0.05}s both`;
        });
    }

    updateConnectionStatus(connected) {
        const statusBadge = document.getElementById('connectionStatus');
        const statusDot = document.getElementById('statusDot');
        const statusLabel = document.getElementById('statusLabel');

        if (connected) {
            statusBadge.classList.add('online');
            statusLabel.textContent = '🟢 Connected';
        } else {
            statusBadge.classList.remove('online');
            statusLabel.textContent = '🔴 Disconnected';
        }
    }

    updateTimestamp(timestamp) {
        const lastUpdateEl = document.getElementById('lastUpdate');
        if (timestamp) {
            try {
                const date = new Date(timestamp);
                const time = date.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true
                });
                lastUpdateEl.textContent = `Updated: ${time}`;
            } catch (e) {
                lastUpdateEl.textContent = 'Updated: --:--:--';
            }
        }
    }

    updateMatchStats() {
        const matchInfoEl = document.getElementById('matchInfo');
        const totalMatches = this.matches.length;
        const completedMatches = this.matches.filter(m => m.winner && m.winner !== 'TBD').length;
        
        matchInfoEl.textContent = `Matches: ${totalMatches} | Winners: ${completedMatches} | Pending: ${totalMatches - completedMatches}`;
    }

    requestRefresh() {
        console.log('🔄 Requesting refresh...');
        if (this.socket && this.socket.connected) {
            this.socket.emit('request_refresh');
        } else {
            this.loadInitialData();
        }
    }

    toggleAutoRefresh() {
        this.autoRefresh = !this.autoRefresh;
        const btn = document.getElementById('toggleAutoRefresh');
        btn.textContent = this.autoRefresh ? '⚡ Auto-Refresh: ON' : '⚡ Auto-Refresh: OFF';
        console.log(`Auto-refresh ${this.autoRefresh ? 'enabled' : 'disabled'}`);
    }

    showUpdateNotification() {
        // Optional: Show a subtle notification that updates occurred
        const container = document.getElementById('bracketContainer');
        if (container) {
            container.style.animation = 'pulse 0.5s ease-in-out';
            setTimeout(() => {
                container.style.animation = 'none';
            }, 500);
        }
    }

    showEmptyBracket() {
        const container = document.getElementById('bracketContainer');
        container.innerHTML = `
            <div class="loading-state">
                <div class="chess-loader">
                    <span class="pawn">♟</span>
                    <span class="pawn">♟</span>
                    <span class="pawn">♟</span>
                </div>
                <p>No matches available. Please ensure the Excel file is properly configured with a "Match Tracker" sheet.</p>
            </div>
        `;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎮 DOM Ready - Starting Bracket Display');
    window.bracketApp = new ChessBracketDisplay();
});

// Add missing animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.7;
        }
    }
`;
document.head.appendChild(style);
