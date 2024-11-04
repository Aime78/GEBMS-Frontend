export function formatToBillions(number: number) {
    // Convert to billions
    const billions = number / 1000000000;
    
    // Floor to the nearest whole number
    const floored = Math.floor(billions);
    
    // Format with commas
    const formatted = floored.toLocaleString('en-US');
    
    return formatted;
}