import { Injectable } from '@angular/core';
import { user } from '@angular/fire/auth';
import { addDoc, doc, Firestore, getDoc, getDocs, getFirestore, updateDoc,  } from '@angular/fire/firestore';
import {DocumentData, collection, setDoc, query} from '@firebase/firestore';
import { Todo } from 'src/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private db = getFirestore()
  constructor(private afs : Firestore) {
    
   }

   async createCollectionService(user_collection: any, title: string) {
    await setDoc(doc(collection(this.db,user_collection)),{
      collection:title
    }).then((res)=>console.log(res)).catch((err)=>console.log(err))
  }

  async addTask(user_collection: any, sub_collection: string, todo: Todo){
    const todoDocRef = doc(this.db,user_collection,"tsk"+user_collection);
    const colRef = collection(todoDocRef,sub_collection);
    await addDoc(colRef,todo)
    .then((res)=>console.log(res))
    .catch((err)=>console.log(err))
  }

  async updateTask(user_collection: any, sub_collection: string, sub_collection_ref:string, task_value:boolean){
    const todoDocRef = doc(this.db,user_collection,"tsk"+user_collection);
    const colRef = collection(todoDocRef,sub_collection);
    const nesterRef = doc(colRef,sub_collection_ref);
    await updateDoc(nesterRef,{
      crossed:task_value
    })
    .then((res)=>console.log(res))
    .catch((err)=>console.log(err))
  }

  async getCollection(user_collection:any){
      const collections:string[] = []
      const q = query(collection(this.db, user_collection));
      const docSnap = await getDocs(q);
      console.log(docSnap)
      docSnap.forEach((doc) => {
        collections.push(doc.data()["collection"])
      });
      return collections;
  }

  async getTaskForCollection(user_collection:any,sub_collection:any){
    const tasks:DocumentData[] = []; 
    
    const docRef = doc(this.db, user_collection, "tsk"+user_collection);
    const colRef = collection(docRef,sub_collection);
    const docSnap = await getDocs(colRef);
    docSnap.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      tasks.push({...doc.data(),ref:doc.id})
    });
    return tasks;
  }

}
