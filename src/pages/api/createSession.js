import sessionManager from "../../sessionManager.mjs";

export default async (req, res) => {
    const id = await sessionManager.createSession({ name: "" });
    res.status(200).send(id.toString());
}