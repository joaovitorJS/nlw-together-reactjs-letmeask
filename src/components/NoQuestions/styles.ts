import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;


  @media screen and (max-width: 768px) {
    align-items: flex-start;
    margin-top: 64px;
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