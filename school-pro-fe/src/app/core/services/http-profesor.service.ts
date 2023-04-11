import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
//import { identifierName } from '@angular/compiler';
 
@Injectable({
  providedIn: 'root'
})
export class HttpProfesorService{

  constructor(private _http: HttpClient,) {}

  //connect frontend to backend

  apiUrl ='http://localhost:3000/profesor';

//get all data

  getAllProfesor():Observable<any>
  {
    return this._http.get(`${this.apiUrl}`);
  }

//create data

postProfesor(data:any):Observable<any>
{
 // console.log(data,'createapi=>');
return this._http.post(`${this.apiUrl}`,data);
}

//delete data

deleteProfesor(id:any):Observable<any>
{
  let ids=id;
  return this._http.delete(`${this.apiUrl}/${ids}`,id);

}

//update data
updateProfesor(data:any,id:any):Observable<any>
{
  let ids =id;
   return this._http.put(`${this.apiUrl}/${ids}`,data);
}

//get single data
getProfesor(id:any ):Observable<any>
{
  let ids = id;
  return this._http.get(`${this.apiUrl}/${ids}`);
}

}
