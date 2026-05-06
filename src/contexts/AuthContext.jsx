import { createContext, useContext, useState } from 'react';
import * as api from '../services/api';

// Aula 03
// O Programa AuthContext é necessário para fornecer um contexto de autenticação para toda a aplicação, permitindo que os componentes acessem informações sobre o usuário autenticado e as funções de login, logout e alteração de senha.
// Ele é criado usando o createContext do React, e o AuthProvider é um componente que envolve a aplicação e fornece o contexto de autenticação para seus filhos. 
// O useAuth é um hook personalizado que permite que os componentes acessem facilmente o contexto de autenticação, facilitando a implementação de funcionalidades relacionadas à autenticação em toda a aplicação. 
// Sem o AuthContext, seria mais difícil gerenciar o estado de autenticação e compartilhar informações sobre o usuário autenticado entre os componentes da aplicação.
const AuthCtx = createContext(null);

export function AuthProvider({ children }){
  const [user, setUser] = useState(null);
  // O login é uma função assíncrona que autentica o usuário usando as credenciais fornecidas (login e senha) e, se a autenticação for bem-sucedida, atualiza o estado do usuário com as informações retornadas pela API.
  // Aula03 - Ela chama a função de API para autenticar o usuário, passando as credenciais, e se a autenticação for bem-sucedida, ela atualiza o estado do usuário com as informações retornadas pela API. A função retorna o usuário autenticado. 
  async function login(login, senha){
    // api.autenticar aplica as regras de autenticação, como verificar se o usuário existe, se a senha está correta, e se o usuário está bloqueado devido a tentativas de login falhas. Se a autenticação for bem-sucedida, ela retorna as informações do usuário autenticado, que são então armazenadas no estado do componente usando setUser.
    const u = await api.autenticar(login, senha);
    setUser(u); return u;
  }
  // Aula 04 - A função changePassword é responsável por alterar a senha do usuário autenticado. Ela verifica se há um usuário autenticado, e se houver, chama a função de API para alterar a senha, passando o ID do usuário e a nova senha. Após a alteração bem-sucedida, ela atualiza o estado do usuário para refletir que o primeiro acesso foi concluído.
  async function changePassword(nova){
    if(!user) 
        throw new Error('Sem usuário');
    await api.alterarSenha(user.id, nova);
    setUser({ ...user, primeiroAcesso: false });
  }
  function logout(){ 
    setUser(null); 
  }
  
  return <AuthCtx.Provider value={{ user, login, changePassword, logout }}>{children}</AuthCtx.Provider>;
}

export function useAuth(){
   return useContext(AuthCtx); 
}