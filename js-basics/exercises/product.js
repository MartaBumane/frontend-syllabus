class Product{
    constructor(name, priceAtStart, amountAtStart){
        this.name = name;
        this.priceAtStart = priceAtStart;
        this.amountAtStart = amountAtStart;
    }

    printProduct(){
        console.log(this.name+ ", price: " + this.priceAtStart+ " EUR , amount: " + this.amountAtStart+' units!')
    }

    changeAmount(newAmount){
        return this.amountAtStart = newAmount;        
    }

    changePrice(newPrice){
        return this.priceAtStart = newPrice;
    }

}
const banana = new Product('banana', 1.1, 13);
const lemon = new Product('lemon', 1.7, 20);
const orange = new Product('orange', 0.7, 5);

banana.printProduct();
lemon.printProduct();
orange.printProduct();
console.log();


banana.changeAmount(20);
banana.changePrice(1.0);
banana.printProduct();






