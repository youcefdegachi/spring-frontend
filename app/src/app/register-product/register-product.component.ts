import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../model/product';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../service/product.service';
import { Observable, Subscriber } from 'rxjs';

export interface Fruit {
  name: string;
}
@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.css']
})
export class RegisterProductComponent implements OnInit {
  productForm: FormGroup;
  productObj: Product = new Product();
  file = [];
  // image:string='';
  // ==========================================

  // ==========================================


  constructor(private _snackBar: MatSnackBar,
    private productService: ProductService) {
    this.productForm = new FormGroup({
      qtestock: new FormControl("", [Validators.required]),
      pname: new FormControl("", [Validators.required]),
      desart: new FormControl("", [Validators.required]),
      puart: new FormControl("", [Validators.required]),
      couleur: new FormControl("", [Validators.required]),
      // image: new FormControl([], Validators.required)
    });
  }

  ngOnInit() {

  }

  handleFileInput(files) {
    this.prepareFilesList(files);
  }
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.file.push(item);
    }
    this.uploadFilesSimulator(0);
  }
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.file.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.file[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.file[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  onClickSubmitForm() {

    if (!this.productForm.invalid) {
      console.log(this.productForm.value);

      this.productObj.qtestock = this.productForm.value.qtestock;
      this.productObj.pname = this.productForm.value.pname;
      this.productObj.desart = this.productForm.value.desart;
      this.productObj.couleur = this.productForm.value.couleur;
      this.productObj.puart = this.productForm.value.puart;
      // this.productObj.image = this.base64code;
      // this.productService.addProduct(this.productObj, this.file[0]).subscribe(data =>
      this.productService.addProduct1(this.productObj).subscribe(data =>
        console.log(data)
      )
      // To reset the form
    this.productForm.reset();
    } else {
      this.popup('Input error', 'Retry');
    }
  }

  popup(var1, var2) {
    this._snackBar.open(var1, var2, {
      duration: 3000,
      //  panelClass: 'my-snackbar',
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }


  // myImage!: Observable<any>;
  base64code!: any;
  onChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    //console.log(file)
    this.convertToBase64(file)
  }
  convertToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber)
    })
    observable.subscribe((d) => {
      // console.log(d)
      // this.myImage = d
      this.base64code = d
    })
  }
  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file)
    filereader.onload = () => {
      subscriber.next(filereader.result)
      subscriber.complete()
    }
    filereader.onerror = () => {
      subscriber.error()
      subscriber.complete()
    }
  }

}
