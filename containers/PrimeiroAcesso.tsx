import { NextPage } from "next"
import { useState } from "react"
import { executeRequest } from "../services/api";
import { PrimeiroAcessoProps } from "../types/PrimeiroAcessoProps"

export const PrimeiroAcesso: NextPage<PrimeiroAcessoProps> = ({
    setPrimeiroAcesso
}) => {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const validateEmail = () => {
        const emailRegex = /\S+@\S+\.\S+/;

        setError('');
        if (!emailRegex.test(email))
            setError('Email inválido');
    }

    const cadastrar = async () => {
        let formEnviado = false;
        try {
            setError('');
            setLoading(true);

            if (!nome || !email || !senha) {
                setError('Favor informar todos os campos do form.');
                formEnviado = false;
                setLoading(formEnviado);
                return;
            }

            const result = await executeRequest('user', 'POST', {
                name: nome,
                email,
                password: senha
            });

            formEnviado = true;
        } catch (e: any) {
            console.log(e);
            if (e?.response?.data?.error)
                setError(e?.response?.data?.error);
            else
                setError('Não foi possível processar login, tente novamente');
        } finally {
            setLoading(formEnviado);
            setPrimeiroAcesso(!formEnviado);
        }
    }

    return (
        <div className="container-primeiro-acesso">
            <img src="/user.svg" alt="Usuario" className="user"></img>
            <form>
                <p className="error">{error}</p>
                <div className="input">
                    <input type="text"
                        placeholder="Nome completo"
                        value={nome}
                        onChange={e => setNome(e.target.value)} />
                </div>

                <div className="input">
                    <input type="text"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        onBlur={validateEmail} />
                </div>
                <div className="input">
                    <input type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={e => setSenha(e.target.value)} />
                </div>
                <div className="acoes">
                    <button type="button"
                        onClick={() => setPrimeiroAcesso(false)}
                        className="voltar">
                        Voltar
                    </button>
                    <button type="button"
                        disabled={isLoading}
                        onClick={cadastrar}
                        className={isLoading ? 'loading' : ''}>
                        {isLoading ? "...Enviando dados" : "Cadastrar"}
                    </button>
                </div>
            </form>
        </div>
    )
}