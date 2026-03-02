import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'

const LanguagePicker = () => {
  const { i18n, t } = useTranslation()

  const changeLanguage = (lng: string) => {
    void i18n.changeLanguage(lng)
  }

  const activeLanguage = i18n.language

  return (
    <div className="flex flex-col font-bold">
      {t('common:change_language')}
      <div className="flex flex-row gap-2 font-normal">
        <Button
          variant={activeLanguage === 'en' ? 'default' : 'secondary'}
          onClick={() => changeLanguage('en')}
        >
          English
        </Button>
        <Button
          variant={activeLanguage === 'fi' ? 'default' : 'secondary'}
          onClick={() => changeLanguage('fi')}
        >
          Suomi
        </Button>
      </div>
    </div>
  )
}

export default LanguagePicker
