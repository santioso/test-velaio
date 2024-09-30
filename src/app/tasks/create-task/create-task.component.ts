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
  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      id: [''],
      title: ['', [Validators.required, Validators.minLength(5)]],
      completed: [false],
      deadline: ['', Validators.required],
      persons: this.fb.array([], [this.uniquePersonsValidator, this.minPersonsValidator(1)]),
    });
  }

  get persons() {
    return this.taskForm.get('persons') as FormArray;
  }

  addPerson() {
    const personForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(5)]],
      age: ['', [Validators.required, Validators.min(18)]],
      skills: this.fb.array([], [this.minSkillsValidator(1)]),
    });
    this.persons.push(personForm);
  }


  removePerson(index: number) {
    this.persons.removeAt(index);
  }

  getSkills(personIndex: number) {
    return (this.persons.at(personIndex).get('skills') as FormArray);
  }

  addSkill(personIndex: number) {
    const skillsArray = this.getSkills(personIndex);
    skillsArray.push(this.fb.group({
      name: ['', Validators.required]
    }));
  }

  removeSkill(personIndex: number, skillIndex: number) {
    this.getSkills(personIndex).removeAt(skillIndex);
  }

  submitTask1() {
    if (this.taskForm.valid) {
      this.taskService.addTask(this.taskForm.value);
      this.taskForm.reset();
    }
  }

  submitTask() {
    if (this.taskForm.valid) {
      // Convertir la fecha de deadline al formato ISO
      const taskData = {
        ...this.taskForm.value,
        deadline: new Date(this.taskForm.value.deadline).toISOString(),
      };
      this.taskService.addTask(taskData);
      this.taskForm.reset();
      Swal.fire({
        title: 'Tarea guardada',
        text: 'La tarea se guardó correctamente!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al guardar la tarea.' ,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }


  // Validaciones personalizadas

  /**
   *
   * @param control
   * @returns
   * Validador personalizado para verificar que no se dupliquen los nombres de las personas en la misma tarea
   */
  uniquePersonsValidator(control: AbstractControl): ValidationErrors | null {
    const personsArray = control as FormArray;
    const names = personsArray.controls.map(person => person.get('fullName')?.value);
    const duplicates = names.filter((name, index) => names.indexOf(name) !== index);
    return duplicates.length > 0 ? { duplicateNames: true } : null; // Devuelve un error si hay duplicados
  }

  /**
   *
   * @param min
   * @returns
   * Validador personalizado para verificar que haya al menos 'min' personas para cada tarea
   */
  minPersonsValidator(min: number) {
    return (formArray: AbstractControl) => {
      const array = formArray as FormArray;
      return array.length >= min ? null : { minPersons: true };
    };
  }

  /**
   *
   * @param min
   * @returns
   * Validador personalizado para verificar que haya al menos 'min' habilidades
   */
  minSkillsValidator(min: number) {
    return (formArray: AbstractControl) => {
      const array = formArray as FormArray;
      return array.length >= min ? null : { minSkills: true };
    };
  }



}
