/* Validate session */
const serverSession = getRequest("sessionID");
let mySessionID = localStorage.getItem("mySessionID");

// If stored session ID is invalid, reset localstorage data
if (localStorage.getItem("sessionID") !== serverSession) {
    localStorage.setItem("sessionID", serverSession);

    localStorage.setItem("counter", JSON.stringify({visits: 0}));
    cart.reset();

    // Get ID to identify self to server
    mySessionID = postRequest("/createSession");
    localStorage.setItem("mySessionID", mySessionID);

    postRequest("/setName", { sessionId: mySessionID, name: "Alex" });
}

// Get ID
console.log(`Server Session ID: ${serverSession}, my Session ID: ${mySessionID}`);