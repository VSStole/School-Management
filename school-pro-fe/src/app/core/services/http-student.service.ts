import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
//import { identifierName } from '@angular/compiler';
 
@Injectable({
  providedIn: 'root'
})
export class HttpStudentService{

  constructor(private _http: HttpClient,) {}

  //connect frontend to backend

  apiUrl ='http://localhost:3000/student';

//get all data

  getAllStudent():Observable<any>
  {
    return this._http.get(`${this.apiUrl}`);
  }

//create data

postStudent(data:any):Observable<any>
{
 // console.log(data,'createapi=>');
return this._http.post(`${this.apiUrl}`,data);
}

//delete data

deleteStudent(id:any):Observable<any>
{
  let ids=id;
  return this._http.delete(`${this.apiUrl}/${ids}`,id);

}

//update data
updateStudent(data:any,id:any):Observable<any>
{
  let ids =id;
   return this._http.put(`${this.apiUrl}/${ids}`,data);
}

//get single data
getStudent(id:any ):Observable<any>
{
  let ids = id;
  return this._http.get(`${this.apiUrl}/${ids}`);
}

}



