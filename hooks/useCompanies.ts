import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { CompanyService } from '@/services';
import { Company, DetailCompany } from '@/types/companies';
import { cleanCNPJ } from '@/utils/generals';
import { toast } from 'react-toastify';

export function useAllCompanies() {
  return useQuery<Company[], Error>({
    queryKey: ['companies'],
    queryFn: CompanyService.getAllCompanies,
    staleTime: 1000 * 60, // 1 min
  });
}

export function useCompanyDetail(
  cnpj: string,
  options?: Omit<UseQueryOptions<DetailCompany, Error, DetailCompany, [string, string]>, 'queryKey' | 'queryFn'>
) {
  const query =  useQuery<DetailCompany, Error, DetailCompany, [string, string]>({
    queryKey: ['companies', cnpj],
    queryFn: () => CompanyService.getRevenueCompany(cleanCNPJ(cnpj)),
    ...options,
  });

  if (query.error) {
    toast.error(`Falha ao buscar empresas: ${query.error.message}`);
  }

  return query;
}
