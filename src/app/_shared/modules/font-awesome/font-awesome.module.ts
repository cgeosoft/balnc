import { NgModule } from '@angular/core'
import { FaIconLibrary, FontAwesomeModule as VentorFontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

@NgModule({
  imports: [VentorFontAwesomeModule],
  exports: [VentorFontAwesomeModule]
})
export class FontAwesomeModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(far, fas, fab)
  }
}
