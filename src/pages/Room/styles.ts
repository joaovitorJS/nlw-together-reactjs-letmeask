import styled from "styled-components";
import { darken } from "polished";

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

    @media screen and (max-width: 600px){     
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
    background: ${props => props.theme.title === "dark" ? darken(0.15,"#e559f9") : "#e559f9"};
    border-radius: 9999px;
    padding: 8px 16px;
    color: #fff;
    font-weight: 500;
    font-style: 14px;
  }
`;

export const Form = styled.form`
  textarea {
    width: 100%;
    border: 0;
    padding: 16px;
    border-radius: 8px;
    background: ${props => props.theme.colors.backgroungForm};
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
    resize: vertical;
    min-height: 130px;
  }

`;

export const FormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;

  > span {
    font-size: 14px;
    color: #737380;
    font-weight: 500;

    button {
      background: transparent;
      border: 0;
      color: #835afd;
      text-decoration: underline;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
    }
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }

  span {
    margin-left: 8px;
    color: ${props => props.theme.colors.colorTitle};
    font-weight: 500;
    font-size: 14px;
  }
`;