export interface Company {
  razao_social: string;
  nome_fantasia: string;
  estado: string;
  municipio: string;
  cnpj: string;
}

export type DetailCompany = {
  valor_rendimento: number
}

export type CreateCompany = {
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  cep: string;
  estado: string;
  municipio: string;
  logradouro: string;
  numero: number;
  complemento: string;
}

export interface AddressData {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export interface CompanyByCNPJ {
  cnpj: number;
  nomeFantasia: string;
  razaoSocial: string;
  descricaoSituacaoCadastral: string;
  logradouro: string;
  numero: number;
  bairro: string;
  complemento: string;
  municipio: string;
  uf: string;
  cep: number;
  codigoMunicipioIbge: number;
}

export type CompanyByCNPJReq = {
  cnpj: string;
}