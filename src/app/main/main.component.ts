import { Component, OnInit, ViewChild } from '@angular/core';
import { Auth, authState, onAuthStateChanged, User } from '@angular/fire/auth';
import { collectionData, Firestore, onSnapshot } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { getAuth } from '@firebase/auth';
import { collection, doc, DocumentData } from '@firebase/firestore';
import { Observable, take } from 'rxjs';
import { Todo } from 'src/todo';
import { TodoService } from '../todo.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as moment from 'moment';
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
        this.items.pipe(take(1)).subscribe({
          next:(res)=>{
            if(res.length >0){
              this.showCollection(res[0]["collection"])
            }
          },
          error:(err)=>{
            console.log(err)
          }
        })
      } 
    });
  }

  onSubmit() {
    if (!this.user) {
      this.router.navigate(['/login']);
    } else {
      if(this.itemValue.trim.length >0 ){
        this.todoService.createCollectionService(
          this.user.uid,
          this.itemValue
        );
      }
      this.itemValue=""
    }
  }

  showCollection(list:any) {
    this.currentCollection = list;
    // this.todoService.getTaskForCollection(this.user.uid,this.currentCollection)
    // .then((res)=>{
    //   this.tasks = res;
    // });
    const docRef = doc(this.afs, this.user.uid, "tsk"+this.user.uid);
    const colRef = collection(docRef,this.currentCollection);
    onSnapshot(colRef,(quersnapshot)=>{
      const data : DocumentData[] =[];
      quersnapshot.forEach((doc)=>{
        data.push({...doc.data(),ref:doc.id})
      })
      this.tasks = data;
    })
    
  }

  addTask() {
    if (this.user.isAnonymous) {
      this.router.navigate(['/login']);
    } else {
      if(this.taskValue.trim.length >0 ){
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
      });
    }
    this.taskValue =""

  }
  
  }

  updateTask(crossed : boolean,ref:string){
    this.todoService.updateTask(this.user.uid, this.currentCollection,ref, crossed)
  }
}
