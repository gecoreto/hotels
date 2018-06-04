import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Guards
import { AuthGuard } from './guards/auth.guard';

//Services
import { HttpClientModule } from '@angular/common/http';
import { HotelService } from './services/hotel.service';

//Structure page
import { HeaderComponent } from '../app/structurePage/header/header.component';
import { ContentComponent } from '../app/structurePage/content/content.component';
import { FooterComponent } from '../app/structurePage/footer/footer.component';

//Components
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { HotelFilterComponent } from './hotel-filter/hotel-filter.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    HotelListComponent,
    HotelFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    HotelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
