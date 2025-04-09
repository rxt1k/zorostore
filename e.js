document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart from localStorage or empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.querySelector('.cart-count');
    
    // Update cart count on page load
    updateCartCount();
    
    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productId = productCard.getAttribute('data-id') || Date.now().toString();
            const productName = productCard.querySelector('.product-title').textContent;
            const productPrice = parseFloat(productCard.querySelector('.current-price').textContent.replace('₹', ''));
            
            addToCart(productId, productName, productPrice, this);
        });
    });
    
    // Add to cart function
    function addToCart(id, name, price, button) {
        // Check if item already exists in cart
        const existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: id,
                name: name,
                price: price,
                quantity: 1
            });
        }
        
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart count
        updateCartCount();
        
        // Provide visual feedback
        if (button) {
            const originalText = button.textContent;
            button.textContent = 'Added to Cart!';
            button.style.backgroundColor = '#218838';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = '';
            }, 2000);
        }
    }
    
    // Update cart count
    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCount) {
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }
    
    // Quick view functionality
    document.querySelectorAll('.quick-view').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            // Implement quick view modal here
            alert('Quick view feature would show details for: ' + productCard.querySelector('.product-title').textContent);
        });
    });
    
    // Wishlist functionality
    document.querySelectorAll('.add-to-wishlist').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            this.classList.toggle('fas');
            this.classList.toggle('far');
            
            if (this.classList.contains('fas')) {
                alert('Added to wishlist: ' + productCard.querySelector('.product-title').textContent);
            }
        });
    });
    
    // Mobile menu toggle (would need HTML element)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            document.querySelector('.main-nav').classList.toggle('active');
        });
    }
});