import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:8081/product";

  constructor(private httpClient: HttpClient) { }

  public addProduct1(productObject: any) {
    return this.httpClient.post<Product>(this.baseUrl + "/add", productObject);
  }

  public getProductById(id:any){
    return this.httpClient.get<Product>(this.baseUrl + "/get/by/id/"+ id)
  }

  public getAllProduct(){
    return this.httpClient.get<Product[]>(this.baseUrl + "/all")
  }
  public deleteProduct(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
}
