const calculateFine = (dueDate) => {
    const today = new Date();
    if(today <= dueDate) {
        return 0;
    }
    const daysLate = Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24));
    return daysLate * 10;
};

export default calculateFine;