import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addStudent, editStudent } from '../store/student.actions';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { selectStudentById } from '../store/student.selector';
import { Student } from '../store/student.state';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [MatIconModule, RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, ReactiveFormsModule, NgIf],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.scss'
})
export class StudentFormComponent implements OnInit {

  studentForm: FormGroup;
  isEditing: Boolean = false;
  student$!: Observable<Student | undefined>;
  constructor(private fb: FormBuilder, private store: Store<any>, private router: Router, private activatedRoute: ActivatedRoute) {
    this.studentForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      gender: ['', Validators.required]
    });
  }

  ngOnInit() {
    const studentId = this.activatedRoute.snapshot.paramMap.get('id');
    if (studentId) {
      this.student$ = this.store.select(selectStudentById(studentId))
      this.student$.subscribe((data: any) => {
        console.log(data)
        if (data) {
          this.isEditing = true;
          this.studentForm.patchValue(data);
        }
      })

    }
  }

  onSubmit() {
    if (this.studentForm.valid) {
      if (this.isEditing) {
        const id = this.studentForm.value.id;
        const udpatedStudent = { ...this.studentForm.value };
        console.log(udpatedStudent)
        this.store.dispatch(editStudent({ student: udpatedStudent }))
        this.router.navigate(['student-table'])
      } else {
        const newStudent = { id: '', ...this.studentForm.value };
        newStudent.id = uuidv4();
        this.store.dispatch(addStudent({ student: newStudent }));
        this.router.navigate(['student-table'])
        this.studentForm.reset();
      }
    }
  }
}
