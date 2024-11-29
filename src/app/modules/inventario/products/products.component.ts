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
    CurrencyPipe,
    DropdownModule,
    ButtonModule,
    HttpClientModule,
    FormsModule,
    ProgressBarModule,
    MultiSelectModule,
    InputTextModule,
    CommonModule,
    AgregarproductoComponent,
    MenuModule,
    DialogModule,
    ToolbarModule,
    ToastModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  providers: [MessageService, ConfirmationService, DatosFService],
})
export class ProductsComponent implements OnInit {
  @ViewChild('dt1') dt!: Table;
  @ViewChild('agregarProducto') agregarProducto!: AgregarproductoComponent;

  private _productoService = inject(ProductoService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  private _datosFService = inject(DatosFService);

  productos!: Producto[];
  initialValue!: Producto[];
  ProductosSeleccionados!: Producto[] | null;

  producto!: any;
  items: MenuItem[] | undefined;
  searchValue: string | undefined;
  loading: boolean = true;
  isSorted: any = null;
  estado!: Estado;

  cols!: Column[];
  _selectedColumns!: Column[];

  ngOnInit(): void {
    this._productoService.getProductoList().subscribe((res) => {
      this.productos = res;
      this.initialValue = [...this.productos];
      this.loading = false;
      console.log(this.productos);
    });

    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Editar',
            icon: 'pi pi-pencil',
            command: () => {
              console.log('Editar');
            },
          },
          {
            label: 'Eliminar',
            icon: 'pi pi-trash',
            command: () => {
              console.log('Eliminar');
            },
          },
        ],
      },
    ];

    this.cols = [
      { field: 'marca', header: 'Marca' },
      { field: 'version', header: 'Version' },
      { field: 'precioVenta', header: 'Precio Venta' },
      { field: 'iva', header: 'IVA' },
      { field: 'imagen', header: 'Imagen' },
      { field: 'bodega', header: 'Bodega' },
      { field: 'precioCosto', header: 'Precio Costo' },
      { field: 'descrip', header: 'Descripción' },
    ];
  }

  get selectedColumns(): Column[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: Column[]) {
    //restore original order
    this._selectedColumns = this.cols.filter((col) => val.includes(col));
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }
  customSort(event: SortEvent) {
    if (this.isSorted == null || this.isSorted === undefined) {
      this.isSorted = true;
      this.sortTableData(event);
    } else if (this.isSorted == true) {
      this.isSorted = false;
      this.sortTableData(event);
    } else if (this.isSorted == false) {
      this.isSorted = null;
      this.productos = [...this.initialValue];
      this.dt.reset();
    }
  }
  sortTableData(event: any) {
    event.data.sort((data1: any, data2: any) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;
      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return event.order * result;
    });
  }
  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'success';
    }
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productos = this.productos.filter(
          (val) => !this.ProductosSeleccionados?.includes(val)
        );
        this.ProductosSeleccionados = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
          life: 3000,
        });
      },
    });
  }

  editProduct(producto: Producto) {
    this.agregarProducto.producto.reset();
    this.agregarProducto.producto.setValue(producto);
    this.agregarProducto.showDialog();
  }

  deleteProduct(producto: Producto) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + producto.product + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productos = this.productos.filter((val) => val.id !== producto.id);
        this.producto = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted',
          life: 3000,
        });
      },
    });
  }
}
