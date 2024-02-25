import { Grid, Typography } from "@mui/material";
import React from "react";

const About = () => {
  return (
    <Grid container spacing={4}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src="src/assets/nepmart2.png" width="90%" />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h5">Welcome to Nepal Mart</Typography>
        <Typography textAlign="justify">
          {`Your premier online destination for a diverse and unparalleled shopping experience in the heart of the Himalayas. Nestled between towering peaks and rich cultural heritage, Nepal Mart is not just an e-commerce platform; it's a virtual marketplace that brings the essence of Nepal's vibrant markets to your fingertips. With a vast array of products ranging from daily essentials to electronics, fashion, home goods, and beyond, we offer the convenience of a one-stop-shop just like Walmart but with a unique touch that reflects the spirit of Nepal.`}
        </Typography>
        <Typography textAlign="justify">
          {`Our platform is designed to cater to the needs and desires of our customers, providing a seamless and secure online shopping environment. Explore a curated selection of high-quality goods sourced from local artisans and global brands alike, ensuring a blend of tradition and modernity. Whether you're seeking the latest gadgets, fashion trends, or authentic handmade crafts, Nepal Mart is committed to delivering excellence at every click. Our user-friendly interface and efficient navigation make it effortless for you to browse through the extensive catalog, empowering you to discover new treasures and fulfill your shopping cravings.`}
        </Typography>
        <Typography textAlign="justify">{`At Nepal Mart, we understand the importance of affordability, and we strive to offer competitive prices that cater to a wide range of budgets. Just like Walmart, we believe in providing value for money without compromising on quality. Enjoy exclusive deals, discounts, and promotions, making your shopping experience not only convenient but also economical. We take pride in our commitment to customer satisfaction, ensuring that every purchase is met with exceptional service, reliable delivery, and a hassle-free return policy.`}</Typography>{" "}
        <Typography textAlign="justify">{`Embrace the cultural richness of Nepal through our diverse product categories, where each item tells a story and reflects the artistry of this beautiful nation. From intricately designed handicrafts to modern lifestyle products, Nepal Mart showcases the best of both worlds, creating a virtual marketplace that transcends borders. Our commitment to sustainability is reflected in our eco-friendly product options and responsible sourcing practices, aligning with the global shift towards a greener future.`}</Typography>{" "}
        <Typography textAlign="justify">{`Nepal Mart is more than just a shopping platform; it's a community that connects people with the rich tapestry of Nepali culture. Engage with our blog, featuring insightful articles about the heritage, traditions, and lifestyle of Nepal. Immerse yourself in the beauty of the Himalayas through our visually captivating content, fostering a sense of connection with the breathtaking landscapes and warm hospitality of the region.`}</Typography>{" "}
        <Typography textAlign="justify">{`As we navigate the digital landscape, Nepal Mart ensures a secure and seamless shopping experience. Our dedicated customer support team is always ready to assist you, addressing inquiries, providing product information, and resolving any concerns promptly. We prioritize transparency in all transactions, ensuring that you can shop with confidence and peace of mind.`}</Typography>
        <Typography textAlign="justify">{`In conclusion, Nepal Mart stands as a testament to the harmonious blend of tradition and modernity, offering a vast array of products that cater to your every need. Just like Walmart, we aim to be your go-to destination for all things shopping, providing convenience, affordability, and a touch of Nepal's unique charm. Join us on this virtual journey through the Himalayan marketplace, where every click brings you closer to the heart of Nepal. Welcome to Nepal Mart – Where Tradition Meets Technology, and Shopping Transcends Boundaries!`}</Typography>
      </Grid>
    </Grid>
  );
};

export default About;
