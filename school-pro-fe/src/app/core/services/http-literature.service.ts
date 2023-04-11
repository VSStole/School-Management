import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
  
@Injectable({
  providedIn: 'root'
})
export class HttpLiteratureService
 {

  constructor(private _http: HttpClient,) {}

  //connect frontend to backend

  apiUrl ='http://localhost:3000/literature';

//get all data

  getAllLiterature():Observable<any>
  {
    return this._http.get(`${this.apiUrl}`);
  }

//create data

postLiterature(data:any):Observable<any>
{
 
return this._http.post(`${this.apiUrl}`,data);
}

//delete data

deleteLiterature(id:any):Observable<any>
{
  let ids=id;
  return this._http.delete(`${this.apiUrl}/${ids}`,id);

}

//update data
updateLiterature(data:any,id:any):Observable<any>
{
  let ids =id;
   return this._http.put(`${this.apiUrl}/${ids}`,data);
}

//get single data
getLiterature(id:any ):Observable<any>
{
  let ids = id;
  return this._http.get(`${this.apiUrl}/${ids}`);
}

}
