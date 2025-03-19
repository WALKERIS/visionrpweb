export interface Vehicle {
  id: string;
  name: string;
  type: 'new' | 'used';
  price: number;
  image: string;
  gallery?: string[];
  specs: {
    topSpeed: string;
    acceleration: string;
    handling: string;
    seats: number;
  };
  features?: string[];
}