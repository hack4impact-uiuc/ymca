const Translation = require('../models/translation');

const languageTypes = {
  es: 'Spanish',
  fr: 'French',
  zh: 'Chinese',
};

async function deleteTranslatedText(id) {
  const translationKey = `resource-description-${id}`;
  Object.values(languageTypes).map(async (language) => {
    const translation = await Translation.findOne({
      language: { $eq: language },
    });
    translation.messages.delete(translationKey);
    await translation.save();
  });
}

// translate text for each language type and store in db
async function translateAndSaveText(
  description,
  phoneNumbers,
  financialAidDetails,
  eligibilityRequirements,
  requiredDocuments,
  id,
) {
  await translateString(description, `resource-description-${id}`);
  if (phoneNumbers != null && phoneNumbers.length !== 0) {
    await translatePhoneTypes(phoneNumbers);
  }
  if (financialAidDetails != null) {
    await translateFinancialAidDetails(financialAidDetails);
  }
  if (eligibilityRequirements != null && eligibilityRequirements !== '') {
    await translateString(
      eligibilityRequirements,
      `resource-eligibilityRequirements-${id}`,
    );
  }
  if (requiredDocuments != null && requiredDocuments.length !== 0) {
    await translateRequiredDocuments(requiredDocuments, id);
  }
}

async function translateString(text, translationKey) {
  Object.keys(languageTypes).forEach(async function (key) {
    const translationValue = await translateText(text, key);
    const updatedTranslation = await Translation.findOne({
      language: { $eq: languageTypes[key] },
    });
    updatedTranslation.messages.set(translationKey, translationValue);
    await updatedTranslation.save();
  });
}

async function translatePhoneTypes(phoneNumbers) {
  Object.keys(languageTypes).forEach(async function (key) {
    phoneNumbers.forEach(async (phone) => {
      const updatedTranslation = await Translation.findOne({
        language: { $eq: languageTypes[key] },
      });
      const translationKey = `resource-phoneType-${phone._id}`;
      const translationValue = await translateText(phone.phoneType, key);
      updatedTranslation.messages.set(translationKey, translationValue);
      await updatedTranslation.save();
    });
  });
}

async function translateFinancialAidDetails(financialAidDetails) {
  Object.keys(languageTypes).forEach(async function (key) {
    Object.keys(financialAidDetails.toJSON()).forEach(async (financialKey) => {
      if (financialKey !== '_id') {
        const updatedTranslation = await Translation.findOne({
          language: { $eq: languageTypes[key] },
        });
        console.log(
          financialAidDetails.toJSON(),
          financialKey,
          financialAidDetails[financialKey],
        );
        const translationKey = `resource-financialAid-${financialKey}-${financialAidDetails._id}`;
        const translationValue = await translateText(
          financialAidDetails[financialKey],
          key,
        );
        updatedTranslation.messages.set(translationKey, translationValue);
        await updatedTranslation.save();
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
