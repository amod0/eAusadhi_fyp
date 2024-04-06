import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import styled from 'styled-components';

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
          <h1>Our Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
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


