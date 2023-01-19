import getData from "./getData.js";
import cart from "./cart.js";

export default async () => {
    const serverSession = await getData("/api/sessionID");

    if (parseInt(localStorage.getItem("sessionID")) !== serverSession) {
        localStorage.setItem("sessionID", serverSession);

        // Get ID to identify self to server
        let mySessionID = await getData("/api/createSession");
        localStorage.setItem("mySessionID", mySessionID);

        // Reset Cart
        cart.reset();
    }
}