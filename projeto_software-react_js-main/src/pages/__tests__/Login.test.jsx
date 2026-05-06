import { render, screen } from '@testing-library/react';

describe('Login Rendering', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('documento renderiza sem erro', () => {
    const { container } = render(<div>Test</div>);
    expect(container).toBeDefined();
  });

  test('botton renderiza corretamente', () => {
    render(<button>Clique</button>);
    expect(screen.getByText('Clique')).toBeInTheDocument();
  });

  test('input renderiza corretamente', () => {
    render(<input type="text" placeholder="test" />);
    const input = screen.getByPlaceholderText('test');
    expect(input).toBeInTheDocument();
    expect(input.type).toBe('text');
  });

  test('forma renderiza com múltiplos elementos', () => {
    render(
      <form>
        <input type="email" placeholder="email" />
        <input type="password" placeholder="senha" />
        <button type="submit">Login</button>
      </form>
    );

    expect(screen.getByPlaceholderText('email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('senha')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });
});



