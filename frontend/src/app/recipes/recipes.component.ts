import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe-service.service'; 

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit{
  userInfo = false
  recipeList : any [] = []
  constructor(private recipeService:RecipeService){}
  
  ngOnInit(): void {
    this.userInfo = this.isAuthenticated()
    this.getAllRecipes()
  }

  getAllRecipes(){
    this.recipeService.getAllRecipe().subscribe( response => {
      this.recipeList = response
      console.log(this.recipeList)
    })
  }



  












  isAuthenticated(): boolean{
    return !!localStorage.getItem('userInfo')
  }

  
}
