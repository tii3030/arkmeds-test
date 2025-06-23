import * as React from 'react';
import Link from '@mui/material/Link';
import Typography, { TypographyProps } from '@mui/material/Typography';

export default function Copyright(props: TypographyProps ) {
  return (
    <Typography
      variant="body2"
      align="center"
      {...props}
      sx={[
        {
          color: 'text.secondary',
          bottom: 10
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/tii3030">
        Tiago Pereira
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
