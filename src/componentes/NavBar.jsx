import { NavLink } from 'react-router-dom';
export default function NavBar(){
  return (
    <nav className="nav">
      <NavLink to="/">Início</NavLink>
      <NavLink to="/login">Entrar</NavLink>
      <NavLink to="/games">Seus Jogos</NavLink>
      <NavLink to="/pokemons">Seus Pokemons</NavLink>
      <NavLink to="/itens">Seus Itens</NavLink>
      <NavLink to="/pokedex">Pokedex</NavLink>
      <NavLink to="/admin/faculties">Estrutura</NavLink>
    </nav>
  );
}