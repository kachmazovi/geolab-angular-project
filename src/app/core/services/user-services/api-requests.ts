import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { catchError, delay, Observable, of, switchMap, tap } from 'rxjs';
import { IUser, IUserInfo } from '../../../shared/interfaces/users.interface';
import { ErrorService } from '../error-service';
import { SpinnerService } from '../spinner-service';

export const baseUrl = 'http://localhost:3000';

@Service()
export class ApiRequests {
  private http = inject(HttpClient);
  private errorServ = inject(ErrorService);
  private spinnerServ = inject(SpinnerService);
  private users = signal<IUserInfo[]>([]);

  public getUsers(): Observable<IUserInfo[]> {
    this.spinnerServ.$spinnerOn.next(true);

    return this.http.get<IUserInfo[]>(`${baseUrl}/users`).pipe(
      delay(2000),
      tap(
        (users: IUserInfo[]) => {
          this.users.set(users);
          this.spinnerServ.$spinnerOn.next(false);
        },
        () => {
          this.errorServ.setErrMsg('Http Request Error');
          this.errorServ.clearMsg();
          this.spinnerServ.$spinnerOn.next(false);
        },
      ),
    );
  }

  public login(): Observable<IUserInfo[]> {
    return this.getUsers();
  }

  public register(userInfo: IUserInfo): Observable<IUserInfo[] | IUserInfo> {
    this.spinnerServ.$spinnerOn.next(true);

    return this.getUsers().pipe(
      delay(2000),
      switchMap((usersInfo) => {
        const findedUser = usersInfo.find(
          (user) => user.email === userInfo.email || user.mobile === userInfo.mobile,
        );

        if (!findedUser) return this.registerUser(userInfo);

        this.errorServ.setErrMsg('this email or mobile is already registered');
        this.errorServ.clearMsg();
        this.spinnerServ.$spinnerOn.next(false);

        return of([] as IUserInfo[]);
      }),
    );
  }

  public registerUser(userInfo: IUserInfo): Observable<IUserInfo> {
    return this.http.post<IUserInfo>(`${baseUrl}/users`, userInfo).pipe(
      // catchError((error) => {
      //   this.errorServ.showErrorMsg.set(true);
      //   setTimeout(() => {
      //     this.errorServ.showErrorMsg.set(false);
      //   }, 3000);

      //   return of({} as IUserInfo);
      // }),
      delay(2000),
      tap(
        () => {
          this.spinnerServ.$spinnerOn.next(false);
        },
        () => {
          this.errorServ.setErrMsg('Http Request Error');

          this.errorServ.clearMsg();
          this.spinnerServ.$spinnerOn.next(false);
        },
      ),
    );
  }
}
