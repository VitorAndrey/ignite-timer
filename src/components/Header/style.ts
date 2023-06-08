import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    width: 2rem;
  }

  nav {
    display: flex;
    align-items: center;
    gap: 1.5rem;

    a {
      width: 3rem;
      height: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;

      color: ${(props) => props.theme["gray-100"]};

      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;
      text-decoration: none;

      transition: all 0.3s ease;

      &:hover {
        border-bottom: 3px solid ${(props) => props.theme["green-500"]};
      }

      &.active {
        color: ${(props) => props.theme["green-500"]};
      }
    }
  }
`;
