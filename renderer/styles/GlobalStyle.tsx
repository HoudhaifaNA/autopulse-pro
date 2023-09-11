import { createGlobalStyle } from "styled-components";
import theme from "./theme";

const GlobalStyle = createGlobalStyle`
    :root{
        --toastify-color-success: ${theme.colors.success[500]};
        --toastify-color-error: ${theme.colors.error[500]};
        --toastify-color-warning: ${theme.colors.warning[500]};
        --toastify-color-info: ${theme.colors.primary[500]};
    }
    
    .Toastify__toast-container{
        z-index: 50000000000000;
    }

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

    p.GR {
     color: ${theme.colors.success["700"]};
    }

    p.RD {
     color: ${theme.colors.error["700"]};
    }

  
`;

export default GlobalStyle;
