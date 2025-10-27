// tests/builders/user.builder.ts

import { faker } from '@faker-js/faker';
import { Builder } from 'builder-pattern';
import { CreateUserPayload, User } from '../../interfaces/API';

export class UserBuilder {
  public static buildUserPayload(): CreateUserPayload {
    return Builder<CreateUserPayload>()
      .job(faker.person.jobTitle())
      .name(faker.person.fullName())
      .build();
  }

  public static buildInvalidUserPayload(): CreateUserPayload {
    return Builder<CreateUserPayload>().job(faker.person.jobTitle()).build();
  }

  public static buildExistentUser(): User {
    const userOne = Builder<User>()
      .id(1)
      .email('george.bluth@reqres.in')
      .first_name('George')
      .last_name('Bluth')
      .build();
    const userTwo = Builder<User>()
      .id(2)
      .email('janet.weaver@reqres.in')
      .first_name('Janet')
      .last_name('Weaver')
      .build();
    const userThree = Builder<User>()
      .id(3)
      .email('emma.wong@reqres.in')
      .first_name('Emma')
      .last_name('Wong')
      .build();
    return faker.helpers.arrayElement([userOne, userTwo, userThree]);
  }
}
