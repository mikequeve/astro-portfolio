import { labels } from './ui';
const defaultLang = 'es';

export default function useTranslations(lang: keyof typeof labels) {
  return function translate(key: keyof (typeof labels)[typeof defaultLang]) {
    return labels[lang][key] || labels[defaultLang][key];
  };
}
