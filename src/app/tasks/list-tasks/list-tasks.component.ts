import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Person, Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

export type TaskFilter = 'all' | 'completed' | 'pending';

@Component({
  selector: 'app-list-tasks',
  standalone: true,
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss'],
  imports: [CommonModule]
})

/**
 * Componente que muestra una lista de tareas.
 * Permite filtrar las tareas por estado (todas, completadas, pendientes).
 */
export class ListTasksComponent implements OnInit {
  tasks: Task[] = [];
  currentFilter: TaskFilter = 'pending';

  /**
   * Constructor del componente.
   * @param taskService Servicio para gestionar las tareas.
   */
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  /**
   * Obtiene la lista de tareas desde el servicio y la almacena en el array 'tasks'.
   */
  getTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  /**
   * Alterna el estado de completado de una tarea.
   * @param task La tarea cuya completitud se va a alternar.
   */
  toggleCompletion(task: Task): void {
    task.completed = !task.completed;
    this.taskService.updateTask(task);
  }

  /**
   * Filtra las tareas según el filtro actual.
   * @returns Un array de tareas que coincide con el filtro aplicado.
   */
  filterTasks() {
    if (this.currentFilter === 'all') {
      return this.tasks;
    } else if (this.currentFilter === 'completed') {
      return this.tasks.filter(task => task.completed);
    } else if (this.currentFilter === 'pending') {
      return this.tasks.filter(task => !task.completed);
    }
    return this.tasks;
  }

  /**
   * Establece el filtro actual para las tareas.
   * @param filter El filtro que se va a aplicar.
   */
  setFilter(filter: TaskFilter) {
    this.currentFilter = filter;
  }

  /**
   * Convierte las habilidades de una persona en una cadena separada por comas.
   * @param person La persona cuyas habilidades se van a convertir.
   * @returns Una cadena con las habilidades de la persona separadas por coma.
   */
  getSkillsAsString(person: Person): string {
    return person.skills ? person.skills.map(skill => skill.name).join(', ') : '';
  }
}
