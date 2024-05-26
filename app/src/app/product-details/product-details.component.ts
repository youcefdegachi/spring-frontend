import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

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
  // image:string="";
  pid = 2;
  public productdata: any;

  constructor(
    private _productdetailsService: ProductService,
    private domSanitizer: DomSanitizer,
    private productService: ProductService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.pid = this._route.snapshot.params['id'];

    this.productService.getProductById(this.pid).subscribe((data) => {
      this.productdata = data;
      console.log(data);
      
      this.pname = this.productdata.pname
      this.qtestock = this.productdata.qtestock
      this.couleur = this.productdata.couleur
      this.pdatepost = this.productdata.pdatepost
      this.puart = this.productdata.puart
      this.desart = this.productdata.desart
      // this.image=this.productdata.image

      
      

    })
  }


}
