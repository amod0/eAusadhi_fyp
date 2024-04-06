import styled from 'styled-components';

const RegisterStyle = styled.div`
background: #56B4B8;
padding: 64px 222px;
font-size: 14px;
height: 100%;
.container{
    display: flex;
    align-items: center;
    justify-content: center;
}
img{
    height: 557px;
    border-radius: 0px 12px 12px 0px;
}
.loginimg{
    height: 427px;
}
.registerimg{
    height: 621px;
}
.create-account{
    background: #ffffff;
    padding: 32px 64px;
    border-radius: 12px 0px 0px 12px;
    
    .heading{
            color: #171A1F;
            font-size: 28px;
            font-family: 'Inter';
            font-weight: 700;
            padding: 0px 42px 12px;
    }

    form {
        display: inline-block;
        width: 300px;
    }

    input {
         width: 100%;
         padding: 8px 20px;
         margin: 6px 0;
         display: inline-block;
         border: 1px solid #ccc;
         box-sizing: border-box;
         background: white;
         color: black;
         border-radius: 6px;
    }

    .footer {
         text-align: center;
         margin-top: 12px;
    }
}

.create-account input[type="submit"] {
 background-color: rgba(86, 180, 184, 1);
 color: white;
 padding: 10px 20px;
 margin: 8px 0;
 border: none;
 cursor: pointer;
 width: 100%;
}

.create-account input[type="submit"]:hover {
 opacity: 0.8;
}

.create-account a {
 color: #000000;
 text-decoration: none;
}

.create-account a:hover {
 text-decoration: underline;
}

`;

export default RegisterStyle;