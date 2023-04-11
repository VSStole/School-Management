import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
//import { identifierName } from '@angular/compiler';
 
@Injectable({
  providedIn: 'root'
})
export class HttpSubjectService
 {

  constructor(private _http: HttpClient,) {}

  //connect frontend to backend

  apiUrl ='http://localhost:3000/subject';

//get all data

  getAllSubject():Observable<any>
  {
    return this._http.get(`${this.apiUrl}`);
  }

//create data

postSubject(data:any):Observable<any>
{
 
return this._http.post(`${this.apiUrl}`,data);
}

//delete data

deleteSubject(id:any):Observable<any>
{
  let ids=id;
  return this._http.delete(`${this.apiUrl}/${ids}`,id);

}

//update data
updateSubject(data:any,id:any):Observable<any>
{
  let ids =id;
   return this._http.put(`${this.apiUrl}/${ids}`,data);
}

//get single data
getSubject(id:any ):Observable<any>
{
  let ids = id;
  return this._http.get(`${this.apiUrl}/${ids}`);
}

}
