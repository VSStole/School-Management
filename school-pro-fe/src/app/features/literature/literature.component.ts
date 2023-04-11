import { Component, OnInit,ViewChild,ElementRef, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpLiteratureService } from 'src/app/core/services/http-literature.service';
import { HttpProfesorService } from 'src/app/core/services/http-profesor.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
  import { LiteratureModel } from '../../core/models/literature.model';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-literature',
  templateUrl: './literature.component.html',
  styleUrls: ['./literature.component.css']
})
export class LiteratureComponent implements OnInit{
  profesors$?: Observable<any[]>;

  serviceLiterature: any;
   onSelected():void{
  }
  literature:any [] = [];
  currentliterature:any = {};
  currentIndex = -1;
  literatures = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3,6,9,15];
  userForm!: FormGroup;
  literatureModelObj: LiteratureModel = new LiteratureModel();
  literatureData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  reactiveForm!:FormGroup;
  regArry:any={}
  selectedLiterature:any;
 
  constructor(private formbuilder: FormBuilder,
    private httpLiterature:HttpLiteratureService,
    private modalService:NgbModal,
    private httpProfesor:HttpProfesorService,
    ) { }

  ngOnInit(): void {
    this.userForm = this.formbuilder.group({
      name: ['',[Validators.required,Validators.minLength(3)]],
      author: ['',[Validators.required]],
      profesor: ['',[Validators.required]],
      issn: ['',[Validators.required]],
      pdf: ['',[Validators.required]],
 
    })
    this.getAllLiterature();
  }
  clickAddLiterature() {
    this.userForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  clickdeleteLiterature(){
    this.deleteLiterature
  }

  postLiterature() {
    this.literatureModelObj = this.userForm.value;
    this.httpLiterature.postLiterature(this.literatureModelObj)
    .subscribe(res => {
      console.log(res);
      Swal.fire('Thank you...', 'You Add Literature succesfully!', 'success')
       let ref = document.getElementById('cancel')
      ref?.click();
      this.userForm.reset();
      this.getAllLiterature();
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
  getAllLiterature() {
    this.httpLiterature.getAllLiterature()
      .subscribe(res => {
        this.literatures = res;
      })
  }
  deleteLiterature(id:any) {
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
        this.httpLiterature.deleteLiterature(id)
        .subscribe(res => {
          this.getAllLiterature();
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
      }
    
     
     });
     }

   onEdit(literature:any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.literatureModelObj.id = literature.id;
    this.userForm.controls['name'].setValue(literature.name);
    this.userForm.controls['author'].setValue(literature.author);
    this.userForm.controls['profesor'].setValue(literature.profesor);
    this.userForm.controls['issn'].setValue(literature.issn);
    this.userForm.controls['pdf'].setValue(literature.pdf);
     }

   


  updateLiterature() {
    this.literatureModelObj.name = this.userForm.value.name;
    this.literatureModelObj.author = this.userForm.value.author;
    this.literatureModelObj.profesor = this.userForm.value.profesor;
    this.literatureModelObj.issn = this.userForm.value.issn;
    this.literatureModelObj.pdf = this.userForm.value.pdf;
     this.httpLiterature.updateLiterature(this.literatureModelObj, this.literatureModelObj.id)
    .subscribe((res) => {
      console.log(res);
      Swal.fire('Thank you...', 'You Edit succesfully!', 'success')
      let ref = document.getElementById('cancel')
          ref?.click();
          this.userForm.reset();
        this.getAllLiterature();
        
      })
 
  
  
    }
    showControlError(form: FormGroup,controlName: string) {
      const control = form.get(controlName);
      return control && control!.errors && (control.dirty || control.touched);
    }
    onDetailsClick(literatures: any,literatureDetailsTemplate:TemplateRef<any>) {
      this.selectedLiterature = literatures;
       this.modalService.open(literatureDetailsTemplate);
    
    }
    getRequestParams(searchLiterature: string, page: number, pageSize: number): any {
      let params: any = {};
    
      if (searchLiterature) {
        params[`literature`] = searchLiterature;
      }
    
      if (page) {
        params[`page`] = page - 1;
      }
    
      if (pageSize) {
        params[`size`] = pageSize;
      }
    
      return params;
    }
    
    retrieveLiterature(): void {
      const params = this.getRequestParams(this.literatures, this.page, this.pageSize);
    
      this.serviceLiterature.getAll(params)
      .subscribe(
        (      response: { literatures: any; totalItems: any; }) => {
          const { literatures, totalItems } = response;
          this.literatures = literatures;
          this.count = totalItems;
          console.log(response);
        },
        (      error: any) => {
          console.log(error);
        });
    }
    handlePageChange(event: number): void {
      this.page = event;
      this.retrieveLiterature();
    }
    
    handlePageSizeChange(event: any): void {
      this.pageSize = event.target.value;
      this.page = 1;
      this.retrieveLiterature();
    }
    
    
    
    searchLiterature(): void {
      this.page = 1;
      this.retrieveLiterature();
    }
    downloadPdf(fileName: string) {
    //   this.http.get(`/literature/${fileName}`, {
    //     responseType: 'blob'
    //   }).subscribe(
    //     data => {
    //       const blob = new Blob([data], { type: 'public/pdf' });
    //       const fileURL = URL.createObjectURL(blob);
    //       window.open(fileURL);
    //     }
    //   );
    // }
   
  }


}



