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

    //URL based on category id in the backend
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;

    return this.httpClient.get<GetResponse>(searchUrl).pipe(
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
