import type { Source } from '../types/food'

/**
 * Reference URLs kept separate from playable card copy.
 * These are shown only in the adult information panel — never as
 * in-game links during play.
 */
export const sources: Source[] = [
  {
    id: 'aspca-toxic',
    label: 'ASPCA — Foods that are hazardous to dogs and cats',
    url: 'https://www.aspca.org/pet-care/animal-poison-control/people-foods-poisonous-pets',
    note: 'General safety reference for foods that can harm pets. Draft content has not been reviewed by a veterinarian.',
  },
  {
    id: 'fda-pets',
    label: 'FDA — Foods that are bad for pets',
    url: 'https://www.fda.gov/animal-veterinary/animal-health-literacy/foods-are-bad-pets',
    note: 'Public consumer guidance. Always ask a grown-up before offering any food to a pet.',
  },
  {
    id: 'exhibition-note',
    label: 'Exhibition content note',
    url: '',
    note: 'Selected pre-consumer surplus (unused, still-safe food from kitchens or markets) is not the same as plate scraps or spoiled food. This game teaches inspection habits only — never feeding amounts or recipes.',
  },
]
