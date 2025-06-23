'use client';

import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent,
  IconButton,
  Stack,
  DialogActions,
  Button,
  Tooltip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CompanyForm from '@/components/ui/companyRegisterForm';
import { FormProvider, useForm } from 'react-hook-form';
import { companySchema, CompanyFormData } from '@/schemas/companySchema';
import { zodResolver } from '@hookform/resolvers/zod';
// import { createNewCompany } from '@/infra/api/companies/createCompany';

interface CompanyRegisterModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: CompanyFormData) => void;
}

export default function CompanyRegisterModal({ 
  open, 
  onClose,
  onSave
}: CompanyRegisterModalProps) {

  const methods = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      cnpj: '',
      razao_social: '',
      nome_fantasia: '',
      cep: '',
      estado: '',
      municipio: '',
      logradouro: '',
      numero: undefined,
      complemento: ''
    }
  });

  const { handleSubmit, reset, setError, formState: { isSubmitting } } = methods;

  // Limpa o formulário
  const handleClear = () => {
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: CompanyFormData) => {
    try {
      await onSave(data);
      reset();
      onClose();
    } catch {
      setError('root', {
        type: 'manual',
        message: 'Não foi possível salvar a empresa. Verifique e tente novamente.'
      });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth='sm'
      fullWidth
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            Cadastro de Empresa
            <IconButton
              aria-label='close'
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          
          <DialogContent dividers sx={{ py: 2 }}>
            <Stack>
              <CompanyForm />
            </Stack>
          </DialogContent>
          
          {/* Botões de ação do modal */}
          <DialogActions sx={{ p: 2 }}>
            <Tooltip
              title="Limpar todos os campos."
              placement="top"
            >
              <Button 
                onClick={handleClear} 
                variant='text'
                color='primary'
                sx={{ mr: 1 }}
                disabled={isSubmitting}
                data-cy="clear-modal"
              >
                Limpar
              </Button>
            </Tooltip>
            <Button 
              onClick={onClose} 
              variant='text'
              color='primary'
              sx={{ mr: 1 }}
              disabled={isSubmitting}
              data-cy="close-modal"
            >
              Fechar
            </Button>
            <Button 
              variant='outlined'
              color='primary'
              sx={{ mr: 1 }}
              disabled={isSubmitting}
              type='submit'
              data-cy="submit-modal"
            >
              Salvar
            </Button>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
}