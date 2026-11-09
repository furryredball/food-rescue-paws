export const ANSWER_VALUES = [
  'dog',
  'cat',
  'both',
  'neither',
  'ask-grown-up',
] as const

export type AnswerValue = (typeof ANSWER_VALUES)[number]

export type ReviewStatus = 'draft' | 'reviewed'

export interface FoodCard {
  id: string
  title: string
  image: string
  imageAlt: string
  preparation: string
  clues: string[]
  correctAnswer: AnswerValue
  explanation: string
  sourceIds: string[]
  reviewStatus: ReviewStatus
}

export interface Source {
  id: string
  label: string
  url: string
  note?: string
}

export type ScreenId =
  | 'welcome'
  | 'instructions'
  | 'inspection'
  | 'feedback'
  | 'completion'
  | 'asset-preview'

export const ANSWER_LABELS: Record<AnswerValue, string> = {
  dog: 'Dog',
  cat: 'Cat',
  both: 'Both',
  neither: 'Neither',
  'ask-grown-up': 'Ask a grown-up',
}
