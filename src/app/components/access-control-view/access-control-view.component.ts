import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {AccessControl} from "../../models/access-control";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-access-control-view',
  templateUrl: './access-control-view.component.html',
  styleUrls: ['./access-control-view.component.css']
})
export class AccessControlViewComponent implements OnInit {

  accessControl : AccessControl = new AccessControl();
  editAccessControl : AccessControl = new AccessControl();
  public isAdmin : boolean = false;
  userId : number = 0;
  message : string = ''
  alertType : string = ''
  display : boolean = false

  constructor(private userService : UserService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    console.log("user id")
    this.userId = this.route.snapshot.params.id;
    console.log(this.userId)
    this.userService.fetchAllAccessList(this.route.snapshot.params.id+"").subscribe(
      data =>{
        // @ts-ignore
        this.accessControl = data.body;
        console.log("main access control list :")
        console.log(this.accessControl)
        this.initializeFormWithData();
      }, error => {
        console.log(error)
      }
    );

    if(localStorage.getItem("isAdmin")?.includes("admin")){
      this.isAdmin = true;
    }
  }

  initializeFormWithData() {
    console.log("init")
    console.log(this.accessControl.cus_address)
    this.accessControlForm.get('cus_address')?.setValue(this.accessControl.cus_address);
    this.accessControlForm.get('cus_website')?.setValue(this.accessControl.cus_website);
    this.accessControlForm.get('cus_credit_limit')?.setValue(this.accessControl.cus_credit_limit);
    this.accessControlForm.get('emp_email')?.setValue(this.accessControl.emp_email);
    this.accessControlForm.get('emp_phone')?.setValue(this.accessControl.emp_phone);
    this.accessControlForm.get('emp_job_title')?.setValue(this.accessControl.emp_job_title);
    this.accessControlForm.get('emp_hire_date')?.setValue(this.accessControl.emp_hire_date);
    this.accessControlForm.get('emp_manager_id')?.setValue(this.accessControl.emp_manager_id);
  }

  accessControlForm = new FormGroup({
    cus_website : new FormControl(),
    cus_address : new FormControl(),
    cus_credit_limit : new FormControl(),
    emp_email : new FormControl(),
    emp_phone : new FormControl(),
    emp_job_title : new FormControl(),
    emp_hire_date : new FormControl(),
    emp_manager_id : new FormControl(),
  });


  updateAccessControl(AccessControls : any) {
    this.editAccessControl.id = this.route.snapshot.params.id;
    this.editAccessControl.cus_website = (this.cus_website?.value);
    this.editAccessControl.cus_address = (this.cus_address?.value);
    this.editAccessControl.cus_credit_limit = (this.cus_credit_limit?.value);
    this.editAccessControl.emp_email = (this.emp_email?.value);
    this.editAccessControl.emp_phone = (this.emp_phone?.value);
    this.editAccessControl.emp_job_title = (this.emp_job_title?.value);
    this.editAccessControl.emp_hire_date = (this.emp_hire_date?.value);
    this.editAccessControl.emp_manager_id = (this.emp_manager_id?.value);

    console.log("your submitted data : ")
    console.log(this.editAccessControl);

    this.userService.updateAccessControlList(this.userId, this.editAccessControl)
      .subscribe(
      data=>{
        console.log(data)
        this.message = "update success"
        this.alertType = 'success'
        this.displayAction()
    }, error => {
        console.log(error)
        this.message = "update failed"
        this.alertType = 'danger'
        this.displayAction()
    });

  }

  get emp_email(){
    return this.accessControlForm.get('emp_email');
  }
  get emp_phone(){
    return this.accessControlForm.get('emp_phone');
  }
  get emp_job_title(){
    return this.accessControlForm.get('emp_job_title');
  }
  get emp_hire_date(){
    return this.accessControlForm.get('emp_hire_date');
  }
  get emp_manager_id(){
    return this.accessControlForm.get('emp_manager_id');
  }

  get cus_website(){
    return this.accessControlForm.get('cus_website');
  }

  get cus_address(){
    return this.accessControlForm.get('cus_address');
  }

  get cus_credit_limit(){
    return this.accessControlForm.get('cus_credit_limit');
  }

  displayAction() {
    // @ts-ignore
    setTimeout(() => {
      this.display = false;
    }, 5000);
    this.display = true;
  }

}
