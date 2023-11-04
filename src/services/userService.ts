import { User } from "../models/User";
import { IUser } from "../types/types";

class UserService {
  public async createUser(user: IUser) {
    try {
      const userExit = await User.findOne({ email: user.email });

      if (userExit) {
        throw new Error("User already exist");
      }

      return await User.create({ ...user });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async loginUser(userBodyField: IUser) {
    try {
      const user = await User.findOne({ email: userBodyField.email }).exec();

      if (!user) {
        throw new Error("User not found");
      }

      const isPasswordValid = await user.isValidPassword(userBodyField.password);

      if (!isPasswordValid) {
        throw new Error("Invalid email/password");
      }

      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async getUsers() {
    try {
      return await User.find({}).lean().exec();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async getUser(userId: string) {
    if (!userId) {
      throw new Error("User ID is required");
    }

    try {
      const user = await User.findById(userId).exec();

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async updateUser(userBodyField: IUser) {
    try {
      const userId = userBodyField.id;

      if (!userId) {
        throw new Error('Id is required');
      }

      const user = await User.findById(userId);

      if (!user) throw new Error('User not found');

      const updateUser = await User.findByIdAndUpdate(
        userId,
        { ...userBodyField },
        { new: true, runValidators: true }
      );

      if (!updateUser) {
        throw new Error("User not found");
      }

      return updateUser;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async deleteUser(userId: string) {
    try {
      if (!userId) {
        throw new Error('No id provided');
      }

      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      const deleteUser = await User.findByIdAndDelete(userId);
      if (!deleteUser) {
        throw new Error("User not found");
      }

      return deleteUser;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default new UserService();
