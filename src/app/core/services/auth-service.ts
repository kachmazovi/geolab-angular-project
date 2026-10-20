import { inject, Service } from '@angular/core';
import { ApiRequests } from './api-requests';
import { IUser, IUserInfo } from '../../shared/interfaces/users.interface';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Service()
export class AuthService {
  private apiService = inject(ApiRequests);
  private router = inject(Router);

  public login(user: IUser) {
    this.apiService.login().subscribe((usersInfo: IUserInfo[]) => {
      const findedUser = usersInfo.find(
        (userInfo) => userInfo.email === user.email && userInfo.password === user.password,
      );

      console.log(findedUser);
    });
  }

  public register(userInfo: IUserInfo) {
    this.apiService.register(userInfo).subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
