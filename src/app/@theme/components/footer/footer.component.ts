import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Created with ♥ by <b>
        <a href="http://stefan-costin.smvi.co" target="_blank">Stefan Costin</a>
    </b> during <b>
        <a href="https://fiipractic.asii.ro/is/backend/php" target="_blank">Fii-Practic</a>
    </b>, 2019.</span>
    <div class="socials">
      <a href="https://github.com/stefancostin" target="_blank" class="ion ion-social-github"></a>
      <a href="https://www.facebook.com/stefan.costin.73" target="_blank" class="ion ion-social-facebook"></a>
      <a href="https://twitter.com/StefanFCostin" target="_blank" class="ion ion-social-twitter"></a>
      <a href="https://www.linkedin.com/in/stefan-costin/" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
