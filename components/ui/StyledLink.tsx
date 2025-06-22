import { styled } from '@mui/material/styles';
import Link from 'next/link';

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
  display: 'block',
  width: '100%',
  marginBottom: '2px',
  '&:hover': {
    textDecoration: 'none',
  },
  '&:focus': {
    textDecoration: 'none',
  },
  '&:active': {
    textDecoration: 'none',
  },
});

export default StyledLink;