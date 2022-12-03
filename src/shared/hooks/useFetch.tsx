import { useEffect, useState } from "react";

interface Istate {
  data: Array<any>;
  isLoading: boolean;
  hasError: string | null;
}

export const useFetch = (url: string) => {
  const [state, setState] = useState<Istate>({
    data: [],
    isLoading: true,
    hasError: null,
  });

  const getFetch = async (): Promise<void> => {
    setState({
      ...state,
      isLoading: true,
    });
    let data: Array<any> = [],
      errorMessage = "";
    try {
      const resp = await fetch(url);
      const dataJSON = await resp.json();
      /*Dependiendo de la API se trae la 'data' -- Ejemplo pokeApi*/
      // data = dataJSON.results.map((result: any) => result.name);
    } catch (error) {
      if (error instanceof Error) {
        errorMessage = error.message;
      }
    } finally {
      setState({
        data: data,
        isLoading: false,
        hasError: errorMessage,
      });
    }
  };

  useEffect(() => {
    getFetch();
  }, [url]);

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
  };
};