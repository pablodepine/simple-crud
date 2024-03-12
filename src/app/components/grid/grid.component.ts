import { Component, OnInit } from '@angular/core';
import { FuncionariosService } from '../../services/funcionarios.service';
import { Subscription, elementAt, map } from 'rxjs';
import { Funcionario } from '../../models/funcionario';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';

declare var bootstrap: any;

type Operation = 'ADICIONADO' | 'EXCLUÍDO' | 'EDITADO';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
  providers: [FuncionariosService],
})
export class GridComponent implements OnInit {
  private subscription: Subscription = new Subscription();

  showModal: boolean = false;
  modalMode: string = '';
  funcionario!: Funcionario;
  funcionarioParaEditar!: Funcionario;
  funcionarios: Funcionario[] = [];
  operation!: Operation;

  constructor(private funcionariosService: FuncionariosService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.funcionariosService.getFuncionarios().subscribe({
        next: (res) => {
          if (res) {
            this.funcionarios = res;
          }
        },
        error: (err) => {
          console.error('Erro ao buscar funcionários:', err);
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  adicionarFuncionario() {
    this.modalMode = 'ADICIONAR';
    this.showModal = true;
  }

  editarFuncionario(dadosFuncionario: Funcionario) {
    this.modalMode = 'EDITAR';
    this.funcionarioParaEditar = dadosFuncionario;
    if (this.funcionarioParaEditar) this.showModal = true;
  }

  excluirFuncionario(idFuncionario: number) {
    this.funcionarios.forEach((element, index) => {
      if (element.id === idFuncionario) {
        this.funcionarios.splice(index, 1);
      }
    });
    this.operation = 'EXCLUÍDO';
    this.mostrarToast();
  }

  recebeDadosFuncionario(dadosFuncionario: Funcionario) {
    this.modalMode !== 'EDITAR'
      ? this.adicionaFuncionario(dadosFuncionario)
      : this.editaFuncionario(dadosFuncionario);
  }

  adicionaFuncionario(dadosFuncionario: Funcionario) {
    let novoId: number;

    novoId = this.funcionarios.length + 1;
    dadosFuncionario.id = novoId;
    this.funcionarios.push(dadosFuncionario);

    this.operation = 'ADICIONADO';
    this.mostrarToast();
  }

  editaFuncionario(dadosFuncionario: Funcionario) {
    this.funcionarios.forEach((element, index) => {
      if (element.id === dadosFuncionario.id) {
        this.funcionarios[index] = dadosFuncionario;
      }
    });

    this.operation = 'EDITADO';
    this.mostrarToast();
  }

  mostrarToast() {
    const toastElement = document.getElementById('toast');
    const toast = new bootstrap.Toast(toastElement);

    toast.show();
  }
}
