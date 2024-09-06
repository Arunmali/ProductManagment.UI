import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule,  ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit{

  action='Save';
  submitted=false;
  productForm!:FormGroup;
 
  product!:Product;

  constructor(private router:Router,private productService:ProductService,private route:ActivatedRoute){
    this.productForm=new FormGroup({
      id:new FormControl(0),
      name:new FormControl('',Validators.required),
      price:new FormControl('',Validators.required),
      quantity:new FormControl('',Validators.required)
    });
   
   
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.getExistingProduct(id);
    }
  }
  get f(): { [key: string]: AbstractControl } {
    return this.productForm.controls;
  }

  onSave(){
    const id = this.route.snapshot.paramMap.get('id');
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
    if(id){
      this.updateProduct(this.productForm.value);
    }
    else{
      this.addNewProduct();
    }
    
  }

  addNewProduct() {
    
    this.product=this.productForm.value;
   
    this.productService.addProduct(this.product).subscribe({
      next:(response:any)=>{
        if(response.statusCode==201){
          this.router.navigateByUrl('list-product');
        }
        
      }
    })
    
  }

  getExistingProduct(id:any)
  {
    this.productService.productList$.subscribe({
      next:(response:any)=>{
        const productList=response as Product[];
        if(productList!=null){
          this.product=productList.find(x=>x.id== parseInt(id))!;
          this.productForm?.get('id')?.setValue(this.product.id);
          this.productForm?.get('name')?.setValue(this.product.name);
          this.productForm?.get('price')?.setValue(this.product.price);
          this.productForm?.get('quantity')?.setValue(this.product.quantity);
        }
      }
    })
  }
  
  updateProduct(product: Product) {
    debugger;
    this.productService.editProduct(product).subscribe({
      next:(response:any)=>{
        if(response.statusCode==200){
          this.router.navigateByUrl('list-product');
        }
        
      }
    })
  }
}
