import productService from "../services/productService";
import { IProduct } from "../models/Product";

export const productResolver = {
  /* Queries */
  Query: {
    products: async () => {
      try {
        const products = await productService.getProducts();
        return { status: "Success", products };
      } catch (error) {
        throw error;
      }
    },

    product: async (_: any, args: { productId: string }) => {
      try {
        const product = await productService.getProductById(args.productId);
        return product;
      } catch (error) {
        throw error;
      }
    }
  },

  Mutation: {
    createProduct: async (_: any, args: IProduct) => {
      try {
        const product = await productService.createProduct(args);
        return product;
      } catch (error) {
        throw error;
      }
    },

    updateProduct: async (_: any, args: IProduct) => {
      try {
        const updatedProduct = await productService.updateProduct(args);
        return updatedProduct;
      } catch (error) {
        throw error;
      }
    },

    deleteProduct: async (_: any, args: { productId: string }) => {
      try {
        const deletedProduct = await productService.deleteProduct(args.productId);

        return {
          status: "Success",
          message: "Product deleted successfully",
          productId: deletedProduct.id
        };
      } catch (error) {
        throw error;
      }
    }
  }
}