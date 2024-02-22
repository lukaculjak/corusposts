import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root{
        --brand-color-1: ##6DD400;
        --brand-color-2: ##333333;

        --luka-color-1: #A3257F;
        --luka-color-2: #8080D9;
    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        overflow-x: hidden;
    }

    html {
        font-size: 62.5%;
    }

    body {
        font-family: "Montserrat", sans-serif;

        min-height: 100vh;
        line-height: 1.5;
        font-size: 1.6rem;
        font-weight: 400;

        width: 100%;
        height: 100%;

        background: linear-gradient(
        120deg,
        var(--luka-color-1) 0%,
        var(--luka-color-2) 100%
        );
    }

    .active-modal{
        overflow-y: hidden;
    }

`;

export default GlobalStyles;
