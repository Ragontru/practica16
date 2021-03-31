import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  validations_form: FormGroup;
  genders: Array<string>;

  constructor(
    public formBuilder: FormBuilder,
    private navCtrl: NavController
  ) { }

  ngOnInit() {

    this.validations_form = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.minLength(2),
        Validators.pattern('^[A-Za-z ]*$'),
        Validators.required
      ])),
      lastname: new FormControl('', Validators.compose([
        Validators.minLength(2),
        Validators.pattern('^[A-Za-z ]*$'),
        Validators.required
      ])),
      birthday: new FormControl('', Validators.required),
      dni: new FormControl('', Validators.compose([
        this.validDNI,
        Validators.maxLength(9),
        Validators.minLength(9),
        Validators.pattern('[0-9]{8}[A-Za-z]{1}'),
        Validators.required
      ]))
    });
  }

  onSubmit(values) {
    console.log(values);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        user: JSON.stringify(values),
        numero: 3
      }
    };
    this.navCtrl.navigateForward('/user', navigationExtras);
  }

  validDNI(fc: FormControl) {

    var numeros = fc.value.substring(0, fc.value.length - 1);
    var numero = numeros % 23;
    var letrasValidas = "TRWAGMYFPDXBNJZSQVHLCKE";
    var letraCorr = letrasValidas.charAt(numero);
    var letra = fc.value.substring(8, 9).toUpperCase();

    if (letraCorr != letra) {
      return ({ validDNI: true });
    } else {
      return (null);
    }

  }


}