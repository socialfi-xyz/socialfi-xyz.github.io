import {IntlProvider} from 'react-intl'
import en_US from './en_US'
import zh_CN from './zh_CN'
import {useSelector} from 'react-redux'


export const languageConfig = {
  en: {
    data: en_US,
    name: 'en',
    title: 'English'
  },
  zh: {
    data: zh_CN,
    name: 'zh',
    title: '中文简体'
  }
}
const getLanguage = language => (languageConfig[language] || languageConfig.en).data

function HandleMessages (props) {
  const {language} = useSelector(state => state.index)
  return (
    <IntlProvider
      key={language}
      locale={language}
      defaultLocale="en"
      messages={getLanguage(language)}
    >
      {props.children}
    </IntlProvider>
  )
}

export default HandleMessages
