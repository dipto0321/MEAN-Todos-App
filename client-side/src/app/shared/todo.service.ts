import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Todo } from "../todo";

@Injectable()
export class TodoService {
    get todo(): Todo {
        return this._todo;
    }

    set todo(value: Todo) {
        this._todo = value;
    }
  private baseUri:string = "http://localhost:4000";
  private headers = new HttpHeaders().set('Content-Type','application/json');

  private _todo:Todo;

  constructor(private http:HttpClient) { }

  createTodo(todo:Todo){
    return this.http.post(this.baseUri+'/todo',todo,{headers:this.headers});
  }
  readTodos(){
      return this.http.get(this.baseUri+'/todo',{headers:this.headers});
  }
  readTodo(id:string){
      return this.http.get(this.baseUri+'/todo/'+id,{headers:this.headers});
  }
  updateTodo(todo:Todo){
      return this.http.put(this.baseUri+'/todo',todo,{headers:this.headers});
  }
  deleteTodo(id:string){
      return this.http.delete(this.baseUri+'/todo/'+id,{headers:this.headers});
  }
}
