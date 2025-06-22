export type MaskType = 'cpf' | 'cnpj' | 'cep' | 'cell-phone' | 'uf' | 'money' | 'percentage' ;

export const applyMask = (value: string, type: MaskType): string => {
  if (!value) return '';

  switch(type) {
    case 'cpf':
      return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
        .slice(0, 14);
        
    case 'cnpj':
      return value
        .replace(/\D/g, '')
        .slice(0, 14)
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
        
    case 'cep':
      return value
        .replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .slice(0, 9);
      
    case 'cell-phone':
      const digitsCel = value.replace(/\D/g, '');
      return `(${digitsCel.slice(0, 2)}) ${digitsCel.slice(2, 7)}-${digitsCel.slice(7, 11)}`;
        
    case 'uf':
      return value
        .replace(/[^a-zA-Z]/g, '')
        .toUpperCase()
        .slice(0, 2);
      
    case 'money':
      const digitsMoney = value.replace(/\D/g, '');
      const number = Number(digitsMoney) / 100;
      return isNaN(number) 
        ? '' 
        : number.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });
      
    case 'percentage':
      return `${value}%`;

    default:
      return value;
  }
};