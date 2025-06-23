'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Grid,
  Pagination,
  Stack,
  Typography,
  CircularProgress,
  Alert,
  TextField,
  InputAdornment,
} from '@mui/material';
import HighlightedCard from '@/components/ui/companyCard';
import AddIcon from '@mui/icons-material/Add';
import CompanyRegisterModal from '@/components/ui/companyRegisterModal';
import { useAllCompanies } from '@/hooks/useCompanies';
import { PAGE_SIZE } from '@/utils/constants';
import { MaskedField } from '@/components/ui/MaskedField';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { convertCNPJ } from '@/utils/generals';

export default function Companies() {
  const { data: companies, isLoading, error } = useAllCompanies();
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  // Filtros
  const [filterCNPJ, setFilterCNPJ] = useState('');
  const [filterName, setFilterName] = useState('');

  const filteredCompanies = useMemo(() => {
    if (!companies) return [];

    return companies.filter(company => {
      const cnpjMatch = convertCNPJ(company.cnpj).includes(convertCNPJ(filterCNPJ));
      const nameMatch = company.nome_fantasia.toLowerCase().includes(filterName.toLowerCase());
      return cnpjMatch && nameMatch;
    });
  }, [companies, filterCNPJ, filterName]);

  // Paginação
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil((companies ?? []).length / PAGE_SIZE);

  const currentPageData = useMemo(() => {
    if (!companies) return [];
    const startIndex = (page - 1) * PAGE_SIZE;
    return filteredCompanies.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredCompanies, page]);

  // Reset page quando filtros mudam
  useEffect(() => {
    setPage(1);
  }, [filterCNPJ, filterName]);

  if (isLoading) {
    return (
      <Stack
        sx={{
          position: 'absolute',
          top: '50%',
          left: {
            xs: '50%',
            md: 'calc(50% + 120px)',
          },
          transform: 'translate(-50%, -50%)',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        data-cy="loading"
      >
        <CircularProgress color='secondary' size={30} thickness={4}/>
        <Typography variant="body1" mt={2}>Carregando empresas...</Typography>
      </Stack>
    );
  }

  if (!companies || companies.length === 0) {
    return (
      <Stack spacing={2} sx={{ p: 3 }} alignItems={'center'}>
        <Typography variant="body1">
          Nenhuma empresa cadastrada
        </Typography>
      </Stack>
    );
  }

  if (error) {
    return (
      <Alert
        severity="error"
        sx={{ my: 3 }}
        data-cy="error-message"
      >
        {error.message}
      </Alert>
    );
  }

  return (
    <>
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          flex={1}
        >
          <Typography component="h4" variant="h4">
            Empresas
          </Typography>

          {/* Filtro CNPJ */}
          <MaskedField
            maskType="cnpj"
            value={filterCNPJ}
            onChange={(val) => setFilterCNPJ(val)}
            fullWidth
            size='small'
            placeholder='CNPJ'
            sx={{ width: { xs: '100%', md: 200 } }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon fontSize="small" />
                  </InputAdornment>
                )
              },
            }}
          />

          {/* Filtro CNPJ */}
          <TextField
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            size="small"
            placeholder='Nome'
            sx={{ width: { xs: '100%', md: 200 } }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start" sx={{ color: 'text.primary' }}>
                    <SearchRoundedIcon fontSize="small" />
                  </InputAdornment>
                )
              },
            }}
          />
        </Stack>
        <Button
          variant="contained"
          size="medium"
          color="success"
          endIcon={<AddIcon />}
          onClick={handleOpenModal}
          sx={{
            mt: { xs: 2, md: 0 },
            flex: '0 1 auto',
            flexShrink: 0,
            whiteSpace: 'nowrap',
            width: { xs: '100%', md: 'auto' },
          }}
        >
          Cadastrar
        </Button>
      </Stack>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {currentPageData.map((item, index) => (
          <Grid
            key={index}
            size={{ xs: 12, sm: 6, lg: 3 }}
            data-cy="company-card"
          >
            <HighlightedCard company={item} />
          </Grid>
        ))}
      </Grid>

      {/* Paginação */}
      <Stack>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
          siblingCount={1}
          sx={{ mx: 'auto', mt: 4 }}
        />
      </Stack>

      {/* Modal de cadastro de novas empresas */}
      <CompanyRegisterModal
        open={modalOpen}
        onClose={handleCloseModal}
        onSave={() => null}
      />
    </>
  );
}