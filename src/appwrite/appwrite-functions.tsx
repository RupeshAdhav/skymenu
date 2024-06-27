
import { ID, account, databases } from "./config";
import { Permission, Query, Role } from "appwrite";

// get user
export const getUser = () => {
    return account.get();
}

// send verification email
export const sendVerificationEmail = () => {
    return account.createVerification("https://skymenu.vercel.app/email-verification");
}

// confirm verification email
export const confirmVerificationEmail = (userId: string, secret: string) => {
    return account.updateVerification(userId, secret);
}

// update email
export const updateEmail = (email: string, password: string) => {
    return account.updateEmail(email, password);
}

// update password
export const updatePassword = (password: string, oldPasword: string) => {
    return account.updatePassword(password, oldPasword);
}

// delete account
export const deleteAccount = (userId: string) => {
    return account.deleteIdentity(userId);
}

// send password reset link
export const sendForgotPasswordLink = (email: string) => {
    return account.createRecovery(email, "https://skymenu.vercel.app/forgot-password-recovery");
}

// update password by reset link
export const updateForgotPassword = (userId: string, secret: string, password: string, confirmPassword: string) => {
    return account.updateRecovery(userId, secret, confirmPassword);
}

// get countries
export const getCountries = () => {
    return databases.listDocuments(String(process.env.NEXT_PUBLIC_SKYMENU_DATABASE_ID), String(process.env.NEXT_PUBLIC_SKYMENU_COLLECTION_COUNTRIES_ID));
}



// get menus
export const getMenus = (userId: string) => {
    //Query.select(["user_id", "menu_name", "slogan", "country_id", "phone", "address", "profile_link", "is_delete", "is_active"]),
    return databases.listDocuments(
        String(process.env.NEXT_PUBLIC_SKYMENU_DATABASE_ID), 
        String(process.env.NEXT_PUBLIC_SKYMENU_COLLECTION_MENUS_ID), 
        [
            Query.equal("is_delete", false),
            Query.equal("user_id", [userId])
        ]
    );
}

// get menu
export const getMenu = (menuId: string) => {
    return databases.listDocuments(
        String(process.env.NEXT_PUBLIC_SKYMENU_DATABASE_ID), 
        String(process.env.NEXT_PUBLIC_SKYMENU_COLLECTION_MENUS_ID), 
        [
            Query.equal("$id", menuId)
        ]
    );
}


// create menu
export const createMenu = (data :any, userId :string) => {
    const uniqueId = ID.unique();
    return databases.createDocument(
        String(process.env.NEXT_PUBLIC_SKYMENU_DATABASE_ID), 
        String(process.env.NEXT_PUBLIC_SKYMENU_COLLECTION_MENUS_ID), 
        uniqueId, 
        data,
        [
            Permission.read(Role.any()),
            Permission.update(Role.user(userId)),
            Permission.delete(Role.user(userId)) 
        ]
    );
}

// update menu
export const updateMenu = (data :any) => {
    let docId = data.$id;
    delete data.$id;
    return databases.updateDocument(
        String(process.env.NEXT_PUBLIC_SKYMENU_DATABASE_ID),
        String(process.env.NEXT_PUBLIC_SKYMENU_COLLECTION_MENUS_ID),
        docId, data
    );
}

// delete menu
// export const deleteMenu = (docId: string) => {
//     return databases.deleteDocument(String(process.env.NEXT_PUBLIC_SKYMENU_DATABASE_ID), String(process.env.NEXT_PUBLIC_SKYMENU_COLLECTION_MENUS_ID), docId);
// }


// get categories
export const getCategories = (userId: string, menuId: string) => {
    return databases.listDocuments(
        String(process.env.NEXT_PUBLIC_SKYMENU_DATABASE_ID),
        String(process.env.NEXT_PUBLIC_SKYMENU_COLLECTION_CATEGORIES_ID),
        [
            Query.equal("user_id", [userId]),
            Query.equal("menu_id", [menuId]),
            Query.orderAsc('order_no'),
            Query.limit(500)
        ]
    );
}

// get category
export const getCategory = (categoryId: string) => {
    return databases.listDocuments(
        String(process.env.NEXT_PUBLIC_SKYMENU_DATABASE_ID),
        String(process.env.NEXT_PUBLIC_SKYMENU_COLLECTION_CATEGORIES_ID),
        [
            Query.equal("$id", [categoryId])
        ]
    );
}

// create category
export const createCategory = (data :any, userId :string) => {
    const uniqueId = ID.unique();
    return databases.createDocument(
        String(process.env.NEXT_PUBLIC_SKYMENU_DATABASE_ID), 
        String(process.env.NEXT_PUBLIC_SKYMENU_COLLECTION_CATEGORIES_ID), 
        uniqueId, 
        data,
        [
            Permission.read(Role.any()),
            Permission.update(Role.user(userId)),
            Permission.delete(Role.user(userId)) 
        ]
    );
}

// update category
export const updateCategory = (data :any) => {
    let docId = data.$id;
    delete data.$id;
    return databases.updateDocument(
        String(process.env.NEXT_PUBLIC_SKYMENU_DATABASE_ID),
        String(process.env.NEXT_PUBLIC_SKYMENU_COLLECTION_CATEGORIES_ID),
        docId,
        data
    );
}

// delete category
export const deleteCategory = (docId: string) => {
    return databases.deleteDocument(
        String(process.env.NEXT_PUBLIC_SKYMENU_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_SKYMENU_COLLECTION_CATEGORIES_ID),
            docId
        );
}



// get items
export const getItems = (userId: string, menuId: string, categoryId: string) => {
    return databases.listDocuments(
        String(process.env.NEXT_PUBLIC_SKYMENU_DATABASE_ID),
        String(process.env.NEXT_PUBLIC_SKYMENU_COLLECTION_ITEMS_ID),
        [
            Query.equal("user_id", [userId]),
            Query.equal("menu_id", [menuId]),
            Query.equal("category_id", [categoryId]),
            Query.orderAsc('order_no'),
            Query.limit(500)
        ]
    );
}

// create item
export const createItem = (data :any, userId :string) => {
    const uniqueId = ID.unique();
    return databases.createDocument(
        String(process.env.NEXT_PUBLIC_SKYMENU_DATABASE_ID), 
        String(process.env.NEXT_PUBLIC_SKYMENU_COLLECTION_ITEMS_ID), 
        uniqueId, 
        data,
        [
            Permission.read(Role.any()),
            Permission.update(Role.user(userId)),
            Permission.delete(Role.user(userId)) 
        ]
    );
}

// update item
export const updateItem = (data :any) => {
    let docId = data.$id;
    delete data.$id;
    return databases.updateDocument(
        String(process.env.NEXT_PUBLIC_SKYMENU_DATABASE_ID),
        String(process.env.NEXT_PUBLIC_SKYMENU_COLLECTION_ITEMS_ID),
        docId,
        data
    );
}

// delete item
export const deleteItem = (docId: string) => {
    return databases.deleteDocument(
        String(process.env.NEXT_PUBLIC_SKYMENU_DATABASE_ID),
        String(process.env.NEXT_PUBLIC_SKYMENU_COLLECTION_ITEMS_ID),
        docId
    );
}

// get categories for menu card
export const getCategoriesForMenuCard = (menuId: string) => {
    return databases.listDocuments(
        String(process.env.NEXT_PUBLIC_SKYMENU_DATABASE_ID),
        String(process.env.NEXT_PUBLIC_SKYMENU_COLLECTION_CATEGORIES_ID),
        [
            Query.equal("menu_id", [menuId]),
            Query.equal("is_active", true),
            Query.orderAsc('order_no'),
            Query.limit(500)
        ]
    );
}

// get items for menu card
export const getItemsForMenuCard = (menuId: string, categoryId: string) => {
    return databases.listDocuments(
        String(process.env.NEXT_PUBLIC_SKYMENU_DATABASE_ID),
        String(process.env.NEXT_PUBLIC_SKYMENU_COLLECTION_ITEMS_ID),
        [
            Query.equal("menu_id", [menuId]),
            Query.equal("category_id", [categoryId]),
            Query.equal("is_active", true),
            Query.orderAsc('order_no'),
            Query.limit(500)
        ]
    );
}

// create theme
export const createTheme = (data :any) => {
    const uniqueId = ID.unique();
    return databases.createDocument(
        String(process.env.NEXT_PUBLIC_SKYMENU_DATABASE_ID), 
        String(process.env.NEXT_PUBLIC_SKYMENU_COLLECTION_THEMES_ID), 
        uniqueId, 
        data
    );
}

// get theme
export const getTheme = (menuId: string) => {
    return databases.listDocuments(
        String(process.env.NEXT_PUBLIC_SKYMENU_DATABASE_ID),
        String(process.env.NEXT_PUBLIC_SKYMENU_COLLECTION_THEMES_ID),
        [
            Query.equal("menu_id", [menuId])
        ]
    );
}

// update theme
export const updateTheme = (data :any) => {
    let docId = data.$id;
    delete data.$id;
    return databases.updateDocument(
        String(process.env.NEXT_PUBLIC_SKYMENU_DATABASE_ID),
        String(process.env.NEXT_PUBLIC_SKYMENU_COLLECTION_THEMES_ID),
        docId,
        data
    );
}
