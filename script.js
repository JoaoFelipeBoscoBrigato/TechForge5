const products = [
    { id: 1, name: "Camiseta A", price: 29.99, img: "img/camiseta1.jpg" },
    { id: 2, name: "Camiseta B", price: 39.99, img: "img/camiseta2.jpg" },
    { id: 3, name: "Camiseta C", price: 49.99, img: "img/camiseta3.jpg" },
];

const productContainer = document.querySelector('.product-container');

products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
        <img src="${product.img}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Preço: R$${product.price.toFixed(2)}</p>
        <button>Adicionar ao Carrinho</button>
    `;
    productContainer.appendChild(productDiv);
});