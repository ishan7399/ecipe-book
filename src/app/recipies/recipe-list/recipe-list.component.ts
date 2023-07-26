import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit ,OnDestroy{
  recipies: Recipe[];
  subscription:Subscription
  constructor(private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute) { }
  ngOnInit() {
 this.subscription=   this.recipeService.recipesChanged
    .subscribe(
      (recipes:Recipe[])=>{
        this.recipies = recipes
      }
    )
    this.recipies = this.recipeService.getRecipies()
  }
  onNewRecipe() {
    this.router.navigate(['new'],
      { relativeTo: this.route })
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe( )
  }
}
