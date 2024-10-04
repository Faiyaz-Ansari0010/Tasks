import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { MatrixControlsComponent } from './Components/matrix-controls/matrix-controls.component';
import { QuestionInfoComponent } from './Components/question-info/question-info.component';
import { QuestionNameComponent } from './Components/question-name/question-name.component';
import { ResponsePropertiesComponent } from './Components/response-properties/response-properties.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavBarComponent,
    MatrixControlsComponent,
    QuestionInfoComponent,
    QuestionNameComponent,
    ResponsePropertiesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
