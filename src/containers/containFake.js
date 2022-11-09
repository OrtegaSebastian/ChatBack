import fakeProduct from '../utils/fakeProdGen.js';

// Genero los 5 productos  dentro de un contenedor 

class ContainerFake {
	constructor() {}
	
	traerProductos() {
		const products = [];
		for (let i = 0; i <= 5; i++) {
			products.push(fakeProduct());
		}
		return products;
	}
}

export default ContainerFake;