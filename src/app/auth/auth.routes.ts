import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
/******************************/
//* |-> Components
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
    {
        path: 'sign-in',
        component: SignInComponent
    },
    {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
