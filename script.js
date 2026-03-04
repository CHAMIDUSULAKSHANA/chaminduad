let cart = [];
let currentItem = {};
const PHONE_NUMBER = "94751302483"; 

const productColors = { h: ['Black', 'White', 'Blue'], p: ['Black', 'White'], a: ['White'], g: ['Clear'] };

function showPage(id, e) {
    document.querySelectorAll('.cat-page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.category-menu button').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    e.target.classList.add('active');
}

function openModal(name, price, type) {
    currentItem = { name, price };
    document.getElementById('modalItemName').innerText = name;
    document.getElementById('modalColor').innerHTML = productColors[type].map(c => `<option value="${c}">${c}</option>`).join('');
    document.getElementById('variationModal').style.display = 'flex';
}

function closeModal() { document.getElementById('variationModal').style.display = 'none'; }

function confirmAddToCart() {
    const qty = parseInt(document.getElementById('modalQty').value);
    const clr = document.getElementById('modalColor').value;
    cart.push({ name: currentItem.name, price: currentItem.price, qty, color: clr, total: currentItem.price * qty });
    updateUI();
    closeModal();
}

function updateUI() {
    const box = document.getElementById('cartDisplay');
    let total = 0;
    if (cart.length === 0) { box.innerText = "Empty"; document.getElementById('totalPrice').innerText = "0"; return; }
    box.innerHTML = cart.map((it, i) => {
        total += it.total;
        return `<div style="display:flex;justify-content:space-between;margin-bottom:8px">
                <span>${it.qty}x ${it.name} (${it.color})</span>
                <span onclick="remove(${i})" style="color:red;cursor:pointer">X</span></div>`;
    }).join('');
    document.getElementById('totalPrice').innerText = total;
}

function remove(i) {
    cart.splice(i, 1);
    updateUI();
}

function sendOrder() {
    const n = document.getElementById('name').value;
    const c = document.getElementById('city').value;
    const a = document.getElementById('address').value;

    const p1 = document.getElementById('phone1').value;
    const p2 = document.getElementById('phone2').value;

    if (!n || !p1 || cart.length === 0)
        return alert("Fill Name, Phone and add items!");

    const phoneText = p2 ? `${p1} / ${p2}` : p1;

    let msg = `*NEW ORDER - AD MOBILES*\n\n👤 *Customer:* ${n}\n📞 *Phone:* ${phoneText}\n🏙️ *City:* ${c}\n📍 *Address:* ${a}\n\n*--- ITEMS ---*\n`;

    cart.forEach(it =>
        msg += `• ${it.qty}x ${it.name} (${it.color}) - LKR ${it.total}\n`
    );

    msg += `\n💰 *Total: LKR ${document.getElementById('totalPrice').innerText}*`;

    window.open(`https://wa.me/94751302483?text=${encodeURIComponent(msg)}`, '_blank');
}

const sliders = document.querySelectorAll('.product-grid');

sliders.forEach(slider => {
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        slider.style.cursor = 'grabbing';
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Adjust number to change scroll speed
        slider.scrollLeft = scrollLeft - walk;
    });
});

function showPage(pageId, event) {
    // 1. Hide all categories and remove active class from buttons
    const pages = document.querySelectorAll('.cat-page');
    const buttons = document.querySelectorAll('.category-menu button');
    
    pages.forEach(page => {
        page.classList.remove('active');
        
        // --- ADD THIS LINE BELOW ---
        // This resets the horizontal scroll to the start for EVERY category
        const grid = page.querySelector('.product-grid');
        if (grid) grid.scrollLeft = 0; 
    });

    buttons.forEach(btn => btn.classList.remove('active'));

    // 2. Show the selected category and set button to active
    document.getElementById(pageId).classList.add('active');
    event.currentTarget.classList.add('active');
}
if (grid) {
    grid.scrollTo({ left: 0, behavior: 'smooth' });
}







function toggleCart() {
    const overlay = document.getElementById('cartOverlay');
    
    // This toggles the 'active' class defined in CSS step 2
    if (overlay.classList.contains('active')) {
        overlay.classList.remove('active');
        overlay.style.display = 'none'; // Fallback safety
    } else {
        overlay.classList.add('active');
        overlay.style.display = 'flex'; // Force flex to center items
    }
}

