import { Component, inject, Input, OnInit } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
// import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { TabViewModule } from 'primeng/tabview';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TagModule } from 'primeng/tag';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';

import { Categoria } from '../../../interface/categoria.interface';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { TableModule } from 'primeng/table';
import { CategoriaService } from '../../../service/categoria.service';
import { FormasDePagoService } from '../../../service/formas-de-pago.service';
import { FormasDePago } from '../../../interface/formas-de-pago.interface';
import { OpenModalClienteService } from '../../../component/cliente/open-modal-cliente.service';
import { Tercero } from '../../../interface/tercero.interface';
import { ProductoService } from '../../../service/product.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { Producto } from '../../../interface/producto.interface';
import { TerceroService } from '../../../service/tercero.service';

@Component({
  selector: 'app-agregarproducto',
  standalone: true,
  imports: [
    DividerModule,
    ReactiveFormsModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    CommonModule,
    ImageModule,
    TabViewModule,
    CascadeSelectModule,
    InputGroupModule,
    InputGroupAddonModule,
    TagModule,
    InputMaskModule,
    InputNumberModule,
    FieldsetModule,
    TableModule,
    ToastModule,
    RippleModule,
  ],
  templateUrl: './agregarproducto.component.html',
  styleUrl: './agregarproducto.component.css',
  providers: [MessageService],
})
export class AgregarproductoComponent implements OnInit {
  producto!: FormGroup;
  visible: boolean = false;
  // uploadedFiles: any[] = [];

  //Objetos
  categorias: Categoria[] = [];
  formasDePago: FormasDePago[] = [];
  clientes: Tercero[] = [];
  @Input() productoRecibo!: Producto;
  @Input() icon: string = '';
  @Input() label: string = '';

  estados: Object[] = [{ estado: 'Activo' }, { estado: 'Inactivo' }];
  unidadesDeMedida = [
    { label: 'Pieza', value: 'pieza' },
    { label: 'Par', value: 'par' },
    { label: 'Docena', value: 'docena' },
    { label: 'Ciento', value: 'ciento' },
    { label: 'Gramo', value: 'gramo' },
    { label: 'Kilogramo', value: 'kilogramo' },
    { label: 'Tonelada', value: 'tonelada' },
    { label: 'Litro', value: 'litro' },
    { label: 'Mililitro', value: 'mililitro' },
    { label: 'Metro cúbico', value: 'metro_cubico' },
    { label: 'Metro', value: 'metro' },
    { label: 'Centímetro', value: 'centimetro' },
    { label: 'Milímetro', value: 'milimetro' },
    { label: 'Pulgada', value: 'pulgada' },
    { label: 'Pie', value: 'pie' },
    { label: 'Yarda', value: 'yarda' },
    { label: 'Metro cuadrado', value: 'metro_cuadrado' },
    { label: 'Hectárea', value: 'hectarea' },
    { label: 'Barril', value: 'barril' },
    { label: 'Galón', value: 'galon' },
    { label: 'Día', value: 'dia' },
    { label: 'Hora', value: 'hora' },
    { label: 'Minuto', value: 'minuto' },
    { label: 'Joule', value: 'joule' },
    { label: 'Kilovatio-hora', value: 'kilovatio_hora' },
  ];

  // servicios
  private _categoriaService = inject(CategoriaService);
  private _formasDePagoService = inject(FormasDePagoService);
  private _openModalClienteService = inject(OpenModalClienteService);
  private _terceroService = inject(TerceroService);
  private _productoService = inject(ProductoService);

  constructor(
    private form: FormBuilder,
    private messageService: MessageService
  ) {
    this.producto = this.form.group({
      id: [''],
      codigo: [''],
      product: [''],
      descrip: [''],
      category: [''],
      marca: [''],
      version: [''],
      stock: [0], // Valor predeterminado 0 si es número
      cantMinStock: [0],
      unidadMedida: [''],
      precioVenta: [0], // Valor predeterminado para precios
      precioCosto: [0],
      precioMayorista: [0],
      margenGanancia: [0],
      iva: [0],
      peso: [0],
      proveedor: [''],
      plazoPago: [''],
      metodoPago: [''],
      estado: [''],
      fechaCreacion: [''], // Fecha actual como valor predeterminado
      imagen: [''],
      qr: [''],
      fechaVencimiento: [''],
      bodega: [''],
      price: [0],
    });
  }
  ngOnInit(): void {
    this._categoriaService.obtenerCategorias().subscribe(
      (res) => {
        this.categorias = res;
      },
      (error) => {
        console.error(error);
      }
    );
    this._formasDePagoService.obtenerFormasDePago().subscribe(
      (res) => {
        this.formasDePago = res;
      },
      (error) => {
        console.error(error);
      }
    );
    this._terceroService.obtenerClientes().subscribe(
      (res) => {
        this.clientes = res;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // onUpload(event: any) {
  //   for (let file of event.files) {
  //     this.uploadedFiles.push(file);
  //   }
  // }

  showDialog() {
    this.visible = true;
  }

  getSeverity() {
    switch (this.producto.get('estado')?.value.estado) {
      case 'Activo':
        return 'success';
      case 'Inactivo':
        return 'danger';
      default:
        return 'secondary';
    }
  }

  openModalCliente() {
    this._openModalClienteService.toggleModal(true);
  }

  guardarProducto() {
    const producto: Producto = this.producto.value;
    console.log(producto);

    this._productoService.saveProduct(producto).subscribe(
      (res) => {
        this.messageService.add({ severity: 'success', summary: 'Producto Guardado', detail: 'El producto ha sido guardado correctamente' });
        this.visible = false;
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Producto No Guardado', detail: 'El producto no ha sido guardado correctamente' });
        console.error(error);
      }
    )
  }
}
