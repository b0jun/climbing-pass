import { Gym, Pass } from '@prisma/client';

export interface PassAndGymData {
  name: Pass['name'];
  phoneNumber: Pass['phoneNumber'];
  createdAt: Pass['createdAt'];
  locale: Pass['locale'];
  type: Pass['type'];
  shoesRental: Pass['shoesRental'];
  gym: {
    name: Gym['name'];
    location: Gym['location'];
    logo: Gym['logo'];
  };
}
