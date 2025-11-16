const products = [
    {
        id: 'anime-sticker-pack',
        name: 'STICKERS',
        price: 12.99,
        description: '',
        emoji: '✨',
        url: 'https://github.com/'
    },
    {
        id: 'energy-drink',
        name: '500 cigarettes',
        price: 3.99,
        description: '',
        emoji: '⚡',
        url: null
    },
];

function displayProducts() {
    const container = document.getElementById('products-container');
    container.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-desc">${product.description}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="btn btn-primary" onclick="window.location.href='${product.url || '#'}'">
                    Buy Now
                </button>
            </div>
        </div>
    `).join('');
}

displayProducts();
