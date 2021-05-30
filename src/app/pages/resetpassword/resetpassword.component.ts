import  swal  from 'sweetalert';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
mdp=''
confmdp=''
token=''
  constructor(private US:UserService,private router:ActivatedRoute,private route:Router) { }

  ngOnInit() {
    this.router.params.subscribe((val)=>{
      this.token=val.token
    })
  }
  alerts=[]
changermdp(){

  if(this.mdp==''){
    var alert={
      type: 'danger',
        message: 'Champ mot de passe est vide'
    };
       this.alerts.push({
        type: 'danger',
          message: 'Champ mot de passe est vide'
      })
      var i = this.alerts.indexOf(alert);
      setTimeout(()=>{
        this.alerts.splice(i,1);
      },3000);
      return;
  }
  
  else if(this.confmdp=='')
  {
    var alert={
      type: 'danger',
        message: 'Champ confirmer mot de passe est vide'
    };
       this.alerts.push({
        type: 'danger',
          message: 'Champ confirmer mot de passe est vide'
      })
      var i = this.alerts.indexOf(alert);
      setTimeout(()=>{
        this.alerts.splice(i,1);
      },3000);
      return;
  }
else if(this.mdp!=this.confmdp)
{
  var alert={
    type: 'danger',
      message: 'Les deux champs doit etre identiques'
  };
     this.alerts.push({
      type: 'danger',
        message: 'Les deux champs doit etre identiques'
    })
    var i = this.alerts.indexOf(alert);
    setTimeout(()=>{
      this.alerts.splice(i,1);
    },3000);
    return;
}
else{
  var user={resetLink:this.token,newPassword:this.mdp}
  this.US.ChangerPassword(user).subscribe(
    (response) => {                           //Next callback
      console.log('response received',response)
      //@ts-ignore
      if(response.data=="Your password has been changed"){
        swal('Mot de passe','Mot de passe changé avec succée','success').then(()=>{
          this.route.navigateByUrl('auth');
        });
       
        
      }
    },
    (error) => {    
      if(error.error.data=='Incorrect token or it is expired'){
       console.log('token expired')
       swal('Mot de passe','Ce lien est expiré','error').then(()=>{
        this.route.navigateByUrl('auth');
       });
       
      }                          //Error callback
     
     
    }
  );
}
}
}
