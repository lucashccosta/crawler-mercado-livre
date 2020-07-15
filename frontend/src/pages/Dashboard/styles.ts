import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface FormProps {
    hasError: boolean;
}

export const Title = styled.h1`
    font-size: 32px;
    color: #666;
    max-width: 700px;
    line-height: 46px;
    margin-top: 80px;
    font-weight: 300;
`;

export const SubTitle = styled.h3`
    color: #666;
    max-width: 700px;
    line-height: 46px;
    margin-top: 80px;
    font-weight: 300;
`;

export const Form = styled.form<FormProps>`
    margin-top: 40px;
    max-width: 700px;
    display: flex;

    input {
        flex: 1;
        height: 70px;
        padding: 0 24px;
        border: 0;
        border-radius: 5px 0 0 5px;
        color: #3A3A3A;
        border: 2px solid #FFF;

        ${(props) => props.hasError && css`
            border-color: #C53030;
        `}

        &::placeholder {
            color: #A8A8B3;
        }
    }

    select {
        border-radius: 5px 0 0 5px;
        color: #A8A8B3;
        border: 2px solid #FFF;
        border-left: 2px solid #FFF159;
        background: #FFF;
        width: 70px;
        font-size: 20px;
        padding: 10px;
    }

    button {
        width: 210px;
        height: 70px;
        background: #FFF159;
        border-radius: 0px 5px 5px 0px;
        border: 0;
        color: #333;
        font-weight: 500;
        transition: background-color 0.2s;

        &:hover {
            background: ${shade(0.2, '#FFF159')};
        }
    }
`;

export const Error = styled.span`
    display: block;
    color: #C53030;
    margin-top: 8px;
`;

export const Researches = styled.div`
    margin-top: 10px;
    max-width: 700px;
    margin-bottom: 80px;

    a {
        background: #FFF;
        border-radius: 5px;
        width: 100%;
        padding: 24px;
        display: block;
        text-decoration: none;
        display: flex;
        align-items: center;
        transition: transform 0.2s;

        & + a { 
            margin-top: 16px;
        }

        &:hover {
            transform: translateX(10px);
        }

        div {
            margin: 0 16px;
            flex: 1;
            
            strong {
                font-size: 20px;
                color: #3D3D4D;
                text-transform: uppercase;
            }

            span {
                background: #FFF159;
                padding: 10px;
                margin-left: 20px;
                border-radius: 6px;
                color: #333;
                font-weight: 300;
            }

            p {
                font-size: 18px;
                color: #A8A8B3;
                margin-top: 4px;
            }
        }

        svg {
            margin-left: auto;
            color: #CBCBD6;
        }
    }
`;

export const Status = styled.p`
    background: #FFF159;
    padding: 10px;
    border-radius: 6px;
    color: #333;
    font-weight: 500;
`;