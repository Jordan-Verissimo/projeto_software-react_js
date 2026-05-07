import { render, screen } from '@testing-library/react';
import { GoldButton } from '../GoldButton';

describe('GoldButton Component', () => {
  test('renderiza com texto correto', () => {
    render(<GoldButton>Clique aqui</GoldButton>);
    expect(screen.getByRole('button', { name: /clique aqui/i })).toBeInTheDocument();
  });

  test('renderiza como button por padrão', () => {
    render(<GoldButton>Enviar</GoldButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
  });

  test('renderiza com type submit quando especificado', () => {
    render(<GoldButton type="submit">Enviar</GoldButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  test('renderiza como elemento button', () => {
    const { container } = render(<GoldButton>Botão</GoldButton>);
    const button = container.querySelector('button');
    expect(button).toBeTruthy();
  });

  test('renderiza com classes CSS', () => {
    const { container } = render(<GoldButton variant="ghost">Cancelar</GoldButton>);
    const button = container.querySelector('button');
    const className = button.className || '';
    expect(className.length).toBeGreaterThan(0);
  });

  test('renderiza com className customizado', () => {
    const { container } = render(
      <GoldButton className="custom-class">Botão</GoldButton>
    );
    const button = container.querySelector('button');
    expect(button.className).toContain('custom-class');
  });

  test('renderiza conteúdo React como children', () => {
    render(
      <GoldButton>
        <span data-testid="icon">Ícone</span> Texto
      </GoldButton>
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  test('aceita múltiplos tipos de variant', () => {
    const { rerender } = render(<GoldButton variant="primary">Primary</GoldButton>);
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(<GoldButton variant="ghost">Ghost</GoldButton>);
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(<GoldButton variant="danger">Danger</GoldButton>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('renderiza múltiplas instâncias corretamente', () => {
    const { container } = render(
      <>
        <GoldButton>Botão 1</GoldButton>
        <GoldButton>Botão 2</GoldButton>
        <GoldButton>Botão 3</GoldButton>
      </>
    );
    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBe(3);
  });

  test('renderiza bem com conteúdo vazio', () => {
    render(<GoldButton />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  test('suporta múltiplos filhos', () => {
    render(
      <GoldButton>
        <span>Antes</span>Meio<span>Depois</span>
      </GoldButton>
    );
    expect(screen.getByText('Antes')).toBeInTheDocument();
    expect(screen.getByText('Meio')).toBeInTheDocument();
    expect(screen.getByText('Depois')).toBeInTheDocument();
  });

  test('renderiza sem erros com todas as props', () => {
    render(
      <GoldButton
        variant="primary"
        className="extra"
        type="button"
        onClick={() => {}}
      >
        Completo
      </GoldButton>
    );
    expect(screen.getByText('Completo')).toBeInTheDocument();
  });
});


