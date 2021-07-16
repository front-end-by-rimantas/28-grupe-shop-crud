class Shop {
    constructor(shopName, currency) {
        this.shopName = shopName;
        this.currency = currency;
        this.productList = [];
    }

    intro() {
        console.log(`Hi, we are "${this.shopName}".\nUse .items() method to get list of items to purchase.\nUse .order() method to get your order details.`);
    }

    addItem(productName, productPriceInCents) {
        this.productList.push({
            name: productName,
            price: productPriceInCents
        })
        const price = (productPriceInCents / 100).toFixed(2);
        console.log(`"${this.shopName}" sells ${productName} for ${price} ${this.currency} now!`);
    }

    items() {
    }

    updatePrice() {
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