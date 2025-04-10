export class DateUtils {
    // Formata uma data para exibição
    static formatDate(date: Date): string {
      return date.toLocaleDateString('pt-BR');
    }
  
    // Verifica se uma data está no passado
    static isPast(date: Date): boolean {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date < today;
    }
  
    // Adiciona dias a uma data
    static addDays(date: Date, days: number): Date {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }
  }
  