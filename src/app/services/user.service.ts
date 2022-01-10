import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {UserModel} from "../models/user-model";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {ActivatedRouteSnapshot} from "@angular/router";
import {environment} from "../../environments/environment";
import {CookieService} from "ngx-cookie-service";
import {UserLoginModel} from "../models/user-login-model";
import {Employee} from "../models/employee";
import {AccessControl} from "../models/access-control";

@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate{


  // @ts-ignore
  private userInfoSubject ?: BehaviorSubject<UserModel>;
  public currentUser$ : Observable<UserModel>;
  static USER_INFO = 'USER_INFO';
  userDataModel = new UserModel()
  private isAdmin: boolean = false;
  private userAccessSubject ?: BehaviorSubject<AccessControl>;
  public currentAccessList$ : Observable<AccessControl>;
  static USER_ACCESS_INFO = 'USER_ACCESS_INFO';
  accessControlList = new AccessControl();

//
  constructor(private cookieService: CookieService, private router: Router, private httpClient: HttpClient) {
    const jsonString= this.cookieService.get(UserService.USER_INFO);
    if (jsonString === '') {
      // @ts-ignore
      this.userInfoSubject = new BehaviorSubject<UserModel>(null);
      // @ts-ignore
      this.userAccessSubject = new BehaviorSubject<AccessControl>(null);
    } else {
      this.userInfoSubject = new BehaviorSubject<UserModel>(JSON.parse(this.cookieService.get(UserService.USER_INFO)));
      this.userAccessSubject = new BehaviorSubject<AccessControl>(JSON.parse(this.cookieService.get(UserService.USER_ACCESS_INFO)));
    }
    this.currentUser$ = this.userInfoSubject.asObservable();
    this.currentAccessList$ = this.userAccessSubject.asObservable();
  }

  /**
   * =====================================================
   * This canActivate method is overriden and will work
   * for handling the logic of checking if a user is
   * logged in or not, and will perform necessary actions.
   * Only implementing this method is not enough. We will
   * also have to add canActivate: attribute in our routes
   * definition.
   * =====================================================
   * */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.checkAuthentication();
    if (this.currentUserValue != null) {
      return true;
    } else {
      location.href = '/login'
      return false;
    }
  }

  public get currentUserAccessValue(){
    // @ts-ignore
    return this.userAccessSubject.value;
  }

  public get currentUserValue() {
    // @ts-ignore
    return this.userInfoSubject.value;
  }

  private checkAuthentication() {
    const jsonString = this.cookieService.get(UserService.USER_INFO);
    if (jsonString === '') {
      // @ts-ignore
      this.userInfoSubject.next(null);
      // @ts-ignore
      this.userInfoSubject = new BehaviorSubject<UserModel>(null);
      this.currentUser$ = this.userInfoSubject.asObservable();
    } else {
      this.userInfoSubject = new BehaviorSubject<UserModel>(JSON.parse(this.cookieService.get(UserService.USER_INFO)));
    }
  }

  logout() {
    // Delete the cookie
    this.cookieService.delete(UserService.USER_INFO);
    localStorage.clear()
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('isAdmin')
    // @ts-ignore
    this.userInfoSubject.next(null);
  }

  login(username : string, password : string) : Observable<HttpResponse<UserModel>>{

    const userLoginData = new UserLoginModel();
    userLoginData.username = username
    userLoginData.password = password

    let observableUser = this.httpClient.post<UserLoginModel>(environment.BASE_URL + '/login', userLoginData,{observe : 'response'});

    observableUser.subscribe(data =>{
      this.userDataModel = data.body ? data.body : new UserModel()
      // @ts-ignore
      this.userInfoSubject.next(this.userDataModel);
      this.cookieService.set(UserService.USER_INFO, JSON.stringify(this.userDataModel));

       this.fetchAllAccessList(this.userDataModel.id+"").subscribe(
         data => {
           // @ts-ignore
           this.userAccessSubject.next(this.accessControlList);
           this.cookieService.set(UserService.USER_ACCESS_INFO, JSON.stringify(this.accessControlList));
         }, error => {
           console.log(error);
         }
       )

      return observableUser;
    }, error => {
      return null;
    });
    return observableUser;

  }

  /*

    login(email: string, password: string): Observable<UserModel> | null {
      const url = '/user/login';
      if (email === 'rony@gmail.com' && password === 'secret') {
        const userModel = new UserModel()
        userModel.username = 'rony'
        userModel.email = 'rony@gmail.com'
        userModel.token = 'test-token'
        const userObservable = new Observable<UserModel>(observer => {
          observer.next( userModel )
          observer.complete()
        });
        this.cookieService.set(UserService.USER_INFO, JSON.stringify(userModel));
        // @ts-ignore
        this.userInfoSubject.next(userModel);
        return userObservable;
      } else {
        throw new Error("Failed to log in")
      }
      /!*return this.httpClient.post<UserModel>(environment.AUTH_SERVER + url, {username, password})
        .pipe(
          map(userModel => {
            this.cookieService.set(UserService.USER_INFO, JSON.stringify(userModel));
            this.userInfoSubject.next(userModel);
            return userModel;
          })
        );*!/
    }
  */



  checkAdmin() : boolean {
    this.currentUser$.subscribe(user =>{
      if(user.roles?.includes("ADMIN")){
        this.isAdmin = true;
      }
    }, error => {

    });
    return  this.isAdmin;
  }

  fetchAllAccessList(id : string) : Observable<HttpResponse<AccessControl>> {

    return this.httpClient.get<AccessControl>(environment.BASE_URL+"/accessControls/"+id, {observe:'response'});
  }

  fetchAllUsers(): Observable<HttpResponse<UserModel[]>> {
    // @ts-ignore
    return this.httpClient.get<UserModel[]>(environment.BASE_URL + '/users/all',{observe : 'response'});
  }

  getById(id: string): Observable<HttpResponse<UserModel>>{
    return this.httpClient.get<UserModel>(environment.BASE_URL+'/users/'+id, {observe:'response'});
  }

  downloadAllUsersPdf(): Observable<HttpResponse<any>> {
    // @ts-ignore
    return this.httpClient.get<any>(environment.BASE_URL + '/users/download/pdf',{observe : 'response'});
  }

  downloadAllUsersExcel(): Observable<HttpResponse<any>> {
    // @ts-ignore
    return this.httpClient.get<any>(environment.BASE_URL + '/download/users/excel',{observe : 'response'});
  }



  // @ts-ignore
  registerUser(userDataModel : userModel): Observable<HttpResponse<UserModel>> {
    // Todo work for registration here

    return this.httpClient.post<UserModel>(environment.BASE_URL + '/register', userDataModel,{observe : 'response'});


    /*
    const url = '/user/create';
      return this.httpClient.post<UserModel>(environment.AUTH_SERVER + url, formData)
        .pipe(
          map(userModel => {
            this.cookieService.set(AuthenticationService.USER_INFO, JSON.stringify(userModel));
            this.userInfoSubject.next(userModel);
            return userModel;
          })
        );
        */
  }

  updateAccessControlList(userId : number, accessControl: AccessControl) : Observable<HttpResponse<AccessControl>>  {
    console.log("data to be updated : ")
    console.log(accessControl)
    return this.httpClient.put<AccessControl>(environment.BASE_URL+"/accessControls/"+userId, accessControl, {observe:'response'});
  }
}
