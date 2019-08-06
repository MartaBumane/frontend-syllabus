const { Odometer, FuelGauge } = require("./car");

describe("Car", () => {
  let fuelGauge;
  let odometer;
  beforeEach(() => {
    jest.spyOn(console, "log");
    fuelGauge = new FuelGauge(10);
    odometer = new Odometer(100000, fuelGauge);
  });

  afterEach(() => {
    console.log.mockRestore();
  });

  describe("FuelGauge", () => {
    test("has min and max amount as static constants", () => {
      expect(FuelGauge.minAmount).toEqual(0);
      expect(FuelGauge.maxAmount).toEqual(70);
    });

    test("can return current amount of fuel", () => {
      expect(fuelGauge.amount).toEqual(10);
    });

    test("can increment the fuel", () => {
      fuelGauge.increase(1);
      expect(fuelGauge.amount).toEqual(11);
    });

    test("can decrement the fuel", () => {
      fuelGauge.decrease(1);
      expect(fuelGauge.amount).toEqual(9);
    });

    test("can report fuel amount to console", () => {
      fuelGauge.report();
      expect(console.log.mock.calls[0][0]).toEqual(
        "There are 10L of fuel in the tank"
      );

      fuelGauge.increase(1);
      fuelGauge.report();
      expect(console.log.mock.calls[1][0]).toEqual(
        "There are 11L of fuel in the tank"
      );

      fuelGauge.decrease(2);
      fuelGauge.report();
      expect(console.log.mock.calls[2][0]).toEqual(
        "There are 9L of fuel in the tank"
      );
    });

    test("should throw an error if trying to fill more fuel than possible", () => {
      fuelGauge.increase(60);
      expect(fuelGauge.amount).toEqual(70);
      expect(() => fuelGauge.increase(1)).toThrow();
    });

    test("should throw an error if trying to spend more fuel than possible", () => {
      fuelGauge.decrease(10);
      expect(fuelGauge.amount).toEqual(0);
      expect(() => fuelGauge.decrease(1)).toThrow();
    });
  });

  describe("Odometer", () => {
    test("has min and max mileage as static constants", () => {
      expect(Odometer.minMileage).toEqual(0);
      expect(Odometer.maxMileage).toEqual(999999);
    });

    test("can return current mileage", () => {
      expect(odometer.mileage).toEqual(100000);
    });

    test("can increment mileage", () => {
      odometer.increase();
      expect(odometer.mileage).toEqual(100001);
    });

    test("can report mileage to console", () => {
      odometer.report();
      expect(console.log.mock.calls[0][0]).toEqual(
        "Current mileage is 100000km"
      );

      odometer.increase();
      odometer.report();
      expect(console.log.mock.calls[1][0]).toEqual(
        "Current mileage is 100001km"
      );
    });

    test("is reset after 999999", () => {
      for (let i = 0; i < 899999; i++) {
        odometer.increase();
        if (fuelGauge.amount === 0) {
          fuelGauge.increase(FuelGauge.maxAmount);
        }
      }
      expect(odometer.mileage).toEqual(0);
    });

    test("decreases fuel amount by 1L on every 10km", () => {
      expect(fuelGauge.amount).toEqual(10);

      for (let i = 0; i < 10; i++) {
        odometer.increase();
      }
      expect(fuelGauge.amount).toEqual(9);

      for (let i = 0; i < 85; i++) {
        odometer.increase();
      }
      expect(fuelGauge.amount).toEqual(1);
    });
  });
});
