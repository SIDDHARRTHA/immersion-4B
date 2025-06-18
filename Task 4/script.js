// Fetch products from a mock API and display them
const API_URL = 'https://fakestoreapi.com/products';

async function fetchProducts() {
    const res = await fetch(API_URL);
    return res.json();
}

function createProductCard(product) {
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.title}">
            <div class="product-name">${product.category}</div>
            <div class="product-title">${product.title}</div>
            <div class="product-price">$${product.price}</div>
        </div>
    `;
}

let allProducts = [];

async function displayProducts(filter = '') {
    const productList = document.getElementById('product-list');
    if (!allProducts.length) {
        productList.innerHTML = '<p>Loading...</p>';
        try {
            allProducts = await fetchProducts();
        } catch (err) {
            productList.innerHTML = '<p>Failed to load products.</p>';
            return;
        }
    }
    const filtered = allProducts.filter(product => {
        const search = filter.toLowerCase();
        return (
            product.title.toLowerCase().includes(search) ||
            product.category.toLowerCase().includes(search) ||
            product.price.toString().includes(search)
        );
    });
    productList.innerHTML = filtered.length
        ? filtered.map(createProductCard).join('')
        : '<p>No products found.</p>';
}

displayProducts();

document.getElementById('search-input').addEventListener('input', (e) => {
    displayProducts(e.target.value);
});
