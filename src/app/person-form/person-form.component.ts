import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlContainer,
  FormArray,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { HttpClientModule } from "@angular/common/http";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class PersonFormComponent {
  @Input() personIndex!: number;

  constructor(private fb: FormBuilder, private rootFormGroup: FormGroupDirective) {}

  /**
   * Obtiene el formulario de persona correspondiente al índice actual.
   * @returns {FormGroup} El FormGroup correspondiente a la persona.
   */
  get personForm(): FormGroup {
    return this.rootFormGroup.control.get('persons')?.get(this.personIndex.toString()) as FormGroup;
  }

  /**
   * Obtiene el FormArray de habilidades del formulario de persona.
   * @returns {FormArray} El FormArray que contiene las habilidades de la persona.
   */
  getSkills(): FormArray {
    return this.personForm.get('skills') as FormArray;
  }

  /**
   * Agrega un nuevo grupo de controles de habilidades al FormArray de habilidades.
   */
  addSkill() {
    const skillsArray = this.getSkills();
    skillsArray.push(this.fb.group({
      name: ['', Validators.required] 
    }));
  }

  /**
   * Elimina una habilidad del FormArray de habilidades basado en el índice.
   * @param {number} skillIndex - Índice de la habilidad que se va a eliminar.
   */
  removeSkill(skillIndex: number) {
    this.getSkills().removeAt(skillIndex);
  }

  /**
   * Elimina el formulario de persona de la lista principal de personas.
   */
  removePerson() {
    (this.rootFormGroup.control.get('persons') as FormArray).removeAt(this.personIndex);
  }
}
