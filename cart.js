let cartLabel = document.getElementById('label');
let cartCenter = document.getElementById('cart-center');
let basket = JSON.parse(localStorage.getItem('cartItem')) || [];
const calculateCartItem = () => {
	if (basket.length > 0) {
		const total = basket.reduce((acc, curr) => {
			return acc + curr.item;
		}, 0);
		document.getElementById('cart-total').innerHTML = total;
	}
};
calculateCartItem();

let generateCartItem = () => {
	if (basket.length !== 0) {
		return (cartCenter.innerHTML = basket
			.map(shoe => {
				const { id, item } = shoe;
				const { img, name, price } = data.find(item => item.id === id) || [];

				return `<article class="shoes-card">
                      <img src=${img} width="150" height="100">
                      <div>
                      <div class="details">
                        <h3>${name}</h3>
                        <p class="cart-item-price">$${price}</p>
                        <button class="remove" onclick="removeItem(${id})"><i class="fa-solid fa-xmark"></i></button>
                      </div>
                      <div class="btn-container">
                        <button onclick="increment(${id})"><i class="fa-solid fa-plus"></i></button>
                            <span class="quantity" id=${id}>${item}</span>
                            <button onclick="decrement(${id})"><i class="fa-solid fa-minus"></i></button>
                        </div>
                        <p class="item-total">${item * price}</p>
                        </div>
                    </article>`;
			})
			.join(''));
	} else {
		cartCenter.innerHTML = '';
		cartLabel.innerHTML = 'cart is empty';
	}
};
generateCartItem();

const increment = id => {
	const search = basket.find(x => x.id === id);
	if (search === undefined) {
		basket.push({
			id,
			item: 1,
		});
	} else {
		search.item += 1;
	}
	generateCartItem();
	update(id);
	localStorage.setItem('cartItem', JSON.stringify(basket));
};

const decrement = id => {
	const search = basket.find(x => x.id === id);
	if (search === undefined) return;
	else if (search.item === 0) return;
	else {
		search.item -= 1;
	}
	update(id);
	basket = basket.filter(x => x.item !== 0);
	generateCartItem();
	localStorage.setItem('cartItem', JSON.stringify(basket));
};

const update = id => {
	let search = basket.find(x => x.id === id);
	document.getElementById(id).innerHTML = search.item;
	calculateCartItem();
	cartTotal();
};

const removeItem = id => {
	basket = basket.filter(x => x.id !== id);
	generateCartItem();
	cartTotal();
	localStorage.setItem('cartItem', JSON.stringify(basket));
};

const clearCart = () => {
	basket = [];
	generateCartItem();
	localStorage.setItem('cartItem', JSON.stringify(basket));
};

const cartTotal = () => {
	if (basket.length) {
		const amount = basket
			.map(x => {
				let { item, id } = x;
				let search = data.find(y => y.id === id) || [];

				return item * search.price;
			})
			.reduce((x, y) => x + y, 0);
		console.log(amount);
	}
};
