import apiClient from './api/apiClient';
import ENDPOINTS from './api/endpoints';
import { Company, CompanyByCNPJ, CompanyByCNPJReq, DetailCompany } from '@/types/companies';
import { cleanCNPJ } from '@/utils/generals';
import axios from 'axios';

// Trata erros de requisição
function handleRequestError(error: unknown, action: string): never {
  if (axios.isAxiosError(error)) {
    const msg = typeof error.response?.data?.message === 'string' && error.response?.data?.message.trim()
      ? error.response.data.message
      : error.message;
    throw new Error(`Erro ao ${action}: ${msg}`);
  }
  if (error instanceof Error) {
    throw new Error(`Erro ao ${action}: ${error.message}`);
  }
  throw new Error(`Erro ao ${action}`);
}

export const CompanyService = {
  // Busca todas as empresas
  getAllCompanies: async (): Promise<Company[]> => {
    try {
      const { data } = await apiClient.get<Company[]>(ENDPOINTS.COMPANIES.BASE);
      if (!Array.isArray(data)) {
        throw new Error('Resposta inesperada ao buscar empresas');
      }
      return data;
    } catch (error) {
      handleRequestError(error, 'buscar empresas');
    }
  },

  // Busca o faturamento de uma empresa pelo CNPJ
  getRevenueCompany: async (cnpj: string): Promise<DetailCompany> => {
    try {
      const { data } = await apiClient.get<DetailCompany>(
        ENDPOINTS.COMPANIES.DETAIL(cleanCNPJ(cnpj))
      );
      return data;
    } catch (error) {
      handleRequestError(error, 'Erro ao buscar detalhes da empresa!');
    }
  },

  // Busca detalhes de uma empresa pelo CNPJ
  getCompanyByCNPJ: async (payload: CompanyByCNPJReq): Promise<CompanyByCNPJ> => {
    try {
      const { data }  = await apiClient.post(
        ENDPOINTS.COMPANIES.BY_CNPJ,
        payload,
        { headers: { 'x-api-key': process.env.NEXT_PUBLIC_X_API_KEY } }
      );

      if (data.erro) {
          throw new Error('Empresa não encontrada');
      }

      return data;
    } catch (error) {
      console.error('Erro ao buscar empresa:', error);
      throw new Error('Falha ao buscar empresa. Tente novamente mais tarde.');
    }
  }
};
