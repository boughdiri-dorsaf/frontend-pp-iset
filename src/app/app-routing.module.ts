import { ParametresComponent } from './Admin/parametres/parametres.component';
import { ResponsableComponent } from './Admin/responsable/responsable.component';
import { CursusComponent } from './pages/cursus/cursus.component';
import { DepartmentComponent } from './Admin/department/department.component';
import { EstablishementsComponent } from './Admin/establishements/establishements.component';
import { AuthAdminComponent } from './Admin/auth-admin/auth-admin.component'; 
import { DashboardAdminComponent } from './Admin/dashboard/dashboard.component';
import { HomepageAdComponent } from './Admin/homepage-ad/homepage-ad.component';
import { ResetpasswordComponent } from './pages/resetpassword/resetpassword.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { AuthComponent } from "./pages/auth/auth.component";
import { DashboardDefaultComponent } from "./pages/dashboard/dashboard-default/dashboard-default.component";
import { HomeComponent } from "./pages/home/home.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { SimplePageComponent } from "./pages/simple-page/simple-page.component";
import { ProfileComponent } from "./pages/user/profile/profile.component";
import { ApplicationsComponent } from './Admin/applications/applications.component';

const routes: Routes = [
  {path: "",component: HomeComponent,},
  {path: "default",component: DashboardDefaultComponent,},
  { path: "auth", component: AuthComponent},
  { path: "authAdmin", component: AuthAdminComponent},
  { path: "signup", component: SignupComponent },
  { path: "resetpassword/:token", component: ResetpasswordComponent },
  {path:'dashadmin',
  component:HomepageAdComponent,children: [
    { path: "applications", component: ApplicationsComponent },
    { path: "responsable", component: ResponsableComponent },
    { path: "parametres", component: ParametresComponent },
    {path:'',component:DashboardAdminComponent},
    {path:'etablissment',component:EstablishementsComponent},
    {path:'department',component:DepartmentComponent}
  ]},
  {
    path: "dashboard",
    component: HomePageComponent,
    children: [
      {
        path: "",
        component: DashboardComponent,
      },
      {
        path: "profil",
        component: ProfileComponent,
      },
      { path: "simple", component: SimplePageComponent },
     
      { path: "Cursus", component: CursusComponent }
     
      // {
      //   path: "stage", component : ,
      //   children: [
      //     {

      //     }
      //   ]
      // },
      // {
      //   path: "club", component: ,
      //   children: [
      //     {

      //     }
      //   ]
      // },
      // {
      //   path: "communication", component: ,
      //   children: [
      //     {

      //     }
      //   ]
      // },
      // {
      //   path: "scolarite", component: ,
      //   children: [
      //     {

      //     }
      //   ]
      // },
      // {
      //   path: "selection", component: ,
      //   children: [
      //     {

      //     }
      //   ]
      // },
    ],
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
