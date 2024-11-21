import { Student } from "./student.state";

export interface StudentState {
  students: Student[];
}

export const initialState: StudentState = {
  students: []
};
