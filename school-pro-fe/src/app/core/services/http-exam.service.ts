import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
 
//import { identifierName } from '@angular/compiler';
 
@Injectable({
  providedIn: 'root'
})

export class HttpExamService {
  constructor(private _http: HttpClient,) {}

    apiUrl ='http://localhost:3000/exam';
    

    //get all data
    
      getAllExam():Observable<any>
      {
        return this._http.get(`${this.apiUrl}`);
      }

      //post data
      postExam(data:any):Observable<any>
      {
       
      return this._http.post(`${this.apiUrl}`,data);
      }
      
      //delete data
      
      deleteExam(id:any):Observable<any>
      {
        let ids=id;
        return this._http.delete(`${this.apiUrl}/${ids}`,id);
      
      }
      
      //update data
      updateExam(data:any,id:any):Observable<any>
      {
        let ids =id;
         return this._http.put(`${this.apiUrl}/${ids}`,data);
      }
 
    //get single data
    getExam(id:any ):Observable<any>
    {
      let ids = id;
      return this._http.get(`${this.apiUrl}/${ids}`);
    }
    
    }
    
    
    