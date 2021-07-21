export const getCategoryIds = (categories, category, subcategory) => {
  const categoryId = categories.find((c) => c.name === category)?._id;
  const subcategoryId = categories
    .find((c) => c.name === category)
    ?.subcategories.find((sub) => sub.name === subcategory)?._id;

  return [categoryId, subcategoryId];
};

export const getCategoryId = (categories, category) =>
  categories.find((c) => c.name === category)?._id;

export const getSubcategoryId = (categories, category, subcategory) =>
  categories
    .find((c) => c.name === category)
    ?.subcategories.find((sub) => sub.name === subcategory)?._id;
