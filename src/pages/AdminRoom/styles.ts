import styled from "styled-components";


export const Header = styled.header`
  padding: 24px;
  border-bottom: 1px solid #e2e2e2;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > a img {
    max-height: 45px;
  }

  > div {
    display: flex;
    align-items: center;
    gap: 16px;
    
    button {
      height: 40px;

      @media screen and (max-width: 600px){
        width: 100%;
        max-width: 140px;      
      }
    } 

    @media screen and (max-width: 600px){
      flex-direction: column;
      gap: 8px;       
      margin-left: 16px;
    } 
  }
`;

export const Content = styled.main`
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 50px; 
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 768px) {
    padding: 0 24px;
  }
`;

export const QuestionList = styled.div` 
  margin-top: 32px;
`;

export const RoomTitle = styled.div`
  margin: 32px 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > div {
    display: flex;
    align-items: center;
  }

  h1 {
    font-family: "Poppins", sans-serif;
    font-size: 24px;
    color: ${props => props.theme.colors.colorTitle};
    }

  span {
    margin-left: 16px;
    background: #e559f9;
    border-radius: 9999px;
    padding: 8px 16px;
    color: #fff;
    font-weight: 500;
    font-style: 14px;
  }
`;

export const NoQuestions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 164px;

  @media screen and (max-width: 768px) {
    align-items: flex-start;
    margin-top: 100px;
  }

  > div {
    display: flex;
    align-items: center;
    flex-direction: column;
    max-width: 284px;
  }

  h2 {
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    font-size: 18px;
    text-align: center;
    color: ${props => props.theme.colors.colorTitle};

    margin-top: 16px;
  }
  
  p {
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    text-align: center;
    color: #737380;

    margin-top: 8px;
  }
` ;

export const ContentModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #F8F8F8;
  width: 560px;
  border-radius: 8px;
  padding: 64px 0;

  @media screen and (max-width: 600px) {
    width: 100%;
    padding: 44px 24px;
  }

  h2 { 
    margin-top: 20px;
    font-size: 24px;
    font-family: "Poppins", sans-serif;
    text-align: center;
  }

  p {
    margin-top: 12px;
    font-size: 16px;
    color: #737380;
    text-align: center;
  }

  .buttons {
    margin-top: 40px;
    display: flex;
    align-items: center;
    gap: 8px;

    @media screen and (max-width: 480px) {
      flex-direction: column;
      width: 100%;
    }


    button {
      font-size: 16px;
      font-family: "Roboto", sans-serif;
      font-weight: 500;
      color: #737380;

      padding: 16px 32px;
      border: 0;
      border-radius: 8px;
      background: #DBDCDD;

      transition: filter 0.2;

      @media screen and (max-width: 480px) {
        width: 80%;
      }


      &.red {
        background: #E73F5D;
        color: #FEFEFE;
      }

      &:hover {
        filter: brightness(0.9);
      }

    }
  }
`;
