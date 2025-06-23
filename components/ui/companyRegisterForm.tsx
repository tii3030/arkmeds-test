import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { 
  TextField, 
  Grid,
  InputAdornment,
  CircularProgress,
  Stack,
} from '@mui/material';
import { MaskedField } from './MaskedField';
import { useCepLookup } from '@/hooks/useCepLookup';
import { useCNPJLookup } from '@/hooks/useCnpjLookup';
import { cleanCEP, cleanCNPJ } from '@/utils/generals';
import { FixedHint } from './FixedHint';

const CompanyForm: React.FC = () => {
  const { 
    register,
    control,
    formState: { errors },
    watch,
  } = useFormContext();

  const { handleCepChange, isLoadingCep, cepError, setCepError } = useCepLookup();
  const { handleCNPJChange, isLoadingCNPJ, CNPJError, setCNPJError } = useCNPJLookup();

  // Observa mudanças nos campos
  const cepValue = watch('cep');
  const cnpjValue = watch('cnpj');

  useEffect(() => {
    // Dispara a busca quando o CEP estiver completo
    if (cepValue && cleanCEP(cepValue).length === 8) {
      handleCepChange(cepValue);
    }

    // Dispara a busca quando o CNPJ estiver completo
    if (cnpjValue && cleanCNPJ(cnpjValue).length === 14) {
      handleCNPJChange(cnpjValue);
    }
  }, [cepValue, cnpjValue]);

  return (
    <>
      {/* Dicas */}
      <Stack mb={2}>
        <FixedHint text="Dica: Preencha o campo 'CNPJ' para preencher os dados da empresa automaticamente!" />
        <FixedHint text="Dica: Preencha o campo 'CEP' para preencher o endereço automaticamente!" />
      </Stack>

      {/* Formulário */}
      <Grid container spacing={2}>

        {/* Campo oculto para controlar a flag */}
        <input type="hidden" {...register('__cnpj_success')} />

        {/* CNPJ */}
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <Controller
            name="cnpj"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <MaskedField
                maskType="cnpj"
                label="CNPJ"
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                  // Limpa erro ao começar a digitar novo CEP
                  if (CNPJError) setCNPJError(null);
                }}
                fullWidth
                variant="filled"
                size='small'
                error={!!error}
                helperText={error?.message}
                slotProps={{
                  input: {
                    endAdornment: isLoadingCNPJ && (
                      <InputAdornment position="end">
                        <CircularProgress size={20} />
                      </InputAdornment>
                    )
                  },
                }}
              />
            )}
            data-cy="form-cnpj"
          />
        </Grid>

        {/* Razão Social */}
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <TextField
            fullWidth
            label="Razão Social"
            variant="filled"
            {...register('razao_social')}
            error={!!errors.razao_social}
            helperText={errors.razao_social?.message as string}
            size='small'
            type='text'
            slotProps={{
              htmlInput: { maxLength: 100 }, // Máximo de 100 caracteres
            }}
            key={`razao_social-${watch('razao_social')}`}
            data-cy="form-razao_social"
          />
        </Grid>

        {/* Nome Fantasia */}
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <TextField
            fullWidth
            label="Nome Fantasia"
            variant="filled"
            {...register('nome_fantasia')}
            error={!!errors.nome_fantasia}
            helperText={errors.nome_fantasia?.message as string}
            size='small'
            slotProps={{
              htmlInput: { maxLength: 100 }, // Máximo de 100 caracteres
            }}
            key={`nome_fantasia-${watch('nome_fantasia')}`}
            data-cy="form-nome_fantasia"
          />
        </Grid>

        {/* CEP */}
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <Controller
            name="cep"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <MaskedField
                maskType='cep'
                label="CEP"
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                  // Limpa erro ao começar a digitar novo CEP
                  if (cepError) setCepError(null);
                }}
                fullWidth
                variant="filled"
                size='small'
                error={!!error}
                helperText={error?.message}
                slotProps={{
                  htmlInput: { maxLength: 9 },
                  input: {
                    endAdornment: isLoadingCep && (
                      <InputAdornment position="end">
                        <CircularProgress size={20} />
                      </InputAdornment>
                    )
                  },
                }}
                data-cy="form-cep"
              />
            )}
          />
        </Grid>

        {/* Estado */}
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <Controller
            name="estado"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <MaskedField
                maskType='uf'
                label="UF"
                value={field.value}
                onChange={field.onChange}
                fullWidth
                variant="filled"
                size='small'
                error={!!error}
                helperText={error?.message}
                data-cy="form-estado"
              />
            )}
          />
        </Grid>

        {/* Município */}
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <TextField
            fullWidth
            label="Município"
            variant="filled"
            {...register('municipio')}
            error={!!errors.municipio}
            helperText={errors.municipio?.message as string}
            size='small'
            key={`municipio-${watch('municipio')}`}
            data-cy="form-municipio"
          />
        </Grid>

        {/* Logradouro */}
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <TextField
            fullWidth
            label="Logradouro"
            variant="filled"
            {...register('logradouro')}
            error={!!errors.logradouro}
            helperText={errors.logradouro?.message as string}
            size='small'
            key={`logradouro-${watch('logradouro')}`}
            data-cy="form-logradouro"
          />
        </Grid>

        {/* Número */}
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <TextField
            fullWidth
            label="Número"
            variant="filled"
            type="number"
            {...register('numero', { valueAsNumber: true })}
            error={!!errors.numero}
            helperText={errors.numero?.message as string}
            size='small'
            slotProps={{ // Apenas números inteiros positivos
              input: {
                inputMode: 'numeric',
                onBeforeInput: (event) => {
                  if (event.nativeEvent.data && !/\d/.test(event.nativeEvent.data)) {
                    event.preventDefault();
                  }
                }
              }
            }}
            key={`numero-${watch('numero')}`}
            data-cy="form-numero"
          />
        </Grid>

        {/* Complemento */}
        <Grid size={{ xs: 12, sm: 12, md: 12 }}>
          <TextField
            fullWidth
            label="Complemento"
            variant="filled"
            {...register('complemento')}
            error={!!errors.complemento}
            helperText={errors.complemento?.message as string}
            multiline
            rows={2}
            size='small'
            slotProps={{
              htmlInput: { maxLength: 300 }, // Máximo de 300 caracteres
            }}
            key={`complemento-${watch('complemento')}`}
            data-cy="form-complemento"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CompanyForm;