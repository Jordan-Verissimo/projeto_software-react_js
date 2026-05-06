import { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../services/api';

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  // Recuperar token ao montar o componente
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decoded = api.verificarToken(token);
        setAccessToken(token);
        setUser({
          id: decoded.id,
          nome: decoded.nome,
          login: decoded.login,
          perfil: decoded.perfil,
        });
      } catch (err) {
        // Token expirado ou inválido
        localStorage.removeItem('accessToken');
        setAccessToken(null);
        setUser(null);
      }
    }
  }, []);

  /**
   * Autentica um usuário com login/senha
   * Retorna accessToken e armazena no localStorage
   */
  async function login(login, senha) {
    const { accessToken: token, user: userData } = await api.autenticar(login, senha);
    
    // Armazenar token no localStorage (seguro em produção com httpOnly)
    localStorage.setItem('accessToken', token);
    
    // Atualizar estado
    setAccessToken(token);
    setUser(userData);
    
    return userData;
  }

  /**
   * Altera a senha do usuário
   */
  async function changePassword(nova) {
    if (!user) throw new Error('Sem usuário');
    await api.alterarSenha(user.id, nova);
    setUser({ ...user, primeiroAcesso: false });
  }

  /**
   * Renova o token JWT (cria novo token com mesmos dados)
   */
  function renovarToken() {
    if (!accessToken) throw new Error('Sem token');
    try {
      const novoToken = api.renovarToken(accessToken);
      localStorage.setItem('accessToken', novoToken);
      setAccessToken(novoToken);
      return novoToken;
    } catch (err) {
      logout();
      throw err;
    }
  }

  /**
   * Realiza logout (limpa token e estado)
   */
  function logout() {
    localStorage.removeItem('accessToken');
    setAccessToken(null);
    setUser(null);
  }

  return (
    <AuthCtx.Provider value={{ user, accessToken, login, changePassword, renovarToken, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  return useContext(AuthCtx);
}

