import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <div class="layout-footer">
      by Lucas Henrique
      <a href="https://github.com/lucashfdeus" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">
        <i class="pi pi-github"></i>
      </a>
      <a href="https://www.linkedin.com/in/lucashfdeus/" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline ml-2">
        <i class="pi pi-linkedin"></i>
      </a>
    </div>
  `
})
export class AppFooter {}
