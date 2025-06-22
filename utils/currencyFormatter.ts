export const formatCurrency = (value: number | undefined): string => {
  if (value === undefined || value === null) return 'R$ -';
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};