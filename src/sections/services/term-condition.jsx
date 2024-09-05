import React from 'react';
import { Box, Breadcrumbs, Typography, Link, Container, Grid, Paper } from '@mui/material';

export default function TermAndCondition() {
  return (
    <Box>
      <Box
        sx={{
          background: 'linear-gradient(to right, #f8c291, #6a89cc)',
          textAlign: 'center',
          py: 5,
          position: 'relative',
          color: '#fff',
        }}
      >
        <Box
          component="img"
          src="https://img.freepik.com/free-vector/abstract-modern-halftone-design-orange-background_1055-21586.jpg?t=st=1725551122~exp=1725554722~hmac=81eeb344087c5ba7335c2a07977d879f057b8135826358398d3dc68c810d9fd5&w=996"
          alt="background"
          sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.5 }}
        />
        <Container>
          <Grid container justifyContent="center">
            <Grid item lg={8}>
              <Typography variant="h1" sx={{ fontSize: 32, fontWeight: 600, mb: 1 }}>
                Terms and Conditions
              </Typography>
              <Breadcrumbs sx={{ justifyContent: 'center' }}>
                <Link underline="hover" color="inherit" href="https://app.curator365.com">
                  Home
                </Link>
                <Typography color="text.primary">Terms</Typography>
              </Breadcrumbs>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: 5 }}>
        <Container>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Terms and Conditions
            </Typography>
            <Typography paragraph>
            By using this website, you acknowledge that you have read and agreed to the following terms and conditions: The following definitions apply to these Terms and Conditions, Privacy Statement, and any disclaimer notices, as well as to all agreements: "Client," "You," and "Your" pertain to the individual accessing this website and accepting the terms and conditions of Curator365 Technologies Inc. "The Company," "Ourselves," "We," and "Us" refer to Curator365 "Party," "Parties," or "Us" denote both the Client and ourselves, or either the Client or ourselves. All terms relate to the offer, acceptance, and consideration of payment necessary to engage in the process of providing assistance to the Client in the most suitable manner, whether through formal meetings of a predetermined duration or by any other means, with the express aim of meeting the Client's needs in regard to the Company's stated services/products, following the laws of the United States. Any use of the aforementioned terminology or other words in the singular, plural, capitalized, or involving gender pronouns is interchangeable and refers to the same.
            </Typography>
            
            <Typography variant="h5" sx={{ mt: 3 }}>
              Privacy Statement
            </Typography>
            <Typography paragraph>
            We are committed to safeguarding your privacy. Our authorized employees access any information collected from individual Clients on a need-to-know basis only. We consistently assess our systems and data to ensure the highest level of service for our Clients. Unauthorized actions against computer systems and data are subject to specific legal consequences, and we will investigate and, if necessary, prosecute or seek damages against those responsible.
            </Typography>

            <Typography variant="h5" sx={{ mt: 3 }}>
              Confidentiality
            </Typography>
            <Typography paragraph>
            Information related to the Client and their respective Client Records may be disclosed to third parties. However, Client records are treated as confidential and will not be shared with any third party, except for our employees or if legally mandated by the appropriate authorities. Clients have the right to request access to and copies of any and all Client Records we maintain, provided that we receive reasonable notice of such a request. We encourage Clients to retain copies of any literature related to our services. When appropriate, we will provide Clients with written information, handouts, or record copies as part of an agreed contract, beneficial to both parties. We do not sell, share, or rent your personal information to any third parties or use your email address for unsolicited correspondence. Any emails sent by our Company will solely pertain to the provision of agreed-upon services and products.
            </Typography>

            {/* Add remaining sections similarly */}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}
