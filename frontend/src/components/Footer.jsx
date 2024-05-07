import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import { Navbar } from 'react-bootstrap';
import React from 'react';
// import { Link } from 'react-router-dom';
// import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


const currentYear = new Date().getFullYear();
const Footer = () => {

  return (
    <FooterStyled>
      <Container>
        <div className="footer">
          <div className="footer-links">
            <div className="footer-link-wrapper">
              <div className='footer-link-items'>
                <div className="footer__text__title">
                  <h2>Contact Us</h2>
                </div>
                <div className="footer__text__desc">
                  <p>Phone: <a href="tel:212-470-9058">9808451276</a></p>
                  <p>Email: <a href="mailto:info@eAusadhi.com">info@eAusadhi.com</a></p>
                  <p>Naxal,Kathmandu</p>
                </div>
               
              </div>
              <div className='footer-link-items'> 
              <div className="footer__text__title">
                  <h2>Help</h2>
                </div>
                <div className="footer__text__desc">
                  <p>FAQs </p>
                </div>
                </div>
                <div className='footer-link-items'> 
              <div className="footer__text__title">
              <LinkContainer to='/aboutus'>
                  <Navbar.Brand>
                  <h2>About Us</h2>
                  </Navbar.Brand>
                </LinkContainer>
                  
                </div>
                <div className="footer__text__desc">
                  <p>Home </p>
                  <LinkContainer to='/product'>
                  <Navbar.Brand>
                  <p>Product</p>
                  </Navbar.Brand>
                </LinkContainer>
                <LinkContainer to='/blog'>
                  <Navbar.Brand>
                  <p>Blog</p>
                  </Navbar.Brand>
                </LinkContainer>
                </div>
                </div>
            </div>
          </div>
          <section className='social-media'>
            <div className='social-media-wrap'>
              <small className='website-rights'>

                <LinkContainer to='/'>
                  <Navbar.Brand>
                    e-Ausadhi &copy; {currentYear}
                  </Navbar.Brand>
                </LinkContainer>
              </small>
            </div>
          </section>
        </div>
      </Container>
    </FooterStyled>
  )
}

export default Footer;

export const FooterStyled = styled.div`
  padding: 4rem 0;
  background: black;
  .footer{
    color: #fff;
    display: flex;
    flex-direction: column;
    p{
      padding: 5px 0px;
    }
    .footer-subscription {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    
      margin-bottom: 24px;
      padding: 24px;
      color: #fff;
      p {
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
          'Lucida Sans', Arial, sans-serif;
      }
      .footer-subscription-heading {
        margin-bottom: 24px;
        font-size: 24px;
      }
      
      .footer-subscription-text {
        margin-bottom: 24px;
        font-size: 20px;
      }
    }
    .footer-links{
      // padding: 0 80px;
      display: flex;

      // justify-content: space-between;
      .footer-link-wrapper{
        display: flex;
        width: 50%;
        .form-details{
          display: flex;

          .contact-details{
            display: flex;
            flex-flow: column;
            padding-right: 10px;

            input{
              height: 32px;
              outline: none;
              border: 1px solid #C4C4C4;
              font-size: 16px;
              width: 350px;
              transition: all 0.3s ease-in-out;
              line-height: 120%;
              margin: 12px 0;
              padding: 8px;
              border-radius: 4px;
            }
          }

          .message{
            display: flex;
            flex-flow: column;
            textarea{
              padding: 8px;
              border-radius: 4px;
              margin: 12px 0;
              font-size: 16px; 
              outline: none;
              border: 1px solid #C4C4C4;
              font-family: 'Montserrat', 'Arial', sans-serif;
            }
          }
        }
        .footer-link-items{  
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin: 16px;
          text-align: left;
          width: 330px;
          box-sizing: border-box;
          .footer__text__desc{
            a{
              color: #fff;
              text-decoration: none;
            }
          }
        }
      }
    }

    /* Social Icons */
    .social-icon-link {
      color: #fff;
      font-size: 24px;
    }

    .social-media {
      width: 100%;
    }

    .social-media-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 90%;
      margin: 40px auto 0 auto;
    }

    .social-icons {
      display: flex;
      a {
        color: #fff;
        padding-left: 10px;
      }
    }

    .social-logo {
      color: #fff;
      justify-self: start;
      margin-left: 20px;
      cursor: pointer;
      text-decoration: none;
      font-size: 2rem;
      display: flex;
      align-items: center;
      margin-bottom: 16px;
    }

    .website-rights {
      color: #fff;
      margin-bottom: 16px;
    }

    @media screen and (max-width: 820px) {
      .footer-links {
        padding-top: 2rem;
        flex-flow: column;
        .footer-link-wrapper,.form-details {
          flex-direction: column;
        }
        .message{
          width: 350px;
        }
      }

      .footer-input {
        width: 100%;
      }

      .btn {
        width: 100%;
      }

      

      .social-media-wrap {
        flex-direction: column;
      }
    }

    @media screen and (max-width: 768px) {
    }
  }
`; 