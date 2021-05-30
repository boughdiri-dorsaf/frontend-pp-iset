import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from './../../popup/popup.component';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

interface Alert {
  type: string;
  message: string;
}
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {
  email = '';
  password = ''
  alerts = [];
  constructor(private US: UserService, private route: Router, private modalService: NgbModal) { }

  ngOnInit() {
  }

  Login() {

    this.US.authentifierUser(this.email, this.password).subscribe(val => {

      //@ts-ignore
      if (val.message == "login successfully") {
        //@ts-ignore
        localStorage.setItem('token', val.token)
        //@ts-ignore
        localStorage.setItem('id', val.id_user)
        this.route.navigateByUrl('dashboard');
      }
      /*else {
        var alert = {
          type: 'danger',
          message: 'Email/Mot de passe erroné'
        };
        this.alerts.push({
          type: 'danger',
          message: 'Email/Mot de passe erroné'
        })
        var i = this.alerts.indexOf(alert);
        setTimeout(() => {
          this.alerts.splice(i, 1);
        }, 3000);
        return;
      }*/
    });
  }

  open() {
    const modalRef = this.modalService.open(PopupComponent);
    modalRef.componentInstance.name = 'Hanen';
  }

  closealert(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  resetpassword() {
    swal(
        "Veuillez Introduire votre Adresse Email", {
        content: { element: "input" },
        title: 'Renitialisation Mot de passe',
        //buttons: [{closeModal:true, value:"cancel", text:"Fermer"}, {value:"confirm", text:"Confirmer"}],

      }
    ).then((value) => {
        if (!this.US.emailverif(value)) {
          swal("Erreur", "Email Invalide", "error").then(() => {
            this.resetpassword();
          });
          return
        }
          this.US.resetpasswordUser(value).subscribe((val) => {
            console.log(val);
            //@ts-ignore
            if (val.success == 0) {
              swal("Email", "Cette Adresse email n'existe pas", "error");
              return
            }
            swal("Email", "Lien de renitialisation envoyé avec succée", "success");
          });
    });

    /*swal(
    "Veuillez Introduire votre Adresse Email", {

    content: {element:"input"},
    title:'Renitialisation Mot de passe',
    buttons: {
      cancel: {closeModal:true,text:'annuler',visible:true},
      confirm: {text:'Valider',visible:true},

    },
  }
  )
  .then((value) => {
    console.log(value)
    if(value==null){

      return
    }
   if(!this.US.emailverif(value)){
    swal("Erreur", "Email Invalide","error").then(()=>{
      this.resetpassword();
    });
    return
   }
       this.US.resetpasswordUser(value).subscribe((val)=>{
         console.log(val);
         //@ts-ignore
         if(val.success==0){
          swal("Email", "Cette Adresse email n'existe pas","error");
          return
         }
         swal("Email", "Lien de renitialisation envoyé avec succée","success");
       });

  });*/


  }
}

