import { inject, Service } from '@angular/core';
import { ApiRequests } from './api-requests';
import { IUser, IUserInfo } from '../../../shared/interfaces/users.interface';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorService } from '../error-service';

@Service()
export class AuthService {
  private apiService = inject(ApiRequests);
  private router = inject(Router);
  private errorServ = inject(ErrorService);

  public login(user: IUser) {
    this.apiService.login().subscribe((usersInfo: IUserInfo[]) => {
      const findedUser = usersInfo.find(
        (userInfo) => userInfo.email === user.email && userInfo.password === user.password,
      );

      console.log(findedUser);
      if (!findedUser) {
        this.errorServ.setErrMsg('Wrong email or password');
        this.errorServ.clearMsg();
      }
    });
  }

  public register(userInfo: IUserInfo) {
    this.apiService.register(userInfo).subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
