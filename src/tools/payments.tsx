export function remaining(student, _class) {
    const start_month = _class.start_date.split('-')[1];
    const start_year = _class.start_date.split('-')[0];
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const months = 12 * (year - start_year) + month - start_month;
    return student.amount * months - student.paid;
}
