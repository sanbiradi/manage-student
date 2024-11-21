import { Routes } from '@angular/router';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentTableComponent } from './student-table/student-table.component';

export const routes: Routes = [
    { path: '', redirectTo: 'student-table', pathMatch: 'full' },
    { path: 'student-form/:id', component: StudentFormComponent, pathMatch: 'full' },
    { path: 'student-form', component: StudentFormComponent, pathMatch: 'full' },
    { path: 'student-table', component: StudentTableComponent }
];
