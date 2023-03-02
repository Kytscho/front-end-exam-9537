/**
 * @jest-environment jsdom
 */

import { renderHook, act } from '@testing-library/react-hooks/pure';
import useAsyncState from ".";


describe('useAsyncState', () => {

  test('Should return the initial state', () => {
    const { result } = renderHook(() => useAsyncState('initial state'));

    expect(result.current[0]).toBe('initial state');
  });

  test('Should update the state synchronically', () => {
    const { result } = renderHook(() => useAsyncState('initial state'));

    act(() => {
      result.current[1]('new state');
    });

    expect(result.current[0]).toBe('new state');
  });

  test('Should update the state asynchronically', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAsyncState('initial state'));

    act(() => {
      result.current[1](new Promise<string>(resolve => {
        setTimeout(() => resolve('new state'), 200);
      }));
    });

    await waitForNextUpdate();

    expect(result.current[0]).toBe('new state');
  });

  test('Should switch to the last state', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAsyncState('initial state'));

    const pendingTasks: Promise<unknown>[] = [];

    act(() => {
      const firstAsyncAction = new Promise<string>(resolve => {
        setTimeout(() => resolve('first state'), 800);
      });
      const secondAsyncAction = new Promise<string>(resolve => {
        setTimeout(() => resolve('second state'), 200);
      });

      pendingTasks.push(firstAsyncAction, secondAsyncAction);

      result.current[1](firstAsyncAction);
      result.current[1](secondAsyncAction);
    });

    await Promise.all(pendingTasks);
    await Promise.allSettled([
      waitForNextUpdate(),
    ]);

    expect(result.current[0]).toBe('second state');
  });

  test('Should dispatcher be memoized', () => {
    const { result, rerender } = renderHook(() => useAsyncState('initial state'));

    const dispatcher = result.current[1];

    rerender();

    expect(result.current[1]).toBe(dispatcher);
  });

});
