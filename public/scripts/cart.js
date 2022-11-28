var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cart = function () {
    function Cart() {
        _classCallCheck(this, Cart);

        this.cart = this.getStorage();
        if (!this.cart) {
            this.reset();
        }
    }

    _createClass(Cart, [{
        key: "createListing",
        value: function createListing(product, productData) {
            if (!Object.keys(this.cart).includes(product)) {
                this.cart[product] = productData;
                this.cart[product].count = 0;
            }

            this.updateStorage();
        }
    }, {
        key: "add",
        value: function add(product) {
            this.cart[product].count++;

            this.updateStorage();
        }
    }, {
        key: "remove",
        value: function remove(product) {
            if (this.cart[product].count <= 0) {
                return;
            }

            this.cart[product].count--;

            this.updateStorage();
        }
    }, {
        key: "getCount",
        value: function getCount(product) {
            return this.cart[product].count;
        }
    }, {
        key: "purchase",
        value: function purchase(paymentMethod) {
            var cart = this.getActual();
            var simplifiedCart = {};

            for (var product in cart) {
                simplifiedCart[product] = cart[product].count;
            }

            postRequest("/purchase", {
                cart: simplifiedCart,
                paymentMethod: paymentMethod,
                sessionId: mySessionID,
                time: new Date().toJSON()
            });

            this.reset();
        }
    }, {
        key: "getActual",
        value: function getActual() {
            var cart = {};
            for (var product in this.cart) {
                if (this.cart[product].count) {
                    cart[product] = this.cart[product];
                }
            }

            return cart;
        }
    }, {
        key: "getTotalPrice",
        value: function getTotalPrice() {
            var total = 0;

            for (var product in this.cart) {
                total += this.cart[product].price * this.cart[product].count;
            }

            return total;
        }
    }, {
        key: "reset",
        value: function reset() {
            this.cart = {};
            this.updateStorage();
        }
    }, {
        key: "getStorage",
        value: function getStorage() {
            return JSON.parse(localStorage.getItem("cart"));
        }
    }, {
        key: "updateStorage",
        value: function updateStorage() {
            localStorage.setItem("cart", JSON.stringify(this.cart));
        }
    }]);

    return Cart;
}();

var cart = new Cart();