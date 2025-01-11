import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { ProductsComponent } from './modules/inventario/products/products.component';
import { RegistroComponent } from './component/registro/registro.component';
import { FormapagoComponent } from './component/tabla/auxiliares/formaPago/formapago/formapago.component';
import { TerceroComponent } from './component/tercero/tercero.component';
import { AgregarTerceroComponent } from './component/tercero/agregar-tercero/agregar-tercero.component';
import { AgregarproductoComponent } from './modules/inventario/agregarproducto/agregarproducto.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'productos',
    component: ProductsComponent,
    canActivate: [AuthGuard],
    data: { title: 'Productos' },
  },
  { path: 'tablas/auxiliares/formapago', component: FormapagoComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'tercero/terceros', component: TerceroComponent, data: { title: 'Terceros' }, canActivate: [AuthGuard] },
  { path: 'tercero/agregar-tercero', component: AgregarTerceroComponent, data: { title: 'Agregar Tercero' }, canActivate: [AuthGuard] },
  { path: 'inventario/productos', component: ProductsComponent, data: { title: 'Productos' }, canActivate: [AuthGuard] },
  { path: 'inventario/agregar-producto', component: AgregarproductoComponent, data: { title: 'Agregar Producto' }, canActivate: [AuthGuard] },
];
