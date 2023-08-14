import { UserTypes } from "../enums/UserTypes";

class ACCESS {
  // static
  static get login(): UserTypes[] {
    return [
      UserTypes.admin,
      UserTypes.normal,
      UserTypes.guest,
      UserTypes.superAdmin,
    ];
  }

  static get adminLogin(): UserTypes[] {
    return [UserTypes.admin, UserTypes.superAdmin];
  }
}

export default ACCESS;
