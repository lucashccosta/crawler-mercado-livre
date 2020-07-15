import React, { FormEvent, useState, useEffect } from 'react';
import socketIO from 'socket.io-client';
import { FiChevronRight } from 'react-icons/fi';
import { Link  } from 'react-router-dom';
import { Title, Form, Researches, Error, SubTitle, Status } from './styles';
import api from '../../configs/api';
import settings from '../../configs/settings';
import { formatDate } from '../../utils/Helpers';

interface Log {
    id: string;
    search: string;
    status: string;
    formattedDate: string;
    createdAt: Date;
}

interface SocketIOResponse {
    id: string;
    status: string;
}

const socket = socketIO(settings.BASE_URL);

const Dashboard: React.FC = () => {
    const [inputSearch, setInputSearch] = useState('');
    const [selectLimit, setSelectLimit] = useState(5);
    const [inputError, setInputError] = useState('');
    const [logs, setLogs] = useState<Log[]>([]);

    useEffect(() => {
        api.get('/logs').then(response => {
            const logs = response.data.map((log: Log) => ({
                ...log,
                formattedDate: formatDate(log.createdAt, 'pt-br') 
            }));

            setLogs(logs);
        });
    }, []);

    useEffect(() => {
        socket.on('crawlerProcessFinished', (data: SocketIOResponse) => {
            logs.map((log: Log) => {
                if(log.id === data.id) log.status = data.status;

                return log;
            });

            setLogs(logs);
        });
    }, [logs]);

    async function handleSearch(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        
        if(!inputSearch) {
            setInputError('O produto é obrigatório');
            return;
        }

        try {
            await api.post<Log>('/products', {
                search: inputSearch,
                limit: selectLimit
            }).then(response => {
                setLogs([
                    {
                        ...response.data,
                        formattedDate: formatDate(response.data.createdAt, 'pt-br') 
                    }, 
                    ...logs
                ]);

                setInputSearch('');
                setInputError('');
            });
        }
        catch(err) {
            setInputError('Erro na busca do produto');
        }
    }

    return (
        <>
            <Title>Digite o nome de um produto e selecione a quantidade para que o crawler possa realizar a busca no Mercado Livre</Title>

            <Form hasError={Boolean(inputError)} onSubmit={handleSearch}>
                <input 
                    value={inputSearch}
                    onChange={e => setInputSearch(e.target.value)}
                    placeholder="Digite o nome do produto" /> 

                <select value={selectLimit}
                    onChange={e => setSelectLimit(Number(e.target.value))}>

                    <option value="5">5</option> 
                    <option value="10">10</option> 
                    <option value="15">15</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                </select>

                <button type="submit">Pesquisar</button>
            </Form>

            { inputError && <Error>{inputError}</Error> }

            <SubTitle>Pesquisas Realizadas</SubTitle>

            <Researches>
                {logs.map(log => (
                    <Link key={String(log.id)} to={`logs/${log.id}`}>
                        <Status>{log.status}</Status>
                        <div>
                            <strong>{log.search}</strong>
                            <p>{log.formattedDate}</p>
                        </div>

                        <FiChevronRight size={20} />
                    </Link>
                ))}
            </Researches>
        </>
    );
}

export default Dashboard;