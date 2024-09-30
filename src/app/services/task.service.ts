import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Task } from '../models/task.model';
import { HttpClient } from '@angular/common/http';
import { MOCKTASKS } from '../mocks/task.mock';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks$: BehaviorSubject<Task[]>; // Inicializa con un arreglo vacío

  apiUrl= 'https://jsonplaceholder.typicode.com/todos/'

constructor(
  private http: HttpClient
){
  this.tasks$ = new BehaviorSubject<Task[]>(MOCKTASKS);
}

  // Obtiene el observable de tareas
  get tasks(): Observable<Task[]> {
    return this.tasks$.asObservable();
  }

  // Agrega una nueva tarea al arreglo local
  addTask(task: Task) {
    const currentTasks = this.tasks$.getValue(); // Obtiene las tareas actuales
    const id = this.getId(currentTasks); // Obtiene el siguiente id
    const newTask = { ...task, id }; // Asignar el nuevo ID a la tarea
    this.tasks$.next([...currentTasks, newTask]); // Actualiza el observable con la nueva tarea

    console.log('this.tasks$', this.tasks$)
  }

    // Obtiene las tareas.
    getTasks(): Observable<Task[]> {
      return this.tasks$.asObservable(); // Devuelve el observable directamente
    }

  // Actualiza una tarea existente
  updateTask(updatedTask: Task): void {
    const currentTasks = this.tasks$.getValue();
    const tasks = currentTasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    this.tasks$.next(tasks); // Actualiza el observable con la tarea modificada
  }

  markTaskAsCompleted(id: number) {
    const tasks = this.tasks$.getValue().map(t =>
      t.id === id ? { ...t, completed: true } : t
    );
    this.tasks$.next(tasks);
  }

   // Filtra las tareas según su estado
   filterTasks(completed: boolean): Task[] {
    return this.tasks$.getValue().filter(task => task.completed === completed);
  }

  private getId(tasks: Task[]): number {
    return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
  }
}
