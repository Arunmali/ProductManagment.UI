import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListProductComponent } from './product/list-product/list-product.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ListProductComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ProductManagment.UI';
}
