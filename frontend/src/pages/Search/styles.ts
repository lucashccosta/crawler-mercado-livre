import styled from 'styled-components';

export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;

    a {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: #A8A8B3;
        transition: color 0.2s;

        &:hover {
            color: #666;
        }

        svg {
            margin-right: 4px;
        }
    }
`;

export const Log = styled.section`
    margin-top: 80px;

    header {
        display: flex;
        align-items: center;

        div {
            strong {
                font-size: 36px;
                color: #3D3D4D;
            }

            p {
                font-size: 18px;
                color: #737380;
                margin-top: 4px;
            }
        }
    }

    ul {
        display: flex;
        list-style: none;
        margin-top: 40px;

        li {
            & + li { 
                margin-left: 80px;
            }

            strong {
                display: block;
                font-size: 36px;
                color: #3D3D4D;
            }

            span {
                display: block;
                color: #6C6C80;
                margin-top: 4px;
            }
        }
    }
`;

export const Products = styled.div`
    margin-top: 80px;

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
            margin: 0 20px;
            flex: 1;
            
            strong {
                font-size: 20px;
                color: #3D3D4D;
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

export const Price = styled.p`
    background: #FFF159;
    padding: 10px;
    border-radius: 6px;
    color: #333;
    font-weight: 500;
    font-size: 18px;
`;
