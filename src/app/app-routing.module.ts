import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { DatabaseComponent } from './pages/database/database.component';
import { PropertyComponent } from './pages/property/property.component';

import { SampleComponent } from './pages/sample/sample.component';
import { UserComponent } from './pages/user/user.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'sample' },
  { path: 'sample', component: SampleComponent},
  { path: 'property', component: PropertyComponent},
  { path: 'user', component: UserComponent},
  { path: 'database', component: DatabaseComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'sample' }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
];
