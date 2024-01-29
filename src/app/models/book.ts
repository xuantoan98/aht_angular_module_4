export interface IBook {
  id: number;
  name: string;
  image: string;
  content: string;
  author: string;
  published: Date;
  price: number;
  salePrice: number;
  categories: string;
  createdAt: Date;
  createdBy: string;
}
