import { Component, OnInit } from '@angular/core';
import { FuncionariosService } from '../../services/funcionarios.service';
import { Subscription, map } from 'rxjs';
import { Funcionario } from '../../models/funcionario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
  providers: [FuncionariosService],
})
export class GridComponent implements OnInit {
  funcionarios: Funcionario[] = [];
  private subscription: Subscription = new Subscription();

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

  editarFuncionario(idFuncionario: number) {
    this.funcionarios.forEach((element) => {
      if (element.id === idFuncionario) {
        console.log(element);
      }
    });
  }

  excluirFuncionario(idFuncionario: number) {
    this.funcionarios.forEach((element, index) => {
      if (element.id === idFuncionario) {
        this.funcionarios.splice(index, 1);
      }
    });

    console.log(this.funcionarios);
  }
}
