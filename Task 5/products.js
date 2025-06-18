let products = [];
let filteredProducts = [];
let sortState = { price: 'price-asc', rating: 'rating-desc' };

async function fetchProducts() {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    products = data.map(item => ({
        id: item.id,
        name: item.title,
        price: item.price,
        rating: item.rating?.rate || 0,
        type: item.category
    }));
    filteredProducts = [...products];
    sortAndRender();
}

function renderProducts(list) {
    const container = document.getElementById('product-list');
    container.innerHTML = '';
    if (list.length === 0) {
        container.innerHTML = '<p>No products found.</p>';
        return;
    }
    list.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <p>Rating: ${product.rating} ⭐</p>
        `;
        container.appendChild(div);
    });
}

function sortAndRender() {
    let sorted = [...filteredProducts];
    // Apply price sort first, then rating
    if (sortState.price) {
        if (sortState.price === 'price-asc') sorted.sort((a, b) => a.price - b.price);
        else if (sortState.price === 'price-desc') sorted.sort((a, b) => b.price - a.price);
    }
    if (sortState.rating) {
        if (sortState.rating === 'rating-asc') sorted.sort((a, b) => a.rating - b.rating);
        else if (sortState.rating === 'rating-desc') sorted.sort((a, b) => b.rating - a.rating);
    }
    renderProducts(sorted);
}

document.getElementById('sort-price').addEventListener('change', function() {
    sortState.price = this.value;
    sortAndRender();
});
document.getElementById('sort-rating').addEventListener('change', function() {
    sortState.rating = this.value;
    sortAndRender();
});
document.getElementById('search').addEventListener('input', function() {
    const query = this.value.trim().toLowerCase();
    filteredProducts = products.filter(p => p.name.toLowerCase().includes(query));
    sortAndRender();
});

// Initial fetch and render
fetchProducts();
