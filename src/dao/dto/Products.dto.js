export default class ProductsDTO {
    static newProductDto = (product) => {
        return {
            title: product.title,
            description: product.description || '',
            price: product.price,
            brand: product.brand,
            image: product.image || ''
        }
    }
}