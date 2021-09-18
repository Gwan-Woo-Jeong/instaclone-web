import { createGlobalStyle, DefaultTheme } from "styled-components";
import reset from "styled-reset";

export const ourTheme: DefaultTheme = {
  bgColor: "black",
  fontColor: "blue",
};

export const darkTheme: DefaultTheme = {
  fontColor: "lightgray",
  bgColor: "#2c2c2c",
};

export const lightTheme: DefaultTheme = {
  bgColor: "lightgray",
  fontColor: "#2c2c2c",
};

export const GlobalStyles = createGlobalStyle`
${reset}
    body {
        background-color: ${(props) => props.theme.bgColor};
    }
`;
