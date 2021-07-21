import { Dispatch, SetStateAction, useEffect, useState } from "react";

export type CurrentStateType<S> = [S, Dispatch<SetStateAction<S>>];
export const useQueryState = <S extends string>(key: string, initialState: S): CurrentStateType<S> => {
  const [state, setState] = useState<S>(initialState);

  useEffect(() => {
    const route = new URL(location.href);
    const existing = route.searchParams.get(key);
    const existingValue = Array.isArray(existing) ? existing[0] : existing;
    if (existingValue && existingValue !== state) {
      setData(existingValue as S);
    }
  });

  const setData = (val: SetStateAction<S>) => {
    const result = typeof val === "function" ? (val as (prevState: S) => S)(state) : val;
    const route = new URL(location.href);
    if (result && result !== initialState) route.searchParams.set(key, result);
    else route.searchParams.delete(key);
    history.replaceState(null, "", route.toString());
    if (result !== state) setState(result);
  };

  return [state, setData];
};
