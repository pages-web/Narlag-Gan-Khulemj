interface Khoroo {
  khoroo: number;
  urban: string;
  charge: string;
}
type district = {
  id: number;
  name: string;
  khoroos: Khoroo[];
};

export const takeAddress = {
  link: 'https://maps.app.goo.gl/teyXrhNgWdrL4Zoa8',
};
export const districts: district[] = [
  {
    id: 0,
    name: 'Баянгол',
    khoroos: [
      {
        khoroo: 1,
        urban: 'Төмөр зам богд ар хороолол орчим ',
        charge: '5,000',
      },
      {
        khoroo: 2,
        urban: 'Гранд плаза, ТБД андууд, Gem palace хүртэл ',
        charge: '5,000',
      },
      {
        khoroo: 3,
        urban: 'Төмөр зам , Барс зах, Нарны зам орчим ',
        charge: '5,000',
      },
      {
        khoroo: 4,
        urban: 'Алтай хотхон, Нарны гүүр',
        charge: '5,000',
      },
      {
        khoroo: 5,
        urban: 'Зам тээврийн хөгжлийн төв, Мастер плаза',
        charge: '10,000',
      },
      {
        khoroo: 6,
        urban: 'Шинэ хотхон хороолол, Монгол Базальт',
        charge: '10,000',
      },
      {
        khoroo: 7,
        urban: 'ТЭЦ 4, Цахилгаан станц',
        charge: '10,000',
      },
    ],
  },
  {
    id: 1,
    name: 'Баянзүрх',
    khoroos: [
      {
        khoroo: 1,
        urban: 'Сансар цэцэг ЗБ, РЦНК, сансар тунель орчим',
        charge: '10,000',
      },
      {
        khoroo: 2,
        urban: 'Дарь эх, зуслангийн бүс',
        charge: '20,000',
      },
      {
        khoroo: 3,
        urban: 'Сансар И март, Кемпински, СЭЗДС орчим ',
        charge: '10,000',
      },
      {
        khoroo: 4,
        urban: 'Жуков орчим ',
        charge: '10,000',
      },
      {
        khoroo: 5,
        urban: 'Цайз, 16, шар хад, Да хүрээ зах ',
        charge: '20,000',
      },
      {
        khoroo: 6,
        urban: 'Натур, Бөхийн өргөө, Чингис зочид буудал',
        charge: '10,000',
      },
      {
        khoroo: 7,
        urban: 'Монгол цэргийн музей, Цэргийн төв эмнэлэг, офицер',
        charge: '10,000',
      },
      {
        khoroo: 8,
        urban: 'Амгалан хавь /хүргэлийн зааглах бүс/',
        charge: '25,000',
      },
    ],
  },
  {
    id: 2,
    name: 'Хан-Уул',
    khoroos: [
      {
        khoroo: 1,
        urban: '120 мянгат 52-р сургууль орчим',
        charge: '5,000',
      },
      {
        khoroo: 2,
        urban: '19 үйлчилгээний төв, 115 сургууль, Зайсан оргил орчим ',
        charge: '5,000',
      },
      {
        khoroo: 3,
        urban: 'Таван богд, Эрэл, ДЦС 3 түүнээс цааш орчим ',
        charge: '5,000',
      },
      {
        khoroo: 4,
        urban: 'Яармаг, нисэх, нүхт',
        charge: '10,000',
      },
      {
        khoroo: 5,
        urban: 'Чингисийн хүрээ эцсийн бүс',
        charge: '25,000',
      },
    ],
  },
  {
    id: 3,
    name: 'Сонгинохайрхан',
    khoroos: [
      {
        khoroo: 1,
        urban:
          'Авто тээврийн үндэсний төв, 6р сургууль, хүүхдийн 100, цирк, 1р сургууль',
        charge: '15,000',
      },
      {
        khoroo: 2,
        urban: 'Толгойт, 42 сургууль түүнээс цааш, Толгойт, Бага наран',
        charge: '5,000',
      },
      {
        khoroo: 3,
        urban: 'Толгойт, 42 сургууль түүнээс цааш ',
        charge: '15,000',
      },
      {
        khoroo: 4,
        urban: 'Толгойт, Бага наран',
        charge: '15,000',
      },
      {
        khoroo: 5,
        urban: 'Нарангийн гол түүнээс цаашаа',
        charge: '25,000',
      },
      {
        khoroo: 6,
        urban: '32н тойрог, 7н буудал',
        charge: '10,000',
      },
      {
        khoroo: 7,
        urban: 'Зуслан хэсэг ( Шарга морьтын уулзвар хүртэлх эцсийн бүс)',
        charge: '25,000',
      },
    ],
  },
  {
    id: 4,
    name: 'Чингэлтэй',
    khoroos: [
      {
        khoroo: 1,
        urban: 'Монгол шуудан, 23 сургууль, Жүр үр орчим',
        charge: '5,000',
      },
      {
        khoroo: 2,
        urban: 'Бөмбөгөр, ЧД, Элба орчим ',
        charge: '5,000',
      },
      {
        khoroo: 3,
        urban: 'УИД, 24 сургууль, Урт цагаан орчим ',
        charge: '5,000',
      },
      {
        khoroo: 4,
        urban: 'Баянбүрдийн тойрог, 32н тойрог хүртэл ',
        charge: '5,000',
      },
    ],
  },
];
