// API Configuration
const API_BASE_URL = 'http://localhost:8080';

let currentShortCode = null;
let deleteTargetCode = null;
let currentAnalyticsCode = null;
let charts = {
    timeline: null,
    device: null,
    browser: null,
    os: null
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadAllUrls();
    setupFormHandler();
    setMinExpirationDate();
});

// Set minimum expiration date to today
function setMinExpirationDate() {
    const dateInput = document.getElementById('expirationDate');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
}

// Setup form submission handler
function setupFormHandler() {
    const form = document.getElementById('createUrlForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await createShortUrl();
    });
}

// Create shortened URL
async function createShortUrl() {
    const originalUrl = document.getElementById('originalUrl').value.trim();
    const customAlias = document.getElementById('customAlias').value.trim();
    const expirationDate = document.getElementById('expirationDate').value;
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();

    // Validate URL
    if (!isValidUrl(originalUrl)) {
        showToast('올바른 URL 형식을 입력해주세요', 'error');
        return;
    }

    const requestData = {
        originalUrl: originalUrl
    };

    if (customAlias) {
        requestData.customAlias = customAlias;
    }
    if (expirationDate) {
        requestData.expirationDate = expirationDate;
    }
    if (title) {
        requestData.title = title;
    }
    if (description) {
        requestData.description = description;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/urls`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || '단축 URL 생성에 실패했습니다');
        }

        const data = await response.json();
        displayResult(data);
        document.getElementById('createUrlForm').reset();
        loadAllUrls();
        showToast('단축 URL이 생성되었습니다!', 'success');
    } catch (error) {
        console.error('Error:', error);
        showToast(error.message, 'error');
    }
}

// Display result
function displayResult(data) {
    currentShortCode = data.shortCode;
    
    document.getElementById('shortUrlDisplay').value = data.shortUrl;
    document.getElementById('originalUrlDisplay').textContent = data.originalUrl;
    document.getElementById('visitShortUrl').href = data.shortUrl;
    document.getElementById('createdAtDisplay').textContent = formatDate(data.createdAt);
    
    // Show/hide optional fields
    if (data.title) {
        document.getElementById('titleDisplay').style.display = 'flex';
        document.querySelector('#titleDisplay .info-value').textContent = data.title;
    } else {
        document.getElementById('titleDisplay').style.display = 'none';
    }
    
    if (data.description) {
        document.getElementById('descriptionDisplay').style.display = 'flex';
        document.querySelector('#descriptionDisplay .info-value').textContent = data.description;
    } else {
        document.getElementById('descriptionDisplay').style.display = 'none';
    }
    
    // Hide QR code if it was shown before
    document.getElementById('qrCodeContainer').style.display = 'none';
    
    document.getElementById('resultSection').style.display = 'block';
    document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth' });
}

// Copy short URL to clipboard
async function copyShortUrl() {
    const shortUrl = document.getElementById('shortUrlDisplay').value;
    
    try {
        await navigator.clipboard.writeText(shortUrl);
        showToast('URL이 클립보드에 복사되었습니다!', 'success');
    } catch (error) {
        const input = document.getElementById('shortUrlDisplay');
        input.select();
        document.execCommand('copy');
        showToast('URL이 클립보드에 복사되었습니다!', 'success');
    }
}

// Show QR code
async function showQRCode() {
    if (!currentShortCode) return;
    
    const qrContainer = document.getElementById('qrCodeContainer');
    const qrImage = document.getElementById('qrCodeImage');
    
    try {
        const qrUrl = `${API_BASE_URL}/api/urls/${currentShortCode}/qr?width=300&height=300`;
        qrImage.src = qrUrl;
        qrContainer.style.display = 'block';
        qrContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (error) {
        console.error('Error loading QR code:', error);
        showToast('QR 코드 로딩에 실패했습니다', 'error');
    }
}

// Download QR code
async function downloadQRCode() {
    if (!currentShortCode) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/urls/${currentShortCode}/qr?width=600&height=600`);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `qr-${currentShortCode}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        showToast('QR 코드가 다운로드되었습니다', 'success');
    } catch (error) {
        console.error('Error downloading QR code:', error);
        showToast('QR 코드 다운로드에 실패했습니다', 'error');
    }
}

// Load all URLs
async function loadAllUrls() {
    const loadingSpinner = document.getElementById('loadingSpinner');
    const urlList = document.getElementById('urlList');
    const emptyState = document.getElementById('emptyState');
    
    loadingSpinner.style.display = 'block';
    urlList.innerHTML = '';
    emptyState.style.display = 'none';
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/urls`);
        
        if (!response.ok) {
            throw new Error('URL 목록을 불러올 수 없습니다');
        }
        
        const urls = await response.json();
        
        loadingSpinner.style.display = 'none';
        
        if (urls.length === 0) {
            emptyState.style.display = 'block';
        } else {
            urls.forEach(url => {
                urlList.appendChild(createUrlItem(url));
            });
        }
    } catch (error) {
        console.error('Error:', error);
        loadingSpinner.style.display = 'none';
        showToast('URL 목록을 불러오는데 실패했습니다', 'error');
    }
}

// Create URL list item
function createUrlItem(url) {
    const item = document.createElement('div');
    item.className = 'url-item';
    
    const title = url.title || '제목 없음';
    const description = url.description ? `<p><strong>설명:</strong> ${escapeHtml(url.description)}</p>` : '';
    const expirationInfo = url.expirationDate ? 
        `<span class="stat-item"><i class="fas fa-calendar-times"></i> 만료: ${formatDate(url.expirationDate)}</span>` : '';
    
    item.innerHTML = `
        <div class="url-item-header">
            <div class="url-item-title">
                <h3>${escapeHtml(title)}</h3>
                <a href="${url.shortUrl}" target="_blank" class="short-url">${url.shortUrl}</a>
            </div>
            <div class="url-item-actions">
                <button class="btn-icon" onclick="copyUrlToClipboard('${url.shortUrl}')" title="복사">
                    <i class="fas fa-copy"></i>
                </button>
                <button class="btn-icon" onclick="openQRCodeModal('${url.shortCode}')" title="QR 코드">
                    <i class="fas fa-qrcode"></i>
                </button>
                <button class="btn-icon" onclick="showAnalytics('${url.shortCode}')" title="통계">
                    <i class="fas fa-chart-line"></i>
                </button>
                <button class="btn-icon delete" onclick="openDeleteModal('${url.shortCode}')" title="삭제">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
        <div class="url-item-details">
            <p><strong>원본 URL:</strong> ${escapeHtml(url.originalUrl)}</p>
            ${description}
        </div>
        <div class="url-item-stats">
            <span class="stat-item">
                <i class="fas fa-mouse-pointer"></i> 
                클릭: ${url.clickCount || 0}
            </span>
            <span class="stat-item">
                <i class="fas fa-clock"></i> 
                생성: ${formatDate(url.createdAt)}
            </span>
            ${expirationInfo}
        </div>
    `;
    
    return item;
}

// Copy URL to clipboard
async function copyUrlToClipboard(url) {
    try {
        await navigator.clipboard.writeText(url);
        showToast('URL이 클립보드에 복사되었습니다!', 'success');
    } catch (error) {
        showToast('복사에 실패했습니다', 'error');
    }
}

// Open QR code in new window
function openQRCodeModal(shortCode) {
    const qrUrl = `${API_BASE_URL}/api/urls/${shortCode}/qr?width=400&height=400`;
    window.open(qrUrl, '_blank', 'width=450,height=500');
}

// Open delete confirmation modal
function openDeleteModal(shortCode) {
    deleteTargetCode = shortCode;
    document.getElementById('deleteModal').classList.add('show');
}

// Close delete modal
function closeDeleteModal() {
    deleteTargetCode = null;
    document.getElementById('deleteModal').classList.remove('show');
}

// Confirm delete
async function confirmDelete() {
    if (!deleteTargetCode) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/urls/${deleteTargetCode}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('삭제에 실패했습니다');
        }
        
        showToast('URL이 삭제되었습니다', 'success');
        closeDeleteModal();
        loadAllUrls();
    } catch (error) {
        console.error('Error:', error);
        showToast(error.message, 'error');
    }
}

// ============= ANALYTICS FUNCTIONS =============

// Show analytics modal
async function showAnalytics(shortCode) {
    currentAnalyticsCode = shortCode;
    const modal = document.getElementById('analyticsModal');
    const loading = document.getElementById('analyticsLoading');
    const data = document.getElementById('analyticsData');
    
    modal.classList.add('show');
    loading.style.display = 'block';
    data.style.display = 'none';
    
    try {
        await loadAnalyticsData(shortCode);
        loading.style.display = 'none';
        data.style.display = 'block';
    } catch (error) {
        console.error('Error loading analytics:', error);
        showToast('통계 데이터를 불러오는데 실패했습니다', 'error');
        closeAnalyticsModal();
    }
}

// Close analytics modal
function closeAnalyticsModal() {
    const modal = document.getElementById('analyticsModal');
    modal.classList.remove('show');
    currentAnalyticsCode = null;
    
    // Destroy all charts
    Object.keys(charts).forEach(key => {
        if (charts[key]) {
            charts[key].destroy();
            charts[key] = null;
        }
    });
}

// Load analytics data
async function loadAnalyticsData(shortCode) {
    try {
        // Load overview data
        const overviewResponse = await fetch(`${API_BASE_URL}/api/analytics/${shortCode}`);
        if (!overviewResponse.ok) throw new Error('Failed to load analytics overview');
        const overview = await overviewResponse.json();
        
        // Update summary cards
        document.getElementById('totalClicks').textContent = overview.totalClicks.toLocaleString();
        document.getElementById('todayClicks').textContent = overview.clicksToday.toLocaleString();
        document.getElementById('weekClicks').textContent = overview.clicksThisWeek.toLocaleString();
        document.getElementById('monthClicks').textContent = overview.clicksThisMonth.toLocaleString();
        
        // Load charts
        await loadTimelineChart(shortCode, 'daily', 30);
        await loadDeviceChart(shortCode);
        await loadBrowserChart(shortCode);
        await loadOSChart(shortCode);
        await loadLocationStats(shortCode);
        
    } catch (error) {
        console.error('Error loading analytics data:', error);
        throw error;
    }
}

// Load timeline chart
async function loadTimelineChart(shortCode, granularity, days) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/analytics/${shortCode}/timeline?granularity=${granularity}&days=${days}`);
        if (!response.ok) throw new Error('Failed to load timeline data');
        const data = await response.json();
        
        const ctx = document.getElementById('timelineChart');
        
        if (charts.timeline) {
            charts.timeline.destroy();
        }
        
        charts.timeline = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.dataPoints.map(point => {
                    const date = new Date(point.timestamp);
                    if (granularity === 'hourly') {
                        return date.toLocaleString('ko-KR', { month: 'short', day: 'numeric', hour: '2-digit' });
                    } else {
                        return date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
                    }
                }),
                datasets: [{
                    label: '클릭 수',
                    data: data.dataPoints.map(point => point.count),
                    borderColor: '#4a90e2',
                    backgroundColor: 'rgba(74, 144, 226, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error loading timeline chart:', error);
    }
}

// Update timeline chart with different time range
async function updateTimelineChart(granularity, days) {
    if (!currentAnalyticsCode) return;
    
    // Update button states
    document.querySelectorAll('.btn-chart-option').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    await loadTimelineChart(currentAnalyticsCode, granularity, days);
}

// Load device chart
async function loadDeviceChart(shortCode) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/analytics/${shortCode}/devices`);
        if (!response.ok) throw new Error('Failed to load device data');
        const data = await response.json();
        
        const ctx = document.getElementById('deviceChart');
        
        if (charts.device) {
            charts.device.destroy();
        }
        
        charts.device = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(data),
                datasets: [{
                    data: Object.values(data),
                    backgroundColor: [
                        '#4a90e2',
                        '#50c878',
                        '#ffc107',
                        '#dc3545',
                        '#6c757d'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error loading device chart:', error);
    }
}

// Load browser chart
async function loadBrowserChart(shortCode) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/analytics/${shortCode}/browsers`);
        if (!response.ok) throw new Error('Failed to load browser data');
        const data = await response.json();
        
        const ctx = document.getElementById('browserChart');
        
        if (charts.browser) {
            charts.browser.destroy();
        }
        
        charts.browser = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(data),
                datasets: [{
                    data: Object.values(data),
                    backgroundColor: [
                        '#ff6384',
                        '#36a2eb',
                        '#ffce56',
                        '#4bc0c0',
                        '#9966ff',
                        '#ff9f40'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error loading browser chart:', error);
    }
}

// Load OS chart
async function loadOSChart(shortCode) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/analytics/${shortCode}/os`);
        if (!response.ok) throw new Error('Failed to load OS data');
        const data = await response.json();
        
        const ctx = document.getElementById('osChart');
        
        if (charts.os) {
            charts.os.destroy();
        }
        
        charts.os = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(data),
                datasets: [{
                    data: Object.values(data),
                    backgroundColor: [
                        '#28a745',
                        '#17a2b8',
                        '#ffc107',
                        '#dc3545',
                        '#6610f2',
                        '#fd7e14'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error loading OS chart:', error);
    }
}

// Load location stats
async function loadLocationStats(shortCode) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/analytics/${shortCode}/locations`);
        if (!response.ok) throw new Error('Failed to load location data');
        const data = await response.json();
        
        const locationList = document.getElementById('locationList');
        locationList.innerHTML = '';
        
        const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
        const total = Object.values(data).reduce((sum, count) => sum + count, 0);
        
        if (entries.length === 0) {
            locationList.innerHTML = '<p class="no-data">통계 데이터가 없습니다</p>';
            return;
        }
        
        entries.forEach(([location, count]) => {
            const percentage = ((count / total) * 100).toFixed(1);
            const item = document.createElement('div');
            item.className = 'location-item';
            item.innerHTML = `
                <div class="location-info">
                    <span class="location-name">${escapeHtml(location)}</span>
                    <span class="location-count">${count.toLocaleString()} (${percentage}%)</span>
                </div>
                <div class="location-bar">
                    <div class="location-bar-fill" style="width: ${percentage}%"></div>
                </div>
            `;
            locationList.appendChild(item);
        });
    } catch (error) {
        console.error('Error loading location stats:', error);
    }
}

// ============= UTILITY FUNCTIONS =============

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Validate URL
function isValidUrl(string) {
    try {
        const url = new URL(string);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch (_) {
        return false;
    }
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('ko-KR', options);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const deleteModal = document.getElementById('deleteModal');
    const analyticsModal = document.getElementById('analyticsModal');
    
    if (event.target === deleteModal) {
        closeDeleteModal();
    }
    if (event.target === analyticsModal) {
        closeAnalyticsModal();
    }
}

// Handle Escape key to close modals
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeDeleteModal();
        closeAnalyticsModal();
    }
});
