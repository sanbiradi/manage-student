import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { Store } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { deleteStudent, editStudent } from '../store/student.actions';
import { StudentState } from '../store/student.model';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-student-table',
  standalone: true,
  imports: [MatTableModule,MatIconModule, AsyncPipe,MatButtonModule,RouterLink],
  templateUrl: './student-table.component.html',
  styleUrl: './student-table.component.scss'
})
export class StudentTableComponent {
  students$: Observable<any>;

  constructor(private store: Store<{ studentState: StudentState }>) {
    this.students$ = this.store.select((state) => state.studentState.students);
    this.students$.subscribe(data=>{
      console.log(data)
    })
  }

  deleteStudent(studentId: string) {
    this.store.dispatch(deleteStudent({ studentId }));
    console.log(studentId)
  }

 
}
