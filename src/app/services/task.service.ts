import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { HttpClient } from '@angular/common/http';
import { MOCKTASKS } from '../mocks/task.mock';

/**
 * Servicio que gestiona las tareas de la aplicación.
 * Utiliza un BehaviorSubject para almacenar y gestionar el estado de las tareas.
 */
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  // Subject que almacena las tareas actuales
  private tasks$: BehaviorSubject<Task[]>;

  constructor(private http: HttpClient) {
    // Inicializa el BehaviorSubject con tareas de ejemplo
    this.tasks$ = new BehaviorSubject<Task[]>(MOCKTASKS);
  }

  /**
   * Obtiene un observable de las tareas.
   * @returns Un observable que emite la lista de tareas.
   */
  get tasks(): Observable<Task[]> {
    return this.tasks$.asObservable();
  }

  /**
   * Añade una nueva tarea a la lista.
   * @param task - La tarea a añadir.
   */
  addTask(task: Task) {
    const currentTasks = this.tasks$.getValue(); // Obtiene las tareas actuales
    const id = this.getId(currentTasks); // Genera un nuevo ID para la tarea
    const newTask = { ...task, id }; // Crea una nueva tarea con el ID generado
    this.tasks$.next([...currentTasks, newTask]); // Actualiza el BehaviorSubject con la nueva lista de tareas
  }

  /**
   * Obtiene un observable de las tareas.
   * @returns Un observable que emite la lista de tareas.
   */
  getTasks(): Observable<Task[]> {
    return this.tasks$.asObservable(); // Retorna el observable de tareas
  }

  /**
   * Actualiza una tarea existente.
   * @param updatedTask - La tarea con los cambios aplicados.
   */
  updateTask(updatedTask: Task): void {
    const currentTasks = this.tasks$.getValue(); // Obtiene las tareas actuales
    const tasks = currentTasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task // Reemplaza la tarea con los datos actualizados
    );
    this.tasks$.next(tasks); // Actualiza el BehaviorSubject con la lista de tareas actualizada
  }
  

  /**
   * Genera un nuevo ID para una tarea.
   * @param tasks - Lista actual de tareas.
   * @returns Un ID único para la nueva tarea.
   */
  private getId(tasks: Task[]): number {
    return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1; // Genera un ID único basado en las tareas existentes
  }
}
