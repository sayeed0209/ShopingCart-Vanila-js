let basket = JSON.parse(localStorage.getItem('cartItem')) || [];
const productList = document.querySelector('#product-list');
const products = data
	.map(item => {
		const { id, name, desc, price, img } = item;
		let search = basket.find(item => item.id === id) || [];

		return `<article class="products">
    <div class="product-img">
        <img src=${img} alt=${name}/>
    </div>
    <h3 class="product-name">${name}</h3>
    <p class="desc">${desc}</p>
    <div class="product-price-and-btn">
    <p class="price">$${price}</p>
        <div class="btn-container">
            <button onclick="increment(${id})"><i class="fa-solid fa-plus"></i></button>
            <span class="quantity" id=${id}>${
			search.item === undefined ? 0 : search.item
		}</span>
            <button onclick="decrement(${id})"><i class="fa-solid fa-minus"></i></button>
        </div>
    </div>
  </article>`;
	})
	.join('');

// generating products
productList.innerHTML = products;

// increment product
let increment = id => {
	const search = basket.find(x => x.id === id);

	if (search === undefined) {
		basket.push({ id: id, item: 1 });
	} else {
		search.item += 1;
	}
	updateProductItem(id);
	localStorage.setItem('cartItem', JSON.stringify(basket));
};
// increment product
function decrement(id) {
	const search = basket.find(x => x.id === id);

	if (search === undefined) {
		return;
	} else if (search.item === 0) {
		return;
	} else {
		search.item -= 1;
	}
	updateProductItem(id);
	basket = basket.filter(x => x.item !== 0);
	localStorage.setItem('cartItem', JSON.stringify(basket));
}
// update total basket item
function updateProductItem(id) {
	const search = basket.find(x => x.id === id);
	document.getElementById(id).innerHTML = search.item;
	calculateCartItem();
}

// calculate total basket item
const calculateCartItem = () => {
	if (basket.length > 0) {
		const total = basket.reduce((acc, curr) => {
			return acc + curr.item;
		}, 0);
		document.getElementById('cart-total').innerHTML = total;
	}
};
calculateCartItem();
