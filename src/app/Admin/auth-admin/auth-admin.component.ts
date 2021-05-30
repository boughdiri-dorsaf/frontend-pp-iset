import { AdminService } from './../../services/admin.service';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-admin',
  templateUrl: './auth-admin.component.html',
  styleUrls: ['./auth-admin.component.scss']
})
export class AuthAdminComponent implements OnInit {
  email=''
  password=''
  constructor(private US:AdminService,private route:Router) { }

  ngOnInit() {
  }

  alerts=[];

  Login(){
    if(!this.US.emailverif(this.email)){
      var alert={
       type: 'danger',
         message: 'Cette Email est Invalide'
     };
        this.alerts.push({
         type: 'danger',
           message: 'Cette Email est Invalide'
       })
       var i = this.alerts.indexOf(alert);
       setTimeout(()=>{
         this.alerts.splice(i,1);
       },3000);
       return;
    }
       this.US.authentifierAdmin(this.email,this.password).subscribe(val=>{
        console.log(val)

         //@ts-ignore
         if(val.message=="login successfully"){

        //@ts-ignore
        localStorage.setItem('token',val.token)
        //@ts-ignore
        this.US.getUser(val.token).subscribe(val2=>{
         console.log(val2)
           //@ts-ignore
          if(val2.results[0].id_role==3){
            //@ts-ignore

            //@ts-ignore
           localStorage.setItem('id',val2.results[0].id_user)
           this.route.navigateByUrl('dashadmin');
          }else{
            var alert={
              type: 'danger',
                message: "Cette Compte n'est pas un Compte Admin"
            };
               this.alerts.push({
                type: 'danger',
                  message: "Cette Compte n'est pas un Compte Admin"
                            })
              var i = this.alerts.indexOf(alert);
              setTimeout(()=>{
                this.alerts.splice(i,1);
              },3000);
              return;
          }


        });
         }
         else{
           var alert={
             type: 'danger',
               message: 'Email/Mot de passe erroné'
           };
              this.alerts.push({
               type: 'danger',
                 message: 'Email/Mot de passe erroné'
             })
             var i = this.alerts.indexOf(alert);
             setTimeout(()=>{
               this.alerts.splice(i,1);
             },3000);
             return;
         }
       });
     }

}
