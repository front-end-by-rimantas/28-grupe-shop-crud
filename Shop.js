class Shop {
    constructor(shopName, currency) {
        this.shopName = shopName;
        this.currency = currency;
        this.productList = [];
    }

    intro() {
        console.log(`Hi, we are "${this.shopName}".\nUse .items() method to get list of items to purchase.\nUse .order() method to get your order details.`);
    }

    formatPrice(priceInCents) {
        const price = (priceInCents / 100).toFixed(2);
        return `${price} ${this.currency}`;
    }

    addItem(productName, productPriceInCents) {
        this.productList.push({
            name: productName,
            price: productPriceInCents
        })
        console.log(`"${this.shopName}" sells ${productName} for ${this.formatPrice(productPriceInCents)} now!`);
    }

    capitalize(text) {
        return text[0].toUpperCase() + text.slice(1);
    }

    items() {
        console.log(`Items for sale at "${this.shopName}":`);
        console.log(`====================`);
        let index = 0;
        for (const product of this.productList) {
            console.log(`${++index}) ${this.capitalize(product.name)} - ${this.formatPrice(product.price)};`);
        }
        console.log(`====================`);
    }

    updatePrice(productName, productPriceInCents) {
        for (const product of this.productList) {
            if (product.name === productName) {
                product.price = productPriceInCents;
                break;
            }
        }
        console.log(`"${this.shopName}" updated price and sells ${productName} for ${this.formatPrice(productPriceInCents)} now!`);
    }

    createCart() {
    }

    addItemToCart() {
    }

    order() {
    }

    orderPrice() {
    }

    removeItem() {
    }

    pay() {
    }

    shopSummary() {
    }
}

module.exports = Shop;