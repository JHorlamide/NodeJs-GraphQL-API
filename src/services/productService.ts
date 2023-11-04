import { IProduct, Product } from "../models/Product"

class ProductService {
  public async createProduct(productBodyField: IProduct) {
    try {
      const product = await Product.findOne({ name: productBodyField.name });

      if (product) {
        throw new Error("Product already exits");
      }

      return await Product.create({ ...productBodyField });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async getProducts() {
    return await Product.find({}).lean().exec();
  }

  public async getProductById(productId: string) {
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  }

  public async updateProduct(productBodyField: Partial<IProduct>) {
    try {
      const productId = productBodyField.id;
      if (!productId) {
        throw new Error('No id provided');
      }

      const product = await Product.findById(productId);
      if (!product) {
        throw new Error('No product found');
      }

      const updateProduct = await Product.findByIdAndUpdate(
        productId,
        { ...productBodyField },
        { new: true, runValidators: true }
      );

      if (!updateProduct) {
        throw new Error("Product not found");
      }

      return updateProduct;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async deleteProduct(productId: string) {
    if (!productId) {
      throw new Error('No id provided');
    }

    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('No product found');
    }

    const deleteProduct = await Product.findByIdAndDelete(productId);

    if (!deleteProduct) {
      throw new Product("Product not found");
    }

    return deleteProduct;
  }
}

export default new ProductService();
