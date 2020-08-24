// @flow

import message from '@conveyal/woonerf/message'

export default function getText (language, messageCode) {
  if (language === 'English') {
    language = ''
  }
  console.log(language, messageCode)
  return message(language + messageCode)
}
