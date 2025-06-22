import * as React from 'react';
import Box from '@mui/material/Box';
import Copyright from '../ui/Copyright';

interface MainContentProps {
  children: React.ReactNode;
}

export default function MainGrid({ children }: MainContentProps) {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {children}
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
