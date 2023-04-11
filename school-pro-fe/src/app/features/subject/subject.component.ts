import { Component, OnInit,ViewChild,ElementRef, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpSubjectService } from 'src/app/core/services/http-subject.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { first } from 'rxjs';
 import { SubjectModel } from '../../core/models/subject.model';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})

export class SubjectComponent implements OnInit {
  @ViewChild('semester')semester!:ElementRef;
  //semester='';
  @ViewChild('yearOfStudy')YearOfStudy!:ElementRef;
  serviceCity: any;
  toast: any;
  //currentYearOfStudy='';
  
  
  onSelected():void{
  }
  subjects:any [] = [];
  currentsubject:any = {};
  currentIndex = -1;
  subject = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3,6,9,15];
  // totalLength:any;
  // page:number=1;
  userForm!: FormGroup;
  subjectModelObj: SubjectModel = new SubjectModel();
  subjectData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  reactiveForm!:FormGroup;
  regArry:any={}
  //subject:any;
  selectedSubject:any;

  constructor(private formbuilder: FormBuilder,
    private httpSubject:HttpSubjectService,
    private modalService:NgbModal  ) { }

  ngOnInit(): void {
    this.userForm = this.formbuilder.group({
      name: ['',[Validators.required,Validators.minLength(3)]],
      description: ['',[Validators.required]],
      noOfESP: ['',[Validators.required]],
      yearOfStudy: ['',[Validators.required]],
      semester: ['',[Validators.required]],

    })
    this.getAllSubject();
  }
  clickAddSubject() {
    this.userForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  clickdeleteSubject(){
    this.deleteSubject
  }

  postSubject() {
    this.subjectModelObj = this.userForm.value;
    this.httpSubject.postSubject(this.subjectModelObj)
    .subscribe(res => {
      console.log(res);
      Swal.fire('Thank you...', 'You Add Subject succesfully!', 'success')
      //alert("Subject Added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.userForm.reset();
      this.getAllSubject();
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
          this.toast.error({detail:"Something Went wrong"})
 // alert("Something Went wrong");
 
        })
  }
  getAllSubject() {
    this.httpSubject.getAllSubject()
      .subscribe(res => {
        this.subjects = res;
      })
  }
  deleteSubject(id: any) {
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
        this.httpSubject.deleteSubject(id)
        .subscribe(res => {
          this.getAllSubject();
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
      }
    
     
     });
     }

   onEdit(subject:any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.subjectModelObj.id = subject.id;
    this.userForm.controls['name'].setValue(subject.name);
    this.userForm.controls['description'].setValue(subject.description);
    this.userForm.controls['noOfESP'].setValue(subject.noOfESP);
    this.userForm.controls['yearOfStudy'].setValue(subject.yearOfStudy);
    this.userForm.controls['semester'].setValue(subject.semester);
    }

   


  updateSubject() {
    this.subjectModelObj.name = this.userForm.value.name;
    this.subjectModelObj.description = this.userForm.value.description;
    this.subjectModelObj.noOfESP = this.userForm.value.noOfESP;
    this.subjectModelObj.yearOfStudy = this.userForm.value.yearOfStudy;
    this.subjectModelObj.semester = this.userForm.value.semester;
    this.httpSubject.updateSubject(this.subjectModelObj, this.subjectModelObj.id)
    .subscribe((res) => {
      console.log(res);
      Swal.fire('Thank you...', 'You Edit succesfully!', 'success')
      let ref = document.getElementById('cancel')
          ref?.click();
          this.userForm.reset();
        this.getAllSubject();
        
      })
 
  
  
    }
    showControlError(form: FormGroup,controlName: string) {
      const control = form.get(controlName);
      return control && control!.errors && (control.dirty || control.touched);
    }
    onDetailsClick(subject: any,subjectDetailsTemplate:TemplateRef<any>) {
      this.selectedSubject = subject;
       this.modalService.open(subjectDetailsTemplate);
    
    }
    getRequestParams(searchSubject: string, page: number, pageSize: number): any {
      let params: any = {};
    
      if (searchSubject) {
        params[`subject`] = searchSubject;
      }
    
      if (page) {
        params[`page`] = page - 1;
      }
    
      if (pageSize) {
        params[`size`] = pageSize;
      }
    
      return params;
    }
    
    retrieveSubjects(): void {
      const params = this.getRequestParams(this.subject, this.page, this.pageSize);
    
      this.serviceCity.getAll(params)
      .subscribe(
        (      response: { subjects: any; totalItems: any; }) => {
          const { subjects, totalItems } = response;
          this.subjects = subjects;
          this.count = totalItems;
          console.log(response);
        },
        (      error: any) => {
          console.log(error);
        });
    }
    handlePageChange(event: number): void {
      this.page = event;
      this.retrieveSubjects();
    }
    
    handlePageSizeChange(event: any): void {
      this.pageSize = event.target.value;
      this.page = 1;
      this.retrieveSubjects();
    }
    
    
    
    searchSubject(): void {
      this.page = 1;
      this.retrieveSubjects();
    }
  }




