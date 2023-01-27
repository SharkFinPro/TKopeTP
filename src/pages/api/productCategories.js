import productManager from "../../productManager.mjs";

export default async (req, res) => {
    const types = await productManager.getProductTypes();
    res.status(200).json(types);
}