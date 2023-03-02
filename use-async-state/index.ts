export type AsyncStateDispatcher<T> = (value: T | Promise<T>) => void;

const useAsyncState = <T>(initialState: T): [T, AsyncStateDispatcher<T>] => {
  throw new Error('Function not implemented');
};


export default useAsyncState;
