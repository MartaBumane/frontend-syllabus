class Account{
    constructor(name, balance){
        this.name = name;
        this.balance = balance;
    }

    deposit(deposit){
        return this.balance = this.balance + deposit;
    }

    withdraw(withdraw){
        return this.balance = this.balance - withdraw;
    }

    printAmount(){
        console.log(this.name + " balance is now: " + this.balance);

    }


}

const matts_account= new Account("Matt's account", 1000.00);
const my_accountt = new Account("My account", 0);

console.log("Initial state");
console.log(matts_account);
console.log(my_accountt);

matts_account.withdraw(100);
my_accountt.deposit(100);
matts_account.printAmount();
my_accountt.printAmount();



// console.log("Final state");
// console.log(bartosAccount);
// console.log(bartosSwissAccount);