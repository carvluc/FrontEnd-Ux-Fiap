import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Login } from '../containers/Login'
import { Home } from '../containers/Home'
import { PrimeiroAcesso } from '../containers/PrimeiroAcesso'

const Index: NextPage = () => {

  const [accessToken, setToken] = useState('');
  const [primeiroAcesso, setPrimeiroAcesso] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if(token)
        setToken(token);
    }
  }, []);

  return (primeiroAcesso ? <PrimeiroAcesso setPrimeiroAcesso={setPrimeiroAcesso}/> : (accessToken ? <Home setToken={setToken}/> : <Login setToken={setToken} setPrimeiroAcesso={setPrimeiroAcesso}/>))
}

export default Index
