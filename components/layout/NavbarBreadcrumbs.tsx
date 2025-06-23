'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Breadcrumbs, Typography, Link as MuiLink } from '@mui/material';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import Link from '@/components/ui/StyledLink'

export default function NavbarBreadcrumbs() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  // Mapeamento de nomes amigáveis para os segmentos
  const nameMap: Record<string, string> = {
    companies: 'Empresas',
    users: 'Usuários',
    settings: 'Configurações',
    // Adicione mais mapeamentos conforme necessário
  };

  return (
    <Breadcrumbs 
      separator={<NavigateNextRoundedIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={{ 
        py: 1,
        '& .MuiBreadcrumbs-separator': { 
          mx: 0.5,
          color: 'text.secondary' 
        }
      }}
    >
      <Link href="/" passHref>
        <MuiLink 
          component="span" 
          color="inherit"
          sx={{ 
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          Arkmeds
        </MuiLink>
      </Link>

      {pathSegments.map((segment, index) => {
        const isLast = index === pathSegments.length - 1;
        const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
        const displayName = nameMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);

        return isLast ? (
          <Typography 
            key={index} 
            variant="body1" 
            color="text.primary"
            sx={{ fontWeight: 600 }}
          >
            {displayName}
          </Typography>
        ) : (
          <Link key={index} href={href} passHref>
            <MuiLink 
              component="span" 
              color="inherit"
              sx={{ 
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              {displayName}
            </MuiLink>
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}