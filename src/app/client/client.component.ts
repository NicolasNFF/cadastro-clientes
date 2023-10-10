import { ClientService } from './../client.service';
import { Component, OnInit } from '@angular/core';
import { Client } from '../models/client';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit{//OnInit momento de inicialização

  client: Client[] = [];
  formGroupClient : FormGroup;
  isEditing: boolean = false;
  selectedClient: Client = {} as Client; // Guarda o cliente que eu selecionar


  constructor(private clientService: ClientService,
              private formBuilder: FormBuilder
               ){

        this.formGroupClient = formBuilder.group({ //formgrupo salva os dados digitados ao campo
          name: [''],
          rg: [''],
          cpf: [''],
          endereco: [''],
          cep: ['']
        });
  }

  ngOnInit(): void {
    this.clientService.getClient().subscribe(
      {
        next: client => this.client = client
      }

    );
  }

  /* Antigo metodo de salvar
 save(){ //metodo para salvar os elementos(nome, cep, rg,cep,endereço) no json ao aperta no botão "salvar"
    let client = this.formGroupClient.value;
    this.clientService.save(client).subscribe(
      {
        next: client => {
          this.client.push(client);
          this.formGroupClient.reset(); //reseta o formGroup e limpa os input
        }
      }
    )
  }

*/

  save() { //Novo metodo para salvar
    if (this.isEditing) {
      //Atualiza os dados do cliente selecionado
      this.selectedClient.name = this.formGroupClient.get("name")?.value;
      this.selectedClient.rg = this.formGroupClient.get("rg")?.value;
      this.selectedClient.cpf = this.formGroupClient.get("cpf")?.value;
      this.selectedClient.endereco = this.formGroupClient.get("endereco")?.value;
      this.selectedClient.cep = this.formGroupClient.get("cep")?.value;

      this.clientService.update(this.selectedClient).subscribe({
        next: () => {
          this.formGroupClient.reset();
          this.isEditing = false;
        }
      })

    }
    else {
      this.clientService.save(this.formGroupClient.value).subscribe({
        next: client => {
          this.client.push(client);
          this.formGroupClient.reset();
        }
      })
    }
  }


  edit(client: Client){ //metodo para editar o cadastro do cliente selecionado
    this.selectedClient = client;
    this.isEditing = true;
    this.formGroupClient.setValue({ "name": client.name, "rg": client.rg, "cpf": client.cpf, "endereco": client.endereco, "cep": client.cep })
  }

  delete(client: Client){ //metodo para excluir cadastro de cliente para o botão "Remover"
    this.clientService.delete(client).subscribe({
      next: () => {
            this.client =  this.client.filter(p => p.id !== client.id)
      }
    })
  }

  cancel() { //metodo para cancelar a edicação do cadastro do cliente para o botão "Cancelar"
    this.formGroupClient.reset();
    this.isEditing = false;
  }

}
