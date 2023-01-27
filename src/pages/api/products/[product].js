import productManager from "../../../productManager.mjs";

export default async (req, res) => {
    const products = await productManager.getProductsByType(req.query.product);
    res.status(200).json(products);
}