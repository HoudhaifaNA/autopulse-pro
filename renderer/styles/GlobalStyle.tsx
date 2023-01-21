import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    
    *, 
    *::before,
    *::after{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    html{
        font-size: 10px;
        scroll-behavior: smooth;
    }

    body, button,input{
        font-family: 'Inter', sans-serif;

    }

  
`;

export default GlobalStyle;
