
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MultiSelect, MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [
    TableModule,
    MultiSelectModule,
    FormsModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    MenuModule,
    ToastModule
  ],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css',
})
export class TablaComponent implements OnInit {
  @Input() data: any[] = []; // Datos de la tabla
  @Input() mainColumns: { field: string; header: string }[] = []; // Columnas principales, siempre visibles
  @Input() optionalColumns: { field: string; header: string }[] = []; // Columnas opcionales, seleccionables
  @Input() tableTitle: string = 'Tabla de Datos'; // Título de la tabla
  @Input() globalFilterFields: string[] = []; // Campos para el filtro global
  @Input() filas: number = 5; // Número de filas por página
  @Input() filasPorPagina: number[] = [5, 10, 15]; // Número de filas por página
  @Input() btnAgregarData: boolean = false; // Indica si se debe agregar un nuevo registro
  @Input() inputSearch: boolean = false; // Indica si se debe mostrar un campo de búsqueda
  @Input() exportarData: boolean = false; // Indica si se debe exportar los datos
  @Input() resizableColumns: boolean = true; // Indica si se debe redimensionar las columnas
  @Output() editarDataEvent = new EventEmitter<any>(); // Evento para emitir datos cuando se edita un registro
  @Output() eliminarDataEvent = new EventEmitter<any>(); // Evento para emitir datos cuando se elimina un registro

  @Output() agregarDataEvent = new EventEmitter<any>(); // Evento para emitir datos cuando se agrega un nuevo registro
  @Output() exportarDataEvent = new EventEmitter<any>(); // Evento para emitir datos a exportar

  selectedOptionalColumns = [...this.optionalColumns]; // Inicialmente muestra todas las opcionales
  selectedRows: any[] = [];
  searchValue: string = '';


  ngOnInit(): void {
    console.log(this.data)
  }
  // Método de edición de fila
  editRow(rowData: any) {
    this.editarDataEvent.emit(rowData);
    // Implementa la lógica de edición
  }

  // Método de eliminación de fila
  deleteRow(rowData: any) {
    this.eliminarDataEvent.emit(rowData);
    // Implementa la lógica de eliminación
  }

  agregarData() {
    this.agregarDataEvent.emit();
  }

  onKeydown(event: any) {
    console.log('holaa')
    if (event.key === 'Tab') {
      event.preventDefault();
      this.exportarDataTable();
    }
  }
  
  exportarDataTable() {
    if (this.exportarData) {
      this.exportarDataEvent.emit();
    }
    console.log(this.selectedRows);
    

  }
}
