import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Person, Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

export type TaskFilter = 'all' | 'completed' | 'pending'; // Agregar 'all'

@Component({
  selector: 'app-list-tasks',
  standalone: true,
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss'],
  imports: [CommonModule]
})

export class ListTasksComponent implements OnInit {
  tasks: Task[] = []; // Almacena las tareas
  currentFilter: TaskFilter = 'pending'; // Valor inicial

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTasks(); // Obtiene las tareas al inicializar el componente
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks; // Asigna las tareas obtenidas al arreglo
      console.log('Tasks:', this.tasks);
    });
  }

  toggleCompletion(task: Task): void {
    task.completed = !task.completed; // Cambia el estado de completado
    this.taskService.updateTask(task); // Actualiza la tarea
  }

  filterTasks() {
    if (this.currentFilter === 'all') {
      return this.tasks; // Mostrar todas las tareas
    } else if (this.currentFilter === 'completed') {
      return this.tasks.filter(task => task.completed);
    } else if (this.currentFilter === 'pending') {
      return this.tasks.filter(task => !task.completed);
    }
    return this.tasks; // Por defecto, devuelve todas las tareas
  }

  setFilter(filter: TaskFilter) {
    this.currentFilter = filter;
    // Lógica para filtrar las tareas
  }

  getSkillsAsString(person: Person): string {
    return person.skills ? person.skills.map(skill => skill.name).join(', ') : '';
  }
}
