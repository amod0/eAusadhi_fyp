import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import styled from 'styled-components';
import SearchBox from '../components/SearchBox';

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <HomeStyled>
          {/* <Meta /> */}
          <div className="medicine">
            <img src='./images/microscope.svg' alt='micro'/>
          </div>
          <SearchBox />

          <h1>Our Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          {/* our story start*/}
          <h1 style={{marginTop: '5rem'}}>Our Story</h1>
          <Row>
            <p align="justify">
            <p>Welcome to E-Ausadhi, where we are transforming healthcare accessibility in Nepal through technology.
              Our journey began with a vision to revolutionize the way people access essential medications and healthcare products. 
              Fueled by a passion for innovation and a commitment to improving lives, we set out to create a platform that would 
              make healthcare more affordable, convenient, and transparent for everyone.</p>

            <p>At E-Ausadhi, we understand the challenges faced by individuals in accessing quality healthcare, 
              especially in remote or underserved areas. Traditional pharmacies often pose obstacles such as long distances, 
              limited product availability, and lack of privacy. To address these issues, we leveraged the power of digital 
              technology to bring the pharmacy to your fingertips.</p>

            <p>Our platform offers a comprehensive range of medications, wellness products, and healthcare services, all available 
              at the click of a button. Whether you're managing a chronic condition, in need of urgent medication, or seeking expert 
              medical advice, E-Ausadhi is here to support you every step of the way.</p>

            <p>But our mission goes beyond just providing products and services. We are committed to empowering individuals with 
              knowledge and resources to take control of their health. Through our online pharmacist consultations, educational 
              articles, and personalized recommendations, we aim to promote health awareness and facilitate informed decision-making.</p>

            <p>At E-Ausadhi, we prioritize the well-being and satisfaction of our customers above all else. We adhere to strict 
              standards of quality, safety, and confidentiality to ensure that every interaction with our platform is secure 
              and trustworthy. Your health is our priority, and we are dedicated to delivering the highest standard of care with
              compassion and integrity.</p>

            <p>Join us on our journey to a healthier, happier Nepal. Experience the convenience of modern healthcare with
              E-Ausadhi, your trusted partner in well-being.</p>
            </p>
          </Row>
          {/* our story end*/}
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          />
        </HomeStyled>
      )}
    </>
  );
};

export default HomeScreen;

export const HomeStyled = styled.div`
  h1{
    text-align: center;
  }
  .medicine{
    width: 100%;
    margin-bottom: 48px;
    img{
      width: 100%;
    }
  }
`;  


