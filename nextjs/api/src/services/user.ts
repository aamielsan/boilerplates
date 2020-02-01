import { Request } from 'express';
import { Service } from 'typedi';

@Service()
export default class UserService {
  constructor(
    private userModel: Models.UserModel,
  ) {}

  public getUserFromRequest(req: Request): typeof req.user | null {
    return req.user || null;
  }
}
