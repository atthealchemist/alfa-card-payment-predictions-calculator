const ANNUAL_INTEREST_RATE = 33.99;
const ANNUAL_INTEREST_RATE_WITHDRAW = 44.99;

const getDaysInMonthCount = (year, month) =>
    new Date(year, month, 0).getDate();

const getMonthName = (year, monthNumber) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    return `${monthNames[monthNumber - 1]}, ${year}`;
};

const calculateOverpayment = (totalDebt, annualInterestRate = 34, days = 1) => {
    const dailyInterestRate = annualInterestRate / 365;
    const overpaymentPerDay = totalDebt / 100 * dailyInterestRate;
    return overpaymentPerDay * days;
}

export const calculatePaymentPredictions = (totalDebt, endGraceDate, months = 12) => {

    let predictions = [];
    let predictedDebt = totalDebt;

    for (let i = 0; i < months; i++) {
        const monthNumber = i + 1;
        const daysInMonth = getDaysInMonthCount(endGraceDate.getFullYear(), monthNumber);
        const currentAnnualInterestRate = Math.ceil(monthNumber > 1 ? ANNUAL_INTEREST_RATE : ANNUAL_INTEREST_RATE_WITHDRAW);
        const overpaymentPerMonth = calculateOverpayment(predictedDebt, currentAnnualInterestRate, daysInMonth);

        predictedDebt += overpaymentPerMonth;
        const currentMonthName = getMonthName(endGraceDate.getFullYear(), monthNumber);

        predictions.push({
            key: i.toString(),
            month: currentMonthName,
            debt: `${predictedDebt.toFixed(2)} RUB`,
            overpayment: `${overpaymentPerMonth.toFixed(2)} RUB`
        });
    }

    return predictions;
}