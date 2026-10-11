// Fallback Toast Notification system
function showToast(message) {
    alert(message); // Fallback if custom toast container isn't in DOM
}

// Services Filter Logic
function filterServices(category, buttonEl) {
    const items = document.querySelectorAll('.service-item');
    
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    if (buttonEl) buttonEl.classList.add('active');

    items.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (category === 'all' || itemCategory === category) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
}

// Service Calculator Logic
function calculateCost() {
    const basePrice = parseFloat(document.getElementById('calc-service').value) || 0;
    const urgencyMultiplier = parseFloat(document.getElementById('calc-urgency').value) || 1;
    
    let addonsTotal = 0;
    document.querySelectorAll('.addon:checked').forEach(addon => {
        addonsTotal += parseFloat(addon.value);
    });

    const total = (basePrice * urgencyMultiplier) + addonsTotal;
    document.getElementById('calc-total').innerText = `$${total.toFixed(2)}`;
}

// Service Booking Modal Logic
let currentSelectedService = '';

function openBookingModal(serviceName) {
    currentSelectedService = serviceName;
    const modalTitle = document.getElementById('booking-modal-title');
    if (modalTitle) {
        modalTitle.innerText = `Book: ${serviceName}`;
    }
    const modal = document.getElementById('booking-modal');
    if (modal) modal.classList.add('active');
}

function closeBookingModal() {
    const modal = document.getElementById('booking-modal');
    if (modal) modal.classList.remove('active');
}

function bookEstimatedPackage() {
    const serviceSelect = document.getElementById('calc-service');
    const selectedText = serviceSelect.options[serviceSelect.selectedIndex].text.split('(')[0].trim();
    const totalAmount = document.getElementById('calc-total').innerText;
    
    openBookingModal(`${selectedText} Package (${totalAmount})`);
}

function submitBooking(event) {
    event.preventDefault();
    closeBookingModal();
    
    // Increment synchronized cart count in localStorage across all pages
    if (typeof addToCart === 'function') {
        addToCart(1);
    }
    
    showToast(`Booking submitted for ${currentSelectedService || 'Service'}! Our team will contact you shortly.`);
}