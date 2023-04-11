import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
 
//import { identifierName } from '@angular/compiler';
 
@Injectable({
  providedIn: 'root'
})

export class HttpCityService{
  constructor(private _http: HttpClient,) {}

    apiUrl ='http://localhost:3000/city';
    

    //get all data
    
      getAllCity():Observable<any>
      {
        return this._http.get(`${this.apiUrl}`);
      }

      //post data
      postCity(data:any):Observable<any>
      {
       
      return this._http.post(`${this.apiUrl}`,data);
      }
      
      //delete data
      
      deleteCity(zip_code:any):Observable<any>
      {
        let ids=zip_code;
        return this._http.delete(`${this.apiUrl}/${ids}`,zip_code);
      
      }
      
      //update data
      updateCity(data:any,zip_code:any):Observable<any>
      {
        let ids =zip_code;
         return this._http.put(`${this.apiUrl}/${ids}`,data);
      }
 
    //get single data
    getCity(zip_code:any ):Observable<any>
    {
      let ids = zip_code;
      return this._http.get(`${this.apiUrl}/${ids}`);
    }
    
    }
    
    
    