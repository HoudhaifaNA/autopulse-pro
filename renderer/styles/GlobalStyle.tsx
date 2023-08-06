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
    body{
        overflow: hidden;
    }
    body, button,input{
        font-family: 'Inter', sans-serif;

    }

    
    .background-black{
        position: fixed;
        left: 0;
        top: 0;
        z-index: 100;
        height: 100vh;
        width: 100vw;
        background-color: rgba(0,0,0,.4);
    }
  
`;

export default GlobalStyle;
