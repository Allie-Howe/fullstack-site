export interface Animal {
  id: string;
  name: string;
  age: number;
  species: string;
  breed: string;
  color: string;
  size: string;
  weight: number;
  description: string;
  status: 'available' | 'adopted';
  imageUrl: string;
}
