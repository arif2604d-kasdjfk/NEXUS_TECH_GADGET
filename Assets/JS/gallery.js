// Product Dataset for Lightbox Modal Details
const productsData = {
    1: {
        title: "SonicPro Wireless Headphones",
        category: "Audio",
        price: "$299.99",
        numericPrice: 299.99,
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        description: "Experience silence like never before with Active Noise Cancellation (ANC) and custom 40mm titanium drivers.",
        specs: ["40-Hour Battery Life with Fast Charge", "Bluetooth 5.3 Low Latency", "Adaptive Spatial Audio Support"]
    },
    2: {
        title: "Aura Smartwatch V2",
        category: "Wearables",
        price: "$199.99",
        numericPrice: 199.99,
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
        description: "Track your health with medical-grade ECG sensor, continuous SpO2 readings, and ultra-bright AMOLED display.",
        specs: ["50m Waterproofing (5 ATM)", "Always-On Retina AMOLED Screen", "Up to 10 Days Battery Life"]
    },
    3: {
        title: "Nexus Vision Pro VR",
        category: "VR & AR",
        price: "$799.99",
        numericPrice: 799.99,
        rating: "5.0",
        image: "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=800&q=80",
        description: "Step into ultra-realistic virtual worlds with dual 4K micro-OLED screens and low-latency eye tracking.",
        specs: ["Dual 8K Combined Resolution", "120Hz Refresh Rate", "Precision Spatial Haptics"]
    },
    4: {
        title: "SkyHawk 4K Drone",
        category: "Drones",
        price: "$499.99",
        numericPrice: 499.99,
        rating: "4.7",
        image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80",
        description: "Capture stunning aerial video with 3-axis gimbal stabilization and intelligent obstacle detection.",
        specs: ["4K HDR 60fps Recording", "10km Transmission Range", "38-Min Flight Time Per Battery"]
    },
    5: {
        title: "Pulse Soundbar Ultra",
        category: "Audio",
        price: "$149.99",
        numericPrice: 149.99,
        rating: "4.6",
        image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80",
        description: "Transform your living room into a theater with immersive 3D Dolby Atmos acoustics.",
        specs: ["Wireless Subwoofer Included", "HDMI eARC & Optical Inputs", "Built-In Voice Assistant"]
    },
    6: {
        title: "Omni Smart Hub Controller",
        category: "Smart Home",
        price: "$129.99",
        numericPrice: 129.99,
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&w=800&q=80",
        description: "Seamlessly integrate and automate all smart lights, security cameras, and climate systems.",
        specs: ["7-inch HD Touchscreen Panel", "Supports Zigbee, Matter, & Z-Wave", "Local Privacy Encryption"]
    },
    7: {
        title: "Aero AR Smart Glasses",
        category: "VR & AR",
        price: "$349.99",
        numericPrice: 349.99,
        rating: "4.5",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
        description: "Lightweight HUD glasses bringing navigation, notifications, and media streaming right to your eyes.",
        specs: ["Micro-LED Waveguide Projection", "Integrated Open-Ear Audio Speakers", "Ultra-Lightweight 75g Frame"]
    },
    8: {
        title: "Titan Fitness Ring",
        category: "Wearables",
        price: "$89.99",
        numericPrice: 89.99,
        rating: "4.4",
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
        description: "Sleek titanium smart ring for 24/7 recovery monitoring, HRV readings, and sleep cycle mapping.",
        specs: ["Titanium Water Resistant Shell", "7-Day Continuous Battery", "No Monthly Subscription Required"]
    }
};

let currentCategory = 'all';

// Function to update cart UI badge across pages
function updateCartUI() {
    const savedCount = localStorage.getItem('nexus_cart_count') || 0;
    const countEl = document.getElementById('cart-count');
    if (countEl) countEl.innerText = savedCount;
}

// Synced Cart Logic with localStorage
function addToCart(productName, price) {
    let currentCount = parseInt(localStorage.getItem('nexus_cart_count')) || 0;
    currentCount++;
    
    // Persist new total in localStorage
    localStorage.setItem('nexus_cart_count', currentCount);

    // Update header badge UI immediately
    updateCartUI();

    // Trigger toast notification
    showToast(`${productName} added to your cart!`);
}

// Custom Toast Notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerText = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Automatically sync cart count when Gallery page loads
document.addEventListener('DOMContentLoaded', updateCartUI);

// Category Filter Logic
function filterCategory(category, buttonEl) {
    currentCategory = category;

    // Update active tab style
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    if (buttonEl) buttonEl.classList.add('active');

    filterGallery();
}

// Combined Search & Category Filter
function filterGallery() {
    const searchInput = document.getElementById('gallery-search').value.toLowerCase();
    const items = document.querySelectorAll('.gallery-item');
    let visibleCount = 0;

    items.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        const itemTitle = item.getAttribute('data-title').toLowerCase();

        const matchesCategory = (currentCategory === 'all' || itemCategory === currentCategory);
        const matchesSearch = itemTitle.includes(searchInput);

        if (matchesCategory && matchesSearch) {
            item.classList.remove('hidden');
            visibleCount++;
        } else {
            item.classList.add('hidden');
        }
    });

    // Toggle Empty State Message
    const noResults = document.getElementById('no-results');
    if (visibleCount === 0) {
        noResults.classList.remove('hidden');
    } else {
        noResults.classList.add('hidden');
    }
}

// Sorting Logic
function sortGallery() {
    const sortValue = document.getElementById('sort-select').value;
    const grid = document.getElementById('gallery-grid');
    const items = Array.from(grid.getElementsByClassName('gallery-item'));

    items.sort((a, b) => {
        const priceA = parseFloat(a.getAttribute('data-price'));
        const priceB = parseFloat(b.getAttribute('data-price'));
        const ratingA = parseFloat(a.getAttribute('data-rating'));
        const ratingB = parseFloat(b.getAttribute('data-rating'));

        if (sortValue === 'price-low') {
            return priceA - priceB;
        } else if (sortValue === 'price-high') {
            return priceB - priceA;
        } else if (sortValue === 'rating') {
            return ratingB - ratingA;
        } else {
            return 0; // default layout order
        }
    });

    // Re-append sorted cards back into grid
    items.forEach(item => grid.appendChild(item));
}

// Quick View Lightbox Modal Logic
function openModal(productId) {
    const data = productsData[productId];
    if (!data) return;

    document.getElementById('modal-img').src = data.image;
    document.getElementById('modal-category').innerText = data.category;
    document.getElementById('modal-title').innerText = data.title;
    document.getElementById('modal-rating').innerHTML = `<i class="fa-solid fa-star"></i> ${data.rating}`;
    document.getElementById('modal-price').innerText = data.price;
    document.getElementById('modal-description').innerText = data.description;

    // Render Tech Specs
    const specsContainer = document.getElementById('modal-specs');
    specsContainer.innerHTML = '';
    data.specs.forEach(spec => {
        const li = document.createElement('li');
        li.innerText = spec;
        specsContainer.appendChild(li);
    });

    // Configure Add Button in Modal
    const addBtn = document.getElementById('modal-add-btn');
    addBtn.onclick = function() {
        addToCart(data.title, data.numericPrice);
        closeModal();
    };

    document.getElementById('product-modal').classList.add('active');
}

function closeModal() {
    document.getElementById('product-modal').classList.remove('active');
}

// Close Modal when clicking outer backdrop
window.onclick = function(event) {
    const modal = document.getElementById('product-modal');
    if (event.target === modal) {
        closeModal();
    }
};