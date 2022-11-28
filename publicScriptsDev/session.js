/* Validate session */
const serverSession = getRequest("sessionID");
let mySessionID = localStorage.getItem("mySessionID");

// If stored session ID is invalid, reset localstorage data
if (localStorage.getItem("sessionID") !== serverSession) {
    localStorage.setItem("sessionID", serverSession);

    cart.reset();

    // Get ID to identify self to server
    mySessionID = postRequest("/createSession");
    localStorage.setItem("mySessionID", mySessionID);

    postRequest("/setName", { sessionId: mySessionID, name: "" });
}