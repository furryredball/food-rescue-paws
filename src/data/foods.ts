import { copy } from '../i18n/types'
import type { FoodCard } from '../types/food'

/**
 * Draft educational cards for Food Rescue Paws (Traditional Chinese + English).
 * reviewStatus remains "draft" until a qualified reviewer approves them.
 * Do not treat these answers as veterinary advice.
 */
export const foods: FoodCard[] = [
  {
    id: 'plain-cooked-chicken',
    title: copy('清煮雞肉', 'Plain cooked chicken'),
    image: 'foods/plain-cooked-chicken.svg',
    imageAlt: copy(
      '乾淨盤子上的清煮雞胸肉塊',
      'Pieces of plain cooked chicken breast on a clean plate',
    ),
    preparation: copy(
      '完全煮熟，沒有骨頭、沒有皮、沒有調味、沒有醬汁，已放涼且新鮮。',
      'Fully cooked, no bones, no skin, no seasoning, no sauce, still cool and fresh.',
    ),
    clues: [
      copy('骨頭可能會傷害寵物。', 'Bones can hurt pets.'),
      copy('鹽、洋蔥和大蒜醬料並不安全。', 'Salt, onion and garlic sauces are not safe.'),
      copy(
        '大人同意時，狗和貓都可以分享清煮的肉。',
        'Both dogs and cats can share plain cooked meat when a grown-up says yes.',
      ),
    ],
    correctAnswer: 'both',
    explanation: copy(
      '沒有骨頭、沒有調味的清煮雞肉，狗和貓都可能可以吃——但一定要先問大人。這個遊戲不會決定真正的餐點。',
      'Plain cooked chicken without bones or seasoning can be okay for dogs and cats — but only if a grown-up checks first. This game never decides a real meal.',
    ),
    sourceIds: ['aspca-toxic', 'fda-pets', 'exhibition-note'],
    reviewStatus: 'draft',
  },
  {
    id: 'raw-onion',
    title: copy('生洋蔥', 'Raw onion'),
    image: 'foods/raw-onion.svg',
    imageAlt: copy('一顆生洋蔥和切好的洋蔥塊', 'A whole raw onion and chopped onion pieces'),
    preparation: copy(
      '生的、切碎的，沒有烹調，也沒有和其他材料混合。',
      'Raw, chopped, no cooking, no other ingredients mixed in.',
    ),
    clues: [
      copy('洋蔥可能會讓寵物很不舒服。', 'Onions can make pets feel very sick.'),
      copy('剩菜裡就算煮過的洋蔥也有問題。', 'Even cooked onion in leftovers is a problem.'),
      copy('這不是狗或貓的點心。', 'This is not a treat for dogs or cats.'),
    ],
    correctAnswer: 'neither',
    explanation: copy(
      '洋蔥對狗和貓都不安全。請放在一旁並告訴大人——千萬不要把洋蔥給寵物。',
      'Onion is not safe for dogs or cats. Put it aside and tell a grown-up — never offer onion to a pet.',
    ),
    sourceIds: ['aspca-toxic', 'fda-pets'],
    reviewStatus: 'draft',
  },
  {
    id: 'plain-cooked-carrot',
    title: copy('清煮胡蘿蔔', 'Plain cooked carrot'),
    image: 'foods/plain-cooked-carrot.svg',
    imageAlt: copy('沒有調味的軟熟胡蘿蔔片', 'Soft cooked carrot slices without seasoning'),
    preparation: copy(
      '蒸至軟熟後放涼，沒有牛油、沒有鹽、沒有蜜糖釉。',
      'Steamed until soft, cooled, no butter, no salt, no honey glaze.',
    ),
    clues: [
      copy('軟軟的小塊比較好咬。', 'Soft pieces are easier to chew.'),
      copy('狗常常喜歡清淡的胡蘿蔔。', 'Dogs often enjoy plain carrot.'),
      copy('貓通常比較喜歡肉類食物，胡蘿蔔不是貓的首選。', 'Cats usually prefer meaty foods, so carrot is not a cat favourite.'),
    ],
    correctAnswer: 'dog',
    explanation: copy(
      '大人同意時，清煮胡蘿蔔可以當狗的脆脆或軟軟點心想法。對貓來說不是有用的食物選擇。',
      'Plain cooked carrot can be a crunchy or soft snack idea for dogs when a grown-up agrees. It is not a useful food choice for cats.',
    ),
    sourceIds: ['fda-pets', 'exhibition-note'],
    reviewStatus: 'draft',
  },
  {
    id: 'grape-cluster',
    title: copy('葡萄', 'Grapes'),
    image: 'foods/grape-cluster.svg',
    imageAlt: copy('一小串新鮮紫葡萄', 'A small cluster of fresh purple grapes'),
    preparation: copy(
      '新鮮整顆葡萄，已清洗，尚未去梗。',
      'Fresh whole grapes, washed, no stems removed yet.',
    ),
    clues: [
      copy('葡萄和提子乾可能對狗很危險。', 'Grapes and raisins can be dangerous for dogs.'),
      copy('貓也不應該吃葡萄。', 'Cats should not eat grapes either.'),
      copy('如果在寵物碗附近看到葡萄，立刻問大人。', 'If you see grapes near pet bowls, ask a grown-up right away.'),
    ],
    correctAnswer: 'neither',
    explanation: copy(
      '葡萄對狗和貓都不安全。請離寵物遠一點，並請大人幫忙。',
      'Grapes are not safe for dogs or cats. Keep them away from pets and ask a grown-up for help.',
    ),
    sourceIds: ['aspca-toxic', 'fda-pets'],
    reviewStatus: 'draft',
  },
  {
    id: 'mystery-leftover-bowl',
    title: copy('神秘剩菜碗', 'Mystery leftover bowl'),
    image: 'foods/mystery-leftover-bowl.svg',
    imageAlt: copy(
      '一碗蓋著的混合剩菜，成分不明',
      'A covered bowl of mixed leftovers with unknown ingredients',
    ),
    preparation: copy(
      '蓋著的混合剩菜。標籤缺失。氣味和成分都不清楚。',
      'Covered mixed leftovers. Label is missing. Smell and ingredients are unknown.',
    ),
    clues: [
      copy('我們看不到每樣材料。', 'We cannot see every ingredient.'),
      copy('盤中剩菜可能有洋蔥、鹽或醬汁。', 'Plate scraps may include onion, salt or sauce.'),
      copy('資料不足時，要先問大人。', 'When information is missing, ask a grown-up.'),
    ],
    correctAnswer: 'ask-grown-up',
    explanation: copy(
      '重要細節缺失，所以安全答案是「先問大人」。精選消費前剩餘食物和盤中剩菜或腐壞食物不同——不要猜。',
      'Important details are missing, so the safe answer is Ask a grown-up. Selected pre-consumer surplus is different from plate scraps or spoiled food — never guess.',
    ),
    sourceIds: ['exhibition-note', 'fda-pets'],
    reviewStatus: 'draft',
  },
  {
    id: 'plain-cooked-fish',
    title: copy('清煮魚肉', 'Plain cooked fish'),
    image: 'foods/plain-cooked-fish.svg',
    imageAlt: copy('去骨後的清煮白魚肉片', 'Flaked plain cooked white fish without bones'),
    preparation: copy(
      '完全煮熟，仔細去骨，沒有油、沒有檸檬牛油，已放涼。',
      'Fully cooked, carefully deboned, no oil, no lemon butter, cooled.',
    ),
    clues: [
      copy('一定要去掉骨頭。', 'Bones must be removed.'),
      copy('大人同意時，清淡魚肉可能適合貓和狗。', 'Plain fish can suit cats and dogs when a grown-up approves.'),
      copy('餐廳調味魚和清煮魚不一樣。', 'Seasoned restaurant fish is not the same as plain fish.'),
    ],
    correctAnswer: 'both',
    explanation: copy(
      '大人檢查後，去骨的清煮魚可能適合狗和貓。這不是食譜或份量指引。',
      'Plain, boneless cooked fish can be okay for dogs and cats after a grown-up checks. This is not a recipe or portion guide.',
    ),
    sourceIds: ['fda-pets', 'exhibition-note'],
    reviewStatus: 'draft',
  },
  {
    id: 'chocolate-brownie',
    title: copy('朱古力布朗尼', 'Chocolate brownie'),
    image: 'foods/chocolate-brownie.svg',
    imageAlt: copy('餐巾上的一塊朱古力布朗尼', 'A square chocolate brownie on a napkin'),
    preparation: copy(
      '烤焗朱古力甜品，有糖、可可和牛油。',
      'Baked chocolate dessert with sugar, cocoa and butter.',
    ),
    clues: [
      copy('朱古力可能讓寵物病得很重。', 'Chocolate can make pets very ill.'),
      copy('甜品是人吃的，不是寵物食物。', 'Sweet desserts are people food, not pet food.'),
      copy('即使一小塊也應該留給人。', 'Even a small piece should stay with people.'),
    ],
    correctAnswer: 'neither',
    explanation: copy(
      '朱古力對狗和貓都不安全。把布朗尼留給人，如果寵物可能吃了，要告訴大人。',
      'Chocolate is not safe for dogs or cats. Save the brownie for people and tell a grown-up if a pet might have eaten some.',
    ),
    sourceIds: ['aspca-toxic', 'fda-pets'],
    reviewStatus: 'draft',
  },
  {
    id: 'canned-tuna-unknown',
    title: copy('打開的吞拿魚罐頭', 'Open tuna tin'),
    image: 'foods/canned-tuna-unknown.svg',
    imageAlt: copy('打開的吞拿魚罐頭，標籤看不清', 'An open tin of tuna with an unreadable label'),
    preparation: copy(
      '已打開的罐頭。標籤撕破。不知道是浸水、浸油還是調味醬。',
      'Open tin. Label torn. Unknown if packed in water, oil or flavoured sauce.',
    ),
    clues: [
      copy('油和調味醬會改變是否安全。', 'Oil and flavoured sauces change what is safe.'),
      copy('我們看不到完整標籤。', 'We cannot read the full label.'),
      copy('資料不足就要先問大人。', 'Missing information means ask a grown-up.'),
    ],
    correctAnswer: 'ask-grown-up',
    explanation: copy(
      '因為浸泡液體和調味不明，決定前先問大人。不要自己用不明罐頭餵寵物。',
      'Because the packing liquid and seasonings are unknown, ask a grown-up before deciding. Never feed from an unknown tin on your own.',
    ),
    sourceIds: ['exhibition-note', 'fda-pets'],
    reviewStatus: 'draft',
  },
]
