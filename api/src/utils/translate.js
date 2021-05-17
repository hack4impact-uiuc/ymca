const Translation = require('../models/translation');
const VerifiedTranslation = require('../models/verifiedTranslation');

const languageTypes = {
  es: 'Spanish',
  fr: 'French',
  zh: 'Chinese',
};

async function deleteTranslatedText(
  description,
  phoneNumbers,
  financialAidDetails,
  eligibilityRequirements,
  requiredDocuments,
  id,
) {
  await deleteString(description, `resource-description-${id}`);
  if (phoneNumbers != null && phoneNumbers.length !== 0) {
    await deletePhoneTypes(phoneNumbers);
  }
  if (financialAidDetails != null) {
    await deleteFinancialAidDetails(financialAidDetails);
  }
  if (eligibilityRequirements != null && eligibilityRequirements !== '') {
    await deleteString(
      eligibilityRequirements,
      `resource-eligibilityRequirements-${id}`,
    );
  }
  if (requiredDocuments != null && requiredDocuments.length !== 0) {
    await deleteRequiredDocuments(requiredDocuments, id);
  }
  await VerifiedTranslation.deleteMany({ resourceID: id });
}

async function deleteString(text, translationKey) {
  Object.values(languageTypes).map(async (language) => {
    const translation = await Translation.findOne({
      language: { $eq: language },
    });
    translation.messages.delete(translationKey);
    await translation.save();
  });
}

async function deletePhoneTypes(phoneNumbers) {
  Object.keys(languageTypes).forEach(async function (key) {
    phoneNumbers.forEach(async (phone) => {
      const translation = await Translation.findOne({
        language: { $eq: languageTypes[key] },
      });
      const translationKey = `resource-phoneType-${phone._id}`;
      translation.messages.delete(translationKey);
      await translation.save();
    });
  });
}

async function deleteFinancialAidDetails(financialAidDetails) {
  Object.keys(languageTypes).forEach(async function (key) {
    Object.keys(financialAidDetails.toJSON()).forEach(async (financialKey) => {
      if (financialKey !== '_id') {
        const translation = await Translation.findOne({
          language: { $eq: languageTypes[key] },
        });
        const translationKey = `resource-financialAid-${financialKey}-${financialAidDetails._id}`;
        translation.messages.delete(translationKey);
        await translation.save();
      }
    });
  });
}

async function deleteRequiredDocuments(requiredDocuments, resourceId) {
  Object.keys(languageTypes).forEach(async function (key) {
    requiredDocuments.forEach(async (requiredDoc, idx) => {
      const translation = await Translation.findOne({
        language: { $eq: languageTypes[key] },
      });
      const translationKey = `resource-requiredDoc-${resourceId}-${idx}`;
      translation.messages.delete(translationKey);
      await translation.save();
    });
  });
}

async function translateAndSaveText(
  description,
  phoneNumbers,
  financialAidDetails,
  eligibilityRequirements,
  requiredDocuments,
  id,
) {
  await translateString(description, `resource-description-${id}`, id);
  if (phoneNumbers != null && phoneNumbers.length !== 0) {
    await translatePhoneTypes(phoneNumbers, id);
  }
  if (financialAidDetails != null) {
    await translateFinancialAidDetails(financialAidDetails, id);
  }
  if (eligibilityRequirements != null && eligibilityRequirements !== '') {
    await translateString(
      eligibilityRequirements,
      `resource-eligibilityRequirements-${id}`,
      id,
    );
  }
  if (requiredDocuments != null && requiredDocuments.length !== 0) {
    await translateRequiredDocuments(requiredDocuments, id);
  }
}

async function translateString(text, translationKey, resourceID) {
  Object.keys(languageTypes).forEach(async function (key) {
    const translationValue = await translateText(text, key);
    const updatedTranslation = await Translation.findOne({
      language: { $eq: languageTypes[key] },
    });
    updatedTranslation.messages.set(translationKey, translationValue);
    await updatedTranslation.save();

    const verifiedDesc = new VerifiedTranslation({
      resourceID,
      translationID: translationKey,
      verified: false,
      numReports: 0,
      language: languageTypes[key],
    });
    await verifiedDesc.save();
  });
}

async function translatePhoneTypes(phoneNumbers, resourceID) {
  Object.keys(languageTypes).forEach(async function (key) {
    phoneNumbers.forEach(async (phone) => {
      const updatedTranslation = await Translation.findOne({
        language: { $eq: languageTypes[key] },
      });
      const translationKey = `resource-phoneType-${phone._id}`;
      const translationValue = await translateText(phone.phoneType, key);
      updatedTranslation.messages.set(translationKey, translationValue);
      await updatedTranslation.save();

      const verifiedPhone = new VerifiedTranslation({
        resourceID,
        translationID: translationKey,
        verified: false,
        numReports: 0,
        language: languageTypes[key],
      });
      await verifiedPhone.save();
    });
  });
}

async function translateFinancialAidDetails(financialAidDetails, resourceID) {
  Object.keys(languageTypes).forEach(async function (key) {
    Object.keys(financialAidDetails.toJSON()).forEach(async (financialKey) => {
      if (financialKey !== '_id') {
        const updatedTranslation = await Translation.findOne({
          language: { $eq: languageTypes[key] },
        });
        const translationKey = `resource-financialAid-${financialKey}-${financialAidDetails._id}`;
        const translationValue = await translateText(
          financialAidDetails[financialKey],
          key,
        );
        updatedTranslation.messages.set(translationKey, translationValue);
        await updatedTranslation.save();

        const verifiedFin = new VerifiedTranslation({
          resourceID,
          translationID: translationKey,
          verified: false,
          numReports: 0,
          language: languageTypes[key],
        });
        await verifiedFin.save();
      }
    });
  });
}

async function translateRequiredDocuments(requiredDocuments, resourceId) {
  Object.keys(languageTypes).forEach(async function (key) {
    requiredDocuments.forEach(async (requiredDoc, idx) => {
      const updatedTranslation = await Translation.findOne({
        language: { $eq: languageTypes[key] },
      });
      const translationKey = `resource-requiredDoc-${resourceId}-${idx}`;
      const translationValue = await translateText(requiredDoc, key);
      updatedTranslation.messages.set(translationKey, translationValue);
      await updatedTranslation.save();

      const verifiedDoc = new VerifiedTranslation({
        resourceID: resourceId,
        translationID: translationKey,
        verified: false,
        numReports: 0,
        language: languageTypes[key],
      });
      await verifiedDoc.save();
    });
  });
}

async function translateText(text, language) {
  let source =
    `https://www.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_KEY}&source=en&target=${language}&callback=translateText&q=` +
    text;

  source = encodeURI(source);
  const res = await fetch(source, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const responseJSON = await res.json();
  const translationValue = responseJSON.data.translations[0].translatedText;
  return translationValue;
}

module.exports = { deleteTranslatedText, translateAndSaveText };
