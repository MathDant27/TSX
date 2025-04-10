// Tipo genérico para resposta de operações
export type Result<T> = {
    success: boolean;
    data?: T;
    error?: string;
  };
  
  // Tipo para funções de filtro
  export type FilterFunction<T> = (item: T) => boolean;
  