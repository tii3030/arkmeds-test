'use client'

import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Company } from '@/types/companies';
import CompanyDetailModal from './companyDetailModal';
import { convertCNPJ } from '@/utils/generals';

interface CompanyCardProps {
  company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {

  if (!company) return null;

  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <>
      {/* Cards - Empresas */}
      <Card
        variant="outlined"
        onClick={handleOpenModal}
        sx={{
          textAlign: 'center',
          height: '100%',
          cursor: 'pointer',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 1
          }
        }}
      >
        <CardContent>
          <Typography
            component="h4"
            variant="h4"
            gutterBottom
            sx={{ fontWeight: '600' }}
          >
            {company.nome_fantasia}
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: '2px' }}>
            {company.razao_social}
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: '2px' }}>
            {company.municipio} - {company.estado}
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: '10px' }}>
            {convertCNPJ(company.cnpj)}
          </Typography>
        </CardContent>
      </Card>

      {/* Modal de detalhes */}
      <CompanyDetailModal
        open={modalOpen}
        onClose={handleCloseModal}
        company={company}
      />
    </>
  );
}
