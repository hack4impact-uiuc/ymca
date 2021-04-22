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
      $project: {
        name: 1,
        type,
        isAllVerified: { $allElementsTrue: '$verificationInfo.verified' },
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
      $project: {
        _id: `$${field}._id`,
        name: `$${field}.person`,
        type,
        isAllVerified: { $allElementsTrue: '$verificationInfo.verified' },
        totalReports: { $sum: '$verificationInfo.numReports' },
      },
    },
  ];
};

module.exports = { getVerifiedAggregation, getNestedVerifiedAggregation };
