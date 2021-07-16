class Shop {
    constructor(shopName, currency) {
        this.shopName = shopName;
        this.currency = currency;
        this.productList = [];
        this.ordersList = [];
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

    createCart(owner) {
        this.ordersList.push({ owner, items: [] });
    }

    addItemToCart(owner, productNumber, productCount) {
        for (const order of this.ordersList) {
            if (order.owner === owner) {
                order.items.push({
                    id: productNumber,
                    count: productCount
                })
                break;
            }
        }
    }

    order(owner, notification = true) {
        for (const order of this.ordersList) {
            if (order.owner === owner) {
                if (notification) {
                    console.log(order);
                }
                return order;
            }
        }
    }

    orderPrice(owner) {
        let totalPrice = 0;
        const order = this.order(owner, false);

        for (const item of order.items) {
            const product = this.productList[item.id - 1];
            totalPrice += item.count * product.price;
        }

        console.log(`${owner} order: ${this.formatPrice(totalPrice)}.`);
    }

    removeItem(productName) {
        let stillForSale = [];
        for (const product of this.productList) {
            if (product.name !== productName) {
                stillForSale.push(product);
            }
        }
        this.productList = stillForSale;
        console.log(`No more ${productName} at "${this.shopName}"!`);
    }

    pay() {
    }

    shopSummary() {
    }
}

module.exports = Shop;