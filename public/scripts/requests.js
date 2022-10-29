var getRequest = function getRequest(url) {
    var req = new XMLHttpRequest();
    req.open("GET", url, false);
    req.send(null);
    return req.responseText;
};

var postRequest = function postRequest(url, data) {
    var req = new XMLHttpRequest();
    req.open("POST", url, false);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send(JSON.stringify(data || ""));
    return req.responseText;
};