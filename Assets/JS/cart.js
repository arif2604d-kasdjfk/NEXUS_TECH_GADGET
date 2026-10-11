// Function to update cart badge UI with pure numeric value
function updateCartUI() {
    // Force conversion to integer so strings never get stored
    const savedCount = parseInt(localStorage.getItem('nexus_cart_count'), 10) || 0;
    
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.innerText = savedCount;
    }
}

// Global Add To Cart Function
function addToCart(productName = 'Item') {
    // Retrieve current count and force it to be a Number
    let currentCount = parseInt(localStorage.getItem('nexus_cart_count'), 10) || 0;
    
    // Add 1 to the count
    currentCount += 1;
    
    // Save updated total back to localStorage
    localStorage.setItem('nexus_cart_count', currentCount);
    
    // Refresh the UI badge immediately
    updateCartUI();
    
    // Display toast notification if function exists, else fallback to alert
    if (typeof showToast === 'function') {
        showToast(`${productName} added to your cart!`);
    } else {
        alert(`${productName} added to your cart!`);
    }
}

// Automatically sync cart count when page loads
document.addEventListener('DOMContentLoaded', updateCartUI);