export const LANGUAGES = ['ru', 'en', 'cn']

// Подписи кнопок переключателя языка (значение — код языка)
export const LANGUAGE_LABELS = { ru: 'RU', en: 'EN', cn: 'CN' }

// Ключ категории — значение поля category в menu.js (оно же используется для фильтрации).
export const ALL_CATEGORY = 'Все'

export const translations = {
  ru: {
    brand: 'HAPPY PUPPY',
    nav: {
      menu: 'Меню',
      about: 'О нас',
      contacts: 'Контакты',
      order: 'Заказать',
    },
    hero: {
      badge: 'Натуральные ингредиенты · Свежие топпинги',
      title: 'Лучший бабл-ти в Минске',
      description:
        'Готовим напитки из натуральных ингредиентов: свежие ягоды, ароматный чай, молоко и топпинги ручной работы. Выберите вкус — и настройте свой идеальный стакан.',
      cta: 'Выбрать напиток',
      selectedHint: 'Вы выбрали · вращайте стакан',
    },
    exploded: {
      eyebrow: 'Из чего мы делаем',
      title: 'Каждый слой — со вкусом',
      tea: {
        title: 'Натуральный чай',
        text: 'Свежезаваренный листовой чай без ароматизаторов и порошков.',
      },
      milk: {
        title: 'Свежее молоко',
        text: 'Фермерское молоко или растительная альтернатива на выбор.',
      },
      tapioca: {
        title: 'Тапиока',
        text: 'Шарики варим вручную каждое утро — мягкие и слегка тягучие.',
      },
    },
    menu: {
      eyebrow: 'Меню',
      title: 'Выберите свой вкус',
      description:
        'Нажмите на карточку напитка, чтобы изменить цвет жидкости и топпинги в 3D-стакане. Стакан можно вращать мышкой.',
      categories: {
        [ALL_CATEGORY]: 'Все',
        'Молочные чаи': 'Молочные чаи',
        'Фруктовые и ягодные': 'Фруктовые и ягодные',
        'Матча и авторские': 'Матча и авторские',
      },
      currency: 'BYN',
      volumeUnit: 'мл',
      addToOrder: 'В заказ',
      addToOrderLabel: 'Добавить в заказ',
    },
    about: {
      eyebrow: 'О нас',
      title: 'Happy Puppy Cafe',
      text: 'Мы — уютная кофейня бабл-ти в Минске. Используем только натуральные ингредиенты, варим тапиоку вручную и готовим каждый напиток с заботой, чтобы он был таким же тёплым и радостным, как встреча с любимым щенком.',
    },
    contacts: {
      eyebrow: 'Контакты',
      title: 'Загляните к нам',
      addressLabel: 'Адрес',
      address: 'Минск, ул. Янки Купалы, 19',
      hoursLabel: 'Время работы',
      hours: 'Пн-Чт 11:00 — 22:00, Пт-Вс 11:00-23:00',
      phoneLabel: 'Телефон',
      phone: '+375257265129',
    },
  },

  en: {
    brand: 'HAPPY PUPPY',
    nav: {
      menu: 'Menu',
      about: 'About',
      contacts: 'Contacts',
      order: 'Order',
    },
    hero: {
      badge: 'Natural ingredients · Fresh toppings',
      title: 'The best bubble tea in Minsk',
      description:
        'We make drinks from natural ingredients: fresh berries, fragrant tea, milk and handmade toppings. Pick a flavor and build your perfect cup.',
      cta: 'Choose a drink',
      selectedHint: 'You selected · rotate the cup',
    },
    exploded: {
      eyebrow: 'What we make it from',
      title: 'Every layer has its flavor',
      tea: {
        title: 'Natural tea',
        text: 'Freshly brewed leaf tea with no flavorings or powders.',
      },
      milk: {
        title: 'Fresh milk',
        text: 'Farm milk or a plant-based alternative of your choice.',
      },
      tapioca: {
        title: 'Tapioca',
        text: 'We cook the pearls by hand every morning - soft and slightly chewy.',
      },
    },
    menu: {
      eyebrow: 'Menu',
      title: 'Choose your flavor',
      description:
        'Click a drink card to change the liquid color and toppings in the 3D cup. You can rotate the cup with your mouse.',
      categories: {
        [ALL_CATEGORY]: 'All',
        'Молочные чаи': 'Milk teas',
        'Фруктовые и ягодные': 'Fruit & berry',
        'Матча и авторские': 'Matcha & signature',
      },
      currency: 'BYN',
      volumeUnit: 'ml',
      addToOrder: 'Add',
      addToOrderLabel: 'Add to order',
    },
    about: {
      eyebrow: 'About us',
      title: 'Happy Puppy Cafe',
      text: 'We are a cozy bubble tea cafe in Minsk. We use only natural ingredients, cook tapioca by hand and prepare every drink with care, so it is as warm and joyful as meeting your favorite puppy.',
    },
    contacts: {
      eyebrow: 'Contacts',
      title: 'Visit us',
      addressLabel: 'Address',
      address: 'Minsk, Yanki Kupaly St., 19',
      hoursLabel: 'Opening hours',
      hours: 'Mon-Thu 11:00 — 22:00, Fri-Sun 11:00-23:00',
      phoneLabel: 'Phone',
      phone: '+375257265129',
    },
  },

  cn: {
    brand: 'HAPPY PUPPY',
    nav: {
      menu: '菜单',
      about: '关于我们',
      contacts: '联系我们',
      order: '立即点单',
    },
    hero: {
      badge: '天然食材 · 新鲜配料',
      title: '明斯克最好的珍珠奶茶',
      description:
        '我们用天然食材制作饮品：新鲜浆果、香醇茶叶、牛奶和手工配料。选择你喜欢的口味，定制属于你的完美一杯。',
      cta: '选择饮品',
      selectedHint: '你的选择 · 可旋转杯子',
    },
    exploded: {
      eyebrow: '我们的原料',
      title: '每一层都有好滋味',
      tea: {
        title: '天然茶底',
        text: '现泡茶叶，不添加香精和茶粉。',
      },
      milk: {
        title: '新鲜牛奶',
        text: '农场鲜牛奶，也可选择植物基替代品。',
      },
      tapioca: {
        title: '珍珠',
        text: '每天早晨手工熬制，软糯又带一点嚼劲。',
      },
    },
    menu: {
      eyebrow: '菜单',
      title: '选择你的口味',
      description: '点击饮品卡片，即可在 3D 杯子中更改饮品颜色和配料。你也可以用鼠标旋转杯子。',
      categories: {
        [ALL_CATEGORY]: '全部',
        'Молочные чаи': '奶茶',
        'Фруктовые и ягодные': '水果与浆果',
        'Матча и авторские': '抹茶与特调',
      },
      currency: 'BYN',
      volumeUnit: '毫升',
      addToOrder: '加入订单',
      addToOrderLabel: '加入订单',
    },
    about: {
      eyebrow: '关于我们',
      title: 'Happy Puppy Cafe',
      text: '我们是明斯克一家温馨的珍珠奶茶店。只使用天然食材，手工熬制珍珠，用心制作每一杯饮品，让它像见到心爱的小狗一样温暖又快乐。',
    },
    contacts: {
      eyebrow: '联系我们',
      title: '欢迎光临',
      addressLabel: '地址',
      address: '明斯克，扬卡·库帕拉街 19 号',
      hoursLabel: '营业时间',
      hours: '周一至周四 11:00 — 22:00，周五至周日 11:00-23:00',
      phoneLabel: '电话',
      phone: '+375257265129',
    },
  },
}

// '600 мл' -> '600 ml' / '600 毫升' (в menu.js объём хранится по-русски)
export function formatVolume(volume, t) {
  const number = String(volume).replace(/[^\d.,]/g, '')
  return number ? `${number} ${t.menu.volumeUnit}` : volume
}
