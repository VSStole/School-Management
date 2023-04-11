import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpGradeService } from 'src/app/core/services/http-grade.service';
import { GradeModel } from 'src/app/core/models/grade.model';
import { HttpSubjectService } from 'src/app/core/services/http-subject.service';
import { HttpProfesorService } from 'src/app/core/services/http-profesor.service';
import { HttpStudentService } from 'src/app/core/services/http-student.service';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit {
  // @ViewChild('grade') grade!: ElementRef;
  

  subjects$?: Observable<any[]>;
  profesors$?: Observable<any[]>;
  students$?: Observable<any[]>;

  serviceGrade: any;
  onSelected(): void {

  }
  grades: any[] = [];
  currentgrade: any = {};
  currentIndex = -1;
  grade = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9, 15];
  userForm!: FormGroup;
  gradeModelObj: GradeModel = new GradeModel();
  gradeData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  reactiveForm!: FormGroup;
  regArry: any = {}
  selectedGrade: any;

  constructor(private formbuilder: FormBuilder,
    private httpGrade: HttpGradeService,
    private httpSubject: HttpSubjectService,
    private httpProfesor: HttpProfesorService,
    private httpStudent: HttpStudentService,
    private modalService:NgbModal) { }

  ngOnInit(): void {
    this.userForm = this.formbuilder.group({
      student: ['', [Validators.required, Validators.minLength(3)]],
      subject: ['', [Validators.required]],
      profesor: ['', [Validators.required]],
      grade: ['', [Validators.required]],

    })
    this.getAllGrade();  
    this.loadSubjects();
    this.loadProfesors();
    this.loadStudents();

  }
  loadSubjects() {
    this.subjects$ = this.httpSubject.getAllSubject();
    }
  loadProfesors() {
    this.profesors$ = this.httpProfesor.getAllProfesor();
    }
  loadStudents() {
    this.students$ = this.httpStudent.getAllStudent();
    }


  clickAddGrade() {
    this.userForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  clickdeleteGrade() {
    this.deleteGrade
  }

  postGrade() {
    this.gradeModelObj = this.userForm.value;
    this.httpGrade.postGrade(this.gradeModelObj)
      .subscribe(res => {
        console.log(res);
        Swal.fire('Thank you...', 'You Add Grade succesfully!', 'success')
        let ref = document.getElementById('cancel')
        ref?.click();
        this.userForm.reset();
        this.getAllGrade();
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
  getAllGrade() {
    this.httpGrade.getAllGrade()
      .subscribe(res => {
        this.grades = res;
      })
  }
  deleteGrade(id: any) {
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
          this.httpGrade.deleteGrade(id)
            .subscribe(res => {
              this.getAllGrade();
            })
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
        }


      });
  }

  onEdit(grade: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.gradeModelObj.id = grade.id;
    this.userForm.controls['student'].setValue(grade.student);
    this.userForm.controls['subject'].setValue(grade.subject);
    this.userForm.controls['profesor'].setValue(grade.profesor);
    this.userForm.controls['grade'].setValue(grade.grade);
  }




  updateGrade() {
    this.gradeModelObj.student = this.userForm.value.student;
    this.gradeModelObj.subject = this.userForm.value.subject;
    this.gradeModelObj.profesor = this.userForm.value.profesor;
    this.gradeModelObj.grade = this.userForm.value.grade;
    this.httpGrade.updateGrade(this.gradeModelObj, this.gradeModelObj.id)
      .subscribe((res) => {
        console.log(res);
        Swal.fire('Thank you...', 'You Edit succesfully!', 'success')
        let ref = document.getElementById('cancel')
        ref?.click();
        this.userForm.reset();
        this.getAllGrade();

      })



  }
  showControlError(form: FormGroup, controlName: string) {
    const control = form.get(controlName);
    return control && control!.errors && (control.dirty || control.touched);
  }
  onDetailsClick(grade: any,gradeDetailsTemplate:TemplateRef<any>) {
    this.selectedGrade = grade;
    this.modalService.open(gradeDetailsTemplate);
  }
  getRequestParams(searchGrade: string, page: number, pageSize: number): any {
    let params: any = {};

    if (searchGrade) {
      params[`grade`] = searchGrade;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveGrades(): void {
    const params = this.getRequestParams(this.grade, this.page, this.pageSize);

    this.serviceGrade.getAll(params)
      .subscribe(
        (response: { grades: any; totalItems: any; }) => {
          const { grades, totalItems } = response;
          this.grades = grades;
          this.count = totalItems;
          console.log(response);
        },
        (error: any) => {
          console.log(error);
        });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveGrades();
  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveGrades();
  }
  searchGrade(): void {
    this.page = 1;
    this.retrieveGrades();
  }


}







