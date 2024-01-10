// For Users
export type User = {
  id: number;
  name: string;
  email: string;
  password?: string;
};

// For image as file input
export type ImgFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
};
