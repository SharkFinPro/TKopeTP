/* Validate session */
const serverSession = getRequest("/api/sessionID");
let mySessionID = localStorage.getItem("mySessionID");

// If stored session ID is invalid, reset localstorage data
if (localStorage.getItem("sessionID") !== serverSession) {
    localStorage.setItem("sessionID", serverSession);

    cart.reset();

    // Get ID to identify self to server
    mySessionID = postRequest("/api/createSession");
    localStorage.setItem("mySessionID", mySessionID);

    postRequest("/api/setName", { sessionId: mySessionID, name: "" });
}