import { Builder } from 'builder-pattern';
import { UserData } from '../../interfaces/UI';

export class userBuilder {
  public static buildValidUser() {
    return Builder<UserData>()
      .userName('standard_user')
      .password('secret_sauce')
      .loginMessage('')
      .build();
  }

  public static buildLockedUser() {
    return Builder<UserData>()
      .userName('locked_out_user')
      .password('secret_sauce')
      .loginMessage('Sorry, this user has been locked out.')
      .build();
  }

  public static buildInvalidPasswordUser() {
    return Builder<UserData>()
      .userName('locked_out_user')
      .password('wrong_password')
      .loginMessage('Username and password do not match')
      .build();
  }
}
