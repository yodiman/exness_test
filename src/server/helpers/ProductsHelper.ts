import {IProductDTO} from 'app/modules/products/IProductDTO';

export default class ProductsHelper {
  static productsData: IProductDTO[] = [
    {id: 1, price: 324, name: 'Handcrafted Metal Computer'},
    {id: 2, price: 432, name: 'Small Soft Shirt'},
    {id: 3, price: 12, name: 'Small Steel Chicken'},
    {id: 4, price: 32, name: 'Practical Frozen Pants'},
    {id: 5, price: 435, name: 'Tasty Wooden Shirt'},
    {id: 6, price: 23, name: 'Awesome Rubber Sausages'},
    {id: 7, price: 12, name: 'Generic Steel Shoes'},
    {id: 8, price: 32, name: 'Gorgeous Fresh Gloves'},
    {id: 9, price: 435, name: 'Small Concrete Shoes'},
    {id: 10, price: 500, name: 'Sleek Wooden Sausages'},
    {id: 11, price: 100, name: 'Small Fresh Tuna'},
    {id: 12, price: 234, name: 'Intelligent Frozen Sausages'},
    {id: 13, price: 100, name: 'Generic Plastic Bike'},
    {id: 14, price: 100, name: 'Rustic Soft Towels'},
    {id: 15, price: 434, name: 'Rustic Plastic Chips'},
    {id: 16, price: 324, name: 'Unbranded Granite Car'},
    {id: 17, price: 23, name: 'Refined Fresh Car'},
    {id: 18, price: 45, name: 'Awesome Granite Hat'},
    {id: 19, price: 55, name: 'Generic Cotton Car'},
    {id: 20, price: 122, name: 'Refined Cotton Computer'},
    {id: 21, price: 212, name: 'Ergonomic Soft Chips'},
    {id: 22, price: 345, name: 'Intelligent Steel Ball'},
    {id: 23, price: 667, name: 'Practical Frozen Shirt'},
    {id: 24, price: 445, name: 'Unbranded Concrete Towels'},
    {id: 25, price: 432, name: 'Awesome Wooden Soap'},
  ];


  static getProducts(): IProductDTO[] {
    return Object.values(ProductsHelper.productsData)
      .map(product => ({
        ...product,
        imageUrl: `https://picsum.photos/300?image=${product.id * 2}`,
      }));
  }


  static getProductById(id: number): IProductDTO {
    return ProductsHelper.getProducts().find(productItem => productItem.id === id);
  }
}
