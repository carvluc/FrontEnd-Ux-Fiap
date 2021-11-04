import type { NextPage } from 'next'
import React, {useState, useEffect} from 'react'
import styles from '../styles/Home.module.css'

const MeuComponenteDeFuncao = (props: any) => {
  return <h1>{props.texto}</h1>
}

class MeuPrimeiroComponenteDeClasse extends React.Component {

  state = {
    msg: 'Meu Primeiro Componente de classe'
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ msg: 'Mudei o state' });
    }, 2000)
  }

  render() {
    this.props
    return <h2>{this.state.msg}</h2>
  }
}

const Home: NextPage = () => {
  const [lista, setLista] = useState([23, 55, 89]);

  useEffect(() => {
    setTimeout(() => {
      console.log('effect');
      setLista([55, 89, 56, 545, 20, 56]);
    }, 2000);
  }, []);

  return (
    <div className={styles.container}>
      {lista.map(item => <MeuComponenteDeFuncao texto={item}/>)}
      <MeuPrimeiroComponenteDeClasse />
      <MeuComponenteDeFuncao texto="Último componente"/>
    </div>
  )
}

export default Home
