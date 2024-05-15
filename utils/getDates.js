

const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate
};

const getStartDate = (startDate) => {
    return new Date(startDate);
}

module.exports = {getCurrentDate, getStartDate};