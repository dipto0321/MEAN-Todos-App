import { Component, OnInit } from '@angular/core';
import { TodoService} from "../../shared/todo.service";
import { Todo } from "../../todo";
import {text} from "@angular/core/src/render3/instructions";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  title = "ADD NEW";
  btnName = "ADD";
  private todos: Todo[];

  constructor(private _todosService:TodoService) { }

  ngOnInit() {
    this.todos = this._todosService.todo as any;
    this.readTodos();
  }


  addTodo(event,todoText){
    // console.log(todoText.value)
      var result;
      var newTodo = {
        text: todoText.value,
        isCompleted : false
      };

      result = this._todosService.createTodo(newTodo);
      result.subscribe(res=>{
        this.todos.push(res);
        todoText.value = '';
      });
  }

  readTodos(){
      this.todos = [];
      this._todosService.readTodos().subscribe(_todos=>{
          this.todos = _todos as any;
      });
  }

  setEditState(todo, state){
      if (state){
        todo.isEditMode = state;
      } else {
        delete todo.isEditMode;
      }
  }

  updateStatus(todo){

    var _todo = {
      _id: todo._id,
      text: todo.text,
      isCompleted: !todo.isCompleted
    };

    this._todosService.updateTodo(_todo).subscribe(data=>{
      todo.isCompleted = !todo.isCompleted;
    });
  }

  updateTodoText(e, todo){
    if (e.which === 13){
      todo.text = e.target.value;
      var _todo = {
        _id: todo._id,
        text: todo.text,
        isCompleted: todo.isCompleted
      };
      this._todosService.updateTodo(_todo).subscribe(data =>{
        this.setEditState(todo,false);
      });
    }
  }

  deleteTodo(todo){
    this._todosService.deleteTodo(todo._id).subscribe(data=>{
      this.todos.splice(this.todos.indexOf(todo),1);
    },
    error=>{
      console.log(error);
    });
  }
}
