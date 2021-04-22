const getVerifiedAggregation = (foreignField, type) => {
  return [
    {
      $lookup: {
        from: 'verifiedtranslations',
        localField: '_id',
        foreignField,
        as: 'verificationInfo',
      },
    },
    { $match: { verificationInfo: { $ne: [] } } },
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

const getNestedVerifiedAggregation = (foreignField, type, field) => {
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
    { $match: { verificationInfo: { $ne: [] } } },
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
        name: `$${field}.person`,
        type,
        verifiedTranslationsCount: 1,
        totalTranslations: { $size: '$verificationInfo' },
        totalReports: { $sum: '$verificationInfo.numReports' },
      },
    },
  ];
};

module.exports = { getVerifiedAggregation, getNestedVerifiedAggregation };
