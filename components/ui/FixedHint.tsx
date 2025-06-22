import { Box, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export const FixedHint = ({ text }: { text: string }) => (
  <Box
    display="inline-flex"
    alignItems="center"
    gap={1}
    px={2}
    py={1}
    borderRadius={1}
    bgcolor="InfoBackground"
    color="InfoText"
    mb={1}
  >
    <InfoOutlinedIcon fontSize="small" />
    <Typography variant="caption">{text}</Typography>
  </Box>
);
<FixedHint text="Preencha com cuidado" />