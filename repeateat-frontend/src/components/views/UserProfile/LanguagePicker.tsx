import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'

const LanguagePicker = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    void i18n.changeLanguage(lng)
  }

  return (
    <div>
      <Button onClick={() => changeLanguage('en')}>English</Button>
      <Button onClick={() => changeLanguage('fi')}>Suomi</Button>
    </div>
  )
}

export default LanguagePicker
