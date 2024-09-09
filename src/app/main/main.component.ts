import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Auth, authState, onAuthStateChanged, User } from '@angular/fire/auth';
import { collectionData, Firestore, onSnapshot } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { getAuth } from '@firebase/auth';
import { collection, doc, DocumentData } from '@firebase/firestore';
import { Todo } from 'src/todo';
import { TodoService } from '../todo.service';
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
  items!: DocumentData[];;
  tasks!: DocumentData[];
  itemValue = '';
  taskValue = '';
  currentCollection = '';
  mobile : boolean = false;
  constructor(
    private todoService: TodoService,
    private router: Router,
    private afs : Firestore,
  ) {
  }



  ngOnInit(){
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.user = user;
        const todoCollection = collection(this.afs,this.user.uid)
        onSnapshot(todoCollection,(quersnapshot)=>{
          const data : DocumentData[] =[];
          quersnapshot.forEach((doc)=>{
            data.push({...doc.data(),ref:doc.id})
          })
          this.items = data;
          if(data.length>0){
              this.showTask(data[0]["collection"])
          }
        })
        // this.items = collectionData(todoCollection);
        // this.items.pipe(take(1)).subscribe({
        //   next:(res)=>{
        //     if(res.length >0){
        //       this.showCollection(res[0]["collection"])
        //     }
        //   },
        //   error:(err)=>{
        //     console.log(err)
        //   }
        // })
      } 
    });
  }

  onSubmit() {
    if (!this.user) {
      this.router.navigate(['/login']);
    } else {
      if(this.itemValue.trim().length >0 ){
        this.todoService.createCollectionService(
          this.user.uid,
          this.itemValue
        );
      }
      this.itemValue=""
    }
  }

  showTask(list:any) {
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
      data.sort((a,b)=>{
        return b["date"]-a["date"];
      });
      this.tasks = data;
    })
    
  }

  addTask() {
    if (this.user.isAnonymous) {
      this.router.navigate(['/login']);
    } else {
      if(this.taskValue.trim().length >0 ){
      const todo: Todo = {
        task: this.taskValue,
        date: new Date(),
        crossed: false,
      };
      this.todoService.addTask(
        this.user.uid,
        this.currentCollection || 'default',
        todo
      )
    }
    this.taskValue =""
  }
  }

  updateTask(crossed : boolean,ref:string){
    this.todoService.updateTask(this.user.uid, this.currentCollection,ref, crossed)
  }

  handleDeleteCollection(item:any){
    this.todoService.deleteCollection(this.user.uid,item.ref)
  }

  handleDeleteTask(ref:string){
    this.todoService.deleteTask(this.user.uid,this.currentCollection,ref);
  }

 


}
