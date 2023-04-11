import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ExamModel } from '../../core/models/exam.model';
import { HttpExamService } from 'src/app/core/services/http-exam.service';
import { HttpCityService } from 'src/app/core/services/http-city.service';
import { HttpSubjectService } from 'src/app/core/services/http-subject.service';
import { HttpProfesorService } from 'src/app/core/services/http-profesor.service';
import { HttpStudentService } from 'src/app/core/services/http-student.service';
import { HttpExamperiodService } from 'src/app/core/services/http-examperiod.service';
 import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

 import Swal from 'sweetalert2';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  //  exams:any [] = [];
  cities$?: Observable<any[]>;
  subjects$?: Observable<any[]>;
  profesors$?: Observable<any[]>;
  students$?: Observable<any[]>;
  examsperiods$?: Observable<any[]>;

  //cityMap: any;


   currentExam:any = {};
  currentIndex = -1;
  exam = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3,6,9,15];


  // totalLength:any;
  // page:number=1;
  format: string = 'dd-MM-yyyy';
  userForm!: FormGroup;
  examModelObj: ExamModel = new ExamModel();
   showAdd!: boolean;
  showUpdate!: boolean;
  reactiveForm!:FormGroup;
  regArry:any={}
  exams!: any;
  //exam: any;
 // modalService: any;
  selectedExam: any;
  serviceExam: any;

  constructor(private formbuilder: FormBuilder,
    private httpExam:HttpExamService,
    private httpCity:HttpCityService,
    private httpSubject:HttpSubjectService,
    private httpProfesor:HttpProfesorService,
    private httpStudent:HttpStudentService,
    private httpExamperiod:HttpExamperiodService,
    private modalService:NgbModal  ) { }
  errMsg:any

  ngOnInit(): void {
    this.userForm = this.formbuilder.group({

        subject: ['',[Validators.required]],
       profesor: ['',[Validators.required]],
       student: ['',[Validators.required]],
       examperiod: ['',[Validators.required]],
       city: ['',[Validators.required]],
      dateOfExam: ['',[Validators.required]],
       
    })
    this.getAllExam();
    this.loadCities();
    this.loadSubjects();
    this.loadProfesors();
    this.loadStudents();
    this.loadExamsperiods();
  }

  clickdeleteExam(){
    this.deleteExam
  }

  clickAddExam() {
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
  loadProfesors() {
    this.profesors$ = this.httpProfesor.getAllProfesor();
    }
  loadStudents() {
    this.students$ = this.httpStudent.getAllStudent();
    }
  loadExamsperiods() {
    this.examsperiods$ = this.httpExamperiod.getAllExamperiod();
    }

  postExam() {
  
    this.examModelObj = this.userForm.value;
    this.httpExam.postExam(this.examModelObj)
    
    .subscribe(res => {
      console.log(res);
      Swal.fire('Thank you...', 'You Add Subject succesfully!', 'success')
      //alert("Subject Added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.userForm.reset();
      this.getAllExam();
      if(this.userForm.valid){
        console.log(this.userForm.value);
        this.exams.postexam(this.userForm.value)
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
  getAllExam() {
    this.httpExam.getAllExam()
      .subscribe(res => {
        this.exams = res;
      })
  }
  getExam(id:any) {
     
    this.httpExam.getExam(id)
      .subscribe(res => {
        this.exams = res;
      })
    }
  deleteExam(id:any) {
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
        this.httpExam.deleteExam(id)
        .subscribe(res => {
          this.getAllExam();
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
      }
    
     
     });
     }

   onEdit(exam:any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.examModelObj.id = exam.id;
     this.userForm.controls['subject'].setValue(exam.subject);
     this.userForm.controls['profesor'].setValue(exam.profesor);
     this.userForm.controls['student'].setValue(exam.student);
     this.userForm.controls['examperiod'].setValue(exam.examperiod);
     this.userForm.controls['city'].setValue(exam.city);
    this.userForm.controls['dateOfExam'].setValue(exam.dateOfExam);
  }
  updateExam(){
     this.examModelObj.subject = this.userForm.value.subject;
    this.examModelObj.profesor = this.userForm.value.profesor;
    this.examModelObj.student = this.userForm.value.student;
    this.examModelObj.examperiod = this.userForm.value.examperiod;
    this.examModelObj.city = this.userForm.value.city;
    this.examModelObj.dateOfExam = this.userForm.value.dateOfExam;
    this.httpExam.updateExam(this.examModelObj,this.examModelObj.id)
    .subscribe(res => {
      console.log(res);
      Swal.fire('Thank you...', 'You Edit succesfully!', 'success')
      let ref = document.getElementById('cancel')
          ref?.click();
          this.userForm.reset();
        this.getAllExam();
        
      })
    
  }
  showControlError(form: FormGroup,controlName: string) {
    const control = form.get(controlName);
    return control && control!.errors && (control.dirty || control.touched);
  }
  onDetailsClick(exam: any, examDetailsTemplate:TemplateRef<any>) {
    this.selectedExam = exam;
    this.modalService.open(examDetailsTemplate);
  }

  getRequestParams(searchExam: string, page: number, pageSize: number): any {
    let params: any = {};

    if (searchExam) {
      params[`exam`] = searchExam;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveExams(): void {
    const params = this.getRequestParams(this.exam, this.page, this.pageSize);

    this.serviceExam.getAll(params)
    .subscribe(
      (      response: { exams: any; totalItems: any; }) => {
        const { exams, totalItems } = response;
        this.exams = exams;
        this.count = totalItems;
        console.log(response);
      },
      (      error: any) => {
        console.log(error);
      });
  }
   handlePageChange(event: number): void {
     this.page = event;
     this.retrieveExams();
   }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveExams();
    }



   searchExam(): void {
     this.page = 1;
     this.retrieveExams();
   }

}



