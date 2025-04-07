export type OnboardingTask = {
  id: string
  title: string
  description: string
  href: string
  isCompleted: boolean
  order: number
}

export type OnboardingState = {
  isCompleted: boolean
  tasks: OnboardingTask[]
} 