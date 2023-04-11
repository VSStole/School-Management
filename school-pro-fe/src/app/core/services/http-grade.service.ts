import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
  
@Injectable({
  providedIn: 'root'
})
export class HttpGradeService
 {
  getAll(params: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private _http: HttpClient,) {}

  //connect frontend to backend

  apiUrl ='http://localhost:3000/Grade';

//get all data

  getAllGrade():Observable<any>
  {
    return this._http.get(`${this.apiUrl}`);
  }

//create data

postGrade(data:any):Observable<any>
{
 
return this._http.post(`${this.apiUrl}`,data);
}

//delete data

deleteGrade(id:any):Observable<any>
{
  let ids=id;
  return this._http.delete(`${this.apiUrl}/${ids}`,id);

}

//update data
updateGrade(data:any,id:any):Observable<any>
{
  let ids =id;
   return this._http.put(`${this.apiUrl}/${ids}`,data);
}

//get single data
getGrade(id:any ):Observable<any>
{
  let ids = id;
  return this._http.get(`${this.apiUrl}/${ids}`);
}

}
