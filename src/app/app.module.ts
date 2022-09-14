import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import { ProductsItemComponent } from './products/products-item/products-item.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule } from '@angular/forms';
import { SalesPersonsComponent } from './sales-persons/sales-persons.component';
import { SalesPersonsEditComponent } from './sales-persons/sales-persons-edit/sales-persons-edit.component';
import { ProductService } from './products/product.service';
import { SearchComponent } from './search/search.component';
import { SidebarModule } from 'ng-sidebar';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { ProductManagementComponent } from './products/product-management/product-management.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { SalesPersonsInfoComponent } from './sales-persons/sales-persons-info/sales-persons-info.component';
import { SalesService } from './sales-persons/sales.service';
import { BrandsManagementComponent } from './brand/brands-management/brands-management.component';
import { BrandComponent } from './brand/brand.component';
import { BrandService } from './brand/brand.service';
import { BrandEditComponent } from './brand/brand-edit/brand-edit.component';
import { CategoryComponent } from './category/category.component';
import { SubcategoryComponent } from './category/subcategory/subcategory.component';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import { SubcategoryEditComponent } from './category/subcategory/subcategory-edit/subcategory-edit.component';
import { CategoryService } from './category/category.service';
import { SubcategoryService } from './category/subcategory/subcategory.service';
import { AuthService } from './auth/auth.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AuthGuard } from './auth/auth.guard';
//import { AuthGuard } from './auth/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    ProductsItemComponent,
    AuthComponent,
    SalesPersonsComponent,
    SalesPersonsEditComponent,
    SearchComponent,
    HomeComponent,
    MenuComponent,
    ProductManagementComponent,
    ProductEditComponent,
    SalesPersonsInfoComponent,
    BrandsManagementComponent,
    BrandComponent,
    BrandEditComponent,
    CategoryComponent,
    SubcategoryComponent,
    CategoryEditComponent,
    SubcategoryEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SidebarModule,
    HttpClientModule
  ],
  providers: [ProductService
    ,SalesService
    ,BrandService
    ,CategoryService
    ,SubcategoryService,
  AuthService,
  AuthGuard,
  {provide: HTTP_INTERCEPTORS,
     useClass: AuthInterceptorService,
    multi: true}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
