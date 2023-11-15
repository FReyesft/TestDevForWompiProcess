import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { WompiService } from './services/wompi.service';
import { WompiDataResponse } from './interfaces/wompiData.interface';
import { TransactionByIdResponse } from './interfaces/transactionByIdResponse.interface';
import { TransactionDetail } from './interfaces/trasactionDetail.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'wompiFrontentPayProcessDev';
  form: FormGroup;
  formData: any;
  wompiData: any;
  wompiDataResponse: WompiDataResponse;
  urlWompiToPay: string = 'https://checkout.wompi.co/l';
  idLinkwompi: string;
  transactionByIdResponse: any = null;
  intervalId: any;
  trasactionDetail: TransactionDetail;

  constructor(private fb: FormBuilder, private wompiService: WompiService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      valueToPay: ['', Validators.required],
      documentNumber: ['', Validators.required],
      nameUser: ['', Validators.required]
    })
  }
  ngOnInit(): void {
    this.getTransactionByIdLinkWompi();
  }

  onSubmit() {
    if (this.form.valid) {
      this.formData = this.form.value;
      this.wompiData = {
        name: this.formData.name,
        description: this.formData.description,
        single_use: true,
        currency: "COP",
        amount_in_cents: this.formData.valueToPay * 100,
        collect_shipping: false,
        redirect_url: "http://localhost:4200"
      }
      this.createWompiLink();

    }
  }

  createWompiLink() {
    this.wompiService.createUrl(this.wompiData).subscribe(
      (resp) => {
        this.wompiDataResponse = resp;
        console.log(this.wompiDataResponse)
        this.idLinkwompi = this.wompiDataResponse.idLinkWompi;
        const redirectUrl = `${this.urlWompiToPay}/${this.idLinkwompi}`;
        sessionStorage.setItem('idWompiLink', this.idLinkwompi);
        location.href = redirectUrl
      },
      (error) => {
        console.error(error);
      }
    );
  }
  count: number = 0
  getTransactionByIdLinkWompi() {

    this.intervalId = setInterval(() => {
      this.idLinkwompi = sessionStorage.getItem('idWompiLink');
      this.wompiService.getTransactionByIdLinkWompi(this.idLinkwompi).subscribe(
        (resp) => {
          if (resp.transactionState) {
            this.transactionByIdResponse = {
              jsonWompiResponse: JSON.parse(resp.jsonWompiResponse),
              idLinkWompi: resp.idLinkWompi,
              transactionState: resp.transactionState
            };
            this.count += + 1
            console.log('Petición numero: ' + this.count);
            const { data } = this.transactionByIdResponse.jsonWompiResponse;

            this.trasactionDetail = {
              name: data.name,
              description: data.description,
              amount_in_cents: data.amount_in_cents
            };
            if (this.transactionByIdResponse.transactionState !== 'PENDING') {
              clearInterval(this.intervalId);
            }
          } else {
            console.log('Error');
          }
        },
        (error) => {
          console.error('Error en la suscripción:', error);
        }
      );
    }, 5000);
  }

}
