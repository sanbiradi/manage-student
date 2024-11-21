import { createReducer, on } from '@ngrx/store';
import { addStudent, editStudent, deleteStudent } from './student.actions';
import { initialState } from './student.model';

export const studentReducer = createReducer(
  initialState,

  // Add student
  on(addStudent, (state, { student }) => ({
    ...state,
    students: [...state.students, student]
  })),

  // Edit student
  on(editStudent, (state, { student }) => ({
    ...state,
    students: state.students.map((s) =>
      s.id === student.id ? { ...s, ...student } : s
    )
  })),

  // Delete student
  on(deleteStudent, (state, { studentId }) => ({
    ...state,
    students: state.students.filter((s) => s.id !== studentId)
  })),
  
);
