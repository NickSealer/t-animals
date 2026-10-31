import { NgTemplateOutlet } from '@angular/common';
import { Component, input, output, signal, TemplateRef } from '@angular/core';

interface Action {
  title: string, class: string, action: string
}

interface ActionEvent {
  action: string, id?: number
}

@Component({
  selector: 'app-hijo',
  imports: [NgTemplateOutlet],
  templateUrl: './hijo.html',
  styleUrl: './hijo.scss',
})
export class Hijo {
  local = signal('Hola, soy una prop del hijo, pintada desde el padre')
  plantilla = input.required<TemplateRef<any>>()
  showActions = input<boolean>(false)
  records = input.required<Record<string, any>[]>()
  customActions = input<Action[] | null>(null)
  execAction = output<ActionEvent>()

  onActionClick(action: string, id?: number) {
    console.log('Event Emitted: ', action, id)
    this.execAction.emit({action, id})
  }
}
