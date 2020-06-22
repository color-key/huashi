export interface UserMfa {
  authenticatorCodeCreatedOn: number
  createdOn: number
  mfaAuthenticator: boolean
  mfaMobileAuthenticate: boolean
  userId: string
}

export interface User {
  avatar?: string
  createdOn: string
  email?: string
  mobileCountry?: string
  mobileNo?: string
  name?: string
  registerType: "Mobile" | "Email"
  status: "Enabled"
  uniqueId: string
  userMfaSetting: UserMfa
}