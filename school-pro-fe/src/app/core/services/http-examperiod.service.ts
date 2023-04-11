import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
 
//import { identifierName } from '@angular/compiler';
 
@Injectable({
  providedIn: 'root'
})

export class HttpExamperiodService {
  constructor(private _http: HttpClient,) {}

    apiUrl ='http://localhost:3000/examperiod';
    

    //get all data
    
      getAllExamperiod():Observable<any>
      {
        return this._http.get(`${this.apiUrl}`);
      }

      //post data
      postExamperiod(data:any):Observable<any>
      {
       
      return this._http.post(`${this.apiUrl}`,data);
      }
      
      //delete data
      
      deleteExamperiod(id:any):Observable<any>
      {
        let ids=id;
        return this._http.delete(`${this.apiUrl}/${ids}`,id);
      
      }
      
      //update data
      updateExamperiod(data:any,id:any):Observable<any>
      {
        let ids =id;
         return this._http.put(`${this.apiUrl}/${ids}`,data);
      }
 
    //get single data
    getExamperiod(id:any ):Observable<any>
    {
      let ids = id;
      return this._http.get(`${this.apiUrl}/${ids}`);
    }
    
    }
    