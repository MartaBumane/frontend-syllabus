# Exercises

## Classes & Objects

### Exercise #1

Create a class Product that represents a product sold in a shop. A product has a price, amount and name.

The class should have:

  - A constructor public Product(String name, double priceAtStart, int amountAtStart)
  - A method public void printProduct() that prints a product in the following form:

```
Banana, price 1.1, amount 13
```

Test your code by creating a class with main method and add three products there:

  - "Logitech mouse", 70.00 EUR, 14 units
  - "iPhone 5s", 999.99 EUR, 3 units
  - "Epson EB-U05", 440.46 EUR, 1 units
  
Print out information about them.

Add new behaviour to the Product class:

  - possibility to change quantity
  - possibility to change price
  
Reflect your changes in a working application.

### Exercise #2

Write a method named swapPoints that accepts two Points as parameters and swaps their x/y values.

Consider the following example code that calls swapPoints:

```
const p1 = new Point(5, 2);
const p2 = new Point(-3, 6);
swapPoints(p1, p2);
console.log("(" + p1.x + ", " + p1.y + ")");
console.log("(" + p2.x + ", " + p2.y + ")");
```

The output produced from the above code should be:

```
(-3, 6)
(5, 2)
```

### Exercise #3

Create a class called *Date* that includes: three pieces of information as instance variables — a month, a
day and a year.
 
Your class should have a constructor that initializes the three instance variables and assumes that the values provided are correct.
 
Provide a set and a get method for each instance variable.

Provide a method displayDate that displays the month, day and year separated by forward slashes */*.

### Exercise #4

For this exercise, you will design a set of classes that work together to simulate a car's fuel gauge and odometer. The classes you will design are the following:

The FuelGauge Class: This class will simulate a fuel gauge. Its responsibilities are as follows:

 - To know the car’s current amount of fuel, in liters.
 - To report the car’s current amount of fuel, in liters.
 - To be able to increment the amount of fuel by 1 liter. This simulates putting fuel in the car. ( The car can hold a maximum of 70 liters.)
 - To be able to decrement the amount of fuel by 1 liter, if the amount of fuel is greater than 0 liters. This simulates burning fuel as the car runs.
 
The Odometer Class: This class will simulate the car’s odometer. Its responsibilities are as follows:

 - To know the car’s current mileage.
 - To report the car’s current mileage.
 - To be able to increment the current mileage by 1 kilometer. The maximum mileage the odometer can store is 999,999 kilometer. When this amount is exceeded, the odometer resets the current mileage to 0.
 - To be able to work with a FuelGauge object. It should decrease the FuelGauge object’s current amount of fuel by 1 liter for every 10 kilometers traveled. (The car’s fuel economy is 10 kilometers per liter.)
 
Demonstrate the classes by creating instances of each. Simulate filling the car up with fuel, and then run a loop that increments the odometer until the car runs out of fuel. During each loop iteration, print the car’s current mileage and amount of fuel.

### Exercise #5

The object of the class Account must represent a bank account that has a balance (meaning some amount of money).

The accounts are used as follows:

```javascript
const bartosAccount = new Account("Barto's account", 100.00);
const bartosSwissAccount = new Account("Barto's account in Switzerland", 1000000.00);

console.log("Initial state");
console.log(bartosAccount);
console.log(bartosSwissAccount);

bartosAccount.withdraw(20);
console.log("Barto's account balance is now: " + bartosAccount.balance());
bartosSwissAccount.deposit(200);
console.log("Barto's Swiss account balance is now: " + bartosSwissAccount.balance());

console.log("Final state");
console.log(bartosAccount);
console.log(bartosSwissAccount);
```

#### Your first account

Create a program that creates an account with the balance of 100.0, deposits 20.0 and prints the account.

Note! do all the steps described in the exercise exactly in the described order!

#### Your first money transfer

Create a program that:

  - Creates an account named "Matt's account" with the balance of 1000
  - Creates an account named "My account" with the balance of 0
  - Withdraws 100.0 from Matt's account
  - Deposits 100.0 to My account
  - Prints both accounts
  
#### Money transfers

In the above program, you made a money transfer from one person to another. Let us next create a method that does the same!

Create the method:

```javascript
transfer(from, to, amount);
```
