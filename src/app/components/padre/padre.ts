import { Component, signal } from '@angular/core';
import { Hijo } from "../hijo/hijo";

@Component({
  selector: 'app-padre',
  imports: [Hijo],
  templateUrl: './padre.html',
  styleUrl: './padre.scss',
})

export class Padre {
  readonly root = signal(true)
  readonly state = signal('closed')
  readonly title = 'Hola, soy una prop del CP'
  readonly currentId = signal(0)
  readonly records = signal<any[]>([{id: 100, name: 'example', active: false}])
  readonly customActions = signal([
    {
      title: 'Create',
      class: 'btn btn-success',
      action: 'CREATE'
    },
    {
      title: 'Delete',
      class: 'btn btn-danger',
      action: 'DELETE'
    },
    {
      title: 'Show',
      class: 'btn btn-outline-info',
      action: 'SHOW'
    }
  ])

  processAction(event: Record<string, any>) {
    console.log('Action Processed: ', event)
    switch (event['action']) {
      case 'CREATE': this.customCreate(); break;
      case 'DELETE': this.customDelete(event['id']); break;
      case 'SHOW': this.customShow(event['id']); break;
      default:
        console.log('Action denied: ', event)
        break;
    }
  }

  customCreate() {
    this.customCreateFlow()
  }

  customDelete(id: number) {
    this.customDeleteFlow(id)
  }

  customShow(id: number) {
    this.customShowFlow(id)
  }

  private customCreateFlow(): void {
    console.log('POST API method')
    this.currentId.update(id => id + 1)
    this.records.update(c => [...c, {id: this.currentId(), name: 'name', active: true}])
  }

  private customDeleteFlow(id: number): void {
    if (confirm('Estas seguro?')) {
      console.log('DELETE API Method')
      this.records.update(c => c.filter(x => x.id !== id))
    }

    return
  }

  private customShowFlow(id: number) {
    const record = this.records().find(e => e.id === id)
    console.log(record)
  }
}
