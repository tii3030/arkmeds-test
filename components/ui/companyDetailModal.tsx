'use client';

import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent,
  IconButton,
  Typography,
  Stack,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Company } from '@/types/companies';
import { formatCurrency } from '@/utils/currencyFormatter';
import { useCompanyDetail } from '@/hooks/useCompanies';

interface CompanyDetailsModalProps {
  open: boolean;
  onClose: () => void;
  company: Company;
}

const labelColors = {
  up: 'success' as const,
  down: 'error' as const,
  neutral: 'default' as const,
};

export default function CompanyDetailModal({ 
  open, 
  onClose, 
  company 
}: CompanyDetailsModalProps) {

  const { data: detail, isLoading, error } = useCompanyDetail(
    company.cnpj,
    { enabled: open && Boolean(company.cnpj) }
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {company.nome_fantasia}
        <IconButton
          aria-label="close"
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers sx={{ py: 2 }}>
        {isLoading ? (
          <Stack alignItems="center" justifyContent="center" sx={{ py: 4}}>
            <CircularProgress color='secondary' size={30} thickness={4}/>
            <Typography variant="body1" mt={2}>Carregando detalhes da empresa...</Typography>
          </Stack>
        ) : error ? (
          <Alert severity="error" sx={{ my: 2 }}>
            {error.message}
          </Alert>
        ): (
          <Stack>
            <Stack
              direction="row"
              sx={{ justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Typography variant="h2" component="p">
                  {detail?.valor_rendimento !== undefined 
                    ? formatCurrency(detail.valor_rendimento)
                    : 'R$ -'
                  }
              </Typography>

              {/* Indicador de aumento do rendimento */}
              <Chip size="medium" color={labelColors.up} label={"+25%"} />
            </Stack>

            <Typography variant="subtitle2" sx={{ mb: 3 }}>
              Rendimento atual - últimos 30 dias
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {company.razao_social}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {company.municipio} - {company.estado.toUpperCase()}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {company.cnpj}
            </Typography>
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
}