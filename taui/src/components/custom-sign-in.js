// @flow
import { I18n } from '@aws-amplify/core'
import {
  FederatedButtons,
  ForgotPassword,
  SignIn,
  SignUp
} from 'aws-amplify-react'
import {
  FormSection,
  FormField,
  SectionBody,
  SectionFooter,
  Button,
  Link,
  Hint,
  Input,
  InputLabel,
  SectionFooterPrimaryContent,
  SectionFooterSecondaryContent
} from 'aws-amplify-react/dist/Amplify-UI/Amplify-UI-Components-React'
import message from '@conveyal/woonerf/message'
import React from 'react'

class SignInHeader extends React.Component {
  render () {
    return <div className='Splash'>
      <div className='Logo' />
      <h3>{message('Agency')}</h3>
      <h2>{message('Title')}</h2>
      <p>{message('SignIn.Greeting')}</p>
    </div>
  }
}

export default class CustomSignIn extends SignIn {
  // Have to copy showComponent here, because `hide` non-mutable property
  // results in null being returned from call to super.
  // Based on source:
  // https://github.com/aws-amplify/amplify-js/blob/master/packages/aws-amplify-react/src/Auth/SignIn.jsx#L120
  showComponent (theme) {
    const { authState, hide = [], federated, onStateChange, onAuthEvent, override = [] } = this.props
    const hideSignUp = !override.includes('SignUp') && hide.some(component => component === SignUp)
    const hideForgotPassword = !override.includes('ForgotPassword') &&
      hide.some(component => component === ForgotPassword)

    return (
      <div>
        <SignInHeader />
        <FormSection theme={theme}>
          <SectionBody theme={theme}>
            <FederatedButtons
              federated={federated}
              theme={theme}
              authState={authState}
              onStateChange={onStateChange}
              onAuthEvent={onAuthEvent}
            />
            <FormField theme={theme}>
              <InputLabel>{I18n.get('Username')} *</InputLabel>
              <Input
                autoFocus
                placeholder={I18n.get('Enter your username')}
                theme={theme}
                key='username'
                name='username'
                onChange={this.handleInputChange}
              />
            </FormField>
            <FormField theme={theme}>
              <InputLabel>{I18n.get('Password')} *</InputLabel>
              <Input
                placeholder={I18n.get('Enter your password')}
                theme={theme}
                key='password'
                type='password'
                name='password'
                onChange={this.handleInputChange}
              />
              {
                !hideForgotPassword && <Hint theme={theme}>
                  {I18n.get('Forget your password? ')}
                  <Link theme={theme} onClick={() => this.changeState('forgotPassword')}>
                    {I18n.get('Reset password')}
                  </Link>
                </Hint>
              }
            </FormField>
          </SectionBody>
          <SectionFooter theme={theme}>
            <SectionFooterPrimaryContent theme={theme}>
              <Button theme={theme} onClick={this.signIn} disabled={this.state.loading}>
                {I18n.get('Sign In')}
              </Button>
            </SectionFooterPrimaryContent>
            {
              !hideSignUp && <SectionFooterSecondaryContent theme={theme}>
                {I18n.get('No account? ')}
                <Link theme={theme} onClick={() => this.changeState('signUp')}>
                  {I18n.get('Create account')}
                </Link>
              </SectionFooterSecondaryContent>
            }
          </SectionFooter>
        </FormSection>
      </div>
    )
  }
}