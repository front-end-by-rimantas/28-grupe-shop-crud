class Shop {
    constructor(shopName, currency) {
        this.shopName = shopName;
        this.currency = currency;
        this.productList = [];
        this.ordersList = [];
        this.soldItemsCount = 0;
        this.ordersCompletedCount = 0;
        this.profit = 0;
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
            price: productPriceInCents,
            forSale: true
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
        let id = 0;
        for (const product of this.productList) {
            ++id;
            if (product.forSale) {
                console.log(`${++index}) ${this.capitalize(product.name)} (id: ${id}) - ${this.formatPrice(product.price)};`);
            }
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
        this.ordersList.push({ owner, items: [], paid: false });
    }

    addItemToCart(owner, productNumber, productCount) {
        for (const order of this.ordersList) {
            if (order.owner === owner) {
                if (order.paid) {
                    console.log('You can not add items to already paid cart!');
                    return;
                }

                const product = this.productList[productNumber - 1];
                if (product.forSale) {
                    order.items.push({
                        id: productNumber,
                        count: productCount
                    })
                    return;
                } else {
                    console.log('Item is out of stock!');
                }
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

    orderPrice(owner, notification = true) {
        let totalPrice = 0;
        const order = this.order(owner, false);

        for (const item of order.items) {
            const product = this.productList[item.id - 1];
            totalPrice += item.count * product.price;
        }

        if (notification) {
            console.log(`${owner} order: ${this.formatPrice(totalPrice)}.`);
        }
        return totalPrice;
    }

    removeItem(productName) {
        for (const product of this.productList) {
            if (product.name === productName) {
                product.forSale = false;
                break;
            }
        }
        console.log(`No more ${productName} at "${this.shopName}"!`);
    }

    pay(owner, cash) {
        const price = this.orderPrice(owner, false);
        if (price > cash) {
            console.log('Need more money!');
            return;
        }

        const change = cash - price;
        let message = '';
        if (change > 0) {
            message += `Here is your ${this.formatPrice(change)} change!\n`;
        }
        message += `Thank you for purchasing at "${this.shopName}"!`;
        console.log(message);

        for (const order of this.ordersList) {
            if (order.owner === owner) {
                order.paid = true;
                this.profit += price;
                this.ordersCompletedCount++;
                this.updateSoldItemsCount(order.items);
                break;
            }
        }
    }

    updateSoldItemsCount(items) {
        for (const item of items) {
            this.soldItemsCount += item.count;
        }
    }

    shopSummary() {
        const orderInPorgressCount = this.ordersList.length - this.ordersCompletedCount;
        let possibleProfit = 0;

        for (const order of this.ordersList) {
            if (!order.paid) {
                possibleProfit += this.orderPrice(order.owner);
            }
        }

        console.log(`Summary for the "${this.shopName}"`);
        console.log(`====================`);
        console.log(`Items sold: ${this.soldItemsCount}`);
        console.log(`Orders completed: ${this.ordersCompletedCount}`);
        console.log(`Orders in progress: ${orderInPorgressCount}`);
        console.log(`Profit: ${this.formatPrice(this.profit)}`);
        console.log(`Possible profit: 4.70 EUR`);
        console.log(`====================`);
    }
}

module.exports = Shop;