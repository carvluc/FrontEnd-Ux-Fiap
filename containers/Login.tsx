import { NextPage } from "next";
import { useState } from "react"
import { executeRequest } from "../services/api";
import { AccessTokenProps } from "../types/AccessTokenProps";

export const Login: NextPage<AccessTokenProps> = ({
    setToken,
    setPrimeiroAcesso
}) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);

    const validateEmail = () => {
        const emailRegex = /\S+@\S+\.\S+/;
        
        setError('');
        if(!emailRegex.test(login))
            setError('Email inválido');
    }

    const logar = async () => {
        try {
            setLoading(true);
            setError('');
            if (!login || !password) {
                setError('Favor informar email e senha');
                setLoading(false);
                return;
            }

            const result = await executeRequest('login', 'POST', {
                login,
                password
            });

            if (result && result.data) {
                localStorage.setItem('accessToken', result.data.token);
                localStorage.setItem('userName', result.data.name);
                localStorage.setItem('userMail', result.data.email);
                setToken(result.data.token);
            } else
                setError('Não foi possível processar login, tente novamente');
        } catch (e: any) {
            console.log(e);
            if (e?.response?.data?.error)
                setError(e?.response?.data?.error);
            else
                setError('Não foi possível processar login, tente novamente');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container-login">
            <img src="/logo.svg" alt="Logo Fiap" className="logo"></img>
            <form>
                <p className="error">{error}</p>
                <div className="input">
                    <img src="/mail.svg" alt="Informe seu email"></img>
                    <input type="text" placeholder="Informe seu email"
                        value={login}
                        onChange={evento => setLogin(evento.target.value)}
                        onBlur={validateEmail}
                    />
                </div>
                <div className="input">
                    <img src="/lock.svg" alt="Informe sua senha"></img>
                    <input type="password" placeholder="Informe sua senha"
                        value={password}
                        onChange={evento => setPassword(evento.target.value)}
                    />
                </div>
                <button type="button"
                    onClick={logar}
                    disabled={isLoading}
                    className={isLoading ? 'loading' : ''}>
                    {isLoading ? '...Carregando' : 'Login'}
                </button>
                <div className="registro">
                    <label>Não possui uma conta?</label>
                    <a onClick={() => setPrimeiroAcesso && setPrimeiroAcesso(true)}>Cadastre-se!</a>
                </div>
            </form>
        </div>
    )
}