import { Component, inject, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
import { SidebarModule } from 'primeng/sidebar';
import { RippleModule } from 'primeng/ripple';
import { PanelModule } from 'primeng/panel';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { FormapagoComponent } from '../tabla/auxiliares/formaPago/formapago/formapago.component';
import { TabViewModule } from 'primeng/tabview';
import { CommonModule } from '@angular/common';
import { CategoriaComponent } from "../../modules/inventario/categoria/categoria.component";
import { BodegaComponent } from "../../modules/inventario/bodega/bodega.component";

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [
    DialogModule,
    AccordionModule,
    SidebarModule,
    RippleModule,
    PanelModule,
    FormapagoComponent,
    TabViewModule,
    CommonModule,
    CategoriaComponent,
    BodegaComponent
],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.css',
  providers: [Router],
})
export class ConfiguracionComponent implements OnInit {
  visible = false;
  seccion = 'general';
  subSeccion: string = '';
  isRouted = false;

  private router = inject(Router);

  ngOnInit(): void {
    // Suscribirse a los eventos de navegación
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        // Aquí defines cuándo mostrar el <router-outlet>
        this.isRouted = event.url !== '/'; // Ejemplo: Mostrar en cualquier ruta distinta a la raíz '/'
      });
  }

  toggle() {
    this.visible = !this.visible;
  }

  cambiarSeccion(nuevaSeccion: string): void {
    this.seccion = nuevaSeccion;
    this.subSeccion = '';
  }

  cambiarSubSeccion(nuevaSubSeccion: string): void {
    this.subSeccion = nuevaSubSeccion;
  }

  ejecutarCambioVista(): void {
    switch (this.seccion) {
      case 'general':
        this.seccion = 'general'        
        break;
      case 'contabilidad':
        this.seccion = 'contabilidad'
        if (this.subSeccion === 'formapago') {
          this.subSeccion = 'formapago'
        }
        break;
      case 'inventario':
        this.seccion = 'inventario'
        if (this.subSeccion === 'categoria') {
          this.subSeccion = 'categoria'
        }
        if (this.subSeccion === 'bodega') {
          this.subSeccion = 'bodega'
        }
        break;
    
      default:
        break;
    }
  }
}
