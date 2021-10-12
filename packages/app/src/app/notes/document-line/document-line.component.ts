import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'
import { Document } from '../@shared/document'
import { DocumentsRepo } from '../@shared/documents.repo'
import { Line } from '../@shared/line'
import { LinesRepo } from '../@shared/lines.repo'

@Component({
  selector: 'app-documents-document-line',
  templateUrl: './document-line.component.html',
  styleUrls: ['./document-line.component.scss']
})
export class DocumentLineComponent implements AfterViewInit {

  @Input() line: Line

  @ViewChild('elem') elem: ElementRef

  document$: Observable<Document>
  selected: string

  lineChanged: Subject<string> = new Subject<string>()
  selectedLine: Line
  offset: number
  innerLine
  focused = false
  text: string

  constructor (
    public documentsRepo: DocumentsRepo,
    public linesRepo: LinesRepo
  ) { }

  ngAfterViewInit (): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.

    // }
    // ngOnInit () {
    this.linesRepo
      .one$(this.line.id)
      .subscribe((l) => {
        this.innerLine = l
        // if (this.focused) {
        //   const position = this.getCaretPosition(this.elem.nativeElement)
        //   let el = this.elem.nativeElement.childNodes[0]
        //   this.text = l.text
        //   const range = document.createRange()
        //   const sel = window.getSelection()
        //   range.setStart(el, position)
        //   range.collapse(true)
        //   sel.removeAllRanges()
        //   this.elem.nativeElement.focus()
        //   sel.addRange(range)

        // } else {
        this.text = l.text
        // }
      })

    this.lineChanged
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(async (text) => {
        await this.linesRepo.updateLine(this.innerLine, text)
      })
  }

  getCaretPosition (editableDiv) {
    let caretPos = 0
    let sel
    let range
    sel = window.getSelection()
    if (sel.rangeCount) {
      range = sel.getRangeAt(0)
      if (range.commonAncestorContainer.parentNode === editableDiv) {
        caretPos = range.endOffset
      }
    }
    return caretPos
  }

  async addLine () {
    await this.linesRepo.addLine(this.selected)
  }

  async chg (ev) {
    this.lineChanged.next(ev.srcElement.innerText.replace(/^\n|\n$/g, ''))
  }

  async keytab (event: any) {
    let element = event.srcElement.nextElementSibling

    if (element) {
      // element.focus()
    } else {
      // await this.addLine()
      // event.srcElement.nextElementSibling.focus()
    }
  }

  focus (ev) {
    this.focused = true
  }

  blur (ev) {
    this.focused = false
  }

  log (ev) {
    console.log(ev)
  }

}
export interface ICaretOffset {
  left: number
  top: number
  height: number
}

export interface ICaretPosition {
  left: number
  top: number
}

export interface ICaret {
  offset: ICaretOffset
  position: ICaretPosition
  event: any
}

export class Mirror {
  private cssProperties = ['borderBottomWidth', 'borderLeftWidth', 'borderRightWidth', 'borderTopStyle',
    'borderRightStyle', 'borderBottomStyle', 'borderLeftStyle', 'borderTopWidth', 'boxSizing', 'fontFamily',
    'fontSize', 'fontWeight', 'height', 'letterSpacing', 'lineHeight', 'marginBottom', 'marginLeft', 'marginRight',
    'marginTop', 'outlineWidth', 'overflow', 'overflowX', 'overflowY', 'paddingBottom', 'paddingLeft',
    'paddingRight', 'paddingTop', 'textAlign', 'textOverflow', 'textTransform', 'whiteSpace', 'wordBreak',
    'wordWrap']
  private $mirror: HTMLElement

  constructor (private $element: HTMLElement) {
  }

  private css (): any {
    const _css = {
      position: 'absolute',
      left: -9999,
      top: 0,
      zIndex: -20000
    }

    if (this.$element.tagName === 'TEXTAREA') {
      this.cssProperties.push('width')
    }
    const calcStyles = getComputedStyle(this.$element)
    this.cssProperties.forEach(p => {
      _css[p] = calcStyles[p]
    })
    return _css
  }

  create (html: string): Mirror {
    this.$mirror = document.createElement('div')
    const _css = this.css()
    Object.keys(_css).forEach(k => {
      this.$mirror.style[k] = _css[k]
    })
    this.$mirror.innerHTML = html
    this.$element.parentNode.insertBefore(this.$mirror, this.$element.nextSibling)
    return this
  }

  rect (): ICaretOffset {
    const $flag = this.$mirror.querySelector('#caret')
    const _rect = $flag.getBoundingClientRect()
    const position = {
      left: _rect.left,
      top: _rect.top,
      height: _rect.height
    }
    this.$mirror.remove()
    return position
  }
}
