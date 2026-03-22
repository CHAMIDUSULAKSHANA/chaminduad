// E-Commerce JavaScript Functionality
let products = [];
let cart = [];
let currentProduct = null;
let selectedColor = '';
let selectedQuantity = 1;
let currentImageIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

// Hide welcome screen
function hideWelcomeScreen() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    welcomeScreen.classList.add('hidden');
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
    }, 500);
}

// Auto-hide welcome screen after 3 seconds
setTimeout(() => {
    const welcomeScreen = document.getElementById('welcomeScreen');
    if (welcomeScreen && !welcomeScreen.classList.contains('hidden')) {
        hideWelcomeScreen();
    }
}, 3000);

// Sample product data with multiple images
const sampleProducts = [
    {
        id: 1,
        name: "Wireless Headphones Pro",
        price: 8999,
        category: "headphones",
        images: [
            "https://picsum.photos/seed/headphones1/400/400",
            "https://picsum.photos/seed/headphones1-2/400/400",
            "https://picsum.photos/seed/headphones1-3/400/400",
            "https://picsum.photos/seed/headphones1-4/400/400"
        ],
        colors: ["Black", "White", "Blue"],
        description: "Premium wireless headphones with noise cancellation"
    },
    {
        id: 2,
        name: "Power Bank 10000mAh",
        price: 2499,
        category: "powerbanks",
        images: [
            "https://picsum.photos/seed/powerbank1/400/400",
            "https://picsum.photos/seed/powerbank1-2/400/400",
            "https://picsum.photos/seed/powerbank1-3/400/400"
        ],
        colors: ["Black", "White", "Red"],
        description: "High-capacity portable power bank"
    },
    {
        id: 3,
        name: "Fast Charger 65W",
        price: 3299,
        category: "chargers",
        images: [
            "https://picsum.photos/seed/charger1/400/400",
            "https://picsum.photos/seed/charger1-2/400/400",
            "https://picsum.photos/seed/charger1-3/400/400"
        ],
        colors: ["Black", "White"],
        description: "USB-C fast charger with multiple ports"
    },
    {
        id: 4,
        name: "Smart Watch Ultra",
        price: 15999,
        category: "smartwatches",
        images: [
            "https://picsum.photos/seed/watch1/400/400",
            "https://picsum.photos/seed/watch1-2/400/400",
            "https://picsum.photos/seed/watch1-3/400/400",
            "https://picsum.photos/seed/watch1-4/400/400",
            "https://picsum.photos/seed/watch1-5/400/400"
        ],
        colors: ["Black", "Silver", "Rose Gold"],
        description: "Advanced fitness and health tracking smartwatch"
    },
    {
        id: 5,
        name: "Bluetooth Speaker Mini",
        price: 4999,
        category: "speakers",
        images: [
            "https://picsum.photos/seed/speaker1/400/400",
            "https://picsum.photos/seed/speaker1-2/400/400",
            "https://picsum.photos/seed/speaker1-3/400/400"
        ],
        colors: ["Black", "Blue", "Red", "Green"],
        description: "Portable waterproof bluetooth speaker"
    },
    {
        id: 6,
        name: "USB-C Cable 2m",
        price: 799,
        category: "cables",
        images: [
            "https://picsum.photos/seed/cable1/400/400",
            "https://picsum.photos/seed/cable1-2/400/400"
        ],
        colors: ["Black", "White", "Red"],
        description: "Durable fast-charging USB-C cable"
    },
    {
        id: 7,
        name: "Phone Case Premium",
        price: 1299,
        category: "cases",
        images: [
            "https://picsum.photos/seed/case1/400/400",
            "https://picsum.photos/seed/case1-2/400/400",
            "https://picsum.photos/seed/case1-3/400/400",
            "https://picsum.photos/seed/case1-4/400/400"
        ],
        colors: ["Black", "Clear", "Blue", "Pink"],
        description: "Shockproof phone case with screen protector"
    },
    {
        id: 8,
        name: "Gaming Headset",
        price: 6999,
        category: "headphones",
        images: [
            "https://picsum.photos/seed/headphones2/400/400",
            "https://picsum.photos/seed/headphones2-2/400/400",
            "https://picsum.photos/seed/headphones2-3/400/400"
        ],
        colors: ["Red", "Black", "Blue"],
        description: "RGB gaming headset with microphone"
    },
    {
        id: 9,
        name: "Power Bank 20000mAh",
        price: 4499,
        category: "powerbanks",
        images: [
            "https://picsum.photos/seed/powerbank2/400/400",
            "https://picsum.photos/seed/powerbank2-2/400/400",
            "https://picsum.photos/seed/powerbank2-3/400/400"
        ],
        colors: ["Black", "White"],
        description: "Ultra high-capacity power bank"
    },
    {
        id: 10,
        name: "Wireless Charger",
        price: 1999,
        category: "chargers",
        images: [
            "https://picsum.photos/seed/charger2/400/400",
            "https://picsum.photos/seed/charger2-2/400/400"
        ],
        colors: ["Black", "White"],
        description: "Fast wireless charging pad"
    },
    {
        id: 11,
        name: "Fitness Tracker",
        price: 7999,
        category: "smartwatches",
        images: [
            "https://picsum.photos/seed/watch2/400/400",
            "https://picsum.photos/seed/watch2-2/400/400",
            "https://picsum.photos/seed/watch2-3/400/400"
        ],
        colors: ["Black", "Pink", "Blue"],
        description: "Lightweight fitness and activity tracker"
    },
    {
        id: 12,
        name: "Party Speaker 50W",
        price: 12999,
        category: "speakers",
        images: [
            "https://picsum.photos/seed/speaker2/400/400",
            "https://picsum.photos/seed/speaker2-2/400/400",
            "https://picsum.photos/seed/speaker2-3/400/400",
            "https://picsum.photos/seed/speaker2-4/400/400"
        ],
        colors: ["Black", "Multi-color"],
        description: "High-power party speaker with LED lights"
    }
];

// Load categories from localStorage and render them
function loadAndRenderCategories() {
    const storedCategories = localStorage.getItem('categories');
    let categories = [];
    
    if (storedCategories) {
        categories = JSON.parse(storedCategories);
    } else {
        // Default categories
        categories = [
            { id: 'all', name: 'All' },
            { id: 'headphones', name: 'Headphones' },
            { id: 'powerbanks', name: 'Power Banks' },
            { id: 'chargers', name: 'Chargers' },
            { id: 'smartwatches', name: 'Smart Watches' },
            { id: 'speakers', name: 'Speakers' },
            { id: 'cables', name: 'Cables' },
            { id: 'cases', name: 'Phone Cases' }
        ];
        localStorage.setItem('categories', JSON.stringify(categories));
    }
    
    renderCategories(categories);
}

// Render categories in the category container
function renderCategories(categories) {
    const container = document.getElementById('categoryContainer');
    if (!container) return;
    
    container.innerHTML = '';
    categories.forEach((category, index) => {
        const btn = document.createElement('button');
        btn.className = 'category-btn' + (index === 0 ? ' active' : '');
        btn.dataset.category = category.id;
        btn.textContent = category.name;
        btn.addEventListener('click', function() {
            const cat = this.dataset.category;
            filterProducts(cat);
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
        container.appendChild(btn);
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadAndRenderCategories();
    loadProducts();
    loadCart();
    setupEventListeners();
});

// Load products from localStorage or use sample data
function loadProducts() {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
        products = JSON.parse(storedProducts);
        
        // Migrate old products to new format
        let needsUpdate = false;
        products.forEach(product => {
            if (product.image && !product.images) {
                product.images = [product.image];
                delete product.image;
                needsUpdate = true;
            }
        });
        
        if (needsUpdate) {
            localStorage.setItem('products', JSON.stringify(products));
        }
    } else {
        products = sampleProducts;
        localStorage.setItem('products', JSON.stringify(products));
    }
    displayProducts('all');
}

// Load cart from localStorage
function loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCartUI();
    }
}

// Setup event listeners
function setupEventListeners() {
    // Category buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            filterProducts(category);
            
            // Update active state
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchProducts(this.value);
        });
    }

    // Checkout form
    document.getElementById('checkoutForm').addEventListener('submit', function(e) {
        e.preventDefault();
        submitOrder();
    });

    // Quantity input validation
    document.getElementById('quantity').addEventListener('input', function() {
        if (this.value < 1) this.value = 1;
        if (this.value > 10) this.value = 10;
        selectedQuantity = parseInt(this.value);
    });
    
    // Modal overlay click to close
    document.getElementById('productModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        const modal = document.getElementById('productModal');
        if (modal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowLeft' && currentProduct && currentProduct.images.length > 1) {
                prevImage();
            } else if (e.key === 'ArrowRight' && currentProduct && currentProduct.images.length > 1) {
                nextImage();
            }
        }
    });
}

// Display products
function displayProducts(category = 'all') {
    const productsGrid = document.getElementById('productsGrid');
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);
    
    productsGrid.innerHTML = '';
    
    filteredProducts.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.style.animationDelay = `${index * 0.1}s`;
        
        productCard.innerHTML = `
            <img src="${product.images[0]}" alt="${product.name}" class="product-image" onclick="openProductModal(${product.id})">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">Rs. ${product.price.toLocaleString()}</div>
                <button class="view-add-btn" onclick="openProductModal(${product.id})">
                    View / Add
                </button>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
}

// Filter products by category
function filterProducts(category) {
    displayProducts(category);
}

// Open product modal
function openProductModal(productId) {
    currentProduct = products.find(p => p.id === productId);
    if (!currentProduct) return;
    
    // Reset selections
    selectedColor = currentProduct.colors[0] || '';
    selectedQuantity = 1;
    currentImageIndex = 0;
    document.getElementById('quantity').value = 1;
    
    // Update modal content
    document.getElementById('modalTitle').textContent = currentProduct.name;
    document.getElementById('modalPrice').textContent = `Rs. ${currentProduct.price.toLocaleString()}`;
    
    // Setup image gallery
    setupImageGallery();
    
    // Update color options
    const colorOptions = document.getElementById('colorOptions');
    colorOptions.innerHTML = '';
    currentProduct.colors.forEach(color => {
        const colorBtn = document.createElement('button');
        colorBtn.className = 'variation-option';
        colorBtn.textContent = color;
        colorBtn.onclick = () => selectColor(color);
        if (color === selectedColor) {
            colorBtn.classList.add('selected');
        }
        colorOptions.appendChild(colorBtn);
    });
    
    // Render custom variations if they exist
    const customVariationsContainer = document.getElementById('customVariationsContainer');
    customVariationsContainer.innerHTML = '';
    if (currentProduct.variations && Object.keys(currentProduct.variations).length > 0) {
        Object.entries(currentProduct.variations).forEach(([variationName, variationValues]) => {
            const variationSection = document.createElement('div');
            variationSection.className = 'variation-section';
            variationSection.innerHTML = `
                <label>${variationName}:</label>
                <div class="variation-options" id="variation-${variationName}"></div>
            `;
            customVariationsContainer.appendChild(variationSection);
            
            const variationOptions = variationSection.querySelector('.variation-options');
            variationValues.forEach((value, index) => {
                const valueBtn = document.createElement('button');
                valueBtn.className = 'variation-option';
                valueBtn.textContent = value;
                valueBtn.onclick = () => selectVariation(variationName, value, valueBtn);
                if (index === 0) {
                    valueBtn.classList.add('selected');
                }
                variationOptions.appendChild(valueBtn);
            });
        });
    }
    
    // Show modal
    document.getElementById('productModal').classList.add('active');
    
    // Setup touch events for swipe
    setupTouchEvents();
}

// Select color variation
function selectColor(color) {
    selectedColor = color;
    document.querySelectorAll('#colorOptions .variation-option').forEach(btn => {
        btn.classList.remove('selected');
        if (btn.textContent === color) {
            btn.classList.add('selected');
        }
    });
}

// Select custom variation
function selectVariation(variationName, value, btnElement) {
    // Remove selected class from all options in the same variation group
    const variationContainer = document.getElementById(`variation-${variationName}`);
    if (variationContainer) {
        variationContainer.querySelectorAll('.variation-option').forEach(btn => {
            btn.classList.remove('selected');
        });
    }
    // Add selected class to clicked button
    btnElement.classList.add('selected');
}

// Setup image gallery
function setupImageGallery() {
    const gallerySlider = document.getElementById('gallerySlider');
    const galleryIndicators = document.getElementById('galleryIndicators');
    
    // Clear existing content
    gallerySlider.innerHTML = '';
    galleryIndicators.innerHTML = '';
    
    // Create slides
    currentProduct.images.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = `gallery-slide ${index === 0 ? 'active' : ''}`;
        slide.innerHTML = `<img src="${image}" alt="${currentProduct.name} - Image ${index + 1}">`;
        gallerySlider.appendChild(slide);
        
        // Create indicator dot
        const dot = document.createElement('button');
        dot.className = `gallery-dot ${index === 0 ? 'active' : ''}`;
        dot.onclick = () => goToImage(index);
        galleryIndicators.appendChild(dot);
    });
    
    // Show/hide navigation buttons based on image count
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (currentProduct.images.length <= 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        galleryIndicators.style.display = 'none';
    } else {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
        galleryIndicators.style.display = 'flex';
    }
}

// Navigate to specific image
function goToImage(index) {
    const slides = document.querySelectorAll('.gallery-slide');
    const dots = document.querySelectorAll('.gallery-dot');
    
    // Remove active classes
    slides.forEach(slide => slide.classList.remove('active', 'prev'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active classes to new image
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    
    // Set previous slide for transition effect
    if (index > 0) {
        slides[index - 1].classList.add('prev');
    }
    
    currentImageIndex = index;
}

// Previous image
function prevImage() {
    const newIndex = currentImageIndex === 0 ? currentProduct.images.length - 1 : currentImageIndex - 1;
    goToImage(newIndex);
}

// Next image
function nextImage() {
    const newIndex = currentImageIndex === currentProduct.images.length - 1 ? 0 : currentImageIndex + 1;
    goToImage(newIndex);
}

// Setup touch events for swipe gestures
function setupTouchEvents() {
    const gallerySlider = document.getElementById('gallerySlider');
    
    gallerySlider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    gallerySlider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipeGesture();
    }, { passive: true });
}

// Handle swipe gesture
function handleSwipeGesture() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next image
            nextImage();
        } else {
            // Swipe right - previous image
            prevImage();
        }
    }
}

// Close modal
function closeModal() {
    document.getElementById('productModal').classList.remove('active');
    currentProduct = null;
    currentImageIndex = 0;
}

// Quantity controls
function increaseQty() {
    const qtyInput = document.getElementById('quantity');
    if (qtyInput.value < 10) {
        qtyInput.value = parseInt(qtyInput.value) + 1;
        selectedQuantity = parseInt(qtyInput.value);
    }
}

function decreaseQty() {
    const qtyInput = document.getElementById('quantity');
    if (qtyInput.value > 1) {
        qtyInput.value = parseInt(qtyInput.value) - 1;
        selectedQuantity = parseInt(qtyInput.value);
    }
}

// Add to cart
function addToCart() {
    if (!currentProduct) return;
    
    const cartItem = {
        id: currentProduct.id,
        name: currentProduct.name,
        price: currentProduct.price,
        color: selectedColor,
        quantity: selectedQuantity,
        image: currentProduct.images[0]
    };
    
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(item => 
        item.id === cartItem.id && item.color === cartItem.color
    );
    
    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += cartItem.quantity;
    } else {
        cart.push(cartItem);
    }
    
    // Save cart and update UI
    saveCart();
    updateCartUI();
    closeModal();
    
    // Show success feedback
    showNotification('Product added to cart!');
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart UI
function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    
    // Clear cart items
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; padding: 2rem; color: #666;">Your cart is empty</p>';
        cartCount.textContent = '0';
        cartTotal.textContent = 'Rs. 0';
        return;
    }
    
    let total = 0;
    let itemCount = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        itemCount += item.quantity;
        
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <div class="cart-item-header">
                <div class="cart-item-name">${item.name}</div>
                <button class="cart-item-remove" onclick="removeFromCart(${index})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="cart-item-details">
                <div class="cart-item-variation">Color: ${item.color}</div>
                <div class="cart-item-price">Rs. ${item.price.toLocaleString()}</div>
            </div>
            <div class="cart-item-quantity">
                <button class="qty-btn" onclick="updateCartItemQuantity(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="qty-btn" onclick="updateCartItemQuantity(${index}, 1)">+</button>
            </div>
            <div class="cart-item-total" style="text-align: right; margin-top: 0.5rem; font-weight: bold; color: var(--primary-green);">
                Rs. ${itemTotal.toLocaleString()}
            </div>
        `;
        cartItems.appendChild(cartItemElement);
    });
    
    cartCount.textContent = itemCount;
    cartTotal.textContent = `Rs. ${total.toLocaleString()}`;
}

// Update cart item quantity
function updateCartItemQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        removeFromCart(index);
    } else {
        saveCart();
        updateCartUI();
    }
}

// Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
    showNotification('Item removed from cart');
}

// Toggle cart panel
function toggleCart() {
    const cartPanel = document.getElementById('cartPanel');
    const cartOverlay = document.getElementById('cartOverlay');
    
    cartPanel.classList.toggle('active');
    cartOverlay.classList.toggle('active');
}

// Submit order
function submitOrder() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    const firstName = document.getElementById('firstName').value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const secondPhone = document.getElementById('secondPhone').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    
    // Basic validation
    if (!firstName || !phoneNumber || !address || !city) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Format WhatsApp message
    let message = 'New Order:\n\n';
    message += `Name: ${firstName}\n`;
    message += `Phone: ${phoneNumber}\n`;
    if (secondPhone) message += `Second Phone: ${secondPhone}\n`;
    message += `Address: ${address}, ${city}\n\n`;
    message += 'Items:\n';
    
    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `- ${item.name} (${item.color}) x${item.quantity} - Rs. ${itemTotal.toLocaleString()}\n`;
    });
    
    message += `\nTotal: Rs. ${total.toLocaleString()}`;
    
    // Open WhatsApp with pre-filled message
    const whatsappNumber = '94751302483'; // Replace with your actual WhatsApp number
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    // Clear cart after successful order
    setTimeout(() => {
        cart = [];
        saveCart();
        updateCartUI();
        document.getElementById('checkoutForm').reset();
        toggleCart();
        showNotification('Order submitted successfully!', 'success');
    }, 1000);
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--primary-green)' : '#e74c3c'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: var(--shadow);
        z-index: 3000;
        animation: slideIn 0.50s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.50s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// Scroll to footer
function scrollToFooter() {
    document.getElementById("footer").scrollIntoView({ behavior: 'smooth' });
}

// Add slideOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Admin panel functions (hidden feature)
function checkAdminAccess() {
    const password = prompt('Enter admin password:');
    if (password === 'admin123') {
        window.location.href = 'admin.html';
    } else if (password) {
        showNotification('Invalid password', 'error');
    }
}

// Add admin access trigger (e.g., double-click on logo)
document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.nav-left i');
    let clickCount = 0;
    
    logo.addEventListener('click', function() {
        clickCount++;
        if (clickCount >= 3) {
            clickCount = 0;
            checkAdminAccess();
        }
        
        setTimeout(() => {
            clickCount = 0;
        }, 2000);
    });
});
