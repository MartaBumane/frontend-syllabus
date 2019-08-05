class FuelGauge {
    constructor(amount) {
        this.amount = amount;

    }

    increase(input) {
        if (this.amount < FuelGauge.maxAmount) {
            this.amount+=input;
        }else{
            this.increase.toThrow();
        }
    }

    decrease(input) {
        if (this.amount > FuelGauge.minAmount) {
            this.amount-=input;
        }else{
            this.decrease.toThrow();
        }
    }

    report() {
        console.log('There are '+ this.amount +'L of fuel in the tank');
    }
}

FuelGauge.maxAmount = 70;
FuelGauge.minAmount = 0;

class Odometer {
    constructor(mileage, fuelGauge) {
        this.mileage = mileage;
        this.fuelGauge = fuelGauge;
        this.kmGoing = 0;
    }

    increase() {
        this.kmGoing++;
        if (this.kmGoing === 10) {
            this.fuelGauge.decrease(1);
            this.kmGoing = 0;
        }

        if (this.mileage < Odometer.maxMileage-1) {
            this.mileage++;
        } else {
            this.mileage = 0;
        }
    }

    report() {
        console.log('Current mileage is ' + this.mileage + 'km')
    }

}
Odometer.maxMileage = 999999;
Odometer.minMileage = 0;

exports.Odometer = Odometer;
exports.FuelGauge = FuelGauge;