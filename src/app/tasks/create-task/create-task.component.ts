import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

/**
 * Componente para crear tareas.
 * Permite agregar personas a una tarea, asignarles habilidades y establecer una fecha límite.
 */
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
})
export class CreateTaskComponent {
  taskForm: FormGroup; // Formulario de la tarea

  /**
   * Constructor del componente.
   * Inicializa el formulario con los campos necesarios.
   * @param fb - FormBuilder para crear formularios reactivos
   * @param taskService - Servicio para gestionar tareas
   */
  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      id: [''], // ID de la tarea
      title: ['', [Validators.required, Validators.minLength(5)]], // Título de la tarea
      completed: [false], // Estado de la tarea (completada o no)
      deadline: ['', Validators.required], // Fecha límite de la tarea
      persons: this.fb.array([], [this.uniquePersonsValidator, this.minPersonsValidator(1)]), // Lista de personas asociadas a la tarea
    });
  }

  /**
   * Getter para acceder al formulario de personas.
   * @returns FormArray de personas
   */
  get persons() {
    return this.taskForm.get('persons') as FormArray;
  }

  /**
   * Agrega un nuevo formulario de persona al formulario de la tarea.
   */
  addPerson() {
    const personForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(5)]], // Nombre completo de la persona
      age: ['', [Validators.required, Validators.min(18)]], // Edad de la persona
      skills: this.fb.array([], [this.minSkillsValidator(1)]), // Lista de habilidades de la persona
    });
    this.persons.push(personForm); // Añade el formulario de persona al FormArray
  }

  /**
   * Elimina un formulario de persona del formulario de la tarea.
   * @param index - Índice de la persona a eliminar
   */
  removePerson(index: number) {
    this.persons.removeAt(index); // Remueve la persona del FormArray
  }

  /**
   * Obtiene el formulario de habilidades de una persona específica.
   * @param personIndex - Índice de la persona
   * @returns FormArray de habilidades
   */
  getSkills(personIndex: number) {
    return (this.persons.at(personIndex).get('skills') as FormArray);
  }

  /**
   * Agrega una nueva habilidad al formulario de una persona específica.
   * @param personIndex - Índice de la persona a la que se le añadirá la habilidad
   */
  addSkill(personIndex: number) {
    const skillsArray = this.getSkills(personIndex);
    skillsArray.push(this.fb.group({
      name: ['', Validators.required] // Nombre de la habilidad
    }));
  }

  /**
   * Elimina una habilidad del formulario de una persona específica.
   * @param personIndex - Índice de la persona
   * @param skillIndex - Índice de la habilidad a eliminar
   */
  removeSkill(personIndex: number, skillIndex: number) {
    this.getSkills(personIndex).removeAt(skillIndex); // Remueve la habilidad del FormArray
  }

  /**
   * Envía el formulario de la tarea.
   * Si el formulario es válido, guarda la tarea y muestra una alerta de éxito.
   * Si el formulario no es válido, muestra una alerta de error.
   */
  submitTask() {
    if (this.taskForm.valid) {
      const taskData = {
        ...this.taskForm.value,
        deadline: new Date(this.taskForm.value.deadline).toISOString(), // Formatea la fecha de la tarea
      };
      this.taskService.addTask(taskData); // Agrega la tarea al servicio
    //  this.taskForm.reset(); // Reinicia el formulario
      Swal.fire({
        title: 'Tarea guardada',
        text: 'La tarea se guardó correctamente!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        this.router.navigate(['/list']);
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al guardar la tarea.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }

  // Validaciones personalizadas

  /**
   * Validador personalizado para verificar que no se dupliquen los nombres de las personas en la misma tarea.
   * @param control - Control del formulario
   * @returns Error de validación si hay nombres duplicados, null en caso contrario
   */
  uniquePersonsValidator(control: AbstractControl): ValidationErrors | null {
    const personsArray = control as FormArray;
    const names = personsArray.controls.map(person => person.get('fullName')?.value);
    const duplicates = names.filter((name, index) => names.indexOf(name) !== index);
    return duplicates.length > 0 ? { duplicateNames: true } : null; // Devuelve un error si hay duplicados
  }

  /**
   * Validador personalizado para verificar que haya al menos 'min' personas para cada tarea.
   * @param min - Mínimo requerido de personas
   * @returns Función de validador que verifica el número de personas en el FormArray
   */
  minPersonsValidator(min: number) {
    return (formArray: AbstractControl) => {
      const array = formArray as FormArray;
      return array.length >= min ? null : { minPersons: true }; // Devuelve un error si no hay al menos una persona
    };
  }

  /**
   * Validador personalizado para verificar que haya al menos 'min' habilidades.
   * @param min - Mínimo requerido de habilidades
   * @returns Función de validador que verifica el número de habilidades en el FormArray
   */
  minSkillsValidator(min: number) {
    return (formArray: AbstractControl) => {
      const array = formArray as FormArray;
      return array.length >= min ? null : { minSkills: true }; // Devuelve un error si no hay al menos una habilidad
    };
  }
}
