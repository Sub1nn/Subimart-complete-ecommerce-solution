import React from "react"
import {
  Container,
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
} from "@mui/material"
import nepmartImage from "../assets/nepmart2.png" // Import your image file

const About = () => {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        width: {
          xs: "100%",
          lg: "70%",
        },

        marginTop: "0.5rem",
        marginBottom: "2rem",
      }}
    >
      <div
        style={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          textAlign: "center",
          marginBottom: "1rem",
        }}
      >
        <marquee
          direction="left"
          style={{ fontSize: "1.5rem", color: "#eb432a" }}
        >
          SubiMart - Your all-in-one place for shopping
        </marquee>
      </div>

      {/* Full-width image */}
      <Box sx={{ width: "100%", height: "300px", marginBottom: "2rem" }}>
        <img
          src={nepmartImage}
          alt="Nepmart"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "8px",
            boxShadow:
              " rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
          }}
        />
      </Box>

      <Container maxWidth="md">
        <Typography variant="h2" align="center" color="primary" gutterBottom>
          About Us
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Welcome to SubiMart, your one-stop destination for a wide range of
          products including clothing, electronics, toys, and furniture. We aim
          to provide high-quality products at affordable prices, ensuring
          customer satisfaction.
        </Typography>
        <Typography variant="h4" align="center" color="primary" gutterBottom>
          Our Mission
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          paragraph
        >
          At SubiMart, our mission is to make shopping convenient and enjoyable
          for our customers. We strive to offer a diverse selection of products,
          excellent customer service, and a seamless online shopping experience.
        </Typography>
        <Typography variant="h4" align="center" color="primary" gutterBottom>
          Our Team
        </Typography>
        <Grid container spacing={2} justifyContent="center" mb={"1rem"}>
          {/* Blank cards for team members */}
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography
                  variant="h6"
                  align="center"
                  color="primary"
                  gutterBottom
                >
                  Team Member
                </Typography>
                {/* You can add an image placeholder here */}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography
                  variant="h6"
                  align="center"
                  color="primary"
                  gutterBottom
                >
                  Team Member
                </Typography>
                {/* You can add an image placeholder here */}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography
                  variant="h6"
                  align="center"
                  color="primary"
                  gutterBottom
                >
                  Team Member
                </Typography>
                {/* You can add an image placeholder here */}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Typography variant="h4" align="center" color="primary" gutterBottom>
          Contact Us
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          paragraph
        >
          If you have any questions, feedback, or inquiries, please do not
          hesitate to contact us:
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" align="center" color="text.secondary">
              Email: info@subimart.com
            </Typography>
            <Typography variant="body1" align="center" color="text.secondary">
              Phone: +977-888-9900
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" align="center" color="text.secondary">
              Address: New-Road 108 Street, Kathmandu, Nepal
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default About
