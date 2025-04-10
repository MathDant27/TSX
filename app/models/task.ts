import { Category } from './category';

// Enum para status da tarefa
export enum TaskStatus {
  TODO = "A fazer",
  IN_PROGRESS = "Em andamento",
  DONE = "Concluída",
  CANCELLED = "Cancelada"
}

// Interface para representar uma tarefa
export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  category: Category;
  status: TaskStatus;
  priority: 1 | 2 | 3; // Union type: 1 (Alta), 2 (Média), 3 (Baixa)
  createdAt: Date;
  updatedAt: Date;
}

// Tipo para criação de tarefa (alguns campos são opcionais)
export type CreateTaskDTO = Omit<Task, 'id' | 'createdAt' | 'updatedAt'> & {
  id?: number;
};

// Tipo para atualização de tarefa (todos os campos são opcionais)
export type UpdateTaskDTO = Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>;
