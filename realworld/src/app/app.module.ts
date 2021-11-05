import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleDetailComponent } from './article/article-detail/article-detail.component';
import { ArticleEditComponent } from './article/article-edit/article-edit.component';
import { ArticleNewComponent } from './article/article-new/article-new.component';
import { ArticleAccountComponent } from './common/article-account/article-account.component';
import { FooterComponent } from './common/footer/footer.component';
import { NavBarComponent } from './common/nav-bar/nav-bar.component';
import { TagsComponent } from './common/tags/tags.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SettingsComponent } from './settings/settings.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { FeedGlobalComponent } from './feed/feed-global/feed-global.component';
import { FeedTagsComponent } from './feed/feed-tags/feed-tags.component';
import { FeedYourComponent } from './feed/feed-your/feed-your.component';
import { MyFavoriteComponent } from './profile/my-favorite/my-favorite.component';
import { MyProfileComponent } from './profile/my-profile/my-profile.component';
import { MyArticleComponent } from './profile/my-article/my-article.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SafePipe } from './safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MyFavoriteComponent,
    MyProfileComponent,
    MyArticleComponent,
    SigninComponent,
    SignupComponent,
    ArticleNewComponent,
    ArticleEditComponent,
    SettingsComponent,
    NavBarComponent,
    TagsComponent,
    FooterComponent,
    ArticleAccountComponent,
    ArticleDetailComponent,
    NotfoundComponent,
    FeedGlobalComponent,
    FeedTagsComponent,
    FeedYourComponent,
    SafePipe,
  ],
  imports: [
    RouterModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    NgbModule,
    FormsModule,
    AngularEditorModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
