import { NextPage } from "next"
import { FooterProps } from "../types/FooterProps"

const Footer: NextPage<FooterProps> = ({
    showModal
}) => {
    return (
        <div className="container-footer">
            <button onClick={showModal}><img src="/add.svg" alt="Adicionar Tarefa" /> Adicionar uma tarefa</button>
            <span>© Copyright {new Date().getFullYear()}. Todos os direitos reservados.</span>
        </div>
    )
}

export { Footer }