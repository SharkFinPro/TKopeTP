import getData from "./getData";
import cart from "./cart";

export default async () => {
    /* Validate Session */
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