export type AuthStackParamList = {

    Splash: undefined;
    Welcome: undefined;
    CustomerLogin: undefined;
    ProviderLogin: undefined;
    CustomerSignUp: undefined;
    ProviderSignUp: undefined;
    CustomerDrawer: undefined;
    ProviderDrawer: undefined;
    ProviderProfile: { provider: { id: number; name: string; profession: string; mobile_number: string; email: string; fees: number; rating: number; experience_years: number; location: string; availability: string; verified: boolean; reviews: { reviewer: string; comment: string; rating: number; }[]; latitude: number; longitude: number; image_url: string; } };
    CustomerDrawerNavigator: undefined;
    ProviderDrawerNavigator: undefined;
    CustomerHome: undefined;
    ProviderHome: undefined;
  };

  export interface Review {
    customer_name: string;
    comment: string;
    rating: number;
  }
  
  export interface ServiceProvider {
    id: number;
    name: string;
    profession: string;
    mobile_number: string;
    email: string;
    fees: number;
    rating: number;
    experience_years: number;
    location: string;
    availability: string;
    verified: boolean;
    reviews: Review[];
    latitude: number;
    longitude: number;
    image_url: string;
    past_work_photos?: string[];
  }
  

export type RootStackParamList = {
  Home: undefined;
  Booking: { provider: ServiceProvider };
  Chat: { provider: ServiceProvider };
  ProviderProfile: { provider: ServiceProvider };
    
};

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

// export type CustomerStackParamList = {
//   CustomerHome: undefined;
//   ServiceScreen: undefined;
//   ProviderProfile: { providerId: string }; // example param
//   Booking: undefined;
//   Chat: undefined;
//   BookedServices: undefined;
// };

export type ProviderProfileNavigationProp = NativeStackNavigationProp<
  CustomerStackParamList,
  'ProviderProfile'
>;

export type ProviderProfileRouteProp = RouteProp<
  CustomerStackParamList,
  'ProviderProfile'
>;

export interface ProviderProfileProps {
  navigation: ProviderProfileNavigationProp;
  route: ProviderProfileRouteProp;
}

export type CustomerStackParamList = {
  CustomerHome: undefined;
  ServiceScreen: undefined;
  ProviderProfile: { providerId: string }; // example param
  Booking: undefined;
  Chat: undefined;
  BookedServices: undefined;
};