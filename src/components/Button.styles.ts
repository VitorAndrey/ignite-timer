import styled, { css } from "styled-components";

export type ButtonVariantColor = "primary" | "secondary" | "danger" | "success";

interface ButtonContainerProps {
  variant: ButtonVariantColor;
}

const buttonVariants = {
  primary: "#777",
  secondary: "#999",
  danger: "red",
  success: "green",
};

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 200px;
  height: 50px;
  margin-right: 4rem;
  cursor: pointer;
  border: none;
  border-radius: 8px;

  background-color: ${(props) => props.theme["green-500"]};
  color: ${(props) => props.theme.white};

  /* ${(props) => {
    return css`
      background-color: ${buttonVariants[props.variant]};
    `;
  }} */
`;
