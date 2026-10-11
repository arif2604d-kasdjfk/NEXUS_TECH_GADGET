// Function to update cart UI across any page
function updateCartUI() {
    const savedCount = localStorage.getItem('nexus_cart_count') || 0;
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.innerText = savedCount;
    }
}

// Synced Add to Cart Function
function addToCart(productName = 'Item') {
    let currentCount = parseInt(localStorage.getItem('nexus_cart_count')) || 0;
    currentCount++;
    
    // Save new total to localStorage
    localStorage.setItem('nexus_cart_count', currentCount);
    
    // Update the button badge instantly
    updateCartUI();
    
    // Quick notification alert
    alert(`${productName} added to your cart!`);
}

// Automatically sync cart count on page load
document.addEventListener('DOMContentLoaded', updateCartUI);

// Smooth scrolling for anchor navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});