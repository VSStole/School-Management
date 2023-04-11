import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
//import { first } from 'rxjs';
import { CityModel } from '../../core/models/city.model';
import { HttpCityService } from 'src/app/core/services/http-city.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
 
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})

export class CityComponent implements OnInit {


 // cities:any [] = [];
  currentRow:any = {};
  currentIndex = -1;
  city= '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3,6,9,15];

   
  userForm!: FormGroup;
  cityModelObj: CityModel = new CityModel();
  showAdd!: boolean;
  showUpdate!: boolean;
  reactiveForm!:FormGroup;
  regArry:any={}
  cities!: any;
  selectedCity: any;
  serviceCity: any;
  allCities$?: Observable<any[]>;

  constructor(private formbuilder: FormBuilder,
     private httpCity: HttpCityService,
     private modalService:NgbModal) { }
  errMsg:any

  ngOnInit(): void {
    this.userForm = this.formbuilder.group({

      zip_code: ['',[Validators.required,Validators.minLength(7)]],
      name: ['',[Validators.required,Validators.minLength(3)]],
       
    })
    this.getAllCity();
  }

  clickdeleteCity(){
    this.deleteCity
  }

  clickAddCity() {
    this.userForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }


  postCity() {
  
    this.cityModelObj = this.userForm.value;
    this.httpCity.postCity(this.cityModelObj)
    
    .subscribe(res => {
      console.log(res);
      Swal.fire('Thank you...', 'You Add Subject succesfully!', 'success')
      //alert("Subject Added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.userForm.reset();
      this.getAllCity();
      if(this.userForm.valid){
        console.log(this.userForm.value);
        this.cities.postCity(this.userForm.value)
      }
   
    },
        err => {
          //sweetAlert("Oops...", "Something went wrong!", "error");
          //Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
 
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>'
          })
          //this.toast.error({detail:"Something Went wrong"})
 // alert("Something Went wrong");
 
        })
  }
  getAllCity() {
    this.httpCity.getAllCity()
      .subscribe((res) => {
        this.cities = res;
      })
  }
  getCity(zip_code:any) {
     
    this.httpCity.getCity(zip_code)
      .subscribe((res) => {
        this.cities = res;
      })
    }
  deleteCity(id:any) {
      Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    })
    .then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        );
        this.httpCity.deleteCity(id)
        .subscribe(res => {
          this.getAllCity();
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
      }
    
     
     });
     }

   onEdit(city:any) {
    this.showAdd = false;
    this.showUpdate = true;
    //this.cityModelObj.zip_code = city.zip_code;
    this.userForm.controls['zip_code'].setValue(city.zip_code);
    this.userForm.controls['name'].setValue(city.name);
  }
  updateCity(){
    this.cityModelObj.zip_code = this.userForm.value.zip_code;
    this.cityModelObj.name = this.userForm.value.name;
    this.httpCity.updateCity(this.cityModelObj,this.cityModelObj.zip_code)
    .subscribe((res) => {
      console.log(res);
      Swal.fire('Thank you...', 'You Edit succesfully!', 'success')
      let ref = document.getElementById('cancel')
          ref?.click();
          this.userForm.reset();
        this.getAllCity();
        
      })
    
  }
  showControlError(form: FormGroup,controlName: string) {
    const control = form.get(controlName);
    return control && control!.errors && (control.dirty || control.touched);
  }
  onDetailsClick(city: any,cityDetailsTemplate:TemplateRef<any>) {
    this.selectedCity = city;
    this.modalService.open(cityDetailsTemplate);
  }

  getRequestParams(searchCity: string, page: number, pageSize: number): any {
    let params: any = {};

    if (searchCity) {
      params[`city`] = searchCity;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveCities(): void {
    const params = this.getRequestParams(this.city, this.page, this.pageSize);

    this.serviceCity.getAll(params)
    .subscribe(
      (      response: { cities: any; totalItems: any; }) => {
        const { cities, totalItems } = response;
        this.cities = cities;
        this.count = totalItems;
        console.log(response);
      },
      (      error: any) => {
        console.log(error);
      });
  }
  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveCities();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveCities();
  }



  searchCity(): void {
    this.page = 1;
    this.retrieveCities();
  }

}

