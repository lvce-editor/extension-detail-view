export interface RuntimeStatus {
  readonly activationEvent: string
  readonly activationTime: number
  readonly id: string
  readonly importTime: number
  readonly memoryUsage?: number
  readonly status: number
}
