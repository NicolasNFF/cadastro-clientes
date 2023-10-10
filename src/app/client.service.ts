import { Injectable } from '@angular/core';
import { Client } from './models/client';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {


  client : Client[] = [];
  baseUrl: string = "http://localhost:3000/client";

  constructor(private http: HttpClient) {

   }

  getClient():Observable<Client[]>{//Serviço para visualizar o cliente
    return this.http.get<Client[]>(this.baseUrl);
  }

  save(client: Client): Observable<Client>{ // Serviço que esta salvando cliente
    return this.http.post<Client>(this.baseUrl, client);
  }

  update(client: Client): Observable<Client>{ // Serviço para atualizar os dados do cadastrado de clientes ao Editar
    let url = `${this.baseUrl}/${client.id}`;
    return this.http.put<Client>(url, client);
  }

  delete(client: Client):Observable<void> {
    let url = `${this.baseUrl}/${client.id}`;
    return this.http.delete<void>(url); // Serviço para remover o cadastro do cliente
  }
 }

