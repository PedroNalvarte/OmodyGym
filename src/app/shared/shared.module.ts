import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { HeaderComponent } from './pages/header/header.component';
import { AuthModule } from '../auth/auth.module';
import { DirectivesModule } from '../directives/directives.module';
import { FooterComponent } from './pages/footer/footer.component';



@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    DirectivesModule
  ],
  exports: [
    LoadingSpinnerComponent, HeaderComponent, FooterComponent
  ]
})
export class SharedModule { }
