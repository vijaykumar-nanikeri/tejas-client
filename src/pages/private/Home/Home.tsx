import { Typography, Box, Container } from "@mui/material";
import React from "react";

const Home = () => (
  <Container maxWidth="lg" sx={{ mt: 4 }}>
    <Box sx={{ textAlign: "center", py: 4 }}>
      <Typography variant="h4" gutterBottom>
        ✅ Welcome for the duty!
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        This is the home page content.
      </Typography>
    </Box>
  </Container>
);

export default Home;
