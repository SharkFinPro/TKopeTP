class Cart {
    constructor() {
        this.cart = this.getStorage();
        if (!this.cart) {
            this.reset();
        }
    }

    createListing(product, productData) {
        if (!Object.keys(this.cart).includes(product))
        {
            this.cart[product] = productData;
            this.cart[product].count = 0;
        }

        this.updateStorage();
    }

    add(product) {
        this.cart[product].count++;

        this.updateStorage();
    }

    remove(product) {
        if (this.cart[product].count <= 0) {
            return;
        }

        this.cart[product].count--;

        this.updateStorage();
    }

    getCount(product) {
        return this.cart[product].count;
    }

    purchase(paymentMethod) {
        let cart = this.getActual();
        let simplifiedCart = {};

        for (let product in cart) {
            simplifiedCart[product] = cart[product].count;
        }

        postRequest("/purchase", {
            cart: simplifiedCart,
            paymentMethod: paymentMethod,
            sessionId: mySessionID
        });

        this.reset();
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

    getTotalPrice() {
        let total = 0;

        for (let product in this.cart) {
            total += this.cart[product].price * this.cart[product].count;
        }

        return total;
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