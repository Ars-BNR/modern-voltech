export interface profiles {
  accessToken: string;
  user: dataProfiles;
  refreshToken: string;
}
export interface dataProfiles {
  login?: string;
  id?: number;
  role?: string;
}
