import * as api from '../api';
import bcryptjs from 'bcryptjs';
import { db } from '../storage';

describe('API Service - JWT Authentication', () => {
  beforeEach(() => {
    // Limpar localStorage antes de cada teste
    localStorage.clear();
    // Resetar banco de dados com senhas hasheadas
    db.set('usuarios', [
      {
        id: '1',
        nome: 'Admin',
        login: 'admin',
        perfil: api.Perfil.ADMIN,
        primeiroAcesso: true,
        tentativasFalhas: 0,
        bloqueado: false,
        senhaHash: bcryptjs.hashSync('123456', 10),
      },
      {
        id: '2',
        nome: 'Prof. Ana',
        login: 'ana',
        perfil: api.Perfil.PROFESSOR,
        primeiroAcesso: true,
        tentativasFalhas: 0,
        bloqueado: false,
        senhaHash: bcryptjs.hashSync('123456', 10),
      },
      {
        id: '3',
        nome: 'Aluno João',
        login: 'joao',
        perfil: api.Perfil.ALUNO,
        primeiroAcesso: true,
        tentativasFalhas: 0,
        bloqueado: false,
        senhaHash: bcryptjs.hashSync('123456', 10),
      },
    ]);
  });

  describe('Autenticação com JWT', () => {
    test('retorna accessToken e user válidos', async () => {
      const result = await api.autenticar('admin', '123456');
      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('user');
      expect(result.accessToken).toBeTruthy();
      expect(result.user.login).toBe('admin');
    });

    test('accessToken pode ser verificado', async () => {
      const { accessToken } = await api.autenticar('admin', '123456');
      const decoded = api.verificarToken(accessToken);
      expect(decoded).toHaveProperty('id');
      expect(decoded).toHaveProperty('perfil');
      expect(decoded.perfil).toBe('ADMIN');
    });

    test('token inválido lança erro', () => {
      expect(() => api.verificarToken('token-invalido')).toThrow();
    });

    test('renova token JWT com sucesso', async () => {
      const { accessToken: tokenAntigo } = await api.autenticar('admin', '123456');
      const novoToken = api.renovarToken(tokenAntigo);
      expect(novoToken).toBeTruthy();
      // Validar que o novo token pode ser verificado
      const decodedNovo = api.verificarToken(novoToken);
      expect(decodedNovo.id).toBe('1');
      expect(decodedNovo.perfil).toBe('ADMIN');
    });

    test('login com credenciais ADMIN', async () => {
      const result = await api.autenticar('admin', '123456');
      expect(result.user.login).toBe('admin');
      expect(result.user.perfil).toBe(api.Perfil.ADMIN);
    });

    test('login com credenciais PROFESSOR', async () => {
      const result = await api.autenticar('ana', '123456');
      expect(result.user.login).toBe('ana');
      expect(result.user.perfil).toBe(api.Perfil.PROFESSOR);
    });

    test('login com credenciais ALUNO', async () => {
      const result = await api.autenticar('joao', '123456');
      expect(result.user.login).toBe('joao');
      expect(result.user.perfil).toBe(api.Perfil.ALUNO);
    });

    test('rejeita usuário inexistente', async () => {
      await expect(api.autenticar('usuario-fake', '123456')).rejects.toThrow(
        'Usuário não encontrado'
      );
    });

    test('rejeita senha incorreta', async () => {
      await expect(api.autenticar('admin', 'senha-errada')).rejects.toThrow('Senha inválida');
    });

    test('rejeita login com campos vazios', async () => {
      await expect(api.autenticar('', '')).rejects.toThrow('Login e senha são obrigatórios');
      await expect(api.autenticar('admin', '')).rejects.toThrow('Login e senha são obrigatórios');
    });

    test('bloqueia após 3 tentativas falhadas', async () => {
      try {
        await api.autenticar('admin', 'wrong1');
      } catch (e) {}
      try {
        await api.autenticar('admin', 'wrong2');
      } catch (e) {}
      try {
        await api.autenticar('admin', 'wrong3');
      } catch (e) {}

      await expect(api.autenticar('admin', '123456')).rejects.toThrow('bloqueado');
    });

    test('nunca expõe senhaHash no retorno', async () => {
      const { user } = await api.autenticar('admin', '123456');
      expect(user).not.toHaveProperty('senhaHash');
      expect(user).not.toHaveProperty('senha');
    });

    test('token contém dados corretos', async () => {
      const { accessToken } = await api.autenticar('admin', '123456');
      const decoded = api.verificarToken(accessToken);
      expect(decoded.id).toBe('1');
      expect(decoded.login).toBe('admin');
      expect(decoded.perfil).toBe('ADMIN');
      expect(decoded.nome).toBe('Admin');
    });
  });

  describe('Alteração de Senha com Bcrypt', () => {
    test('altera senha com hash seguro', async () => {
      const { user } = await api.autenticar('admin', '123456');
      await api.alterarSenha(user.id, 'nova-senha-123');

      const result = await api.autenticar('admin', 'nova-senha-123');
      expect(result.user.primeiroAcesso).toBe(false);
    });

    test('rejeita senha muito curta', async () => {
      const { user } = await api.autenticar('admin', '123456');
      await expect(api.alterarSenha(user.id, '123')).rejects.toThrow('mínimo 6 caracteres');
    });

    test('rejeita sem ID ou senha', async () => {
      await expect(api.alterarSenha('', 'nova')).rejects.toThrow('obrigatórios');
      await expect(api.alterarSenha('1', '')).rejects.toThrow('obrigatórios');
    });

    test('rejeita usuário inexistente', async () => {
      await expect(api.alterarSenha('999', 'nova-senha')).rejects.toThrow('Usuário não encontrado');
    });

    test('reseta primeiroAcesso após mudança', async () => {
      const { user } = await api.autenticar('admin', '123456');
      expect(user.primeiroAcesso).toBe(true);

      await api.alterarSenha(user.id, 'nova-senha-456');

      const { user: updated } = await api.autenticar('admin', 'nova-senha-456');
      expect(updated.primeiroAcesso).toBe(false);
    });

    test('permite múltiplas mudanças de senha', async () => {
      const { user } = await api.autenticar('admin', '123456');

      await api.alterarSenha(user.id, 'senha-um');
      await expect(api.autenticar('admin', 'senha-um')).resolves.toBeTruthy();

      await api.alterarSenha(user.id, 'senha-dois');
      await expect(api.autenticar('admin', 'senha-dois')).resolves.toBeTruthy();
    });

    test('senha anterior não funciona', async () => {
      const { user } = await api.autenticar('admin', '123456');
      await api.alterarSenha(user.id, 'senha-nova-123');

      await expect(api.autenticar('admin', '123456')).rejects.toThrow('Senha inválida');
    });

    test('retorna true ao sucesso', async () => {
      const { user } = await api.autenticar('admin', '123456');
      const result = await api.alterarSenha(user.id, 'nova-senha-ok');
      expect(result).toBe(true);
    });

    test('suporta senhas com caracteres especiais', async () => {
      const { user } = await api.autenticar('admin', '123456');
      const novaSenha = 'S3nh@*#Secure!';

      await api.alterarSenha(user.id, novaSenha);
      const result = await api.autenticar('admin', novaSenha);
      expect(result.user.id).toBe(user.id);
    });
  });
});
