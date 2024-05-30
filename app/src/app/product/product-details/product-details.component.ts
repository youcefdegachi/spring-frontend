import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { CommandeService } from '../../service/commande.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Commande } from 'src/app/model/commande';
import { CreateCommandeDTO } from 'src/app/model/CreateCommandeDTO';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  pname = "One Plus 9r";
  couleur = "Patna,Bihar";
  pdatepost = "";
  puart = 20000;
  desart =
    " Operating System: OxygenOS based on Android 11 CPU: Qualcomm® Snapdragon™ 870.. GPU: Adreno 650. RAM: 8GB/12GB";
  qtestock = "";
  image:string="";
  id = 2;
  public productdata: any;

  constructor(
    private _productdetailsService: ProductService,
    private domSanitizer: DomSanitizer,
    private productService: ProductService,
    private _route: ActivatedRoute,
    private commandeService: CommandeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this._route.snapshot.params['art_id'];

    this.productService.getProductById(this.id).subscribe((data) => {
      this.productdata = data;
      console.log(data);
      
      this.pname = this.productdata.pname
      this.qtestock = this.productdata.qtestock
      this.couleur = this.productdata.couleur
      // this.pdatepost = this.productdata.pdatepost
      this.puart = this.productdata.puart
      this.desart = this.productdata.desart
      this.image=this.productdata.image
    })
    
  }
  createCommandeForProduct(clientId: number, numcom: string): void {
    this.commandeService.createCommande(clientId, numcom).subscribe(
      (response) => {
        alert('Order placed successfully!');
        this.router.navigate(['/profile']);
      },
      (error) => {
        console.error('Error placing order', error);
        alert('Failed to place order. Please try again.');
      }
    );
  }
  
  // ngOnInit(): void {
  //   this._route.params.subscribe(params => {
  //     console.log('Route params:', params); // Add this line
  //     this.id = +params['art_id'];  // The + sign converts the string to a number
  //     if (!isNaN(this.id)) {
  //       console.log('Product ID:', this.id); // Add this line
  //       this.fetchProductData(this.id);
  //     } else {
  //       console.error('Invalid product ID:', params['art_id']); // Add this line
  //     }
  //   });
  // }

  // fetchProductData(id: number): void {
  //   this._productdetailsService.getProductById(id).subscribe((data) => {
  //     console.log('Product data:', data); // Add this line
  //     this.productdata = data;
  //     this.pname = this.productdata.pname;
  //     this.qtestock = this.productdata.qtestock;
  //     this.couleur = this.productdata.couleur;
  //     this.puart = this.productdata.puart;
  //     this.desart = this.productdata.desart;
  //   }, error => {
  //     console.error('Error fetching product data', error); // Add this line
  //   });
  // }


}
