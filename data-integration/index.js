import axios from 'axios';

const PRODUCTS_URL = 'http://localhost:3000/products';
const CART_URL = 'http://localhost:4000/cart';

// When Array.from gets a value of property length (1000 in this case), then it creates a real
// array with length 1000.
// This kind of fakeArray object is often called arrayLike.
// Uses duck-typing
const myDB = async () => Array.from({ length: 1000 }, (value, index) => `${index}-cellphone`);

// in memory data
// only after the process finishes it's able to send the data forward
// in the meantime the program freezes "gets stuck" - you can't execute anything else
async function processDBData() {
	const products = await myDB();
	const responses = [];

	for (const product of products) {
		const { data: productInfo } = await axios.get(`${PRODUCTS_URL}?productName=${product}`);
		const { data: cartData } = await axios.post(`${CART_URL}`, productInfo);

		responses.push(cartData);
	}

	return responses;
}

// console.table(await processDBData());

// on demand data
// as soon as a piece of data is available, send it forward
// the program continues executing (sending data) while the process is running
async function* processDBDataGenerator() {
	const products = await myDB();

	for (const product of products) {
		const { data: productInfo } = await axios.get(`${PRODUCTS_URL}?productName=${product}`);
		const { data: cartData } = await axios.post(`${CART_URL}`, productInfo);

		yield cartData;
	}
}

for await (const data of processDBDataGenerator()) {
	console.table(data);
}
