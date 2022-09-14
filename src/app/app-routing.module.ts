import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { MenuComponent } from "./menu/menu.component";
import { BrandsManagementComponent } from "./brand/brands-management/brands-management.component";
import { ProductManagementComponent } from "./products/product-management/product-management.component";
import { ProductsItemComponent } from "./products/products-item/products-item.component";
import { ProductsComponent } from "./products/products.component";
import { SalesPersonsComponent } from "./sales-persons/sales-persons.component";
import { CategoryComponent } from "./category/category.component";
import { SubcategoryComponent } from "./category/subcategory/subcategory.component";
import { AuthGuard } from "./auth/auth.guard";

const appRoutes: Routes=[
    {path: '', component: HomeComponent},
    {path: 'products' ,component: ProductsComponent},
    {path: 'auth' ,component: AuthComponent},
    {path: 'salesPersons' ,component: SalesPersonsComponent, canActivate: [AuthGuard]},
    {path:'products/search/:searchTerm',component: ProductsItemComponent},
    {path: 'home', component: HomeComponent },
    {path: 'mens/shirts', component: MenuComponent},
    {path:'header',component:HeaderComponent},
    {path:'productManagement',component:ProductManagementComponent, canActivate: [AuthGuard]},
    {path:'brandManagement',component:BrandsManagementComponent, canActivate: [AuthGuard]},
    {path:'categoryManagement',component:CategoryComponent, canActivate: [AuthGuard]},
    {path:'subcategoryManagement',component:SubcategoryComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]

})
export class AppRoutingModule{

}