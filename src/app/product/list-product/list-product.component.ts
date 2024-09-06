import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class ListProductComponent implements OnInit{

  products:Product[]=[];
  constructor(private router:Router,private productService:ProductService){}
  ngOnInit(): void {
    this.getProducrList();
  }

  addNew(){
    this.router.navigateByUrl('add-product');
  }

  editProduct(id:any){
    this.router.navigate(['edit-product',id]);
    
  }
  deleteProduct(id:any){
    this.productService.deleteProduct(id).subscribe({
      next:(result:any)=>{
        this.products=result;
      }
    })
  }
  getProducrList(){
    this.productService.getAllProducts().subscribe({
      next:(result:any)=>{
        this.products=result;
      }
    })
  }
}
