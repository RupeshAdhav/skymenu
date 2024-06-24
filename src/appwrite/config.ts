import { Client, Account, Databases } from 'appwrite';

export const client = new Client();

client
    .setEndpoint(String(process.env.NEXT_PUBLIC_APPWRITE_URL))
    .setProject(String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)); // Replace with your project ID

export const account = new Account(client);
export const databases = new Databases(client);
export { ID } from 'appwrite';
