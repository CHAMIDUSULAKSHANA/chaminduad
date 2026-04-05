/* ============================================
   DULA CAKE CREATIONS — E-Commerce JavaScript
   ============================================ */

// ============ PRODUCT DATA ============
const products = [
    {
        id: 1,
        name: "Classic Chocolate Birthday Cake",
        category: "birthday",
        price: 35.99,
        oldPrice: 45.99,
        badge: "hot",
        rating: 4.9,
        reviews: 312,
        description: "Rich and decadent chocolate cake layered with smooth chocolate ganache and topped with fresh chocolate curls. A timeless favourite for every birthday celebration.",
        features: ["Chocolate Ganache", "2 Layers", "Serves 10-12", "Customizable Text"],
        images: [
            "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&h=600&fit=crop"
        ]
    },
    {
        id: 2,
        name: "Elegant White Wedding Cake",
        category: "wedding",
        price: 189.99,
        oldPrice: 249.99,
        badge: "sale",
        rating: 5.0,
        reviews: 87,
        description: "A stunning 3-tier white wedding cake with delicate fondant flowers and pearl detailing. The perfect centrepiece for your dream wedding.",
        features: ["3 Tiers", "Fondant Flowers", "Serves 80-100", "Free Consultation"],
        images: [
            "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1522767131822-6ac8a5416c5e?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1519654793190-2e8a4806f1f2?w=600&h=600&fit=crop"
        ]
    },
    {
        id: 3,
        name: "Vanilla Cupcakes with Sweet Buttercream Frosting",
        category: "cupcakes",
        price: 18.99,
        oldPrice: null,
        badge: "new",
        rating: 4.7,
        reviews: 198,
        description: "A dozen fluffy vanilla cupcakes topped with creamy buttercream swirls and colourful sprinkles. Perfect for parties, gifts, or a sweet treat.",
        features: ["12 Cupcakes", "Buttercream", "Sprinkles", "Gift Box"],
        images: [
            "1.JPG",
            "2.JPG",
            "3.JPG",
            "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&h=600&fit=crop"
        ]
    },
    {
        id: 4,
        name: "Rainbow Unicorn Cake",
        category: "birthday",
        price: 55.99,
        oldPrice: 69.99,
        badge: "hot",
        rating: 4.8,
        reviews: 245,
        description: "A magical rainbow layered cake with unicorn horn, ears, and colourful buttercream mane. Every child's dream birthday cake come true!",
        features: ["Rainbow Layers", "Unicorn Theme", "Serves 12-15", "Edible Decorations"],
        images: [
            "https://images.unsplash.com/photo-1557925923-cd4648e211a0?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1562440499-64c9a111f713?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1602351447937-745cb720612f?w=600&h=600&fit=crop"
        ]
    },
    {
        id: 5,
        name: "Custom Photo Cake",
        category: "custom",
        price: 42.99,
        oldPrice: null,
        badge: "new",
        rating: 4.6,
        reviews: 156,
        description: "Personalised cake with your favourite photo printed on edible icing. Perfect for birthdays, anniversaries, or any special celebration.",
        features: ["Edible Photo", "Custom Message", "Serves 10-12", "Any Flavour"],
        images: [
            "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1562440499-64c9a111f713?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=600&h=600&fit=crop"
        ]
    },
    {
        id: 6,
        name: "Rose Gold Wedding Cake",
        category: "wedding",
        price: 220.99,
        oldPrice: 289.99,
        badge: "sale",
        rating: 4.9,
        reviews: 64,
        description: "Luxurious 4-tier wedding cake with rose gold metallic finish, sugar roses, and cascading floral details. A showstopper for your big day.",
        features: ["4 Tiers", "Rose Gold Finish", "Sugar Roses", "Serves 100-120"],
        images: [
            "https://images.unsplash.com/photo-1519654793190-2e8a4806f1f2?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1522767131822-6ac8a5416c5e?w=600&h=600&fit=crop"
        ]
    },
    {
        id: 7,
        name: "Red Velvet Cupcakes (6 pcs)",
        category: "cupcakes",
        price: 12.99,
        oldPrice: 16.99,
        badge: "sale",
        rating: 4.8,
        reviews: 287,
        description: "Moist red velvet cupcakes topped with luscious cream cheese frosting. The perfect balance of sweet and tangy in every bite.",
        features: ["6 Cupcakes", "Cream Cheese Frosting", "Red Velvet", "Gift Box"],
        images: [
            "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&h=600&fit=crop"
        ]
    },
    {
        id: 8,
        name: "Strawberry Drip Cake",
        category: "birthday",
        price: 39.99,
        oldPrice: null,
        badge: "new",
        rating: 4.7,
        reviews: 178,
        description: "Beautiful strawberry-flavoured cake with pink drip glaze, fresh strawberries, and meringue kisses. A stunning centrepiece for any birthday party.",
        features: ["Strawberry Flavour", "Drip Design", "Fresh Berries", "Serves 10-12"],
        images: [
            "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=600&h=600&fit=crop"
        ]
    },
    {
        id: 9,
        name: "3D Sculpted Character Cake",
        category: "custom",
        price: 75.99,
        oldPrice: 95.99,
        badge: "hot",
        rating: 4.9,
        reviews: 132,
        description: "Fully custom 3D sculpted cake shaped as your favourite character, toy, or theme. Handcrafted with fondant and edible colours. Send us your idea!",
        features: ["3D Sculpted", "Fondant Art", "Any Character", "Serves 15-20"],
        images: [
            "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1557925923-cd4648e211a0?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1602351447937-745cb720612f?w=600&h=600&fit=crop"
        ]
    },
    {
        id: 10,
        name: "Chocolate Truffle Cupcakes (12 pcs)",
        category: "cupcakes",
        price: 22.99,
        oldPrice: 28.99,
        badge: "sale",
        rating: 4.6,
        reviews: 341,
        description: "Indulgent chocolate cupcakes filled with chocolate truffle centre and topped with rich chocolate ganache swirl. For true chocolate lovers.",
        features: ["12 Cupcakes", "Truffle Filled", "Ganache Top", "Premium Box"],
        images: [
            "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&h=600&fit=crop"
        ]
    },
    {
        id: 11,
        name: "Naked Rustic Wedding Cake",
        category: "wedding",
        price: 159.99,
        oldPrice: null,
        badge: "new",
        rating: 4.8,
        reviews: 76,
        description: "Elegant semi-naked cake with fresh flowers, berries, and a light dusting of powdered sugar. A beautiful rustic-chic style for modern weddings.",
        features: ["3 Tiers", "Fresh Flowers", "Semi-Naked Style", "Serves 60-80"],
        images: [
            "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1522767131822-6ac8a5416c5e?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1519654793190-2e8a4806f1f2?w=600&h=600&fit=crop"
        ]
    },
    {
        id: 12,
        name: "Number / Letter Cake",
        category: "custom",
        price: 48.99,
        oldPrice: 59.99,
        badge: "hot",
        rating: 4.7,
        reviews: 203,
        description: "Trendy number or letter shaped cake decorated with fresh cream, fruits, macarons, and flowers. Perfect for milestone birthdays and anniversaries.",
        features: ["Any Number/Letter", "Fresh Cream", "Macarons & Fruits", "Serves 8-10"],
        images: [
            "https://images.unsplash.com/photo-1562440499-64c9a111f713?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=600&fit=crop"
        ]
    },
    {
        id: 13,
        name: "Floral Buttercream Dream Cake",
        category: "custom",
        price: 58.99,
        oldPrice: 72.99,
        badge: "hot",
        rating: 4.9,
        reviews: 118,
        description: "A beautifully handcrafted custom cake adorned with delicate buttercream flowers in pastel tones. Perfect for birthdays, bridal showers, and celebrations.",
        features: ["Buttercream Flowers", "Custom Colours", "Serves 12-15", "Personalised Message"],
        images: [
            "New folder/4.jpg",
            "New folder/5.jpg",
            "New folder/6.jpg",
            "New folder/7.jpg"
        ]
    },
    {
        id: 14,
        name: "Luxury Chocolate Drip Cake",
        category: "custom",
        price: 65.99,
        oldPrice: null,
        badge: "new",
        rating: 4.8,
        reviews: 94,
        description: "An indulgent custom chocolate cake with rich ganache drip, topped with chocolate shards, truffles, and gold leaf accents. A true showstopper.",
        features: ["Chocolate Ganache Drip", "Gold Leaf", "Serves 14-16", "Gift Ready"],
        images: [
            "New folder/8.jpg",
            "New folder/9.jpg",
            "New folder/10.jpg",
            "New folder/11.jpg"
        ]
    },
    {
        id: 15,
        name: "Elegant Fondant Designer Cake",
        category: "custom",
        price: 82.99,
        oldPrice: 99.99,
        badge: "sale",
        rating: 4.9,
        reviews: 67,
        description: "Premium designer cake covered in smooth fondant with intricate hand-painted details and sugar art decorations. Tailored to your vision.",
        features: ["Fondant Finish", "Hand-Painted", "Sugar Art", "Serves 15-20"],
        images: [
            "New folder/12.jpg",
            "New folder/13.jpg",
            "New folder/14.jpg",
            "New folder/15.jpg"
        ]
    },
    {
        id: 16,
        name: "Fresh Fruit Garden Cake",
        category: "custom",
        price: 54.99,
        oldPrice: null,
        badge: "new",
        rating: 4.7,
        reviews: 142,
        description: "A stunning custom cake topped with an abundance of fresh seasonal fruits, light cream frosting, and a hint of citrus glaze. Fresh and delightful!",
        features: ["Fresh Fruits", "Light Cream", "Citrus Glaze", "Serves 10-12"],
        images: [
            "New folder/16.jpg",
            "New folder/17.jpg",
            "New folder/18.jpg",
            "New folder/19.jpg"
        ]
    }
];

// ============ STATE ============
let cart = [];
localStorage.removeItem('shopwa_cart');
let currentProduct = null;
let currentImageIndex = 0;
let modalQty = 1;

// ============ YOUR WHATSAPP NUMBER ============
// Change this to your actual WhatsApp number (with country code, no + or spaces)
const WHATSAPP_NUMBER = "94784562851";

// ============ INIT ============
document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);
    cart = [];
    saveCart();
    renderProducts();
    updateCartUI();
    initScrollAnimations();
    initNavbarScroll();
    initBackToTop();
    initGallerySwipe();

    // stagger product card animations
    setTimeout(() => {
        document.querySelectorAll('.product-card').forEach((card, i) => {
            card.style.animationDelay = `${i * 0.08}s`;
        });
    }, 100);

    // Hide splash screen after 4 seconds
    setTimeout(() => {
        const splash = document.getElementById('splashScreen');
        if (splash) {
            splash.classList.add('hidden');
            setTimeout(() => splash.remove(), 500);
        }
    }, 4000);
});

// ============ RENDER PRODUCTS ============
function renderProducts() {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = '';

    products.forEach((p, index) => {
        const stars = generateStars(p.rating);
        const badgeHTML = p.badge ? `<span class="product-badge badge-${p.badge}">${p.badge.toUpperCase()}</span>` : '';
        const oldPriceHTML = p.oldPrice ? `<span class="product-old-price">LKR ${p.oldPrice.toFixed(2)}</span>` : '';

        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-category', p.category);
        card.setAttribute('data-name', p.name.toLowerCase());
        card.style.animationDelay = `${index * 0.08}s`;

        card.innerHTML = `
            <div class="product-img-wrapper" onclick="openProductModal(${p.id})">
                ${badgeHTML}
                <img src="${p.images[0]}" alt="${p.name}" loading="lazy">
                <div class="product-quick-actions">
                    <button class="quick-action-btn" onclick="event.stopPropagation(); openProductModal(${p.id})" title="Quick View">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <span class="product-category">${p.category}</span>
                <h3 class="product-name" onclick="openProductModal(${p.id})">${p.name}</h3>
                <div class="product-rating">
                    ${stars}
                    <span>(${p.reviews})</span>
                </div>
                <div class="product-price-row">
                    <div>
                        <span class="product-price">LKR ${p.price.toFixed(2)}</span>
                        ${oldPriceHTML}
                    </div>
                    <button class="btn-add-to-cart" onclick="addToCart(${p.id})" title="Add to Cart">
                        <i class="fas fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function generateStars(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            html += '<i class="fas fa-star"></i>';
        } else if (i - rating < 1 && i - rating > 0) {
            html += '<i class="fas fa-star-half-alt"></i>';
        } else {
            html += '<i class="far fa-star"></i>';
        }
    }
    html += `<span>${rating}</span>`;
    return html;
}

// ============ FILTER PRODUCTS ============
function filterByCategory(cat, btn) {
    // update active button
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, i) => {
        const match = cat === 'all' || card.dataset.category === cat;
        if (match) {
            card.classList.remove('hidden');
            card.style.animation = 'none';
            card.offsetHeight; // reflow
            card.style.animation = `fadeInUp 0.5s ease forwards`;
            card.style.animationDelay = `${i * 0.06}s`;
        } else {
            card.classList.add('hidden');
        }
    });
}

function filterProducts(val) {
    const query = val !== undefined ? val.toLowerCase() : document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        const name = card.dataset.name;
        const cat = card.dataset.category;
        if (name.includes(query) || cat.includes(query)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// ============ PRODUCT MODAL ============
function openProductModal(id) {
    currentProduct = products.find(p => p.id === id);
    if (!currentProduct) return;

    currentImageIndex = 0;
    modalQty = 1;

    document.getElementById('modalMainImage').src = currentProduct.images[0];
    document.getElementById('modalTitle').textContent = currentProduct.name;
    document.getElementById('modalCategory').textContent = currentProduct.category;
    document.getElementById('modalPrice').textContent = `LKR ${currentProduct.price.toFixed(2)}`;
    document.getElementById('modalOldPrice').textContent = currentProduct.oldPrice ? `LKR ${currentProduct.oldPrice.toFixed(2)}` : '';
    document.getElementById('modalOldPrice').style.display = currentProduct.oldPrice ? 'block' : 'none';
    document.getElementById('modalDesc').textContent = currentProduct.description;
    document.getElementById('modalQty').textContent = '1';

    // Rating
    document.getElementById('modalRating').innerHTML = generateStars(currentProduct.rating) + ` <span>(${currentProduct.reviews} reviews)</span>`;

    // Features
    const featHTML = currentProduct.features.map(f => `<span>${f}</span>`).join('');
    document.getElementById('modalFeatures').innerHTML = featHTML;

    // Thumbnails
    const strip = document.getElementById('thumbnailStrip');
    strip.innerHTML = '';
    currentProduct.images.forEach((img, i) => {
        const thumb = document.createElement('img');
        thumb.src = img;
        thumb.className = `thumb-img${i === 0 ? ' active' : ''}`;
        thumb.alt = `View ${i + 1}`;
        thumb.onclick = () => selectImage(i);
        strip.appendChild(thumb);
    });

    document.getElementById('productModal').classList.add('open');
    document.body.style.overflow = 'hidden';

    // On mobile, bring navbar above the modal overlay
    if (window.innerWidth <= 768) {
        document.getElementById('navbar').style.zIndex = '2500';
    }
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('open');
    document.body.style.overflow = '';
    document.getElementById('navbar').style.zIndex = '';
}

function selectImage(index) {
    currentImageIndex = index;
    const mainImg = document.getElementById('modalMainImage');
    mainImg.style.opacity = '0';
    setTimeout(() => {
        mainImg.src = currentProduct.images[index];
        mainImg.style.opacity = '1';
    }, 150);

    document.querySelectorAll('.thumb-img').forEach((t, i) => {
        t.classList.toggle('active', i === index);
    });
}

function prevImage() {
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : currentProduct.images.length - 1;
    selectImage(newIndex);
}

function nextImage() {
    const newIndex = currentImageIndex < currentProduct.images.length - 1 ? currentImageIndex + 1 : 0;
    selectImage(newIndex);
}

function changeModalQty(delta) {
    modalQty = Math.max(1, modalQty + delta);
    document.getElementById('modalQty').textContent = modalQty;
}

function addToCartFromModal() {
    if (!currentProduct) return;
    addToCart(currentProduct.id, modalQty);
    closeProductModal();
}

function buyNowFromModal() {
    if (!currentProduct) return;
    addToCart(currentProduct.id, modalQty);
    closeProductModal();
    openCart();
    setTimeout(() => openCheckoutForm(), 400);
}

// ============ CART ============
function addToCart(id, qty = 1) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            qty: qty
        });
    }

    saveCart();
    updateCartUI();
    showToast(`${product.name} added to cart!`);

    // Bump animation on cart count
    const countEl = document.getElementById('cartCount');
    countEl.classList.remove('bump');
    void countEl.offsetWidth;
    countEl.classList.add('bump');
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartUI();
    renderCartItems();
}

function updateCartQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
        removeFromCart(id);
        return;
    }
    saveCart();
    updateCartUI();
    renderCartItems();
}

function saveCart() {
    localStorage.setItem('shopwa_cart', JSON.stringify(cart));
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    document.getElementById('cartCount').textContent = totalItems;
    document.querySelectorAll('.mobile-cart-count').forEach(el => el.textContent = totalItems);
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function openCart() {
    renderCartItems();
    document.getElementById('cartOverlay').classList.add('open');
    document.getElementById('cartSidebar').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    document.getElementById('cartOverlay').classList.remove('open');
    document.getElementById('cartSidebar').classList.remove('open');
    document.body.style.overflow = '';
}

function renderCartItems() {
    const container = document.getElementById('cartItems');
    const emptyEl = document.getElementById('cartEmpty');
    const footer = document.getElementById('cartFooter');

    if (cart.length === 0) {
        container.innerHTML = `<div class="cart-empty" id="cartEmpty"><i class="fas fa-shopping-basket"></i><p>Your cart is empty</p></div>`;
        footer.style.display = 'none';
        return;
    }

    let html = '';
    cart.forEach(item => {
        html += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span class="cart-item-price">LKR ${(item.price * item.qty).toFixed(2)}</span>
                    <div class="cart-item-qty">
                        <button onclick="updateCartQty(${item.id}, -1)">−</button>
                        <span>${item.qty}</span>
                        <button onclick="updateCartQty(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})"><i class="fas fa-trash-alt"></i></button>
            </div>
        `;
    });

    container.innerHTML = html;
    footer.style.display = 'block';
    document.getElementById('cartTotal').textContent = `LKR ${getCartTotal().toFixed(2)}`;
}

// ============ CHECKOUT MODAL ============
function openCheckoutForm() {
    if (cart.length === 0) {
        showToast('Your cart is empty!');
        return;
    }

    closeCart();
    setTimeout(() => {
        renderOrderSummary();
        document.getElementById('checkoutModal').classList.add('open');
        document.body.style.overflow = 'hidden';
    }, 300);
}

function closeCheckoutModal() {
    document.getElementById('checkoutModal').classList.remove('open');
    document.body.style.overflow = '';
}

function renderOrderSummary() {
    const container = document.getElementById('orderSummary');
    let html = '<h4>Order Summary</h4>';

    cart.forEach(item => {
        html += `
            <div class="order-summary-item">
                <span>${item.name} × ${item.qty}</span>
                <span>LKR ${(item.price * item.qty).toFixed(2)}</span>
            </div>
        `;
    });

    html += `
        <div class="order-summary-total">
            <span>Total</span>
            <span>LKR ${getCartTotal().toFixed(2)}</span>
        </div>
    `;

    container.innerHTML = html;
}

// ============ SEND WHATSAPP ORDER ============
function sendWhatsAppOrder(e) {
    e.preventDefault();

    const name = document.getElementById('custName').value.trim();
    const city = document.getElementById('custCity').value.trim();
    const address = document.getElementById('custAddress').value.trim();
    const phone1 = document.getElementById('custPhone1').value.trim();
    const phone2 = document.getElementById('custPhone2').value.trim();

    if (!name || !city || !address || !phone1) {
        showToast('Please fill in all required fields!');
        return;
    }

    // Build the WhatsApp message
    let msg = `🎂 *NEW ORDER — Dula Cake Creations*\n`;
    msg += `━━━━━━━━━━━━━━━━━\n\n`;
    msg += `👤 *Customer Details:*\n`;
    msg += `• Name: ${name}\n`;
    msg += `• City: ${city}\n`;
    msg += `• Address: ${address}\n`;
    msg += `• Phone 1: ${phone1}\n`;
    if (phone2) msg += `• Phone 2: ${phone2}\n`;
    msg += `\n`;
    msg += `📦 *Order Items:*\n`;

    cart.forEach((item, i) => {
        msg += `${i + 1}. ${item.name}\n`;
        msg += `   Qty: ${item.qty} × LKR ${item.price.toFixed(2)} = LKR ${(item.price * item.qty).toFixed(2)}\n`;
    });

    msg += `\n💰 *Total: LKR ${getCartTotal().toFixed(2)}*\n`;
    msg += `━━━━━━━━━━━━━━━━━\n`;
    msg += `Thank you for ordering from Dula Cake Creations! 🎂`;

    const encodedMsg = encodeURIComponent(msg);
    const waURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;

    window.open(waURL, '_blank');

    // Clear cart after sending
    cart = [];
    saveCart();
    updateCartUI();
    closeCheckoutModal();
    document.getElementById('orderForm').reset();
    showToast('Order sent! Redirecting to WhatsApp...');
}

// ============ TOAST ============
function showToast(message) {
    const toast = document.getElementById('toast');
    document.getElementById('toastMsg').textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// ============ SCROLL ANIMATIONS ============
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

// ============ NAVBAR SCROLL ============
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ============ BACK TO TOP ============
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });
}

// ============ MOBILE MENU ============
function toggleMobileMenu() {
    document.getElementById('mobileMenu').classList.toggle('open');
}

// ============ CLOSE MODALS ON ESC ============
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProductModal();
        closeCheckoutModal();
        closeCart();
    }
});

// Close modals on overlay click
document.getElementById('productModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('productModal')) {
        closeProductModal();
    }
});

document.getElementById('checkoutModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('checkoutModal')) {
        closeCheckoutModal();
    }
});

// ============ TOUCH SWIPE FOR GALLERY ============
function initGallerySwipe() {
    const wrapper = document.querySelector('.main-image-wrapper');
    let startX = 0;
    let endX = 0;
    let isSwiping = false;

    wrapper.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isSwiping = true;
    }, { passive: true });

    wrapper.addEventListener('touchmove', (e) => {
        if (!isSwiping) return;
        endX = e.touches[0].clientX;
    }, { passive: true });

    wrapper.addEventListener('touchend', () => {
        if (!isSwiping) return;
        isSwiping = false;
        const diff = startX - endX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextImage();
            } else {
                prevImage();
            }
        }
        startX = 0;
        endX = 0;
    });
}
