export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Main: undefined;
  ServiceDetails: { serviceId: string };
  Booking: { serviceId?: string };
  Profile: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Services: undefined;
  Booking: undefined;
  Profile: undefined;
};
