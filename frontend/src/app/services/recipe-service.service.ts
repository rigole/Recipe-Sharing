import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private backendUrl = 'http://localhost:3000/api';


  constructor(private http: HttpClient) { }


  getAllRecipe():Observable<any>{
    return this.http.get(`${this.backendUrl}/recipe`)
  }

  getRecipeDetail(recipeId:any):Observable<any>{
    return this.http.get(`${this.backendUrl}/recipe/${recipeId}`)
  }
}



