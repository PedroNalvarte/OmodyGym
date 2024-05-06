import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { HomeModule } from './home/home.module';
import { DirectivesModule } from './directives/directives.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ClientFilterPipe } from './home/clientes/pipes/client-filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ClientFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AuthModule,
    HomeModule,
    SharedModule,
    DirectivesModule,
    NgxBootstrapIconsModule,
    ModalModule.forRoot(),


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
