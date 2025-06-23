'use client';

import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@/styles/GlobalStyles'
import Header from '@/components/layout/Header';
import SideMenu from '@/components/layout/SideMenu';
import Stack from '@mui/material/Stack';
import AppNavbar from '@/components/layout/AppNavbar';
import AppTheme from '@/components/shared-theme/AppTheme';
import { alpha } from '@mui/material/styles';
import {
  datePickersCustomizations,
  treeViewCustomizations,
} from '@/components/theme/customizations';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';

const xThemeComponents = {
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <QueryClientProvider client={queryClient}>

          {/* Toast */}
          <ToastContainer
            position="bottom-center"
            autoClose={3000}
            hideProgressBar={false}
            closeOnClick
            pauseOnFocusLoss
            pauseOnHover
            theme="colored"
          />

          <AppTheme themeComponents={xThemeComponents}>
            <CssBaseline enableColorScheme />
            <GlobalStyles />
            <Box sx={{ display: 'flex', minHeight: '100vh' }}>
              <SideMenu />
              <AppNavbar />
            
              <Box
                component="main"
                sx={(theme) => ({
                  flexGrow: 1,
                  backgroundColor: theme.vars
                    ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                    : alpha(theme.palette.background.default, 1),
                  overflow: 'auto',
                })}
              >
                <Stack
                  spacing={2}
                  sx={{
                    alignItems: 'center',
                    mx: 3,
                    pb: 5,
                    mt: { xs: 8, md: 0 },
                  }}
                >
                  <Header />
                  <Box sx={{ width: '100%' }}>
                    {children}
                  </Box>
                </Stack>
              </Box>
            </Box>
          </AppTheme>
        </QueryClientProvider>
      </body>
    </html>
  );
}