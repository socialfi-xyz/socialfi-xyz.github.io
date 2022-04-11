import {IntlProvider} from 'react-intl'
import en_US from './en_US'
import zh_CN from './zh_CN'
import {connect} from 'react-redux'


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
  return (
    <IntlProvider
      key={props.language}
      locale={props.language}
      defaultLocale="en"
      messages={getLanguage(props.language)}
    >
      {props.children}
    </IntlProvider>
  )
}

export default connect(state => state.index)(HandleMessages)
