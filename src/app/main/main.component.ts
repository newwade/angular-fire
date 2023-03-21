import { Component, OnInit, ViewChild } from '@angular/core';
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
import { MatCalendar } from '@angular/material/datepicker';
import { Moment } from 'moment';

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
  tasks!: DocumentData[];
  itemValue = '';
  taskValue = '';
  currentCollection = '';

  @ViewChild(MatCalendar) calendar!: MatCalendar<Moment>;

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
    this.currentCollection = list;
    this.todoService.getTaskForCollection(this.user.uid,this.currentCollection).
    then((res)=>{
      this.tasks = res;
    });
    // const docRef = doc(this.afs, this.user.uid, "tsk"+this.user.uid);
    // const colRef = collection(docRef,this.currentCollection);
    //   collection
    // this.tasks = collectionData(colRef);
    // this.todoService.updateTask(this.user.uid,this.currentCollection);
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
      ).then(()=>{
        this.showCollection(this.currentCollection)
      }).finally(()=>{
        this.taskValue =""
      });
    }
  
  }

  updateTask(crossed : boolean,ref:string){
    this.todoService.updateTask(this.user.uid, this.currentCollection,ref, crossed)
  }
}
