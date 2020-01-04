import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core'
import { ICaret, ICaretOffset, Mirror } from './document-line.component'

@Directive({
  selector: '[caretTracker]'
})
export class CaretTrackerDirective implements AfterViewInit {
  private mirror: HTMLElement
  private _iframe: HTMLIFrameElement
  private _window: Window
  private _document: Document
  private $element: HTMLElement
  @Input()
  settings: any = {}
  @Output()
  caret = new EventEmitter<ICaret>()
  constructor (private element: ElementRef) { }
  ngAfterViewInit () {
    this.$element = this.element.nativeElement
    if (this._contentEditable() || this._isTextarea()) {
      this.context(this.settings)
    } else {
      throw new Error(`caretTracker directive can be used either on textarea or contenteditable element only`)
    }
  }
  private context (settings: any) {
    const iframe: HTMLIFrameElement = settings !== null ? settings.iframe : void 0
    if (iframe) {
      this._iframe = iframe
      this._window = iframe.contentWindow
      this._document = iframe.contentDocument || this._window.document
    } else {
      this._iframe = void 0
      this._window = window
      this._document = document
    }
  }
  private _contentEditable (): boolean {
    return this.$element.isContentEditable
      && this.$element.getAttribute('contenteditable') === 'true'
  }
  @HostListener('focus', ['$event'])
  onFocus ($event: MouseEvent | KeyboardEvent) {
    this.caret.emit({
      offset: this.getOffset(),
      position: this.getCaretPosition(),
      event: $event
    })
  }
  @HostListener('keyup', ['$event'])
  onKeyup ($event: KeyboardEvent) {
    this.caret.emit({
      offset: this.getOffset(),
      position: this.getCaretPosition(),
      event: $event
    })
  }
  @HostListener('mouseup', ['$event'])
  onMouseup ($event: MouseEvent) {
    this.caret.emit({
      offset: this.getOffset(),
      position: this.getCaretPosition(),
      event: $event
    })
  }
  private _range (): Range {
    const selection = this._window.getSelection()
    return selection.rangeCount > 0 ? selection.getRangeAt(0) : null
  }
  getCaretPositionFromHead (): number {
    if (this._isTextarea()) {
      return (this.$element as HTMLTextAreaElement).selectionStart
    } else {
      const range = this._range()
      if (range) {
        const clonedRange = range.cloneRange()
        clonedRange.selectNodeContents(this.$element)
        clonedRange.setEnd(range.endContainer, range.endOffset)
        const pos = clonedRange.toString().length
        clonedRange.detach()
        return pos
      }
    }
  }
  setCaretPositionFromHead (position: number): CaretTrackerDirective {
    if (this._isTextarea()) {
      (this.$element as HTMLTextAreaElement).setSelectionRange(position, position)
    } else {
      // const selection = this._window.getSelection()
      // if (selection) {
      //   let offset = 0, found = false, fn: Function
      //   ()(position, this.$element)
      // }
    }
    return this
  }

  // fn(pos: number, parent: HTMLElement) {
  //   const nodeList = Array.from(parent.childNodes), results = []
  //   for (const node of nodeList) {
  //     if (found) {
  //       break
  //     } else {
  //       if (node.nodeType === Node.TEXT_NODE) {
  //         if (offset + node['length'] >= pos) {
  //           found = true
  //           const range = this._document.createRange()
  //           range.setStart(node, pos - offset)
  //           selection.removeAllRanges()
  //           selection.addRange(range)
  //           break
  //         } else {
  //           results.push(offset += node['length'])
  //         }
  //       } else {
  //         results.push(fn(pos, node))
  //       }
  //     }
  //   }
  //   return results
  // }

  getCaretPosition (): ICaretOffset {
    return this.getOrSetCaretPosition()
  }
  getCaretPositionOf (charAt: number) {
    return this.getOrSetCaretPosition(charAt)
  }
  setCaretPosition (position: number): CaretTrackerDirective {
    this.getOrSetCaretPosition(position)
    return this
  }
  private getOrSetCaretPosition (position?: number): ICaretOffset {
    if (this._isTextarea()) {
      const $element = this.$element as HTMLTextAreaElement
      const formater = (value: any) => {
        value = value.replace(/<|>|`|"|&/g, '?').replace(/\r\n|\r|\n/g, '<br/>')
        if (/firefox/i.test(navigator.userAgent)) {
          value = value.replace(/\s/g, '&nbsp;')
        }
        return value
      }
      if (position === void 0) {
        position = this.getCaretPositionFromHead()
      }
      const startRange = $element.value.slice(0, position)
      const endRange = $element.value.slice(position)
      const html = `<span style="position: relative; display: inline;">${formater(startRange)}</span>
                  <span id="caret" style="position: relative; display: inline;">|</span>
                  <span style="position: relative; display: inline;">${formater(endRange)}</span>`
      return (new Mirror($element)).create(html).rect()
    } else {
      const offset = this.getOffset() || { top: 0, left: 0, height: 0 }
      const rect = this.$element.getBoundingClientRect()
      const eleOffset = {
        top: rect.top + this._document.body.scrollTop,
        left: rect.left + this._document.body.scrollLeft
      }
      offset.left -= eleOffset.left
      offset.top -= eleOffset.top
      return offset
    }
  }
  getOffsetPosition (): ICaretOffset {
    return this.getOffset()
  }
  getOffsetPositionOf (charAt: number) {
    return this.getOffset(charAt)
  }
  private getOffset (position?: number): ICaretOffset {
    if (this._isTextarea()) {
      const rect = this.$element.getBoundingClientRect()
      const offset = {
        top: rect.top + this._document.body.scrollTop,
        left: rect.left + this._document.body.scrollLeft
      }
      const pos = this.getOrSetCaretPosition(position)
      return {
        left: offset.left + pos.left - this.$element.scrollLeft,
        top: offset.top + pos.top - this.$element.scrollTop,
        height: pos.height
      }
    } else {
      const range = this._range()
      let offset: ICaretOffset
      if (range) {
        if (range.endOffset - 1 > 0 && range.endContainer !== this.$element) {
          const clonedRange = range.cloneRange()
          clonedRange.setStart(range.endContainer, range.endOffset - 1)
          clonedRange.setEnd(range.endContainer, range.endOffset)
          const rect = clonedRange.getBoundingClientRect()
          offset = {
            height: rect.height,
            left: rect.left + rect.width,
            top: rect.top
          }
          clonedRange.detach()
        }
        if (!offset || (offset != null ? offset.height : void 0) === 0) {
          const clonedRange = range.cloneRange()
          const shadowCaret = this._document.createTextNode('|')
          clonedRange.insertNode(shadowCaret)
          clonedRange.selectNode(shadowCaret)
          const rect = clonedRange.getBoundingClientRect()
          offset = {
            height: rect.height,
            left: rect.left,
            top: rect.top
          }
          shadowCaret.remove()
          clonedRange.detach()
        }
      }
      if (offset) {
        offset.top += this._window.screenTop
        offset.left += this._window.screenLeft
      }
      return offset
    }
  }
  private _isTextarea (ele?: HTMLElement): boolean {
    const element = ele || this.$element
    return element.tagName === 'TEXTAREA' && element instanceof HTMLTextAreaElement
  }
}
