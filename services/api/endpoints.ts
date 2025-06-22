
const ENDPOINTS = {
  COMPANIES: {
    BASE: '/companies',
    DETAIL: (cnpj: string) => `/companies/cnpj/${cnpj}`,
    BY_CNPJ: 'https://api.arkmeds.com/cnpj'
  },
  CEP: (cep: string) => `https://viacep.com.br/ws/${cep}/json/`,
};

export default ENDPOINTS;