import { createI18n } from "vue-i18n";
import useCore from "@/store/core.pinia.ts";
import uz from "@/locales/uz.ts";
import ru from "@/locales/ru.ts";
import en from "@/locales/en.ts";
import cyr from "@/locales/cyr.ts";

const i18nFactory = () => {
  const corePinia = useCore();
  return createI18n({
    legacy: false,
    locale: corePinia.locale,
    fallbackLocale: "uz",
    messages: { uz, cyr, ru, en },
  });
};

export default i18nFactory;
