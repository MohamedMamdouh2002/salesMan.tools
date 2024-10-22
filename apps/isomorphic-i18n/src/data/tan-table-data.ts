export type Products = {
  id: string;
  name: string;
  category: string;
  image: string;
  price: string;
  quantity: number;
};

export type Person = {
  id: string;
  name: string;
  userName: string;
  avatar: string;
  email: string;
  dueDate: string;
  amount: string;
  status: string;
  createdAt: string;
  question: string;
  answer: string;
  products?: Products[];
};


export const defaultData: Person[] = [
  {
    id: '62447',
    name: 'Francis Sanford MD',
    userName: 'George33',
    avatar:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-01.webp',
    email: 'Maryam.Barrows@yahoo.com',
    dueDate: '2023-10-18T13:24:00.760Z',
    amount: '544.00',
    status: 'Paid',
    createdAt: '2023-01-14T20:37:08.482Z',
    question: "string",
    answer: "string",
  },
];
