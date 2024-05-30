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

  public getAllProduct(){
    return this.httpClient.get<Product[]>(this.baseUrl + "/all")
  }
  getProductById(id: number): Observable<any> {
    console.log(`Fetching product with ID: ${id}`); // Add this line
    // return this.httpClient.get(`${this.baseUrl}/get/by/id/${id}`);
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }

  public deleteProduct(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
}
