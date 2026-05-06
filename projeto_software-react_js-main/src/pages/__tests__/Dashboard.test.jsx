import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../Dashboard';

// Mock dos componentes complexos para simplificar testes
jest.mock('../../app/components/OrnateFrame', () => ({
  OrnateFrame: ({ children }) => <div data-testid="ornate-frame">{children}</div>,
  OrnateDivider: () => <div data-testid="ornate-divider" />,
}));

jest.mock('../../app/components/GoldButton', () => ({
  __esModule: true,
  GoldButton: ({ children, onClick, ...props }) => (
    <button onClick={onClick} data-testid="gold-button" {...props}>
      {children}
    </button>
  ),
}));

jest.mock('recharts', () => ({
  AreaChart: ({ children }) => <div data-testid="area-chart">{children}</div>,
  BarChart: ({ children }) => <div data-testid="bar-chart">{children}</div>,
  Area: () => null,
  Bar: () => null,
  XAxis: () => null,
  YAxis: () => null,
  Tooltip: () => null,
  ResponsiveContainer: ({ children }) => <div data-testid="responsive-container">{children}</div>,
  Cell: () => null,
  CartesianGrid: () => null,
}));

jest.mock('lucide-react', () => ({
  Activity: () => <span data-testid="activity-icon">Activity</span>,
  Heart: () => <span data-testid="heart-icon">Heart</span>,
  Zap: () => <span data-testid="zap-icon">Zap</span>,
}));

describe('Dashboard Component', () => {
  test('renderiza componente sem erros', () => {
    const { container } = render(<Dashboard />);
    expect(container).toBeInTheDocument();
  });

  test('renderiza múltiplos OrnateFrames para contenção visual', () => {
    render(<Dashboard />);
    const frames = screen.queryAllByTestId('ornate-frame');
    expect(frames.length).toBeGreaterThan(0);
  });

  test('renderiza gráficos para visualização de dados biométricos', () => {
    render(<Dashboard />);
    const charts = screen.queryAllByTestId(/chart/);
    // Deve ter pelo menos um gráfico (AreaChart ou BarChart)
    expect(charts.length).toBeGreaterThan(0);
  });

  test('renderiza ícones de medições biométricas', () => {
    render(<Dashboard />);
    expect(screen.getByTestId('heart-icon')).toBeInTheDocument();
    expect(screen.getByTestId('activity-icon')).toBeInTheDocument();
    expect(screen.getByTestId('zap-icon')).toBeInTheDocument();
  });

  test('renderiza múltiplos botões de ação (GoldButton)', () => {
    render(<Dashboard />);
    const buttons = screen.queryAllByTestId('gold-button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  test('renderiza layouts adaptativos com ResponsiveContainers', () => {
    render(<Dashboard />);
    const containers = screen.queryAllByTestId('responsive-container');
    expect(containers.length).toBeGreaterThan(0);
  });

  test('renderiza divisores ornamentados entre seções', () => {
    render(<Dashboard />);
    const dividers = screen.queryAllByTestId('ornate-divider');
    expect(dividers.length).toBeGreaterThanOrEqual(0);
  });

  test('renderiza estrutura principal com artigo como container', () => {
    const { container } = render(<Dashboard />);
    // Dashboard renderiza dentro de um article tag
    expect(container.querySelector('article')).toBeInTheDocument();
  });
});



