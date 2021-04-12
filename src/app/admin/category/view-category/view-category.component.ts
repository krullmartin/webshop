import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {
  categories: {id: string, categoryName: string} [] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    //this.categories = this.categoryService.categories;
    //this.categoryService.saveCategoriesToDatabase().subscribe();
    this.categoryService.getCategoriesFromDatabase().subscribe(categoriesFromFb => {
      for (const key in categoriesFromFb) {
        const element = categoriesFromFb[key];
        this.categories.push({id: key, categoryName: element.categoryName});
      }
    });

  }

  onRemoveCategory(i: number) {
    let isConfirm = confirm("Oled kindel, et soovid kustutada?");
    if (isConfirm) {
      this.categories.splice(i,1);
      this.categoryService.deleteFromDatabase(this.categories).subscribe();
    }
  }


}
