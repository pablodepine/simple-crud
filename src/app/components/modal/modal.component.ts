import { Funcionario } from './../../models/funcionario';
import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  input,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() funcionarioParaEditar!: Funcionario;
  @Input() display: boolean = false;

  @Output() dadosFuncionario: EventEmitter<Funcionario> = new EventEmitter();
  @Output() close = new EventEmitter<void>();

  dadosFuncionarioForm!: FormGroup;
  funcionario!: Funcionario;

  ngOnInit(): void {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));

    if (!this.funcionarioParaEditar) {
      this.dadosFuncionarioForm = new FormGroup({
        id: new FormControl(''),
        nome: new FormControl('', Validators.required),
        telefone: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        cidade: new FormControl('', Validators.required),
        cargo: new FormControl('', Validators.required),
        endereco: new FormControl('', Validators.required),
      });
    } else {
      this.dadosFuncionarioForm = new FormGroup({
        id: new FormControl(this.funcionarioParaEditar.id),
        nome: new FormControl(
          this.funcionarioParaEditar.nome,
          Validators.required
        ),
        telefone: new FormControl(
          this.funcionarioParaEditar.telefone,
          Validators.required
        ),
        email: new FormControl(
          this.funcionarioParaEditar.email,
          Validators.required
        ),
        cidade: new FormControl(
          this.funcionarioParaEditar.cidade,
          Validators.required
        ),
        cargo: new FormControl(
          this.funcionarioParaEditar.cargo,
          Validators.required
        ),
        endereco: new FormControl(
          this.funcionarioParaEditar.endereco,
          Validators.required
        ),
      });
    }
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape' || event.key === 'Esc') {
      this.close.emit();
    }
  }

  onSubmit() {
    this.dadosFuncionario.emit(this.dadosFuncionarioForm.value);
    this.closeModal();
  }

  closeModal(): void {
    this.close.emit();
  }
}
