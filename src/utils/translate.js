import axios from 'axios';

 //const API_KEY = 'AIzaSyCjVUypDYIrx1DDEC8pDj1GQ9AISFmKyF8';
const API_KEY = 'AIzaSyC-FPrCXDHzdkhmAMREVZ13Q4pGg4-JxDo';
export const translateText = async (
  text,
  targetLang = 'hi',
  sourceLang = 'en',
) => {
  try {
    const res = await axios.post(
      `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
      {
        q: text,
        target: targetLang,
        source: sourceLang,
      },
    );
    return res.data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
};
