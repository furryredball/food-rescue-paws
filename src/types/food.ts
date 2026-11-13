import type { LocaleCopy } from '../i18n/types'
import { ANSWER_LABELS as UI_ANSWER_LABELS } from '../i18n/ui'

export const ANSWER_VALUES = [
  'dog',
  'cat',
  'both',
  'neither',
] as const

export type AnswerValue = (typeof ANSWER_VALUES)[number]

export type ReviewStatus = 'draft' | 'reviewed' | 'qa-checked'

export interface FoodCard {
  id: string
  title: LocaleCopy
  image: string
  imageAlt: LocaleCopy
  preparation: LocaleCopy
  clues: LocaleCopy[]
  correctAnswer: AnswerValue
  explanation: LocaleCopy
  sourceIds: string[]
  reviewStatus: ReviewStatus
}

export interface Source {
  id: string
  label: LocaleCopy
  url: string
  note?: LocaleCopy
}

export type ScreenId =
  | 'welcome'
  | 'instructions'
  | 'inspection'
  | 'feedback'
  | 'completion'
  | 'asset-preview'

export const ANSWER_LABELS = UI_ANSWER_LABELS
