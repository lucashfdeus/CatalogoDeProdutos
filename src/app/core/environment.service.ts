import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  readonly apiUrl = environment.apiUrl;
  readonly enableDebug = environment.enableDebug;
  readonly defaultLanguage = environment.defaultLanguage;
}
