export {}

declare global {
  type ValueOf<T> = T[keyof T]

  interface CommonCommunityData {
    // 1：社区2：村庄
    addressType: 1 | 2
    fullName: string
    type: CommunityType
    name: string
    id: number
    level: number
    // true 待采集
    toBeCollect?: boolean
    gmtModified?: string
    parentId: number | null
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Community extends CommonCommunityData {}

  interface User {
    name: string
    communityId: number
  }

  /**
   * 小区
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Community2 extends CommonCommunityData {}

  /**
   * 幢
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface IBuilding extends CommonCommunityData {}

  /**
   * 号
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface IRoom extends CommonCommunityData {}
}
