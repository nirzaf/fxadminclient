import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatNativeDateModule } from '@angular/material/core';

import { HttpClientModule } from '@angular/common/http';
import { CustomValidationService } from 'src/app/shared/services/custom-validation.service'
import { BreadcrumbComponent } from './common/breadcrumb/breadcrumb.component';
import { AuthGuardService } from './shared/services/auth-guard.service';

import { ConfigurationMicroService } from './shared/services/configuration-micro.service';
import { LocalStorageService } from './shared/services/local-storage.service';

import { CommonService } from './shared/services/common.service';
import { LoaderComponent } from './common/loader/loader.component';
import { FormatTimePipe } from './shared/pipe/format-time.pipe';
import { OnlyNumberDirective } from './shared/directives/only-number.directive';
import { FilterPipe } from './shared/pipe/filter.pipe';

import { TogglePipe } from './shared/pipe/toggle.pipe';
import { ZeroPipe } from './shared/pipe/zero.pipe';
import { SampleComponent } from './pages/sample/sample.component';
import { DatabaseComponent } from './pages/database/database.component';
import { PropertyComponent } from './pages/property/property.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { AddHoldingcompanyComponent } from './pages/holdingcompany/add/add-holdingcompany.component';
import { AddGroupComponent } from './pages/group/add-group/add-group.component';
import { AddPropertyComponent } from './pages/property/add-property/add-property.component';
import { AddSubGroupComponent } from './pages/group/add-sub-group/add-sub-group.component';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { MatChipsModule } from '@angular/material/chips';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StarRatingModule } from 'angular-star-rating';
import { StarRatingComponent } from './shared/star-rating/star-rating.component';
import { NgxOrgChartModule } from 'ngx-org-chart';
import { HierarchyComponent } from './pages/hierarchy/hierarchy.component';
import { UserComponent } from './pages/user/user.component';
import { ViewHoldingcompanyComponent } from './pages/holdingcompany/view-holdingcompany/view-holdingcompany.component';
import { EditHoldingcompanyComponent } from './pages/holdingcompany/edit-holdingcompany/edit-holdingcompany.component';
import { DeleteHoldingcompanyComponent } from './pages/holdingcompany/delete-holdingcompany/delete-holdingcompany.component';
import { ViewGroupComponent } from './pages/group/view-group/view-group.component';
import { EditGroupComponent } from './pages/group/edit-group/edit-group.component';
import { DeleteGroupComponent } from './pages/group/delete-group/delete-group.component';
import { ViewSubGroupComponent } from './pages/group/view-sub-group/view-sub-group.component';
import { EditSubGroupComponent } from './pages/group/edit-sub-group/edit-sub-group.component';
import { DeleteSubGroupComponent } from './pages/group/delete-sub-group/delete-sub-group.component';
import { ViewPropertyComponent } from './pages/property/view-property/view-property.component';
import { EditPropertyComponent } from './pages/property/edit-property/edit-property.component';
import { DeletePropertyComponent } from './pages/property/delete-property/delete-property.component';
import { CreateUserComponent } from './pages/user/create-user/create-user.component';
import { MatPaginatorGotoComponent } from './shared/mat-paginator-goto/mat-paginator-goto.component';
import { LinkProductComponent } from './pages/user/link-product/link-product.component';
import { DbConnectionComponent } from './pages/user/db-connection/db-connection.component';
import { UserHierarchyComponent } from './pages/user/user-hierarchy/user-hierarchy.component';
import { SinglePropertyComponent } from './pages/user/single-property/single-property.component';
import { ViewUserComponent } from './pages/user/view-user/view-user.component';
import { EditUserComponent } from './pages/user/edit-user/edit-user.component';
import { DeleteUserComponent } from './pages/user/delete-user/delete-user.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    BreadcrumbComponent,
    LoaderComponent,
    FormatTimePipe,
    TogglePipe,
    OnlyNumberDirective,
    FilterPipe,
    SampleComponent,
    DatabaseComponent,
    PropertyComponent,
    AddHoldingcompanyComponent,
    AddGroupComponent,
    AddPropertyComponent,
    AddPropertyComponent,
    AddSubGroupComponent,
    StarRatingComponent,
    HierarchyComponent,
    UserComponent,
    ViewHoldingcompanyComponent,
    EditHoldingcompanyComponent,
    DeleteHoldingcompanyComponent,
    ViewGroupComponent,
    EditGroupComponent,
    DeleteGroupComponent,
    ViewSubGroupComponent,
    EditSubGroupComponent,
    DeleteSubGroupComponent,
    ViewPropertyComponent,
    EditPropertyComponent,
    DeletePropertyComponent,
    CreateUserComponent,
    MatPaginatorGotoComponent,
    LinkProductComponent,
    DbConnectionComponent,
    UserHierarchyComponent,
    SinglePropertyComponent,
    ViewUserComponent,
    ZeroPipe,
    EditUserComponent,
    DeleteUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatChipsModule,
    NgxMaterialTimepickerModule,
    MatIconModule,
    MatSnackBarModule,
    StarRatingModule,
    NgxOrgChartModule,
    MatTreeModule,
    MatTooltipModule
  ],
  exports: [],
  entryComponents:[],
  bootstrap: [AppComponent],
  providers: [CustomValidationService, MatDatepickerModule, ConfigurationMicroService, LocalStorageService, AuthGuardService, CommonService]
})
export class AppModule { }
