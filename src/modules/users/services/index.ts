import { AxiosResponse } from "axios";
import { IAuthRequest, IAuthResponse } from "../../auth/types";
import customAxiosApp, { customAxiosAppAuth } from "../../shared/axiosConfig";
import { BaseCrudService } from "../../shared/baseCrud";

export class UsersServices extends BaseCrudService {
  constructor() {
    super(customAxiosApp, 'auth');
  }
  login(input: IAuthRequest): Promise<AxiosResponse<IAuthResponse>> {
    return customAxiosAppAuth.post("auth/token", input);
  }
}

const usersService = new UsersServices();
export default usersService;
