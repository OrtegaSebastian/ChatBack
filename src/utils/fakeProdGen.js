import { faker } from '@faker-js/faker';
faker.locale = 'es';

const fakeProduct = () => {
	return {
		id: faker.datatype.uuid(),
		title: faker.commerce.product(),
		description: faker.commerce.productDescription(),
		price: faker.commerce.price(),
		thumbnail: faker.image.imageUrl(),
	};
};

export default fakeProduct;