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

function remove(i) { cart.splice(i, 1); updateUI(); }

function sendOrder() {
    const n = document.getElementById('name').value;
    const c = document.getElementById('city').value;
    const a = document.getElementById('address').value;
    const p = document.getElementById('phone').value;

    if (!n || !p || cart.length === 0) return alert("Fill Name, Phone and add items!");

    let msg = `*NEW ORDER - AD MOBILES*\n\n👤 *Customer:* ${n}\n📞 *Phone:* ${p}\n🏙️ *City:* ${c}\n📍 *Address:* ${a}\n\n*--- ITEMS ---*\n`;
    cart.forEach(it => msg += `• ${it.qty}x ${it.name} (${it.color}) - LKR ${it.total}\n`);
    msg += `\n💰 *Total: LKR ${document.getElementById('totalPrice').innerText}*`;

    window.open(`https://wa.me/94751302483?text=${encodeURIComponent(msg)}`, '_blank');
}
