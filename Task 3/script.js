// script.js: Product Search Logic

const products = [
    'Apple iPhone 15',
    'Samsung Galaxy S24',
    'Google Pixel 8',
    'OnePlus 12',
    'Xiaomi 14 Pro',
    'Oppo Find X7',
    'Vivo X100',
    'Motorola Edge 50',
    'Sony Xperia 1 VI',
    'Nokia XR21'
];

const productList = document.getElementById('productList');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const errorMsg = document.getElementById('errorMsg');

function renderProducts(list) {
    productList.innerHTML = '';
    if (list.length === 0) {
        productList.innerHTML = '<li>No products found.</li>';
        return;
    }
    list.forEach(product => {
        const li = document.createElement('li');
        li.textContent = product;
        productList.appendChild(li);
    });
}

searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (!query) {
        errorMsg.textContent = 'Search field cannot be empty.';
        renderProducts(products);
        return;
    }
    errorMsg.textContent = '';
    const filtered = products.filter(p => p.toLowerCase().includes(query.toLowerCase()));
    renderProducts(filtered);
});

// Initial render
renderProducts(products);
