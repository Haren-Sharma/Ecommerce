// types.d.ts (or at the top of your file)

import { Request } from 'express';

declare module 'express' {
  interface Request {
    cleanBody?: any; // You can make this more specific based on your needs
    user?:any;
  }
}
