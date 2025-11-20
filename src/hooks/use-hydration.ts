import { useEffect, useState } from 'react';
import { StoreApi, UseBoundStore } from 'zustand';
import { PersistOptions } from 'zustand/middleware';

type Write<T, U> = Omit<T, keyof U> & U;
type PersistListener<S> = (state: S) => void;
type StorePersist<S, Ps> = {
  persist: {
    setOptions: (options: Partial<PersistOptions<S, Ps>>) => void;
    clearStorage: () => void;
    rehydrate: () => Promise<void> | void;
    hasHydrated: () => boolean;
    onHydrate: (fn: PersistListener<S>) => () => void;
    onFinishHydration: (fn: PersistListener<S>) => () => void;
    getOptions: () => Partial<PersistOptions<S, Ps>>;
  };
};
type UseStore<T extends object> = UseBoundStore<Write<StoreApi<T>, StorePersist<T, T>>>;

export const useHydration = <T extends object>(useStore: UseStore<T>) => {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const unsub = useStore.persist.onFinishHydration(() => {
      setHasHydrated(true);
    });

    if (useStore.persist.hasHydrated()) {
      setHasHydrated(true);
    }

    return () => {
      unsub();
    };
  }, []);

  return hasHydrated;
};
