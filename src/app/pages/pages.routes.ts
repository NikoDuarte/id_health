import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
/***************************/
//? -_ Guards
import { AuthGuard } from '../guards/auth.guard';
/***************************/
//? -_ Components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ProductosComponent } from './productos/productos.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
            {
                path: 'home',
                component: DashboardComponent,
                data: { title: 'Inicio' }
            },
            {
                path: 'users',
                component: UsuariosComponent,
                data: { title: 'Usuarios' }
            },
            {
                path: 'categorys',
                component: CategoriasComponent,
                data: { title: 'Categorias' }
            },
            {
                path: 'products',
                component: ProductosComponent,
                data: { title: 'Productos' }
            },
            {
                path: 'search-global',
                component: SearchComponent,
                data: { title: 'Busqueda global' }
            },
            {
                path: '',
                redirectTo: '/dashboard/home',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
