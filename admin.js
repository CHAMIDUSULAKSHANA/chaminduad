// Admin Panel JavaScript
let products = [];
let editingProductId = null;
let deleteProductId = null;

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    updateStats();
    setupEventListeners();
});

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
    
    document.getElementById('productModal').classList.add('active');
}

// Close product modal
function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
    editingProductId = null;
    document.getElementById('productForm').reset();
    resetImageUpload();
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
