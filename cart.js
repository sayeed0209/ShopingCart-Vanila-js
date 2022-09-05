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
				const search = data.find(item => item.id === id) || [];
				console.log(search.img);
				return `<article class="shoes-card">
                      <img src=${search.img} width="150" height="100">
                      <div>
                      <div class="details">
                        <h3>${search.name}</h3>
                        <p class="cart-item-price">$${search.price}</p>
                        <button class="remove"><i class="fa-solid fa-xmark"></i></button>
                      </div>
                      <div class="btn-container">
                        <button onclick="increment(${id})"><i class="fa-solid fa-plus"></i></button>
                            <span class="quantity" id=${id}>${
					search.item === undefined ? 0 : search.item
				}</span>
                            <button onclick="decrement(${id})"><i class="fa-solid fa-minus"></i></button>
                        </div>
                        <p class="item-total">total</p>
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
