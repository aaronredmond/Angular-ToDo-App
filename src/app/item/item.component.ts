import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Item } from "../item";
import { LocalService } from '../local.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {

  editable = false;

  todoItems: Item[] = [];

  @Input() item!: Item;
  @Input() newItem!: string;
  @Output() remove = new EventEmitter<Item>();

  saveItem(description: string) {
    if (!description) return;
    this.editable = false;
    this.item.description = description;    
    this.updateLocalStorageItemDescription(description);
  }

  updateLocalStorageItemDescription(description: string) {
    this.todoItems = JSON.parse(this.localStore.getData("todoApp"));
    this.todoItems.forEach(todoItem => {
      if (todoItem.id === this.item.id) {
        todoItem.description = description;
      }
    });
    this.localStore.saveData("todoApp", JSON.stringify(this.todoItems));
  }

  updateDoneState(item: Item) {
    this.updateLocalStorageItemDone(item.done);    
  }

  updateLocalStorageItemDone(done: boolean) {
    this.todoItems = JSON.parse(this.localStore.getData("todoApp"));
    this.todoItems.forEach(todoItem => {
      if (todoItem.id === this.item.id) {
        todoItem.done = !done;
      }
    });
    this.localStore.saveData("todoApp", JSON.stringify(this.todoItems));
  }

  constructor(private localStore: LocalService) {}

}


