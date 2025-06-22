import { z } from 'zod';
import { validateCNPJ } from '@/utils/generals';

export const companySchema = z.object({
  cnpj: z.string()
    .min(1, 'CNPJ é obrigatório')
    .refine(validateCNPJ, 'CNPJ inválido'),
  
  razao_social: z.string()
    .min(1, 'Razão Social é obrigatória')
    .max(100, 'Razão Social deve ter no máximo 100 caracteres'),
  
  nome_fantasia: z.string()
    .min(1, 'Nome Fantasia é obrigatório')
    .max(100, 'Nome Fantasia deve ter no máximo 100 caracteres'),
  
  cep: z.string()
    .min(1, 'CEP é obrigatório'),
  
  estado: z.string()
    .length(2, 'Estado deve ter exatamente 2 caracteres'),
  
  municipio: z.string()
    .min(1, 'Município é obrigatório'),
  
  logradouro: z.string().optional(),
  
  numero: z
    .number({
      invalid_type_error: "Número é obrigatório",
      required_error: "Número é obrigatório",
    })
    .int("Número deve ser inteiro")
    .nonnegative("Número não pode ser negativo")
    .refine(value => value !== undefined, {
      message: "Número é obrigatório",
    }),
  
  complemento: z.string()
    .max(300, 'Complemento deve ter no máximo 300 caracteres')
    .optional(),
});

export type CompanyFormData = z.infer<typeof companySchema>;