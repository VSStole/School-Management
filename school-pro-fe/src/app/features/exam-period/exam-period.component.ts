import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExamperiodModel } from 'src/app/core/models/exam-period.model';
import { HttpExamperiodService } from 'src/app/core/services/http-examperiod.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-exam-period',
  templateUrl: './exam-period.component.html',
  styleUrls: ['./exam-period.component.css']
})
export class ExamPeriodComponent implements OnInit {
  //  exams:any [] = [];
  @ViewChild('quarter') quarter!: ElementRef;

  onSelected(): void {
  }
  currentExamperiod: any = {};
  currentIndex = -1;
  examperiod = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9, 15];


  // totalLength:any;
  // page:number=1;
  format: string = 'dd-MM-yyyy';
  userForm!: FormGroup;
  examperiodModelObj: ExamperiodModel = new ExamperiodModel();
  showAdd!: boolean;
  showUpdate!: boolean;
  reactiveForm!: FormGroup;
  regArry: any = {}
  examsperiods!: any;
  //exam: any;
  // modalService: any;
  selectedExamperiod: any;
  serviceExamperiod: any;

  constructor(private formbuilder: FormBuilder,
     private httpExamperiod: HttpExamperiodService,
     private modalService:NgbModal) { }
  errMsg: any

  ngOnInit(): void {
    this.userForm = this.formbuilder.group({

      name: ['', [Validators.required]],
      startexam: ['', [Validators.required]],
      finishexam: ['', [Validators.required ]],
      quarter: ['', [Validators.required]],

    })
    this.getAllExamperiod();
  }

  clickdeleteExamperiod() {
    this.deleteExamperiod
  }

  clickAddExamperiod() {
    this.userForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }


  postExamperiod() {
    this.examperiodModelObj = this.userForm.value;
    this.httpExamperiod.postExamperiod(this.examperiodModelObj)
      .subscribe(res => {
        console.log(res);
        Swal.fire('Thank you...', 'You Add Subject succesfully!', 'success')
        //alert("Subject Added Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.userForm.reset();
        this.getAllExamperiod();
        if (this.userForm.valid) {
          console.log(this.userForm.value);
          this.examsperiods.postExamperiod(this.userForm.value)
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
  getAllExamperiod() {
    this.httpExamperiod.getAllExamperiod()
      .subscribe((res) => {
        this.examsperiods = res;
      })
  }
  getExamperiod(id: any) {

    this.httpExamperiod.getExamperiod(id)
      .subscribe((res) => {
        this.examsperiods = res;
      })
  }
  deleteExamperiod(id: any) {
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
          this.httpExamperiod.deleteExamperiod(id)
            .subscribe(res => {
              this.getAllExamperiod();
            })
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
        }


      });
  }

  onEdit(examperiod: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.examperiodModelObj.id = examperiod.id;
    this.userForm.controls['name'].setValue(examperiod.name);
    this.userForm.controls['startexam'].setValue(examperiod.startexam);
    this.userForm.controls['finishexam'].setValue(examperiod.finishexam);
    this.userForm.controls['quarter'].setValue(examperiod.quarter);
  }
  updateExamperiod() {
     this.examperiodModelObj.name = this.userForm.value.name;
    this.examperiodModelObj.startexam = this.userForm.value.startexam;
    this.examperiodModelObj.finishexam = this.userForm.value.finishexam;
    this.examperiodModelObj.quarter = this.userForm.value.quarter;
    this.httpExamperiod.updateExamperiod(this.examperiodModelObj, this.examperiodModelObj.id)
      .subscribe((res) => {
        console.log(res);
        Swal.fire('Thank you...', 'You Edit succesfully!', 'success')
        let ref = document.getElementById('cancel')
        ref?.click();
        this.userForm.reset();
        this.getAllExamperiod();

      })

  }
  showControlError(form: FormGroup, controlName: string) {
    const control = form.get(controlName);
    return control && control!.errors && (control.dirty || control.touched);
  }

  onDetailsClick(examperiod: any,examperiodDetailsTemplate:TemplateRef<any>) {
    this.selectedExamperiod = examperiod;
    this.modalService.open(examperiodDetailsTemplate);
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
    const params = this.getRequestParams(this.examperiod, this.page, this.pageSize);

    this.serviceExamperiod.getAllExamperiod(params)
      .subscribe(
        (response: { examsperiods: any; totalItems: any; }) => {
          const { examsperiods, totalItems } = response;
          this.examsperiods = examsperiods;
          this.count = totalItems;
          console.log(response);
        },
        (error: any) => {
          console.log(error);
        });
  }
  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveExamsperiods();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveExamsperiods();
  }
  retrieveExamsperiods() {
    throw new Error('Method not implemented.');
  }



  searchExamperiod(): void {
    this.page = 1;
    this.retrieveExamsperiods();
  }

}


