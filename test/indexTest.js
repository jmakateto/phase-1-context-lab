const {
  createEmployeeRecord,
  createEmployeeRecords,
  createTimeInEvent,
  createTimeOutEvent,
  hoursWorkedOnDate,
  wagesEarnedOnDate,
  allWagesFor,
  calculatePayroll
} = require('../index');

const helpers = require('./helpers');

describe("The payroll system", function () {
  // ... (existing test cases)

  describe("runs payroll using the mock data provided by Ultron data systems", function () {
    describe("Full Payroll Test", function () {
      /* Imported data courtesy of Ultron Consulting services
       *
       * Why go for smart when you can go for artificially intelligent? -- Ultron
       * Consulting
       */
      const csvDataEmployees = [
        ["Thor", "Odinsson", "Electrical Engineer", 45],
        ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
        ["Natalia", "Romanov", "CEO", 150],
        ["Darcey", "Lewis", "Intern", 15],
        ["Jarvis", "Stark", "CIO", 125],
        ["Anthony", "Stark", "Angel Investor", 300]
      ];

      const csvTimesIn = [
        ["Thor", ["2018-01-01 0800", "2018-01-02 0800", "2018-01-03 0800"]],
        ["Loki", ["2018-01-01 0700", "2018-01-02 0700", "2018-01-03 0600"]],
        ["Natalia", ["2018-01-03 1700", "2018-01-05 1800", "2018-01-03 1300"]],
        ["Darcey", ["2018-01-01 0700", "2018-01-02 0800", "2018-01-03 0800"]],
        ["Jarvis", ["2018-01-01 0500", "2018-01-02 0500", "2018-01-03 0500"]],
        ["Anthony", ["2018-01-01 1400", "2018-01-02 1400", "2018-01-03 1400"]]
      ];

      const csvTimesOut = [
        ["Thor", ["2018-01-01 1600", "2018-01-02 1800", "2018-01-03 1800"]],
        ["Loki", ["2018-01-01 1700", "2018-01-02 1800", "2018-01-03 1800"]],
        ["Natalia", ["2018-01-03 2300", "2018-01-05 2300", "2018-01-03 2300"]],
        ["Darcey", ["2018-01-01 1300", "2018-01-02 1300", "2018-01-03 1300"]],
        ["Jarvis", ["2018-01-01 1800", "2018-01-02 1800", "2018-01-03 1800"]],
        ["Anthony", ["2018-01-01 1600", "2018-01-02 1600", "2018-01-03 1600"]]
      ];

      let employeeRecords;

      beforeEach(function () {
        employeeRecords = createEmployeeRecords(csvDataEmployees);
        employeeRecords.forEach(function (rec, index) {
          csvTimesIn[index][1].forEach(function (timeInStamp) {
            createTimeInEvent.call(rec, timeInStamp);
          });

          csvTimesOut[index][1].forEach(function (timeOutStamp) {
            createTimeOutEvent.call(rec, timeOutStamp);
          });
        });
      });

      describe("calculatePayroll", function () {
        it("exists", function () {
          expect(calculatePayroll).to.exist;
        });

        it("correctly sums the payroll burden to $11,880 when passed an array of employee records", function () {
          expect(calculatePayroll(employeeRecords)).to.equal(11880);
        });
      });
    });
  });
});
