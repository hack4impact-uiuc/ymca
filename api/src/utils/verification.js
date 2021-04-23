const Category = require('../models/category');
const Resource = require('../models/resource');
const HomePage = require('../models/homepage');
const VerifiedTranslation = require('../models/verifiedTranslation');

const getVerifiedAggregation = (language, foreignField, type) => {
  return [
    {
      $lookup: {
        from: 'verifiedtranslations',
        localField: '_id',
        foreignField,
        as: 'verificationInfo',
      },
    },
    {
      $match: {
        verificationInfo: { $ne: [] },
        'verificationInfo.language': language,
      },
    },
    {
      $addFields: {
        verifiedTranslationsCount: {
          $size: {
            $filter: {
              input: '$verificationInfo',
              as: 'part',
              cond: { $eq: ['$$part.verified', true] },
            },
          },
        },
      },
    },
    {
      $project: {
        name: 1,
        type,
        verifiedTranslationsCount: 1,
        totalTranslations: { $size: '$verificationInfo' },
        totalReports: { $sum: '$verificationInfo.numReports' },
      },
    },
  ];
};

const getNestedVerifiedAggregation = (
  language,
  foreignField,
  type,
  field,
  nameField,
) => {
  return [
    { $unwind: `$${field}` },
    {
      $lookup: {
        from: 'verifiedtranslations',
        localField: `${field}._id`,
        foreignField,
        as: 'verificationInfo',
      },
    },
    {
      $match: {
        verificationInfo: { $ne: [] },
        'verificationInfo.language': language,
      },
    },
    {
      $addFields: {
        verifiedTranslationsCount: {
          $size: {
            $filter: {
              input: '$verificationInfo',
              as: 'part',
              cond: { $eq: ['$$part.verified', true] },
            },
          },
        },
      },
    },
    {
      $project: {
        _id: `$${field}._id`,
        name: `$${field}.${nameField}`,
        type,
        verifiedTranslationsCount: 1,
        totalTranslations: { $size: '$verificationInfo' },
        totalReports: { $sum: '$verificationInfo.numReports' },
      },
    },
  ];
};

const getTranslationDetail = async (translationId, language, text) => {
  const verifiedTranslation = await VerifiedTranslation.findOne({
    translationID: translationId,
    language,
  });
  if (verifiedTranslation === null) {
    return null;
  }
  return {
    [translationId]: {
      English: text,
      [language]: '',
      verified: verifiedTranslation.verified,
    },
  };
};

const getVerificationDetails = async (type, language, id) => {
  const verificationDetails = [];
  if (type === 'resource') {
    const {
      description,
      phoneNumbers,
      eligibilityRequirements,
      financialAidDetails,
      requiredDocuments,
    } = await Resource.findById(id, {
      description: 1,
      phoneNumbers: 1,
      eligibilityRequirements: 1,
      financialAidDetails: 1,
      requiredDocuments: 1,
    });
    const detail = await getTranslationDetail(
      `resource-description-${id}`,
      language,
      description,
    );
    if (detail !== null) {
      verificationDetails.push(detail);
    }

    if (phoneNumbers != null && phoneNumbers.length !== 0) {
      for (const phone of phoneNumbers) {
        const detail = await getTranslationDetail(
          `resource-phoneType-${phone._id}`,
          language,
          phone.phoneType,
        );
        if (detail !== null) {
          verificationDetails.push(detail);
        }
      }
    }
    if (eligibilityRequirements != null && eligibilityRequirements !== '') {
      const detail = await getTranslationDetail(
        `resource-eligibilityRequirements-${id}`,
        language,
        eligibilityRequirements,
      );
      if (detail !== null) {
        verificationDetails.push(detail);
      }
    }
    if (financialAidDetails != null) {
      for (const financialKey of Object.keys(financialAidDetails.toJSON())) {
        if (financialKey !== '_id') {
          const detail = await getTranslationDetail(
            `resource-financialAid-${financialKey}-${financialAidDetails._id}`,
            language,
            financialAidDetails[financialKey],
          );
          if (detail !== null) {
            verificationDetails.push(detail);
          }
        }
      }
    }
    if (requiredDocuments != null && requiredDocuments.length !== 0) {
      let idx = 0;
      for (const requiredDoc of requiredDocuments) {
        const detail = await getTranslationDetail(
          `resource-requiredDoc-${id}-${idx}`,
          language,
          requiredDoc,
        );
        if (detail !== null) {
          verificationDetails.push(detail);
        }
        idx++;
      }
    }
  } else if (type === 'category') {
    const { name } = await Category.findById(id);
    const detail = await getTranslationDetail(
      `category-${name}`.replace(/\s/g, ''),
      language,
      name,
    );
    if (detail !== null) {
      verificationDetails.push(detail);
    }
  } else if (type === 'subcategory') {
    const category = await Category.findOne(
      { 'subcategories._id': id },
      { subcategories: { $elemMatch: { _id: id } } },
    );
    const name = category.subcategories[0].name;
    const detail = await getTranslationDetail(
      `subcategory-${name}`.replace(/\s/g, ''),
      language,
      name,
    );
    if (detail !== null) {
      verificationDetails.push(detail);
    }
  } else if (type === 'testimonial') {
    const homepage = await HomePage.findOne(
      { 'testimonials._id': id },
      { testimonials: { $elemMatch: { _id: id } } },
    );
    const { person, title, testimonial } = homepage.testimonials[0];
    const detail = await getTranslationDetail(
      `testimonial-${person}-${title}`.toLowerCase().replace(/\s/g, ''),
      language,
      testimonial,
    );
    if (detail !== null) {
      verificationDetails.push(detail);
    }
  } else {
    return null;
  }
  return verificationDetails;
};

module.exports = {
  getVerifiedAggregation,
  getNestedVerifiedAggregation,
  getVerificationDetails,
};
