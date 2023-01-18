export default async (path) => {
    const products = await fetch(path);
    return products.json();
};