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
  private tasks$: BehaviorSubject<Task[]>;

  constructor(private http: HttpClient) {
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
    const currentTasks = this.tasks$.getValue();
    const id = this.getId(currentTasks);
    const newTask = { ...task, id };
    this.tasks$.next([...currentTasks, newTask]);
  }

  /**
   * Obtiene un observable de las tareas.
   * @returns Un observable que emite la lista de tareas.
   */
  getTasks(): Observable<Task[]> {
    return this.tasks$.asObservable();
  }

  /**
   * Actualiza una tarea existente.
   * @param updatedTask - La tarea con los cambios aplicados.
   */
  updateTask(updatedTask: Task): void {
    const currentTasks = this.tasks$.getValue();
    const tasks = currentTasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    this.tasks$.next(tasks);
  }


  /**
   * Genera un nuevo ID para una tarea.
   * @param tasks - Lista actual de tareas.
   * @returns Un ID único para la nueva tarea.
   */
  private getId(tasks: Task[]): number {
    return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1; 
  }
}
