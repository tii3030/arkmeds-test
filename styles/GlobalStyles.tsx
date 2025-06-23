import { Global } from '@emotion/react';

const GlobalStyles = () => (
  <Global
    styles={{
      body: {
        margin: 0,
        padding: 0,
        // backgroundColor: '#f5f5f5',
        minHeight: '100vh',
      },
      a: {
        color: '#1976d2',
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline',
        },
      },
      '*': {
        boxSizing: 'border-box',
      },
      '.MuiSvgIcon-root': {
        verticalAlign: 'middle',
      },
    }}
  />
);

export default GlobalStyles;