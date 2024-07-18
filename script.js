document.addEventListener('DOMContentLoaded', () => {
    fetchCategories();
    fetchProducts();

    if (window.location.pathname.includes('product.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        if (productId) {
            fetchProductDetails(productId);
        }
    }
});

const fetchCategories = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const categories = await response.json();
        displayCategories(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};

const displayCategories = (categories) => {
    const categoryFilters = document.getElementById('category-filters');
    categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category;
        button.onclick = () => fetchProducts(category);
        categoryFilters.appendChild(button);
    });
};

const fetchProducts = async (category) => {
    try {
        const url = category ? `https://fakestoreapi.com/products/category/${category}` : 'https://fakestoreapi.com/products';
        const response = await fetch(url);
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

const displayProducts = (products) => {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; 
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.description.substring(0, 100)}...</p>
            <p class="price">$${product.price}</p>
            <a href="product.html?id=${product.id}">View Details</a>
        `;
        productList.appendChild(productElement);
    });
};

const fetchProductDetails = async (productId) => {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const product = await response.json();
        displayProductDetails(product);
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
};

const displayProductDetails = (product) => {
    const productDetailContainer = document.getElementById('product-detail');
    if (!productDetailContainer) return;
    productDetailContainer.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <div class="product-detail">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p class="price">$${product.price}</p>
            <p class="rating">Rating: ${product.rating.rate} (based on ${product.rating.count} reviews)</p>
            <p class="category">Category: ${product.category}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `;
};

const addToCart = (productId) => {
    
    alert(`Product ${productId} added to cart`);
};
