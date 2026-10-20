import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { IUser, IUserInfo } from '../../shared/interfaces/users.interface';
import { ErrorService } from './error-service';

const baseUrl = 'http://localhost:3000';

@Service()
export class ApiRequests {
  private http = inject(HttpClient);
  private errorServ = inject(ErrorService);
  private users = signal<IUserInfo[]>([]);

  public getUsers(): Observable<IUserInfo[]> {
    return this.http.get<IUserInfo[]>(`${baseUrl}/users`).pipe(
      tap(
        (users: IUserInfo[]) => {
          this.users.set(users);
        },
        () => {
          this.errorServ.setErrMsg('Http Request Error');
          this.errorServ.clearMsg();
        },
      ),
    );
  }

  public login(): Observable<IUserInfo[]> {
    return this.getUsers();
  }

  public register(userInfo: IUserInfo): Observable<IUserInfo[] | IUserInfo> {
    return this.getUsers().pipe(
      switchMap((usersInfo) => {
        const findedUser = usersInfo.find(
          (user) => user.email === userInfo.email || user.mobile === userInfo.mobile,
        );

        if (!findedUser) return this.registerUser(userInfo);

        this.errorServ.setErrMsg('this email or mobile is already registered');
        this.errorServ.clearMsg();

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
      tap(
        () => {},
        () => {
          this.errorServ.setErrMsg('Http Request Error');

          this.errorServ.clearMsg;
        },
      ),
    );
  }
}
