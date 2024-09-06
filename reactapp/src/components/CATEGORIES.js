/** CATEGORIES.js
카테고리를 분리하여 별도로 관리하는 상수 파일입니다.
상수데이터+Array.map()으로 카테고리 관리
*/

// export const CATEGORIES = [
//   { id: 0, text: 'Best', name: 'best' },
//   { id: 1, text: 'Women', name: 'women' },
//   { id: 2, text: 'Men', name: 'men' },
//   { id: 3, text: 'Kids', name: 'kids' },
// ];

// export const SUBCATEGORIES = [
//   { id: 0, text: 'Top', name: 'top' },
//   { id: 1, text: 'Bottom', name: 'bottom' },
//   { id: 2, text: 'Shoes', name: 'shoes' },
// ];


export const CATEGORIES = [
  { id: 1, text: 'Best', name: 'best' },
  { id: 2, text: 'Women', name: 'women' },
  { id: 3, text: 'Men', name: 'men' },
  { id: 4, text: 'Kids', name: 'kids' },
];

export const SUBCATEGORIES = {
  2: [ // Women
    { id: 5, text: 'Top', name: 'top' },
    { id: 6, text: 'Bottom', name: 'bottom' },
    { id: 7, text: 'Shoes', name: 'shoes' },
  ],
  3: [ // Men
    { id: 8, text: 'Top', name: 'top' },
    { id: 9, text: 'Bottom', name: 'bottom' },
    { id: 10, text: 'Shoes', name: 'shoes' },
  ],
  4: [ // Kids
    { id: 11, text: 'Top', name: 'top' },
    { id: 12, text: 'Bottom', name: 'bottom' },
    { id: 13, text: 'Shoes', name: 'shoes' },
  ],
};