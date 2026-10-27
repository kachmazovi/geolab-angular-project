export interface ICategory {
  id: string;
  model: string;
}

export interface IProduct {
  id: string;
  name: string;
  price: string;
  imgUrl: string;
}

export interface IProductDescription extends IProduct {
  comments: IComment[];
  description: {};
}

export interface IComment {
  author: string;
  date: string;
  comment: string;
}
