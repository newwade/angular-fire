import { Injectable } from '@angular/core';
import { addDoc, collectionData,deleteDoc, doc, Firestore, getDoc, getDocs, getFirestore, onSnapshot, updateDoc,  } from '@angular/fire/firestore';
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
    }).then((res)=>res).catch((err)=>err)
  }

  async addTask(user_collection: any, sub_collection: string, todo: Todo){
    const todoDocRef = doc(this.db,user_collection,"tsk"+user_collection);
    const colRef = collection(todoDocRef,sub_collection);
    await addDoc(colRef,todo)
    .then((res)=>res)
    .catch((err)=>err)  }

  async updateTask(user_collection: any, sub_collection: string, sub_collection_ref:string, task_value:boolean){
    const todoDocRef = doc(this.db,user_collection,"tsk"+user_collection);
    const colRef = collection(todoDocRef,sub_collection);
    const nestedRef = doc(colRef,sub_collection_ref);
    await updateDoc(nestedRef,{
      crossed:task_value
    })
    .then((res)=>res)
    .catch((err)=>err)  }

  async getCollection(user_collection:any){
      const collections:string[] = []
      const q = query(collection(this.db, user_collection));
      const docSnap = await getDocs(q);
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
      tasks.push({...doc.data(),ref:doc.id})
    });
    return tasks;
    
    // collectionData(colRef).subscribe((data)=>console.log(data))
    // onSnapshot(colRef,(quersnapshot)=>{
    //   quersnapshot.forEach((doc)=>{
    //     tasks.push({...doc.data(),ref:doc.id})
    //   })
    // })
  }

  async deleteCollection(user_collection:any,sub_collection:any){
      await deleteDoc(doc(this.db,user_collection,sub_collection))
      .then((res)=>res)
      .catch((err)=>err)  }

  async deleteTask(user_collection: any, sub_collection: string, sub_collection_ref:string){
    const todoDocRef = doc(this.db,user_collection,"tsk"+user_collection);
    const colRef = collection(todoDocRef,sub_collection);
    const nestedRef = doc(colRef,sub_collection_ref);
    await deleteDoc(nestedRef)
    .then((res)=>res)
    .catch((err)=>err)  }

}
