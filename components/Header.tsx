import { NextPage } from "next"
import { HeaderProps } from "../types/HeaderProps"

const Header: NextPage<HeaderProps> = ({
    logout,
    showModal
}) => {
    const fullName = localStorage.getItem('userName');
    const firstName = fullName?.split(' ')[0] || '';

    return (
        <div className="container-header">
            <img src="/logo.svg" alt="Logo Fiap" className="logo"></img>
            <button onClick={showModal}><span>+</span> Adicionar Tarefa</button>
            <div className="mobile">
                <span>Olá, {firstName}</span>
                <img src="/exit-mobile.svg" alt="sair" onClick={logout}></img>
            </div>
            <div className="desktop">
                <span>Olá, {firstName}</span>
                <img src="/exit-desktop.svg" alt="sair" onClick={logout}></img>
            </div>
        </div>
    )
}

export { Header }