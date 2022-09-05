const data = [
	{
		id: 1,
		name: 'product 1',
		desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque ipsum natus harum ullam temp',
		price: 59,
		img: 'img/shoe-1.jpg',
	},
	{
		id: 2,
		name: 'product 2',
		desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque ipsum natus harum ullam temp',
		price: 59,
		img: 'img/shoe-2.jpg',
	},
	{
		id: 3,
		name: 'product 3',
		desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque ipsum natus harum ullam temp',
		price: 59,
		img: 'img/shoe-3.jpg',
	},
	{
		id: 4,
		name: 'product 4',
		desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque ipsum natus harum ullam temp',
		price: 59,
		img: 'img/shoe-4.jpg',
	},
	{
		id: 5,
		name: 'product 5',
		desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque ipsum natus harum ullam temp',
		price: 59,
		img: 'img/shoe-5.jpg',
	},
	{
		id: 6,
		name: 'product 6',
		desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque ipsum natus harum ullam temp',
		price: 59,
		img: 'img/shoe-6.jpg',
	},
	{
		id: 7,
		name: 'product 7',
		desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque ipsum natus harum ullam temp',
		price: 59,
		img: 'img/shoe-7.jpg',
	},
];
let basket = JSON.parse(localStorage.getItem('cartItem')) || [];
const productList = document.querySelector('#product-list');
const products = data
	.map(item => {
		const { id, name, desc, price, img } = item;
		let search = basket.find(item => item.id === id) || [];
		console.log(search);
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

productList.innerHTML = products;

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
function updateProductItem(id) {
	const search = basket.find(x => x.id === id);
	document.getElementById(id).innerHTML = search.item;
	calculateCartItem();
}

const calculateCartItem = () => {
	if (basket.length > 0) {
		const total = basket.reduce((acc, curr) => {
			return acc + curr.item;
		}, 0);
		document.getElementById('cart-total').innerHTML = total;
	}
};
calculateCartItem();
