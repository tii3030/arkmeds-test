import { AddressData } from '@/types/companies';
import axios from 'axios';
import ENDPOINTS from './api/endpoints';
import { cleanCEP } from '@/utils/generals';

const getAddressByCep = async (cep: string): Promise<AddressData> => {
  try {
    const response = await axios.get(ENDPOINTS.CEP(cleanCEP(cep)));

    return response.data;
  } catch (error) {
    console.error('Erro na busca de CEP:', error);
    throw new Error('Falha ao buscar endereço. Tente novamente mais tarde.');
  }
};

export default getAddressByCep;