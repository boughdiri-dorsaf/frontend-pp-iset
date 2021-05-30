import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../services/user.service';
import swal from 'sweetalert';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  firstphase = false;
  secondphase = true;
  thirdphase = true;
  constructor(private userService: UserService, private route: Router) { }
  userPlatform: User = {
    nom: '',
    prenom: '',
    email: '',
    password: '',
    rue: "",
    ville: '',

    gouvernorat_adresse: '',
    id_role: 1,
    num_passport: "",
    cin: "",
    age: 0,
    sexe: "Masculin",
    date_naissance: "",
    code_postale: "",
    pays: "",
    gouvern_naissance: "",
    id_situation_professionnel:""
  }

  ngOnInit() {
  }

  FirsttoSecond() {
    console.log(this.userPlatform)
    this.firstphase = true;
    this.secondphase = false;
  }

  SecondtoFirst() {
    this.firstphase = false;
    this.secondphase = true;
  }

  Register() {
    swal({
      title: "Inscription",
      text: "Mail de confirmation envoyee avec succée",
      icon: "success",
      buttons: ["Annuler", "Valider"],
      dangerMode: false,
    })
      .then((res) => {
        if (res) {
          this.userService.RegisterUser(this.userPlatform);
          this.route.navigateByUrl('auth');
        }
      });
  }

}
