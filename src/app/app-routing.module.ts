import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { MyProjectsComponent } from './pages/my-projects/my-projects.component';
import { BlogDetailPageComponent } from './pages/blog-detail-page/blog-detail-page.component';
import { BlogListPageComponent } from './pages/blog-list-page/blog-list-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { NewBlogComponent } from './pages/new-blog/new-blog.component';
import { EditBlogComponent } from './pages/edit-blog/edit-blog.component';

const routes: Routes = [
  {path:'home', component:HomePageComponent},
  {path:'about-me', component:AboutMeComponent},
  {path: 'my-projects', component: MyProjectsComponent},
  {path: 'blog-detail', component: BlogDetailPageComponent},
  {path: 'blog-list', component: BlogListPageComponent},
  {path: 'admin', component: AdminPageComponent},
  {path: 'new-blog', component: NewBlogComponent},
  {path: 'edit-blog', component: EditBlogComponent},
  {path:'**', redirectTo:'home'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
