import sessionManager from "../../sessionManager.mjs";

export default (req, res) => {
    res.status(200).send(sessionManager.getGlobalID().toString());
}