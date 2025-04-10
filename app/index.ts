import { TaskService } from './services/taskservice';
import { Category } from './models/category';
import { TaskStatus } from './models/task';
import { DateUtils } from './utils/dateutils';
import { Logger, LogLevel } from './utils/logger';

// Configurar o logger
const logger = Logger.getInstance();
logger.setLogLevel(LogLevel.DEBUG);

// Criar o serviço de tarefas
const taskService = new TaskService();

// Função para demonstrar o uso do sistema
function demonstrateTaskSystem(): void {
  logger.info('Iniciando demonstração do sistema de gerenciamento de tarefas');

  // Criar algumas tarefas
  const today = new Date();
  const tomorrow = DateUtils.addDays(today, 1);
  const nextWeek = DateUtils.addDays(today, 7);
  const yesterday = DateUtils.addDays(today, -1);

  // Tarefa 1
  const task1Result = taskService.createTask({
    title: "Implementar sistema de autenticação",
    description: "Criar sistema de login e registro usando JWT",
    dueDate: tomorrow,
    category: Category.WORK,
    status: TaskStatus.TODO,
    priority: 1
  });

  // Tarefa 2
  const task2Result = taskService.createTask({
    title: "Fazer exercícios físicos",
    description: "30 minutos de corrida no parque",
    dueDate: today,
    category: Category.HEALTH,
    status: TaskStatus.TODO,
    priority: 2
  });

  // Tarefa 3
  const task3Result = taskService.createTask({
    title: "Estudar TypeScript",
    description: "Aprender sobre tipos genéricos e decorators",
    dueDate: nextWeek,
    category: Category.STUDY,
    status: TaskStatus.IN_PROGRESS,
    priority: 2
  });

  // Tarefa 4 (atrasada)
  const task4Result = taskService.createTask({
    title: "Pagar conta de luz",
    description: "Vencimento dia " + DateUtils.formatDate(yesterday),
    dueDate: yesterday,
    category: Category.FINANCE,
    status: TaskStatus.TODO,
    priority: 1
  });

  // Listar todas as tarefas
  logger.info('Listando todas as tarefas:');
  const allTasksResult = taskService.getAllTasks();
  if (allTasksResult.success && allTasksResult.data) {
    console.table(allTasksResult.data.map(task => ({
      id: task.id,
      title: task.title,
      status: task.status,
      category: task.category,
      dueDate: DateUtils.formatDate(task.dueDate),
      priority: task.priority
    })));
  }

  // Atualizar uma tarefa
  if (task2Result.success && task2Result.data) {
    const updateResult = taskService.updateTask(task2Result.data.id, {
      status: TaskStatus.DONE,
      description: "Completei 45 minutos de corrida no parque"
    });
    
    if (updateResult.success) {
      logger.info(`Tarefa "${task2Result.data.title}" marcada como concluída`);
    }
  }

  // Listar tarefas atrasadas
  const overdueTasksResult = taskService.getOverdueTasks();
  if (overdueTasksResult.success && overdueTasksResult.data) {
    logger.warning(`Encontradas ${overdueTasksResult.data.length} tarefas atrasadas:`);
    overdueTasksResult.data.forEach(task => {
      console.log(`- ${task.title} (Vencimento: ${DateUtils.formatDate(task.dueDate)})`);
    });
  }

  // Obter estatísticas
  const statsResult = taskService.getTaskStatistics();
  if (statsResult.success && statsResult.data) {
    logger.info('Estatísticas de tarefas:');
    console.log('Total de tarefas:', statsResult.data.total);
    console.log('Por status:');
    Object.entries(statsResult.data.byStatus).forEach(([status, count]) => {
      console.log(`  ${status}: ${count}`);
    });
    console.log('Por categoria:');
    Object.entries(statsResult.data.byCategory).forEach(([category, count]) => {
      if (count > 0) {
        console.log(`  ${category}: ${count}`);
      }
    });
    console.log('Tarefas atrasadas:', statsResult.data.overdue);
  }

  // Excluir uma tarefa
  if (task4Result.success && task4Result.data) {
    const deleteResult = taskService.deleteTask(task4Result.data.id);
    if (deleteResult.success) {
      logger.info(`Tarefa "Pagar conta de luz" excluída com sucesso`);
    }
  }

  // Listar tarefas por categoria
  const workTasksResult = taskService.getTasksByCategory(Category.WORK);
  if (workTasksResult.success && workTasksResult.data) {
    logger.info(`Tarefas da categoria ${Category.WORK}:`);
    workTasksResult.data.forEach(task => {
      console.log(`- ${task.title} (${task.status})`);
    });
  }

  // Demonstração de filtro personalizado
  const highPriorityTasksResult = taskService.filterTasks(task => task.priority === 1);
  if (highPriorityTasksResult.success && highPriorityTasksResult.data) {
    logger.info(`Tarefas de alta prioridade:`);
    highPriorityTasksResult.data.forEach(task => {
      console.log(`- ${task.title} (${task.category})`);
    });
  }

  logger.info('Demonstração concluída');
}

// Executar a demonstração
demonstrateTaskSystem();
