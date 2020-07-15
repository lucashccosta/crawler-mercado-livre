import { createGlobalStyle } from 'styled-components';

// CSS global a ser aplicado em todas as páginas
export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    body {
        background: #EBEBEB;
        -webkit-font-smoothing: antialiased;
    }

    body, input, button {
        font: 16px Ubuntu, sans-serif;
    }

    #root {
        max-width: 960px;
        margin: 0 auto;
        padding: 40px 20px;
    }

    button {
        cursor: pointer
    }
`;