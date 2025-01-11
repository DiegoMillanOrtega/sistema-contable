import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { ProductoService } from '../../../service/product.service';
import { Producto } from '../../../interface/producto.interface';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProgressBarModule } from 'primeng/progressbar';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { SortEvent } from 'primeng/api/sortevent';
import { AgregarproductoComponent } from '../agregarproducto/agregarproducto.component';
import { MenuModule } from 'primeng/menu';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
// import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { DatosFService } from '../../../serviceComponents/datos-f.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TablaComponent } from "../../../component/tabla/tabla/tabla.component";
import { Router } from '@angular/router';

interface Estado {
  severity: string;
  value: string;
}
interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    TableModule,
    TagModule,
    RatingModule,
    DropdownModule,
    ButtonModule,
    HttpClientModule,
    FormsModule,
    ProgressBarModule,
    MultiSelectModule,
    InputTextModule,
    CommonModule,
    MenuModule,
    DialogModule,
    ToolbarModule,
    ToastModule,
    ProgressSpinnerModule,
    TablaComponent
],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  providers: [MessageService, ConfirmationService, DatosFService],
})
export class ProductsComponent implements OnInit {
  @ViewChild('dt1') dt!: Table;
  

  private _productoService = inject(ProductoService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  private _datosFService = inject(DatosFService);
  private _router = inject(Router);

  modo: string = 'tabla';
  productos!: Producto[];
  initialValue!: Producto[];
  ProductosSeleccionados!: Producto[] | null;

  producto!: any;
  items: MenuItem[] | undefined;
  searchValue: string | undefined;
  loading: boolean = true;
  isSorted: any = null;
  estado!: Estado;

  mainColumns: { field: string; header: string; object?: boolean; objectKey?: string }[] = [
    { field: 'codigo', header: 'Código' },
    { field: 'producto', header: 'Producto' },
    { field: 'categoria', header: 'Categoria', object: true, objectKey: 'category' },
    { field: 'bodega', header: 'Bodega' },
    { field: 'stock', header: 'Existencias' },
    { field: 'unidadMedida', header: 'UND' },
    { field: 'estado', header: 'Estado' },


  ]
  optionalColumns: { field: string; header: string }[] = [
    { field: 'precioVenta', header: 'Precio Venta' },
    { field: 'precioCosto', header: 'Precio Costo' },
    { field: 'descrip', header: 'Descripción' },
    { field: 'imagen', header: 'Imagen' },
    { field: 'iva', header: 'IVA' },
    { field: 'marca', header: 'Marca' },
    { field: 'version', header: 'Version' },
    { field: 'fechaVencimiento', header: 'Fecha de Vencimiento' },
    { field: 'proveedor.nombreCompleto', header: 'Proveedor' },
    { field: 'descripcion', header: 'Descripción' },
  ]
  fieldsFilter: string[] = ['codigo', 'producto', 'categoria.category', 'bodega', 'stock', 'unidadMedida', 'estado'];

  ngOnInit(): void {
    this._productoService.getProductoList().subscribe((res) => {
      this.productos = res;
      this.initialValue = [...this.productos];
      this.loading = false;
    });
  }

  agregarProducto() {
    this._router.navigate(['/inventario/agregar-producto']);
  }


  
}
