import styled from "styled-components";

export const QuestionContainer = styled.div`
  background: ${props => props.theme.colors.backgroungForm};
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  padding: 24px;

  & + & {
    margin-top: 8px;
  }

  &.highlighted {
    background: ${props => props.theme.colors.highlighted};
    border: 1px solid #835afd;

    footer .user-info span {
      color: #29292e;
    }
  }

  &.answered {
    background: ${props => props.theme.colors.answered};
  }

  p {
    color: #29292e;
  }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;

    > div {
      display: flex;
      gap: 16px;
    }

    button {
      border: 0;
      background: transparent;
      cursor: pointer;

      &.like-button {
        display: flex;
        align-items: flex-end;
        color: #737380;
        gap: 8px;

        transition: filter 0.2s;

        &.liked {
          color: #835afd;

          svg path {
            stroke: #835afd;
          }
        }

        &:hover {
          filter: brightness(0.7);
        }
      }
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
    color: #737380;
    font-size: 14px;
  }
`;