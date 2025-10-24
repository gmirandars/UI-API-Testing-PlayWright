import { faker } from '@faker-js/faker/.';
import { Builder } from 'builder-pattern';
import { ClientInfo } from '../interfaces';

export class clientBuilder {
  public static buildClient() {
    return Builder<ClientInfo>()
      .firstName(faker.person.firstName())
      .lastName(faker.person.lastName())
      .zipCode(faker.location.zipCode())
      .build();
  }
}
