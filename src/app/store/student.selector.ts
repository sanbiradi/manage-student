import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StudentState } from "./student.model";

const selectStudentState = createFeatureSelector<StudentState>("studentState");
export const selectStudentById = (studentId: any) =>
    createSelector(selectStudentState, (state) =>
      state.students.find((student) => student.id === studentId)
    );