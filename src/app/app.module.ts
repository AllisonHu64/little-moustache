import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { ArticleComponent } from './components/article/article.component';
import { TipDirective } from './directives/tip/tip.directive';
import { HoverTipComponent } from './components/hover-tip/hover-tip.component';
import { MyProjectsComponent } from './pages/my-projects/my-projects.component';
import { ProjectComponent } from './components/project/project.component';
import { HttpClientModule } from '@angular/common/http';
import { BlogDetailPageComponent } from './pages/blog-detail-page/blog-detail-page.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BlogListPageComponent } from './pages/blog-list-page/blog-list-page.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { NewBlogComponent } from './pages/new-blog/new-blog.component';
import { EditBlogComponent } from './pages/edit-blog/edit-blog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    AboutMeComponent,
    ArticleComponent,
    TipDirective,
    HoverTipComponent,
    MyProjectsComponent,
    ProjectComponent,
    BlogDetailPageComponent,
    LoginDialogComponent,
    BlogListPageComponent,
    AdminPageComponent,
    NewBlogComponent,
    EditBlogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
