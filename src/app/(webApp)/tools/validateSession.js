import cart from "./cart.js";
import { getRequest } from "../../tools/requests.js";

export default async () => {
    const serverSession = await getRequest("/api/sessionID");

    if (parseInt(localStorage.getItem("sessionID")) !== serverSession) {
        localStorage.setItem("sessionID", serverSession);

        // Get ID to identify self to server
        let mySessionID = await getRequest("/api/createSession");
        localStorage.setItem("mySessionID", mySessionID);

        // Reset Cart
        cart.reset();
    }
}