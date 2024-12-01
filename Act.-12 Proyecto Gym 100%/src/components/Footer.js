import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box mt="80px" bgcolor="#FFF3F4">
    <Typography
      variant="h5"
      sx={{ fontSize: { lg: '28px', xs: '20px' } }}
      mt="41px"
      textAlign="center"
      pt="20px"
    >
      Made by Said Grande
    </Typography>
    <Typography
      variant="h5"
      sx={{ fontSize: { lg: '28px', xs: '20px' } }}
      mt="20px"
      textAlign="center"
      pb="20px"
    >
      Ten words <b>&quot;aesthetics&quot;</b>
    </Typography>
  </Box>
);

export default Footer;
