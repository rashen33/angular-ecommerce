import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient : HttpClient) { }

  //Returns an observable
  //Map the JSON data from Spring Data REST to product array
  getProductList(categoryId : number) : Observable<Product[]> {

    //URL based on category id in the backend
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategories(): Observable<ProductCategory[]>{
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

}

//Unwraps the JSON from Spring Data REST _embedded entry
interface GetResponseProducts{
  _embedded: {
    products: Product[];
  }
}

interface GetResponseProductCategory{
  _embedded: {
    productCategory: ProductCategory[];
  }
}
