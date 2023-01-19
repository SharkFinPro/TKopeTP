export async function getRequest(path) {
    const data = await fetch(path);
    return data.json();
}

export async function postRequest(path, body) {
    await fetch(path, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body
    });
}