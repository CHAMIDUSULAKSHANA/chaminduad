// Admin Panel JavaScript
let products = [];
let categories = [];
let editingProductId = null;
let deleteProductId = null;
let editingCategoryId = null;

// Admin credentials (in production, this should be stored securely on server)
const ADMIN_USERNAME = 'sofia';
const ADMIN_PASSWORD = '@Snoopy2006';

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
});

// Check if user is authenticated
function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
    if (isLoggedIn === 'true') {
        showAdminContent();
    } else {
        showLoginScreen();
    }
}

// Show login screen
function showLoginScreen() {
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('adminContent').style.display = 'none';
}

// Show admin content
function showAdminContent() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminContent').style.display = 'block';
    loadProducts();
    loadCategories();
    updateStats();
    setupEventListeners();
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('loginError');
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        errorElement.classList.remove('show');
        document.getElementById('loginForm').reset();
        showAdminContent();
    } else {
        errorElement.textContent = 'Invalid username or password';
        errorElement.classList.add('show');
    }
}

// Logout function
function logout() {
    sessionStorage.removeItem('adminLoggedIn');
    showLoginScreen();
}

// Category Management Functions
function loadCategories() {
    const storedCategories = localStorage.getItem('categories');
    if (storedCategories) {
        categories = JSON.parse(storedCategories);
    } else {
        // Default categories
        categories = [
            { id: 'all', name: 'All Products' },
            { id: 'smartphones', name: 'Smartphones' },
            { id: 'laptops', name: 'Laptops' },
            { id: 'headphones', name: 'Headphones' },
            { id: 'smartwatches', name: 'Smart Watches' },
            { id: 'cameras', name: 'Cameras' },
            { id: 'gaming', name: 'Gaming' },
            { id: 'accessories', name: 'Accessories' }
        ];
        localStorage.setItem('categories', JSON.stringify(categories));
    }
    displayCategories();
    updateCategorySelect();
}

function displayCategories() {
    const container = document.getElementById('categoriesList');
    if (!container) return;
    
    container.innerHTML = '';
    categories.forEach(category => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.innerHTML = `
            <div class="category-info">
                <h4>${category.name}</h4>
                <span class="category-id">ID: ${category.id}</span>
            </div>
            <div class="category-actions">
                <button class="action-btn edit" onclick="editCategory('${category.id}')" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete" onclick="deleteCategory('${category.id}')" title="Delete" ${category.id === 'all' ? 'disabled' : ''}>
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        container.appendChild(categoryCard);
    });
}

function updateCategorySelect() {
    const select = document.getElementById('productCategory');
    if (!select) return;
    
    select.innerHTML = '';
    categories.forEach(category => {
        if (category.id !== 'all') {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            select.appendChild(option);
        }
    });
}

function openAddCategoryModal() {
    editingCategoryId = null;
    document.getElementById('categoryModalTitle').textContent = 'Add Category';
    document.getElementById('categoryForm').reset();
    document.getElementById('editingCategoryId').value = '';
    document.getElementById('categoryModal').classList.add('active');
}

function closeCategoryModal() {
    document.getElementById('categoryModal').classList.remove('active');
}

function editCategory(categoryId) {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;
    
    editingCategoryId = categoryId;
    document.getElementById('categoryModalTitle').textContent = 'Edit Category';
    document.getElementById('categoryName').value = category.name;
    document.getElementById('categoryId').value = category.id;
    document.getElementById('editingCategoryId').value = categoryId;
    document.getElementById('categoryModal').classList.add('active');
}

function saveCategory() {
    const name = document.getElementById('categoryName').value.trim();
    const id = document.getElementById('categoryId').value.trim().toLowerCase().replace(/\s+/g, '-');
    
    if (!name || !id) {
        alert('Please fill in all fields');
        return;
    }
    
    if (editingCategoryId) {
        // Update existing category
        const index = categories.findIndex(c => c.id === editingCategoryId);
        if (index !== -1) {
            // Update products with old category ID
            products.forEach(product => {
                if (product.category === editingCategoryId) {
                    product.category = id;
                }
            });
            categories[index] = { id, name };
        }
    } else {
        // Add new category
        if (categories.some(c => c.id === id)) {
            alert('Category ID already exists');
            return;
        }
        categories.push({ id, name });
    }
    
    localStorage.setItem('categories', JSON.stringify(categories));
    localStorage.setItem('products', JSON.stringify(products));
    
    closeCategoryModal();
    displayCategories();
    updateCategorySelect();
    updateStats();
}

function deleteCategory(categoryId) {
    if (categoryId === 'all') return;
    
    if (!confirm('Are you sure you want to delete this category? Products in this category will need to be reassigned.')) {
        return;
    }
    
    categories = categories.filter(c => c.id !== categoryId);
    localStorage.setItem('categories', JSON.stringify(categories));
    
    displayCategories();
    updateCategorySelect();
    updateStats();
}

// Load products from localStorage
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
        // Initialize with sample products if none exist
        products = [
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
        localStorage.setItem('products', JSON.stringify(products));
    }
    displayProducts();
}

// Update dashboard statistics
function updateStats() {
    const totalProducts = products.length;
    const categories = [...new Set(products.map(p => p.category))].length;
    
    // Get cart items from main shop
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    document.getElementById('totalProducts').textContent = totalProducts;
    document.getElementById('totalCategories').textContent = categories;
    document.getElementById('cartItems').textContent = cartItemsCount;
}

// Display products in table
function displayProducts(filteredProducts = null) {
    const tbody = document.getElementById('productsTableBody');
    const productsToDisplay = filteredProducts || products;
    
    tbody.innerHTML = '';
    
    if (productsToDisplay.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 2rem; color: #666;">
                    No products found
                </td>
            </tr>
        `;
        return;
    }
    
    productsToDisplay.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td data-label="Image">
                <img src="${product.images[0]}" alt="${product.name}" class="product-img-thumb">
            </td>
            <td class="product-name-cell" data-label="Name">${product.name}</td>
            <td data-label="Category">${product.category}</td>
            <td class="product-price-cell" data-label="Price">Rs. ${product.price.toLocaleString()}</td>
            <td class="product-colors-cell" data-label="Colors">
                ${product.colors.map(color => `<span class="color-badge">${color}</span>`).join('')}
            </td>
            <td class="product-actions" data-label="Actions">
                <button class="action-btn edit" onclick="editProduct(${product.id})" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete" onclick="deleteProduct(${product.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Modal overlay clicks
    document.getElementById('productModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeProductModal();
        }
    });
    
    document.getElementById('deleteModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeDeleteModal();
        }
    });
    
    document.getElementById('cropModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeCropModal();
        }
    });
    
    // Initialize image upload
    initializeImageUpload();
}

// Open add product modal
function openAddProductModal() {
    editingProductId = null;
    document.getElementById('modalTitle').textContent = 'Add Product';
    document.getElementById('productForm').reset();
    resetImageUpload();
    document.getElementById('productModal').classList.add('active');
}

// Edit product
function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    editingProductId = productId;
    document.getElementById('modalTitle').textContent = 'Edit Product';
    
    // Fill form with product data
    document.getElementById('productName').value = product.name;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productDescription').value = product.description || '';
    document.getElementById('productColors').value = product.colors.join(', ');
    
    // Load existing images
    if (product.images && product.images.length > 0) {
        loadImagesForEditing(product.images);
    }
    
    // Load variations if they exist
    if (product.variations) {
        loadVariationsIntoForm(product.variations);
    } else {
        clearVariationsForm();
    }
    
    document.getElementById('productModal').classList.add('active');
}

// Close product modal
function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
    editingProductId = null;
    document.getElementById('productForm').reset();
    resetImageUpload();
    clearVariationsForm();
}

// Save product
function saveProduct(event) {
    event.preventDefault();
    
    // Validate images
    if (uploadedImages.length === 0) {
        showAdminMessage('Please upload at least one product image', 'error');
        return;
    }
    
    const formData = {
        name: document.getElementById('productName').value.trim(),
        category: document.getElementById('productCategory').value,
        price: parseInt(document.getElementById('productPrice').value),
        images: uploadedImages.map(img => img.dataUrl),
        description: document.getElementById('productDescription').value.trim(),
        colors: document.getElementById('productColors').value
            .split(',')
            .map(color => color.trim())
            .filter(color => color.length > 0)
    };
    
    // Validate colors
    if (formData.colors.length === 0) {
        formData.colors = ['Black']; // Default color
    }
    
    // Get custom variations
    const variations = getVariationsFromForm();
    if (Object.keys(variations).length > 0) {
        formData.variations = variations;
    }
    
    if (editingProductId) {
        // Update existing product
        const index = products.findIndex(p => p.id === editingProductId);
        if (index !== -1) {
            products[index] = { ...products[index], ...formData };
            showAdminMessage('Product updated successfully!', 'success');
        }
    } else {
        // Add new product
        const newProduct = {
            id: Date.now(), // Simple ID generation
            ...formData
        };
        products.push(newProduct);
        showAdminMessage('Product added successfully!', 'success');
    }
    
    // Save to localStorage and update display
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
    updateStats();
    closeProductModal();
}

// Delete product
function deleteProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    deleteProductId = productId;
    document.getElementById('deleteProductName').textContent = product.name;
    document.getElementById('deleteModal').classList.add('active');
}

// Close delete modal
function closeDeleteModal() {
    document.getElementById('deleteModal').classList.remove('active');
    deleteProductId = null;
}

// Confirm delete
function confirmDelete() {
    if (!deleteProductId) return;
    
    const index = products.findIndex(p => p.id === deleteProductId);
    if (index !== -1) {
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        displayProducts();
        updateStats();
        showAdminMessage('Product deleted successfully!', 'success');
    }
    
    closeDeleteModal();
}

// Search products
function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    
    let filtered = products;
    
    // Filter by search term
    if (searchTerm) {
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
    }
    
    // Filter by category
    if (categoryFilter) {
        filtered = filtered.filter(product => product.category === categoryFilter);
    }
    
    displayProducts(filtered);
}

// Filter by category
function filterByCategory() {
    searchProducts(); // Reuse search function
}

// Show admin message
function showAdminMessage(message, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `admin-message ${type}`;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(messageDiv)) {
                document.body.removeChild(messageDiv);
            }
        }, 300);
    }, 3000);
}

// Logout
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = 'index.html';
    }
}

// Add slideOut animation for admin messages
const adminStyle = document.createElement('style');
adminStyle.textContent = `
    @keyframes slideOut {
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(adminStyle);

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + N: New product
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        openAddProductModal();
    }
    
    // Escape: Close modals
    if (e.key === 'Escape') {
        closeProductModal();
        closeDeleteModal();
    }
});

// Auto-refresh stats every 30 seconds
setInterval(updateStats, 30000);

// Image Management Variables
let uploadedImages = [];
let currentCropper = null;
let currentCropImageIndex = null;
let dragStartIndex = null;

// Initialize image upload functionality
function initializeImageUpload() {
    const imageInput = document.getElementById('imageInput');
    const imageUploadArea = document.getElementById('imageUploadArea');
    
    // File input change handler
    imageInput.addEventListener('change', handleImageSelect);
    
    // Drag and drop handlers
    imageUploadArea.addEventListener('dragover', handleDragOver);
    imageUploadArea.addEventListener('dragleave', handleDragLeave);
    imageUploadArea.addEventListener('drop', handleDrop);
}

// Handle image file selection
function handleImageSelect(event) {
    const files = event.target.files;
    if (files.length > 0) {
        processImageFiles(files);
    }
}

// Handle drag over
function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById('imageUploadArea').parentElement.classList.add('dragover');
}

// Handle drag leave
function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById('imageUploadArea').parentElement.classList.remove('dragover');
}

// Handle drop
function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById('imageUploadArea').parentElement.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        processImageFiles(files);
    }
}

// Process selected image files
function processImageFiles(files) {
    const maxImages = 5;
    const remainingSlots = maxImages - uploadedImages.length;
    
    if (remainingSlots <= 0) {
        showAdminMessage('Maximum 5 images allowed', 'warning');
        return;
    }
    
    const filesToProcess = Array.from(files).slice(0, remainingSlots);
    
    filesToProcess.forEach(file => {
        if (!file.type.startsWith('image/')) {
            showAdminMessage(`${file.name} is not an image file`, 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            uploadedImages.push({
                dataUrl: e.target.result,
                fileName: file.name,
                isPrimary: uploadedImages.length === 0
            });
            renderImagePreviews();
            updateProductImagesInput();
        };
        reader.readAsDataURL(file);
    });
    
    if (files.length > remainingSlots) {
        showAdminMessage(`Only ${remainingSlots} images added (max 5 allowed)`, 'warning');
    }
}

// Render image previews
function renderImagePreviews() {
    const previewGrid = document.getElementById('imagePreviewGrid');
    previewGrid.innerHTML = '';
    
    uploadedImages.forEach((image, index) => {
        const previewItem = document.createElement('div');
        previewItem.className = `image-preview-item ${image.isPrimary ? 'is-primary' : ''}`;
        previewItem.draggable = true;
        previewItem.dataset.index = index;
        
        previewItem.innerHTML = `
            <img src="${image.dataUrl}" alt="Product image ${index + 1}">
            <span class="image-number">${index + 1}</span>
            <div class="image-actions">
                <button type="button" class="image-action-btn crop" onclick="openCropModal(${index})" title="Crop">
                    <i class="fas fa-crop"></i>
                </button>
                <button type="button" class="image-action-btn delete" onclick="removeImage(${index})" title="Remove">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            ${!image.isPrimary ? `<button type="button" class="set-primary" onclick="setPrimaryImage(${index})">Set Primary</button>` : `<button type="button" class="set-primary">Primary</button>`}
        `;
        
        // Drag and drop handlers
        previewItem.addEventListener('dragstart', handleDragStart);
        previewItem.addEventListener('dragend', handleDragEnd);
        previewItem.addEventListener('dragover', handleItemDragOver);
        previewItem.addEventListener('drop', handleItemDrop);
        
        previewGrid.appendChild(previewItem);
    });
    
    // Update hidden input
    updateProductImagesInput();
}

// Update product images hidden input
function updateProductImagesInput() {
    const input = document.getElementById('productImages');
    input.value = JSON.stringify(uploadedImages.map(img => img.dataUrl));
}

// Drag and drop handlers for reordering
function handleDragStart(e) {
    dragStartIndex = parseInt(this.dataset.index);
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    dragStartIndex = null;
}

function handleItemDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleItemDrop(e) {
    e.preventDefault();
    const dropIndex = parseInt(this.dataset.index);
    
    if (dragStartIndex !== null && dragStartIndex !== dropIndex) {
        // Reorder images
        const itemToMove = uploadedImages[dragStartIndex];
        uploadedImages.splice(dragStartIndex, 1);
        uploadedImages.splice(dropIndex, 0, itemToMove);
        
        renderImagePreviews();
    }
}

// Remove image
function removeImage(index) {
    uploadedImages.splice(index, 1);
    
    // Ensure at least one image is primary
    if (uploadedImages.length > 0 && !uploadedImages.some(img => img.isPrimary)) {
        uploadedImages[0].isPrimary = true;
    }
    
    renderImagePreviews();
}

// Set primary image
function setPrimaryImage(index) {
    uploadedImages.forEach((img, i) => {
        img.isPrimary = (i === index);
    });
    renderImagePreviews();
}

// Open crop modal
function openCropModal(index) {
    currentCropImageIndex = index;
    const image = uploadedImages[index];
    
    const cropImage = document.getElementById('cropImage');
    cropImage.src = image.dataUrl;
    
    document.getElementById('cropModal').classList.add('active');
    
    // Initialize cropper
    setTimeout(() => {
        currentCropper = new Cropper(cropImage, {
            aspectRatio: 1,
            viewMode: 1,
            autoCropArea: 0.8,
            responsive: true,
            guides: true,
            center: true,
            highlight: false,
            cropBoxMovable: true,
            cropBoxResizable: true,
            toggleDragModeOnDblclick: false,
        });
    }, 100);
}

// Close crop modal
function closeCropModal() {
    if (currentCropper) {
        currentCropper.destroy();
        currentCropper = null;
    }
    currentCropImageIndex = null;
    document.getElementById('cropModal').classList.remove('active');
}

// Apply crop
function applyCrop() {
    if (!currentCropper || currentCropImageIndex === null) return;
    
    const croppedCanvas = currentCropper.getCroppedCanvas({
        width: 800,
        height: 800,
        fillColor: '#fff',
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high',
    });
    
    const croppedDataUrl = croppedCanvas.toDataURL('image/jpeg', 0.9);
    uploadedImages[currentCropImageIndex].dataUrl = croppedDataUrl;
    
    renderImagePreviews();
    closeCropModal();
    showAdminMessage('Image cropped successfully', 'success');
}

// Rotate cropper
function rotateCropper(degree) {
    if (currentCropper) {
        currentCropper.rotate(degree);
    }
}

// Reset cropper
function resetCropper() {
    if (currentCropper) {
        currentCropper.reset();
    }
}

// Toggle aspect ratio
function toggleAspectRatio() {
    if (currentCropper) {
        const currentRatio = currentCropper.options.aspectRatio;
        currentCropper.setAspectRatio(currentRatio === 1 ? NaN : 1);
    }
}

// Reset image upload
function resetImageUpload() {
    uploadedImages = [];
    document.getElementById('imageInput').value = '';
    document.getElementById('imagePreviewGrid').innerHTML = '';
    document.getElementById('productImages').value = '';
}

// Load images for editing
function loadImagesForEditing(images) {
    uploadedImages = images.map((img, index) => ({
        dataUrl: img,
        fileName: `image_${index + 1}.jpg`,
        isPrimary: index === 0
    }));
    renderImagePreviews();
}

// Custom Variations Functions
function addVariationField(name = '', values = '') {
    const container = document.getElementById('variationsContainer');
    const variationRow = document.createElement('div');
    variationRow.className = 'variation-row';
    variationRow.innerHTML = `
        <input type="text" class="variation-name" placeholder="Size" value="${name}" required>
        <input type="text" class="variation-values" placeholder="Small, Medium, Large" value="${values}" required>
        <button type="button" class="btn-remove-variation" onclick="removeVariationField(this)" title="Remove">
            <i class="fas fa-trash"></i>
        </button>
    `;
    container.appendChild(variationRow);
}

function removeVariationField(button) {
    const row = button.closest('.variation-row');
    row.remove();
}

function getVariationsFromForm() {
    const variations = {};
    const rows = document.querySelectorAll('.variation-row');
    rows.forEach(row => {
        const name = row.querySelector('.variation-name').value.trim();
        const values = row.querySelector('.variation-values').value.trim();
        if (name && values) {
            variations[name] = values.split(',').map(v => v.trim()).filter(v => v);
        }
    });
    return variations;
}

function loadVariationsIntoForm(variations) {
    const container = document.getElementById('variationsContainer');
    container.innerHTML = '';
    if (variations && Object.keys(variations).length > 0) {
        Object.entries(variations).forEach(([name, values]) => {
            addVariationField(name, values.join(', '));
        });
    }
}

function clearVariationsForm() {
    document.getElementById('variationsContainer').innerHTML = '';
}
