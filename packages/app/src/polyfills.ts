/***************************************************************************************************
 * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
 */
import '@angular/localize/init';
import 'zone.js/dist/zone'; // Included with Angular CLI.

/***************************************************************************************************
 * APPLICATION IMPORTS
 */

(window as any).global = window;
(window as any).process = {
  env: { DEBUG: undefined },
};
