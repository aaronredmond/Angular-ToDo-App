import { Component } from '@angular/core';
import { Item } from "./item";
import { LocalService } from './local.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ToDo Application';
  filter: 'all' | 'active' | 'done' = 'all';
  allItems: Item[] = [];
  localStorageKey = "todoApp";

  get items() {
    if (this.filter === 'all') {
      return this.allItems;
    }
    return this.allItems.filter(
      (item) => this.filter === 'done' ? item.done : !item.done);
  }

  addItem(description: string) {           
    this.allItems.push({
      id: this.allItems.length + 1,
      description,
      done: false
    });
    this.localStore.saveData(this.localStorageKey, JSON.stringify(this.allItems));
  }
  
  remove(item: Item) {
    this.allItems.splice(this.allItems.indexOf(item), 1);
    this.reIndexItems();
    this.localStore.saveData(this.localStorageKey, JSON.stringify(this.allItems));
  }

  reIndexItems() {
    let newId = 1;
    this.allItems.forEach(item => {     
      item.id = newId;
      newId++;
    })
  }

  constructor(private localStore: LocalService) {
    var initialLocalStoreEntry = this.localStore.getData("todoApp");    
    if (initialLocalStoreEntry.length == 0) {
      this.localStore.saveData(this.localStorageKey, JSON.stringify(this.allItems));
    }
    
    this.allItems = JSON.parse(this.localStore.getData(this.localStorageKey));
  }

  ngOnInit(): void {    
    console.log("-----------ToDo Application-----------");
  }

  deleteAll() {
    this.allItems = [];
    this.localStore.removeData(this.localStorageKey);
  }

}
