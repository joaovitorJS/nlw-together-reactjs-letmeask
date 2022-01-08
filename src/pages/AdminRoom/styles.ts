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

  > img {
    max-height: 45px;
  }

  > div {
    display: flex;
    align-items: center;
    gap: 16px;
    
    button {
      height: 40px;
    }
  }
`;

export const Content = styled.main`
  max-width: 800px;
  margin: 0 auto;
`;

export const QuestionList = styled.div` 
  margin-top: 32px;
`;

export const RoomTitle = styled.div`
  margin: 32px 0 24px;
  display: flex;
  align-items: center;

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
