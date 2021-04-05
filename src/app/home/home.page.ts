import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Usuario } from '../entidades/Usuario';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  validations_form: FormGroup;
  dni_validation: FormGroup;

  validation_messages = {
    'name': [
      { type: 'required', message: 'Nombre requerido' },
      { type: 'minlength', message: 'Mínimo debe contener, al menos 2, letras' },
      { type: 'pattern', message: 'Sólo permite letras' }
    ],
    'lastname': [
      { type: 'required', message: 'Apellido requerido' },
      { type: 'minlength', message: 'Mínimo debe contener, al menos, 2 letras' },
      { type: 'pattern', message: 'Sólo permite letras' }
    ],
    'birthday': [
      { type: 'required', message: 'Fecha de nacimiento requerida' }
    ],
    'dni': [
      { type: 'required', message: 'DNI requerido' },
      { type: 'minlength', message: 'DNI debe contener 9 caracteres' },
      { type: 'maxlength', message: 'DNI no debe contener más de  9 caracteres' },
      { type: 'pattern', message: 'DNI debe estar formado por 8 números seguido de una letra' },
      { type: 'validDni', message: 'El DNI introducido no es válido' }
    ],
    'usuario_form': [
      { type: 'validarUsuario', message: 'Debe introducir el DNI al ser mayor de edad' }
    ]
  }

  constructor(
    public formBuilder: FormBuilder,
    private navCtrl: NavController
  ) { }

  ngOnInit() {

    this.validations_form = new FormGroup({
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

    this.dni_validation = new FormGroup({
      
    })
  }

  onSubmit(values) {
    console.log(values);

    let usuario: Usuario;
    usuario = new Usuario(values['usuario_form']['name'],
      values['usuario_form']['lastname'],
      values['usuario_form']['birthday'],
      values['usuario_form']['dni']);

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

  validarUsuario(fg: FormGroup) {

    var fechaNacimiento: Date = fg.controls['dni'].value;
    var fechaActual = Math.abs(Date.now()-fechaNacimiento.getTime());
    var edad = Math.floor((fechaActual/(1000*3600*24))/365);

    
    console.log(edad);

    if (edad > 18) {
      return true;
    } else {
      return false;
    }

  }

}