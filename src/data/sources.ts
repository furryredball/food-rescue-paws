import { copy } from '../i18n/types'
import type { Source } from '../types/food'

/**
 * Reference URLs kept separate from playable card copy.
 * Shown only in the adult information panel — never as in-game links.
 */
export const sources: Source[] = [
  {
    id: 'aspca-toxic',
    label: copy(
      'ASPCA — 對狗貓有害的食物',
      'ASPCA — Foods that are hazardous to dogs and cats',
    ),
    url: 'https://www.aspca.org/pet-care/animal-poison-control/people-foods-poisonous-pets',
    note: copy(
      '關於可能傷害寵物的食物的一般安全參考。草稿內容尚未經獸醫審核。',
      'General safety reference for foods that can harm pets. Draft content has not been reviewed by a veterinarian.',
    ),
  },
  {
    id: 'fda-pets',
    label: copy(
      'FDA — 對寵物不好的食物',
      'FDA — Foods that are bad for pets',
    ),
    url: 'https://www.fda.gov/animal-veterinary/animal-health-literacy/foods-are-bad-pets',
    note: copy(
      '公開消費者指引。把食物給寵物前，一定要先問大人。',
      'Public consumer guidance. Always ask a grown-up before offering any food to a pet.',
    ),
  },
  {
    id: 'exhibition-note',
    label: copy('展覽內容說明', 'Exhibition content note'),
    url: '',
    note: copy(
      '精選的消費前剩餘食物（廚房或市場尚未使用、仍安全的食物）和盤中剩菜或腐壞食物不同。本遊戲只教檢查習慣——從不教餵食份量或食譜。',
      'Selected pre-consumer surplus (unused, still-safe food from kitchens or markets) is not the same as plate scraps or spoiled food. This game teaches inspection habits only — never feeding amounts or recipes.',
    ),
  },
]
