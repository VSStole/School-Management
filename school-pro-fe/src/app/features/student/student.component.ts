import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpStudentService } from 'src/app/core/services/http-student.service';
import { StudentModel } from '../../core/models/student.model';
import { HttpCityService } from 'src/app/core/services/http-city.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import Swal from 'sweetalert2';
 


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  @ViewChild('currentYearOfStudy') currentYearOfStudy!: ElementRef;
  serviceCity: any;
  //currentYearOfStudy='';
  cities$?: Observable<any[]>;
  cityMap: any;
 
  onSelected(): void {
  }

  //student: any[] = [];
  currentRow: any = {};
  currentIndex = -1;
  title = '';
 
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9, 15];
  // totalLength:any;
  // page:number=1;
  userForm!: FormGroup;
  studentModelObj: StudentModel = new StudentModel();
  students!: any;
  showAdd!: boolean;
  showUpdate !: boolean;
  reactiveForm!: FormGroup;
  regArry: any = {}
   student: any;
  selectedStudent: any;
  constructor(private formbuilder: FormBuilder,
    private httpStudent:HttpStudentService,
    private httpCity:HttpCityService,
    private modalService:NgbModal
   ) { }

  ngOnInit(): void {
    this.userForm = this.formbuilder.group({
      indexNumber: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      indexYear: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      adress: ['', [Validators.required, Validators.minLength(3)]],
      city: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(5)]],
      currentYearOfStudy: ['', [Validators.required]]
    })

    this.getAllStudent();
    this.loadCities();

  }

  clickdeleteStudent() {
    this.deleteStudent
  }

  clickAddStudent() {
    this.userForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }


  loadCities() {
    this.cities$ = this.httpCity.getAllCity();
  }

  postStudent() {
    this.studentModelObj.id = this.userForm.value;
    this.httpStudent.postStudent(this.studentModelObj.id)
      .subscribe((res) => {
        //console.log(res);
        Swal.fire('Thank you...', 'You Add Subject succesfully!', 'success')
        //alert("Subject Added Successfully")

        this.userForm.reset();
        this.getAllStudent();
        let ref = document.getElementById('cancel')
        ref?.click();
        this.userForm.reset();
        this.getAllStudent();
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
  
  getAllStudent() {
    this.httpStudent.getAllStudent()
      .subscribe((res) => {
        console.log('Get All Data', res);
        this.students = res;
      })
  }



  deleteStudent(id: any) {
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
          this.httpStudent.deleteStudent(id)
            .subscribe((res) => {
              this.getAllStudent();
            })
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
        }

      });
  }


  onEdit(student: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.studentModelObj.id = student.id;
    this.userForm.controls['indexNumber'].setValue(student.indexNumber);
    this.userForm.controls['indexYear'].setValue(student.indexYear)
    this.userForm.controls['firstName'].setValue(student.firstName);
    this.userForm.controls['lastName'].setValue(student.lastName);
    this.userForm.controls['email'].setValue(student.email);
    this.userForm.controls['adress'].setValue(student.adress);
    this.userForm.controls['city'].setValue(student.city);
    this.userForm.controls['currentYearOfStudy'].setValue(student.currentYearOfStudy);
  }


  updateStudent() {
    this.studentModelObj.indexNumber = this.userForm.value.indexNumber;
    this.studentModelObj.indexYear = this.userForm.value.indexYear;
    this.studentModelObj.firstName = this.userForm.value.firstName;
    this.studentModelObj.lastName = this.userForm.value.lastName;
    this.studentModelObj.email = this.userForm.value.email;
    this.studentModelObj.adress = this.userForm.value.adress;
    this.studentModelObj.city = this.userForm.value.city;
    this.studentModelObj.currentYearOfStudy = this.userForm.value.currentYearOfStudy;
    this.httpStudent.updateStudent(this.studentModelObj, this.studentModelObj.id)
      .subscribe((res) => {

        console.log(res);
        //Swal.fire('Thank you...', 'You Edit succesfully!', 'success')
        Swal.fire({
          title: 'Do you want to save the changes?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Save',
          denyButtonText: `Don't save`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            Swal.fire('Saved!', '', 'success')
          } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
          }
        })
        //alert("Update Successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.userForm.reset();
        this.getAllStudent();

      })
  }

  showControlError(form: FormGroup, controlName: string) {
    const control = form.get(controlName);
    return control && control!.errors && (control.dirty || control.touched);
  }

  onDetailsClick(student: any,studentDetailsTemplate:TemplateRef<any>) {
    this.selectedStudent = student;
     this.modalService.open(studentDetailsTemplate);

  }
  getRequestParams(searchStudent: string, page: number, pageSize: number): any {
    let params: any = {};

    if (searchStudent) {
      params[`student`] = searchStudent;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveStudents(): void {
    const params = this.getRequestParams(this.student, this.page, this.pageSize);

    this.serviceCity.getAll(params)
      .subscribe(
        (response: { student: any; totalItems: any; }) => {
          const { student, totalItems } = response;
          this.student = student;
          this.count = totalItems;
          console.log(response);
        },
        (error: any) => {
          console.log(error);
        });
  }
  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveStudents();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveStudents();
  }



  searchStudent(): void {
    this.page = 1;
    this.retrieveStudents();
  }
}