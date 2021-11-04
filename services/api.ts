import axios, { Method } from 'axios';

const client = axios.create({
    baseURL: 'http://localhost:3000/api/',
    timeout: 30000
});

export const executeRequest = (endpoint: string, method: Method, body?: any): any => {
    const headers = {
        'Content-Type': "application/json"
    } as any;

    const accessToken = localStorage.getItem('accessToken');
    if(accessToken)
        headers['Authorization'] = 'Bearer ' + accessToken;

    console.log(`executando: ${endpoint}, método: ${method}, body: ${body}`);

    return client.request({
        url: endpoint,
        method: method,
        data: body ? body : '',
        headers
    });
}