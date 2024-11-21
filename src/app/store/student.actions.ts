import { createAction, props } from '@ngrx/store';
import { Student } from './student.state';

// Add a student
export const addStudent = createAction(
  '[Student] Add Student',
  props<{ student: Student }>()
);

// Edit a student
export const editStudent = createAction(
  '[Student] Edit Student',
  props<{student: Student }>()
);

// Delete a student
export const deleteStudent = createAction(
  '[Student] Delete Student',
  props<{ studentId: string }>()
);

