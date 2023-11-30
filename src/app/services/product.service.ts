import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient : HttpClient) { }

  //Returns and observable
  //Map the JSON data from Spring Data REST to product array
  getProductList(categoryId : number) : Observable<Product[]> {

    //@TODO need to buld URL based on category id in the backend

    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.products)
    );
  }
}

//Unwraps the JSON from Spring Data REST _embedded entry
interface GetResponse{
  _embedded: {
    products: Product[];
  }
}
