import { createServer } from 'http';
import { parse } from 'url';
import { randomUUID } from 'crypto';

const PORT = 3000;

async function handler(request, response) {
	// curl "localhost:3000/products?productName=test"
	if (request.method === 'GET' && request.url.includes('products')) {
		const {
			query: { productName },
		} = parse(request.url, true);

		const result = {
			id: randomUUID(),
			product: productName,
		};

		return response.end(JSON.stringify(result));
	}

	return response.end('Hello There!');
}

createServer(handler).listen(PORT, () => console.log(`products API is running at port ${PORT}`));
