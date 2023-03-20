import { Component, OnInit } from '@angular/core';
import { Auth, authState, onAuthStateChanged, User } from '@angular/fire/auth';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { getAuth } from '@firebase/auth';
import { collection, doc, DocumentData } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Todo } from 'src/todo';
import { TodoService } from '../todo.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as moment from 'moment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  today = moment()
  auth = getAuth();
  user: any;
  items!: Observable<DocumentData[]>;
  tasks!: Observable<DocumentData[]>;
  itemValue = '';
  taskValue = '';
  currentCollection = '';

  constructor(
    private todoService: TodoService,
    private router: Router,
    private afs : Firestore,
  ) {
  }

  ngOnInit(){
    onAuthStateChanged(this.auth, (user) => {
      console.log(user)
      if (user) {
        this.user = user;
        const todoCollection = collection(this.afs,this.user.uid)
        this.items = collectionData(todoCollection);
      } 
    });
  }

  onSubmit() {
    if (this.user.isAnonymous) {
      this.router.navigate(['/login']);
    } else {
      this.todoService.createCollectionService(
        this.user.uid,
        this.itemValue
      );
    }
  }

  showCollection(list:any) {
    this.currentCollection = list.collection;
    const docRef = doc(this.afs, this.user.uid, "tsk"+this.user.uid);
    const colRef = collection(docRef,this.currentCollection);
    this.tasks = collectionData(colRef);
  }

  addTask() {
    if (this.user.isAnonymous) {
      this.router.navigate(['/login']);
    } else {
      const todo: Todo = {
        task: this.taskValue,
        date: new Date(),
        crossed: false,
      };
      this.todoService.addTask(
        this.user.uid,
        this.currentCollection || 'default',
        todo
      );
    }
  
  }
}
