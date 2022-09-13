class Cart {
    constructor() {
        this.cart = this.getStorage();
        if (!this.cart) {
            this.reset();
        }
    }

    createListing(product) {
        if (!Object.keys(this.cart).includes(product))
        {
            this.cart[product] = 0;
        }

        this.updateStorage();
    }

    add(product) {
        this.cart[product]++;

        this.updateStorage();
    }

    remove(product) {
        if (this.cart[product] <= 0) {
            return;
        }

        this.cart[product]--;

        this.updateStorage();
    }

    getCount(product) {
        return this.cart[product];
    }

    purchase() {
        postRequest("/purchase", {
            cart: this.cart,
            sessionId: mySessionID
        });

        this.reset();
    }

    reset() {
        this.cart = {};
        this.updateStorage();
    }

    getStorage() {
        return JSON.parse(localStorage.getItem("cart"));
    }

    updateStorage() {
        localStorage.setItem("cart", JSON.stringify(this.cart));
    }
}

const cart = new Cart();