import { mergeTypeDefs } from "@graphql-tools/merge";

/* Application Modules */
import { usersGQLSchema } from "./userSchema";
import { productsGQLSchema } from "./productSchema";

export const mergedGQLSchema = mergeTypeDefs([usersGQLSchema, productsGQLSchema]);
