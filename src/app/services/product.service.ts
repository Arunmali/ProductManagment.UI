import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, distinctUntilChanged, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService{
  
  apiUrl="https://localhost:7114/api/Product/";
  private productListSource=new BehaviorSubject<Product[]|null>(null);
  productList$=this.productListSource.asObservable();

  constructor(private httpClient:HttpClient) { 
    
  }

  getAllProducts(){
    return this.httpClient.get<Product[]>(this.apiUrl+'getAllProducts').pipe(
      map((response=>{
        const productList=response as Product[];  
        this.productListSource.next(productList);      
          return productList; 
      }))
    );
  }

  
  addProduct(data:any){
    return this.httpClient.post<Product>(this.apiUrl,data).pipe(
      map((response=>{
        //const product=response as Product;      
          return response; 
      }))
    );
  }
  editProduct(data:any){
    return this.httpClient.put<Product>(this.apiUrl,data).pipe(
      map((response=>{
        //const product=response as Product;      
          return response; 
      }))
    );
  }
  deleteProduct(id:any){
    return this.httpClient.delete<Product>(this.apiUrl+"?id="+id).pipe(
      map((response=>{
        //const product=response as Product;      
          return response; 
      }))
    );
  }

}
