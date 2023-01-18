const postRequest = (url, data) => {
    let req = new XMLHttpRequest();
    req.open("POST", url, false);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send(JSON.stringify(data || ""));
    return req.responseText;
};

class Cart {
    load() {
        this.cart = this.getStorage();
        if (!this.cart) {
            this.reset();
        }
    }

    reset() {
        this.cart = {};
        this.updateStorage();
        this.setPaymentMethod("");
    }

    getStorage() {
        return JSON.parse(localStorage.getItem("cart"));
    }

    updateStorage() {
        localStorage.setItem("cart", JSON.stringify(this.cart));
    }

    setPaymentMethod(type) {
        localStorage.setItem("paymentMethod", type);
    }

    getPaymentMethod() {
        return localStorage.getItem("paymentMethod");
    }

    createListing(productData) {
        if (!Object.keys(this.cart).includes(productData.id.toString())) {
            console.log("update")
            this.cart[productData.id] = productData;
            this.cart[productData.id].count = 0;
        }

        this.updateStorage();
    }

    remove(product) {
        if (this.cart[product].count > 0) {
            this.cart[product].count--;
            this.updateStorage();
        }
    }

    add(product) {
        this.cart[product].count++;
        this.updateStorage();
    }

    getCount(product) {
        return this.cart[product].count;
    }

    getTotalPrice() {
        let total = 0;

        for (let product in this.cart) {
            total += this.cart[product].price * this.cart[product].count;
        }

        return total;
    }

    getActual() {
        let cart = {};
        for (let product in this.cart) {
            if (this.cart[product].count) {
                cart[product] = this.cart[product];
            }
        }

        return cart;
    }

    purchase() {
        let cart = this.getActual();
        let simplifiedCart = {};

        for (let product in cart) {
            simplifiedCart[product] = cart[product].count;
        }

        postRequest("/api/purchase", {
            cart: simplifiedCart,
            paymentMethod: this.getPaymentMethod(),
            sessionId: localStorage.getItem("mySessionID"),
            time: new Date().toJSON()
        });

        this.reset();
    }
}

export default new Cart();