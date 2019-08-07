class Date {
  constructor(month = 1, day = 1, year = 2019) {
    if (month <= 12 && month >= 1) {
      this.month = month;
    }

    if (day <= 31 && day >= 1) {
      this.day = day;
    }
    if (year > 1 && year <= 1800) {
      this.year = year;
    }
  }

  get month() {
    return this.month;
  }

  set month(month) {
    this.month = month;
  }

  get day() {
    return this.day;
  }

  set day(day) {
    this.day = day;
  }

  get year() {
    return this.year;
  }
  set year(year) {
    this.year = year;
  }

  displayDate() {
    return month + "/" + day + "/" + this.year;
  }
}

const d1 = new Date(1, 5, 2019);
