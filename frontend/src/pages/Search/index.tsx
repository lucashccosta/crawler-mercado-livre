import React, { useState, useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Header, Log, Products, Price } from './styles';
import api from '../../configs/api';
import { formatDate, formatValue } from '../../utils/Helpers';

interface SearchParams {
    id: string;
}

interface Log {
    id: string;
    search: string;
    total_results: number;
    total_searched: number;
    createdAt: Date;
    formattedDate: string;
}

interface Product {
    id: string;
    name: string;
    price: number;
    link: string;
    store?: string;
    state?: string;
    formattedPrice: number;
}

const Search: React.FC = () => {
    const { params } = useRouteMatch<SearchParams>();
    const [log, setLog] = useState<Log | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    
    useEffect(() => {
        api.get(`logs/${params.id}`).then(response => {
            setLog({
                ...response.data,
                formattedDate: formatDate(response.data.createdAt, 'pt-br'),
            });
        });

        api.get(`logs/${params.id}/products`).then(response => {
            const products = response.data.map((product: Product) => ({
                ...product,
                formattedPrice: formatValue(product.price)
            }));

            setProducts(products);
        });

    }, [params.id]);

    return (
        <>
            <Header>
                <Link to="/">
                    <FiChevronLeft size={16} />
                    Voltar
                </Link>
            </Header>

            { log && (
                <Log>
                    <header>
                        <div>
                            <strong>{log.search}</strong>
                            <p>{log.formattedDate}</p>
                        </div>
                    </header>
                    <ul>
                        <li>
                            <strong>{log.total_results}</strong>
                            <span>Total de Produtos no ML</span>
                        </li>
                        <li>
                            <strong>{log.total_searched}</strong>
                            <span>Número de Produtos Salvos no DB</span>
                        </li>
                    </ul>
                </Log>
            )}

            <Products>
                {products.map((product) => (
                    <a key={String(product.id)} href={product.link}>
                        <Price>{product.formattedPrice}</Price>
                        <div>
                            <strong>{product.name}</strong>
                            <p>{product.store}</p>
                            <p>{product.state}</p>
                        </div>

                        <FiChevronRight size={20} />
                    </a>
                ))}
            </Products>
        </>
    );
};

export default Search;