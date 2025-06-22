export function getRandomRangeNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const validateCNPJ = (cnpj: string): boolean => {
  cnpj = cnpj.replace(/\D/g, '');
  if (cnpj.length !== 14) return false;
  return true;
};

export function cleanCNPJ(cnpj: string): string {
  return cnpj.replace(/[^\d]/g, '');
}

export function cleanCEP(cep: string): string {
  return cep.replace(/\D/g, '');
}

export function convertCNPJ(cnpj: string): string {
  return cnpj
    .replace(/\D/g, '')
    .slice(0, 14)
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
}