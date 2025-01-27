// src/app/components/crud/crud.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
  imports: [CommonModule,FormsModule],
})
export class CrudComponent implements OnInit {
  items: any[] = [];
  selectedItem: any = null;
  newItem = { title: '', body: '', userId: 1 };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems(): void {
    this.dataService.getAll().subscribe((data) => {
      this.items = data;
    });
  }

  createItem(): void {
    this.dataService.create(this.newItem).subscribe((data) => {
      this.items.push(data);
      this.newItem = { title: '', body: '', userId: 1 };
    });
  }

  selectItem(item: any): void {
    this.selectedItem = { ...item };
  }

  updateItem(): void {
    if (this.selectedItem) {
      this.dataService
        .update(this.selectedItem.id, this.selectedItem)
        .subscribe((data) => {
          const index = this.items.findIndex((item) => item.id === data.id);
          this.items[index] = data;
          this.selectedItem = null;
        });
    }
  }

  deleteItem(id: number): void {
    this.dataService.delete(id).subscribe(() => {
      this.items = this.items.filter((item) => item.id !== id);
    });
  }
}
