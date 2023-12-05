import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){ //if this is true
      this.handleSearchProduct();
    }else{
      this.handleListProducts();
    }
  }

  handleListProducts() {
    //Check if "id" parameter is available
    //snapshot -> state of route at this given moment
    //paramMap -> Map of all the route parameters
    //has -> read the id parameter
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      //get the "id" param string, convert string to a number using the symbol "+"
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      //default to category 1
      this.currentCategoryId = 1;
    }

    //get the product by category id
    this.productService
      .getProductList(this.currentCategoryId)
      .subscribe((data) => {
        this.products = data;
      });
  }

  handleSearchProduct(){

    const theKeyWord: String = this.route.snapshot.paramMap.get('keyword')!;

    //searching the product by keyword
    this.productService.searchProduct(theKeyWord).subscribe((data) => {
      this.products = data;
    });

  }

}
