export const calculateFine = (dueDate) => {
  const today = new Date();
  const due = new Date(dueDate);
  if (today <= due) {
    return 0;
  }

  const daysLate = Math.ceil((today - due) / (1000 * 60 * 60 * 24));
  return daysLate * 10;
};

