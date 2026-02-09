import { useTranslation } from 'react-i18next'

interface ViewPickerProps {
  activeView: 'ingredients' | 'preparation'
  onViewChange: (view: 'ingredients' | 'preparation') => void
}

const ViewPicker = ({ activeView, onViewChange }: ViewPickerProps) => {
  const { t } = useTranslation(['recipe'])

  const isActiveStyle = 'underline underline-offset-4 decoration-2'
  const notActiveStyle = 'text-gray-500'

  return (
    <div className="flex flex-row justify-center gap-2 cursor-pointer">
      <div
        onClick={() => onViewChange('ingredients')}
        className={`flex flex-1 justify-center font-bold ${activeView === 'ingredients' ? isActiveStyle : notActiveStyle}`}
      >
        {t('recipe:ingredients')}
      </div>
      <div
        onClick={() => onViewChange('preparation')}
        className={`flex flex-1 justify-center font-bold ${activeView === 'preparation' ? isActiveStyle : notActiveStyle}`}
      >
        {t('recipe:preparation')}
      </div>
    </div>
  )
}

export default ViewPicker
