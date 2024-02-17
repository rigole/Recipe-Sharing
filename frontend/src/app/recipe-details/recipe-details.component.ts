import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe-service.service'; 
import { Router,ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit{
  recipe: any

  constructor(private recipeService: RecipeService, private route: ActivatedRoute){}


  ngOnInit(){
   this.route.params.subscribe(params => {
    const recipeId = params['recipe_id'];
    if(recipeId){
      this.recipeService.getRecipeDetail(recipeId).subscribe(response => {
        this.recipe = response
      })
    }
   })
  }


}


