import { renderHook, act } from '@testing-library/react';
import { useCounter } from '../useCounter';

describe('useCounter Hook', () => {
  test('inicializa com valor padrão 0', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  test('inicializa com valor customizado', () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });

  test('incrementa contador', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  test('decrementa contador', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(-1);
  });

  test('incrementa múltiplas vezes', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
      result.current.increment();
      result.current.increment();
    });

    expect(result.current.count).toBe(3);
  });

  test('combina incremento e decremento', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
      result.current.increment();
      result.current.decrement();
    });

    expect(result.current.count).toBe(1);
  });

  test('reseta para valor inicial', () => {
    const { result } = renderHook(() => useCounter(5));

    act(() => {
      result.current.increment();
      result.current.increment();
    });

    expect(result.current.count).toBe(7);

    act(() => {
      result.current.reset();
    });

    expect(result.current.count).toBe(5);
  });

  test('reseta para novo valor inicial quando prop muda', () => {
    const { result, rerender } = renderHook(
      ({ initial }) => useCounter(initial),
      { initialProps: { initial: 0 } }
    );

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);

    rerender({ initial: 10 });

    act(() => {
      result.current.reset();
    });

    expect(result.current.count).toBe(10);
  });

  test('retorna funções estáveis (memoizadas)', () => {
    const { result, rerender } = renderHook(() => useCounter());

    const incrementRef1 = result.current.increment;
    const decrementRef1 = result.current.decrement;
    const resetRef1 = result.current.reset;

    rerender();

    const incrementRef2 = result.current.increment;
    const decrementRef2 = result.current.decrement;
    const resetRef2 = result.current.reset;

    expect(incrementRef1).toBe(incrementRef2);
    expect(decrementRef1).toBe(decrementRef2);
    expect(resetRef1).toBe(resetRef2);
  });
});
