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



}
