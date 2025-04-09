// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to render cart items
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
        document.getElementById('total-price').innerText = 'Total: ₹0.00';
        return;
    }

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: ₹${item.price.toFixed(2)}</p>
            <div class="quantity-control">
                <label>Quantity:</label>
                <input type="number" value="${item.quantity}" min="1" 
                       onchange="updateQuantity(${item.id}, this.value)">
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            <p>Item Total: ₹${itemTotal.toFixed(2)}</p>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });

    document.getElementById('total-price').innerText = `Total: ₹${totalPrice.toFixed(2)}`;
}

// Function to update quantity
function updateQuantity(id, quantity) {
    const newQuantity = parseInt(quantity);
    if (isNaN(newQuantity) || newQuantity < 1) return;

    const item = cart.find(item => item.id == id); // Use == for string/number comparison
    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
}

// Function to remove item from cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id != id); // Use != for string/number comparison
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Function to place order
document.getElementById('order-button').addEventListener('click', function() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    alert('Order placed successfully!');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
});

// Initial render
renderCart();