import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { getAddressByCep } from '@/services';
import { cleanCEP } from '@/utils/generals';
import { toast } from 'react-toastify';

export const useCepLookup = () => {
  const { setValue, watch } = useFormContext();
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [cepError, setCepError] = useState<string | null>(null);
  const cnpjSuccess = watch('__cnpj_success');

  const handleCepChange = async (cep: string) => {

    if (cnpjSuccess) return;

    // Só busca se o CEP estiver completo
    if (cleanCEP(cep).length !== 8) {
      setCepError(null);
      return;
    }

    try {
      setIsLoadingCep(true);
      setCepError(null);
      
      const addressData = await getAddressByCep(cep);
      
      if ('erro' in addressData) {
        toast.error('CEP não encontrado!');
      } else {
        // Preenche os campos do formulário
        setValue('logradouro', addressData.logradouro, { shouldValidate: true });
        setValue('bairro', addressData.bairro, { shouldValidate: true });
        setValue('municipio', addressData.localidade, { shouldValidate: true });
        setValue('estado', addressData.uf, { shouldValidate: true });
        setValue('complemento', addressData.complemento, { shouldValidate: true });
      }      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      setCepError(errorMessage);
    } finally {
      setIsLoadingCep(false);
    }
  };

  return {
    handleCepChange,
    isLoadingCep,
    cepError,
    setCepError
  };
};