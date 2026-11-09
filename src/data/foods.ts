import type { FoodCard } from '../types/food'

/**
 * Draft educational cards for Food Rescue Paws.
 * reviewStatus remains "draft" until a qualified reviewer approves them.
 * Do not treat these answers as veterinary advice.
 */
export const foods: FoodCard[] = [
  {
    id: 'plain-cooked-chicken',
    title: 'Plain cooked chicken',
    image: 'foods/plain-cooked-chicken.svg',
    imageAlt: 'Pieces of plain cooked chicken breast on a clean plate',
    preparation:
      'Fully cooked, no bones, no skin, no seasoning, no sauce, still cool and fresh.',
    clues: [
      'Bones can hurt pets.',
      'Salt, onion and garlic sauces are not safe.',
      'Both dogs and cats can share plain cooked meat when a grown-up says yes.',
    ],
    correctAnswer: 'both',
    explanation:
      'Plain cooked chicken without bones or seasoning can be okay for dogs and cats — but only if a grown-up checks first. This game never decides a real meal.',
    sourceIds: ['aspca-toxic', 'fda-pets', 'exhibition-note'],
    reviewStatus: 'draft',
  },
  {
    id: 'raw-onion',
    title: 'Raw onion',
    image: 'foods/raw-onion.svg',
    imageAlt: 'A whole raw onion and chopped onion pieces',
    preparation: 'Raw, chopped, no cooking, no other ingredients mixed in.',
    clues: [
      'Onions can make pets feel very sick.',
      'Even cooked onion in leftovers is a problem.',
      'This is not a treat for dogs or cats.',
    ],
    correctAnswer: 'neither',
    explanation:
      'Onion is not safe for dogs or cats. Put it aside and tell a grown-up — never offer onion to a pet.',
    sourceIds: ['aspca-toxic', 'fda-pets'],
    reviewStatus: 'draft',
  },
  {
    id: 'plain-cooked-carrot',
    title: 'Plain cooked carrot',
    image: 'foods/plain-cooked-carrot.svg',
    imageAlt: 'Soft cooked carrot slices without seasoning',
    preparation:
      'Steamed until soft, cooled, no butter, no salt, no honey glaze.',
    clues: [
      'Soft pieces are easier to chew.',
      'Dogs often enjoy plain carrot.',
      'Cats usually prefer meaty foods, so carrot is not a cat favourite.',
    ],
    correctAnswer: 'dog',
    explanation:
      'Plain cooked carrot can be a crunchy or soft snack idea for dogs when a grown-up agrees. It is not a useful food choice for cats.',
    sourceIds: ['fda-pets', 'exhibition-note'],
    reviewStatus: 'draft',
  },
  {
    id: 'grape-cluster',
    title: 'Grapes',
    image: 'foods/grape-cluster.svg',
    imageAlt: 'A small cluster of fresh purple grapes',
    preparation: 'Fresh whole grapes, washed, no stems removed yet.',
    clues: [
      'Grapes and raisins can be dangerous for dogs.',
      'Cats should not eat grapes either.',
      'If you see grapes near pet bowls, ask a grown-up right away.',
    ],
    correctAnswer: 'neither',
    explanation:
      'Grapes are not safe for dogs or cats. Keep them away from pets and ask a grown-up for help.',
    sourceIds: ['aspca-toxic', 'fda-pets'],
    reviewStatus: 'draft',
  },
  {
    id: 'mystery-leftover-bowl',
    title: 'Mystery leftover bowl',
    image: 'foods/mystery-leftover-bowl.svg',
    imageAlt: 'A covered bowl of mixed leftovers with unknown ingredients',
    preparation:
      'Covered mixed leftovers. Label is missing. Smell and ingredients are unknown.',
    clues: [
      'We cannot see every ingredient.',
      'Plate scraps may include onion, salt or sauce.',
      'When information is missing, ask a grown-up.',
    ],
    correctAnswer: 'ask-grown-up',
    explanation:
      'Important details are missing, so the safe answer is Ask a grown-up. Selected pre-consumer surplus is different from plate scraps or spoiled food — never guess.',
    sourceIds: ['exhibition-note', 'fda-pets'],
    reviewStatus: 'draft',
  },
  {
    id: 'plain-cooked-fish',
    title: 'Plain cooked fish',
    image: 'foods/plain-cooked-fish.svg',
    imageAlt: 'Flaked plain cooked white fish without bones',
    preparation:
      'Fully cooked, carefully deboned, no oil, no lemon butter, cooled.',
    clues: [
      'Bones must be removed.',
      'Plain fish can suit cats and dogs when a grown-up approves.',
      'Seasoned restaurant fish is not the same as plain fish.',
    ],
    correctAnswer: 'both',
    explanation:
      'Plain, boneless cooked fish can be okay for dogs and cats after a grown-up checks. This is not a recipe or portion guide.',
    sourceIds: ['fda-pets', 'exhibition-note'],
    reviewStatus: 'draft',
  },
  {
    id: 'chocolate-brownie',
    title: 'Chocolate brownie',
    image: 'foods/chocolate-brownie.svg',
    imageAlt: 'A square chocolate brownie on a napkin',
    preparation: 'Baked chocolate dessert with sugar, cocoa and butter.',
    clues: [
      'Chocolate can make pets very ill.',
      'Sweet desserts are people food, not pet food.',
      'Even a small piece should stay with people.',
    ],
    correctAnswer: 'neither',
    explanation:
      'Chocolate is not safe for dogs or cats. Save the brownie for people and tell a grown-up if a pet might have eaten some.',
    sourceIds: ['aspca-toxic', 'fda-pets'],
    reviewStatus: 'draft',
  },
  {
    id: 'canned-tuna-unknown',
    title: 'Open tuna tin',
    image: 'foods/canned-tuna-unknown.svg',
    imageAlt: 'An open tin of tuna with an unreadable label',
    preparation:
      'Open tin. Label torn. Unknown if packed in water, oil or flavoured sauce.',
    clues: [
      'Oil and flavoured sauces change what is safe.',
      'We cannot read the full label.',
      'Missing information means ask a grown-up.',
    ],
    correctAnswer: 'ask-grown-up',
    explanation:
      'Because the packing liquid and seasonings are unknown, ask a grown-up before deciding. Never feed from an unknown tin on your own.',
    sourceIds: ['exhibition-note', 'fda-pets'],
    reviewStatus: 'draft',
  },
]
