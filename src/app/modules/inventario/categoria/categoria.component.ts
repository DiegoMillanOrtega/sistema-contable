import { Component, inject, OnInit } from '@angular/core';
import { TablaComponent } from '../../../component/tabla/tabla/tabla.component';
import { Categoria } from '../../../interface/categoria.interface';
import { CategoriaService } from '../../../service/categoria.service';
import { finalize } from 'rxjs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [
    TablaComponent,
    ProgressSpinnerModule,
    CommonModule,
    DialogModule,
    ReactiveFormsModule,
    PanelModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule
  ],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css',
  providers: [CategoriaService, MessageService, ConfirmationService],
})
export class CategoriaComponent implements OnInit {
  //Variables
  loading = true;
  visibleModal = false;
  modo!: string;
  headerModal: string = '';

  //Objetos
  categorias: Categoria[] = [];
  categoriaForm!: FormGroup;
  mainColumns: { field: string; header: string }[] = [
    { field: 'codigo', header: 'Codigo' },
    { field: 'category', header: 'Categoria' },
    { field: 'descrip', header: 'Descripción' },
  ];
  fieldsFilter: string[] = ['id', 'category'];

  // Servicios
  private _categoriaService = inject(CategoriaService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  private form = inject(FormBuilder);

  constructor() {
    this.categoriaForm = this.form.group({
      id: [''],
      codigo: [''],
      category: [''],
      descrip: [''],
    });
  }

  ngOnInit(): void {
    this._categoriaService
      .obtenerCategorias()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        (res) => {
          this.categorias = res;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  abrirModalGuardarCategoria() {
    this.categoriaForm.reset();
    this.modo = 'agregar';
    this.headerModal = 'Agregar nueva Categoria';
    this.visibleModal = true;
  }

  eliminarCategoria(categoria: Categoria) {
    this.confirmationService.confirm({
      message:
        '¿Estás seguro de que deseas eliminar esta categoria? Esta acción no se puede deshacer.',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Eliminar',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept: () => {
        this.loading = true;
        this._categoriaService
          .eliminarCategoria(categoria.id)
          .pipe(
            finalize(() => {
              this.loading = false;
            })
          )
          .subscribe(
            (res) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Categoria Eliminada',
                detail: 'La categoria ha sido eliminada correctamente',
              });
              this.categorias = this.categorias.filter(
                (val) => val.id !== categoria.id
              );
            },
            (error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Categoria No Eliminada',
                detail: error.error.message
                  ? error.error.message
                  : 'Hubo un error al eliminar la categoria',
              });
              console.log(error);
              
            }
          );
      },
    });
  }

  guardarCategoria() {
    let msgExitoso: string = '';
    let msgError: string = '';
    this.visibleModal = false;
    this.loading = true;

    if (this.modo === 'editar') {
      msgExitoso = 'La categoria ha sido editada correctamente';
      msgError = 'Hubo un error al editar la categoria';
    }
    if (this.modo === 'agregar') {
      msgExitoso = 'La categoria ha sido agregada correctamente';
      msgError = 'Hubo un error al agregar la categoria';
    }

    // Habilitar el campo Codigo si es editar
    if (this.modo === 'editar') { this.categoriaForm.get('codigo')?.enable() }
    
    // Validar campos
    if (this.categoriaForm.get('categoria')?.value === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El campo Categoria es obligatorio',
      });
      this.categoriaForm.get('categoria')?.setErrors({ required: true });
      return;
    }

    this._categoriaService
      .guardarCategoria(this.categoriaForm.value)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Categoria Guardada',
            detail: msgExitoso,
          });
          this.categorias = [...this.categorias, res];
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Categoria No Guardada',
            detail: msgError,
          });
        }
      );
  }
  
  editarCategoria(categoria: Categoria) {
    this.categoriaForm.patchValue(categoria);
    this.categoriaForm.get('codigo')?.disable()
    this.modo = 'editar';
    this.headerModal = 'Editar Categoria ' + categoria.category;
    this.visibleModal = true;
  }

  editarCategoria1(categoria: Categoria) {
    this.loading = true;
    this._categoriaService
      .guardarCategoria(categoria)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Categoria Guardada',
            detail: 'La categoria ha sido guardada correctamente',
          });
          this.categorias = [...this.categorias, res];
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Categoria No Guardada',
            detail: error.error.message
              ? error.error.message
              : 'Hubo un error al guardar la categoria',
          });
        }
      );
  }
}
