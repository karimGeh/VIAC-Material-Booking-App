export enum APIRoutes {
  Authentication = "auth",
  Users = "users",
  Materials = "materials",
  MaterialCategories = "material-categories",
  Reservations = "reservations",
}

export interface CustomError {
  message: string;
  field?: string;
  code?: string;
}

export interface ValidResponse<TResponse> {
  response: TResponse;
  errors: null;
}

export interface ErroneousResponse<TError = CustomError> {
  errors: TError[];
  response: null;
}

// eslint-disable-next-line
export type APIResponse<TResponse, TError = CustomError> =
  | ValidResponse<TResponse>
  | ErroneousResponse<TError>;

export type ApiGeneratorType = <TRequest, TResponse>(
  callback: (props: TRequest) => Promise<TResponse>
) => (props: TRequest) => Promise<APIResponse<TResponse>>;

export enum UserTypes {
  superAdmin = "superAdmin",
  admin = "admin",
  normal = "normal",
  guest = "guest",
  pending = "pending",
  blocked = "blocked",
}

export enum MaterialState {
  available = "available",
  inUse = "inUse",
  broken = "broken",
  lost = "lost",
  disabled = "disabled",
}

export enum ReservationStatus {
  pending = "pending",
  active = "active",
  cancelled = "cancelled",
  returned = "returned",
  // expired = "expired",
}

export interface User {
  _id: string;
  id: string;
  code: string;
  type: UserTypes;
  fullName: string;
  email: string;
  password: string;
  phoneNum: string;
}

export interface MaterialCategory {
  _id: string;
  name: string;
}

export interface Material {
  _id: string;
  type: MaterialCategory;
  ref: string;
  state: MaterialState;
  barcode: string;
  compatibleWith: MaterialCategory[];
}

export interface Reservation {
  _id: string;

  author: User;

  material: Material;
  owner: User;

  status: ReservationStatus;
  // dates
  startDate: Date;
  endDate: Date;

  returnedAt?: Date;
  cancelledAt?: Date;
  expiredAt?: Date;

  createdAt: Date;
}
