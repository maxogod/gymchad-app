import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { ActivityComponent } from './modules/activity/activity.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ActivityFormComponent } from './components/activity-form/activity-form.component';
import { ExersiceFormComponent } from './components/exersice-form/exersice-form.component';
import { FormsModule } from '@angular/forms';
import { UpdateActivityComponent } from './components/update-activity/update-activity.component';
import { UpdateExerciseComponent } from './components/update-exercise/update-exercise.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ActivityComponent,
    NavbarComponent,
    FooterComponent,
    ActivityFormComponent,
    ExersiceFormComponent,
    UpdateActivityComponent,
    UpdateExerciseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
