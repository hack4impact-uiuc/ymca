// @flow

import webpSupport from './webp-detect';

const stockPhotos = {
  'Abuse/Neglect': '/asset/subcategories/abuse.jpg',
  'Adult Education': '/asset/subcategories/adultEd.jpg',
  'Animal Care': '/asset/subcategories/animalhealth.jpg',
  Children: '/asset/subcategories/childhealth.jpg',
  'Children Education': '/asset/subcategories/childEd.jpg',
  'Clothing Assistance': '/asset/subcategories/clothing.jpg',
  'Community Information': '/asset/subcategories/community.jpg',
  Dental: '/asset/subcategories/dentalhealth.jpg',
  'Drugs/Alcohol': '/asset/subcategories/alcohol.jpg',
  Employment: '/asset/subcategories/employment.jpg',
  'Finance/Tax Assistance': '/asset/subcategories/financialtax.jpg',
  Medical: '/asset/subcategories/medical.jpg',
  'Mental Health & Counseling': '/asset/subcategories/mentalhealth.jpg',
  Students: '/asset/subcategories/studentfinance.jpg',
  Vision: '/asset/subcategories/eyehealth.jpg',
};

const determineStockPhoto = (
  category: [String],
  subcategory: [String],
): string => {
  let src = '';
  let found = false;

  subcategory.forEach(sub => {
    if (stockPhotos[sub]) {
      src = stockPhotos[sub];
      found = true;
    }
  });

  if (!found) {
    src = category.includes('Citizenship')
      ? '/asset/subcategories/citizenship.jpg'
      : '/asset/subcategories/default.jpg';
  }

  if (webpSupport()) src = src.replace('jpg', 'webp');
  return src;
};

export default determineStockPhoto;
