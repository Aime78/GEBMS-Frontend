export const formatToDayMonthYear = (date: Date | string) => {
    // Convert string to Date object if a string is passed
    const dateObject = typeof date === 'string' ? new Date(date) : date;
    
    // Check if date is valid
    if (isNaN(dateObject.getTime())) {
        return '-'; // or handle invalid date however you prefer
    }

    const day = dateObject.getDate().toString().padStart(2, "0");
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObject.getFullYear().toString();
    
    return `${day}/${month}/${year}`;
};