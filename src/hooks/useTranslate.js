import {useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import {translateText} from '../utils/translate';

export const useTranslate = originalText => {
  const language = useSelector(state => state.language.code);
  console.log(language, 'hello user selected langauge');
  const [translatedText, setTranslatedText] = useState(originalText);

  useEffect(() => {
    if (language === 'en') {
      setTranslatedText(originalText);
    } else {
      translateText(originalText, language).then(setTranslatedText);
    }
  }, [language, originalText]);

  return translatedText;
};
