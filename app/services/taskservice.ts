import { Task, CreateTaskDTO, UpdateTaskDTO, TaskStatus } from '../models/task';
import { Category } from '../models/category';
import { Result, FilterFunction } from '../types/common';
import { Logger } from '../utils/logger';

export class TaskService {
  private tasks: Task[] = [];
  private nextId = 1;
  private logger = Logger.getInstance();

  // Cria uma nova tarefa
  createTask(taskDTO: CreateTaskDTO): Result<Task> {
    try {
      const now = new Date();
      const newTask: Task = {
        id: this.nextId++,
        ...taskDTO,
        createdAt: now,
        updatedAt: now
      };
      
      this.tasks.push(newTask);
      this.logger.info('Tarefa criada com sucesso', { id: newTask.id });
      
      return { success: true, data: newTask };
    } catch (error) {
      this.logger.error('Erro ao criar tarefa', error);
      return { success: false, error: `Erro ao criar tarefa: ${error}` };
    }
  }

  // Obtém todas as tarefas
  getAllTasks(): Result<Task[]> {
    return { success: true, data: [...this.tasks] };
  }

  // Obtém uma tarefa pelo ID
  getTaskById(id: number): Result<Task> {
    const task = this.tasks.find(t => t.id === id);
    
    if (!task) {
      this.logger.warning(`Tarefa com ID ${id} não encontrada`);
      return { success: false, error: `Tarefa com ID ${id} não encontrada` };
    }
    
    return { success: true, data: task };
  }

  // Atualiza uma tarefa existente
  updateTask(id: number, updateDTO: UpdateTaskDTO): Result<Task> {
    const taskIndex = this.tasks.findIndex(t => t.id === id);
    
    if (taskIndex === -1) {
      this.logger.warning(`Tentativa de atualizar tarefa inexistente: ${id}`);
      return { success: false, error: `Tarefa com ID ${id} não encontrada` };
    }
    
    try {
      // Cria uma cópia da tarefa atual
      const updatedTask: Task = {
        ...this.tasks[taskIndex],
        ...updateDTO,
        updatedAt: new Date()
      };
      
      this.tasks[taskIndex] = updatedTask;
      this.logger.info(`Tarefa ${id} atualizada com sucesso`);
      
      return { success: true, data: updatedTask };
    } catch (error) {
      this.logger.error(`Erro ao atualizar tarefa ${id}`, error);
      return { success: false, error: `Erro ao atualizar tarefa: ${error}` };
    }
  }

  // Remove uma tarefa
  deleteTask(id: number): Result<boolean> {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter(t => t.id !== id);
    
    if (this.tasks.length === initialLength) {
      this.logger.warning(`Tentativa de excluir tarefa inexistente: ${id}`);
      return { success: false, error: `Tarefa com ID ${id} não encontrada` };
    }
    
    this.logger.info(`Tarefa ${id} excluída com sucesso`);
    return { success: true, data: true };
  }

  // Filtra tarefas usando uma função de filtro genérica
  filterTasks(filterFn: FilterFunction<Task>): Result<Task[]> {
    try {
      const filteredTasks = this.tasks.filter(filterFn);
      return { success: true, data: filteredTasks };
    } catch (error) {
      this.logger.error('Erro ao filtrar tarefas', error);
      return { success: false, error: `Erro ao filtrar tarefas: ${error}` };
    }
  }

  // Métodos auxiliares de filtragem
  getTasksByStatus(status: TaskStatus): Result<Task[]> {
    return this.filterTasks(task => task.status === status);
  }

  getTasksByCategory(category: Category): Result<Task[]> {
    return this.filterTasks(task => task.category === category);
  }

  getOverdueTasks(): Result<Task[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return this.filterTasks(task => 
      task.dueDate < today && task.status !== TaskStatus.DONE
    );
  }

  // Método para obter estatísticas das tarefas
  getTaskStatistics(): Result<TaskStatistics> {
    try {
      const stats: TaskStatistics = {
        total: this.tasks.length,
        byStatus: {
          [TaskStatus.TODO]: 0,
          [TaskStatus.IN_PROGRESS]: 0,
          [TaskStatus.DONE]: 0,
          [TaskStatus.CANCELLED]: 0
        },
        byCategory: Object.values(Category).reduce((acc, category) => {
          acc[category] = 0;
          return acc;
        }, {} as Record<string, number>),
        overdue: 0
      };
      
      // Calcula estatísticas
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      this.tasks.forEach(task => {
        // Contagem por status
        stats.byStatus[task.status]++;
        
        // Contagem por categoria
        stats.byCategory[task.category]++;
        
        // Contagem de tarefas atrasadas
        if (task.dueDate < today && task.status !== TaskStatus.DONE) {
          stats.overdue++;
        }
      });
      
      return { success: true, data: stats };
    } catch (error) {
      this.logger.error('Erro ao calcular estatísticas', error);
      return { success: false, error: `Erro ao calcular estatísticas: ${error}` };
    }
  }
}

// Interface para estatísticas de tarefas
interface TaskStatistics {
  total: number;
  byStatus: Record<TaskStatus, number>;
  byCategory: Record<string, number>;
  overdue: number;
}
