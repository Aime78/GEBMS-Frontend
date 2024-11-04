export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }