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
//import { AuthGuard } from "./auth/auth.guard";

//, canActivate: [AuthGuard]
const appRoutes: Routes=[
    //{path: '', component: HomeComponent},
    {path: 'products' ,component: ProductsComponent},
    {path: 'auth' ,component: AuthComponent},
    {path: 'salesPersons' ,component: SalesPersonsComponent},
    {path:'products/search/:searchTerm',component: ProductsItemComponent},
    {path: 'home', component: HomeComponent },
    {path: 'mens/shirts', component: MenuComponent},
    {path:'header',component:HeaderComponent},
    {path:'productManagement',component:ProductManagementComponent},
    {path:'brandManagement',component:BrandsManagementComponent},
    {path:'categoryManagement',component:CategoryComponent},
    {path:'subcategoryManagement',component:SubcategoryComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]

})
export class AppRoutingModule{

}