export interface UserMfa {
  authenticatorCodeCreatedOn: number
  createdOn: number
  mfaAuthenticator: boolean
  mfaMobileAuthenticate: boolean
  userId: string
}

export interface User {
  avatarUrl: string
  openid: string
  nickName: string
}