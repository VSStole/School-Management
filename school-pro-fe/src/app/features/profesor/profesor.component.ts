import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
//import { first } from 'rxjs';
import { HttpProfesorService } from '../../core/services/http-profesor.service';
import { HttpCityService } from 'src/app/core/services/http-city.service';
import { HttpSubjectService } from 'src/app/core/services/http-subject.service';
import { ProfesorModel, } from '../../core/models/profesor.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { CityModel } from 'src/app/core/models/city.model';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent implements OnInit {
  @ViewChild('title')title!: ElementRef;
   serviceProfesor: any;
  onSelected(): void {
  }

  cities$?: Observable<any[]>;
  subjects$?: Observable<any[]>;
  cityMap: Map<string, any> = new Map();
  
 
  cityData: any[] = [];
  currentRow: any = {};
  currentIndex = -1;
  profesor = '';
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9, 15];
  format: string = 'dd-MM-yyyy';
  userForm!: FormGroup;
  profesorModelObj: ProfesorModel = new ProfesorModel();
 // cityModelObj:CityModel=new CityModel();
  profesors!: any;
  showAdd!: boolean;
  showUpdate !: boolean;
  reactiveForm!: FormGroup;
  selectedProfesor: any;

  // profesor:any;
  // totalLength: any;
  // page: number = 1;
  //cityForm?:FormGroup;
  // cityMap: any;
  //currentYearOfStudy='';
  //httpCity: any;

  constructor(private formbuilder: FormBuilder,
    private httpProfesor: HttpProfesorService,
    private httpCity: HttpCityService,
    private httpSubject: HttpSubjectService,
    private modalService:NgbModal

  ) { }



  ngOnInit(): void {

    this.userForm = this.formbuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      adress: ['', [Validators.required, Validators.minLength(3)]],
      city: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(9)]],
      reelectionDate: ['', [Validators.required]],
      title: ['', [Validators.required]],
      subject: ['', [Validators.required]],


    })

    this.getAllProfesor();
    this.loadSubjects();

    this.loadCities();
 
 
  }

  clickdeleteProfesor() {
    this.deleteProfesor
  }

  clickAddProfesor() {
    this.userForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  loadCities() {
    this.cities$ = this.httpCity.getAllCity();
  }
  loadSubjects() {
    this.subjects$ = this.httpSubject.getAllSubject();
  }



  // loadCitiess() {
  //   this.httpCity.getAllCity().subscribe(
  //     cities => cities.forEach((city: { zip_code: any; }) => this.cityMap.set(city.zip_code, city))
  //   )
  // }


  postProfesor() {
    this.profesorModelObj = this.userForm.value;
    this.httpProfesor.postProfesor(this.profesorModelObj)
      .subscribe((res) => {
        //console.log(res);
        Swal.fire('Thank you...', 'You Add Subject succesfully!', 'success')
        //alert("Subject Added Successfully")

        this.userForm.reset();
        this.getAllProfesor();
        let ref = document.getElementById('cancel')
        ref?.click();
        this.userForm.reset();
        this.getAllProfesor();
      },

        err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>'

          })


        }
      )
  }


  getAllProfesor() {
    this.httpProfesor.getAllProfesor()
      .subscribe((res) => {
        this.profesors = res;
      })
  }
  deleteProfesor(id: any) {
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
          this.httpProfesor.deleteProfesor(id)
            .subscribe(res => {
              this.getAllProfesor();
            })
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
        }

      });
  }
  onEdit(profesor: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.profesorModelObj.id = profesor.id;
    this.userForm.controls['firstName'].setValue(profesor.firstName);
    this.userForm.controls['lastName'].setValue(profesor.lastName);
    this.userForm.controls['email'].setValue(profesor.email);
    this.userForm.controls['adress'].setValue(profesor.adress);
    this.userForm.controls['city'].setValue(profesor.city);
    this.userForm.controls['phone'].setValue(profesor.phone);
    this.userForm.controls['reelectionDate'].setValue(profesor.reelectionDate);
    this.userForm.controls['title'].setValue(profesor.title);
    this.userForm.controls['subject'].setValue(profesor.subject);

  }
  updateProfesor() {
    this.profesorModelObj.firstName = this.userForm.value.firstName;
    this.profesorModelObj.lastName = this.userForm.value.lastName;
    this.profesorModelObj.email = this.userForm.value.email;
    this.profesorModelObj.adress = this.userForm.value.adress;
    this.profesorModelObj.city = this.userForm.value.city;
    this.profesorModelObj.phone = this.userForm.value.phone;
    this.profesorModelObj.reelectionDate = this.userForm.value.reelectionDate;
    this.profesorModelObj.title = this.userForm.value.title;
    this.profesorModelObj.subject = this.userForm.value.subject;
    this.httpProfesor.updateProfesor(this.profesorModelObj, this.profesorModelObj.id)
      .subscribe(res => {
        console.log(res);
        // Swal.fire('Thank you...', 'You Edit succesfully!', 'success')

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
        //alert("Update Successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.userForm.reset();
        this.getAllProfesor();

      })
  }

  showControlError(form: FormGroup, controlName: string) {
    const control = form.get(controlName);
    return control && control!.errors && (control.dirty || control.touched);
  }

  onDetailsClick(profesor: any,profesorDetailsTemplate:TemplateRef<any>) {
    this.selectedProfesor = profesor;
    this.modalService.open(profesorDetailsTemplate);
  }

  getRequestParams(searchProfesor: string, page: number, pageSize: number): any {
    let params: any = {};

    if (searchProfesor) {
      params[`title`] = searchProfesor;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveProfesors(): void {
    const params = this.getRequestParams(this.profesor, this.page, this.pageSize);

    this.serviceProfesor.getAll(params)
      .subscribe(
        (response: { profesors: any; totalItems: any; }) => {
          const { profesors, totalItems } = response;
          this.profesors = profesors;
          this.count = totalItems;
          console.log(response);
        },
        (error: any) => {
          console.log(error);
        });
  }
  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveProfesors();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveProfesors();
  }



  searchProfesor(): void {
    this.page = 1;
    this.retrieveProfesors();
  }


}



