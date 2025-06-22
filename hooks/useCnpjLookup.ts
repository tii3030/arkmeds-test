import { useState, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { CompanyService } from '@/services';
import { cleanCNPJ } from '@/utils/generals';
import { toast } from 'react-toastify';
import { applyMask } from '@/utils/masks';

export const useCNPJLookup = () => {
  const { setValue } = useFormContext();
  const [isLoadingCNPJ, setIsLoadingCNPJ] = useState(false);
  const [CNPJError, setCNPJError] = useState<string | null>(null);
  const lastCNPJRef = useRef<string>('');

  const handleCNPJChange = async (CNPJ: string) => {

    // Impede que o campo seja revalidado idesejadamente
    if (CNPJ === lastCNPJRef.current) return;

    // Só busca se o CNPJ estiver completo
    if (cleanCNPJ(CNPJ).length !== 14) {
      setCNPJError(null);
      return;
    }

    try {
      setIsLoadingCNPJ(true);
      setCNPJError(null);
      lastCNPJRef.current = CNPJ;

      const companyData = await CompanyService.getCompanyByCNPJ({ cnpj: CNPJ });
      
      // Preenche os campos do formulário
      setValue('razao_social', companyData.razaoSocial, { shouldValidate: true });
      setValue('nome_fantasia', companyData.nomeFantasia, { shouldValidate: true });
      setValue('cep', applyMask(companyData.cep.toString(), 'cep'), { shouldValidate: true });
      setValue('estado', companyData.uf, { shouldValidate: true });
      setValue('municipio', companyData.municipio, { shouldValidate: true });
      setValue('logradouro', companyData.logradouro, { shouldValidate: true });
      setValue('numero', companyData.numero, { shouldValidate: true });
      setValue('complemento', companyData.complemento, { shouldValidate: true });

      // Após preencher os campos, seta uma flag no contexto do formulário, para não chamar a api VIACEP
      setValue('__cnpj_success', true, { shouldValidate: false });
     
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      setCNPJError(errorMessage);
      setValue('__cnpj_success', false, { shouldValidate: false });
      // Toast
      toast.error('Falha ao encontrar empresa.');

      // Limpa campos se o CNPJ for inválido
      if (errorMessage.includes('inválido') || errorMessage.includes('não encontrado')) {
        setValue('razao_social', '');
        setValue('nome_fantasia', '');
        setValue('cep', '');
        setValue('estado', '');
        setValue('municipio', '');
        setValue('logradouro', '');
        setValue('numero', '');
        setValue('complemento', '');
      }
    } finally {
      setIsLoadingCNPJ(false);
    }
  };

  return {
    handleCNPJChange,
    isLoadingCNPJ,
    CNPJError,
    setCNPJError
  };
};