const { Translate } = require("@google-cloud/translate").v2;

const translate = new Translate({
  projectId: "translate",
  credentials: {}
});

const detectLang = async (text) => {
  try {
    const response = await translate.detect(text);
    return response[0].language;
  } catch (e) {
    console.error("e: ", e)
    return ""
  }
} 

const translateText = async (input, targetLanguage) => { 
  const localeInput = await detectLang(input).then((res) => res);

  if (localeInput && localeInput !== "en") {
    console.log("Please input in english");
    return;
  }

  const [translation] = await translate.translate(input, targetLanguage);
  console.log(`Input: ${input}`);
  console.log(`Translation: ${translation}`);
}

translateText("hello world", "ru")