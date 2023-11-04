import userService from "../services/userService";
import { IUser } from "../types/types";

export const userResolver = {
  /* Queries */
  Query: {
    users: async () => {
      try {
        const users = await userService.getUsers();
        return { status: "Success", users };
      } catch (error) {
        throw error;
      }
    },

    user: async (_: any, args: { id: string }) => {
      try {
        const user = await userService.getUser(args.id);
        return user;
      } catch (error) {
        throw error;
      }
    }
  },

  /* Mutation */
  Mutation: {
    registerUser: async (_: any, args: IUser) => {
      try {
        const newUser = await userService.createUser(args);
        return newUser;
      } catch (error) {
        throw error;
      }
    },

    loginUser: async (_: any, args: IUser) => {
      try {
        const authenticatedUser = await userService.loginUser(args);
        return authenticatedUser;
      } catch (error) {
        throw error;
      }
    },

    updateUser: async (_: any, args: IUser) => {
      try {
        const updatedUser = await userService.updateUser(args);
        return updatedUser;
      } catch (error) {
        throw error;
      }
    },

    deleteUser: async (_: any, args: { userId: string }) => {
      try {
        const deletedUser = await userService.deleteUser(args.userId);

        return {
          status: "Success",
          message: "User deleted successfully",
          userId: deletedUser.id
        };
      } catch (error) {
        throw error;
      }
    }
  }
}