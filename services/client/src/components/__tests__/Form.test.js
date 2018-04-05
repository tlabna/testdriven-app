import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

import Form from '../Form'

const testData = [
  {
    formType: 'Register',
    formData: {
      username: '',
      email: '',
      password: '',
    },
    handleFormChange: jest.fn(),
    handleUserFormSubmit: jest.fn(),
    isAuthenticated: false,
    match: {
      url: '/register',
    },
  },
  {
    formType: 'Login',
    formData: {
      email: '',
      password: '',
    },
    handleFormChange: jest.fn(),
    handleUserFormSubmit: jest.fn(),
    isAuthenticated: false,
    match: {
      url: '/login',
    },
  },
]

describe('Form Component', () => {
  testData.forEach((element) => {
    it(`renders ${element.formType} Form properly`, () => {
      const component = <Form {...element} />
      const wrapper = shallow(component)
      const h1 = wrapper.find('h1')
      expect(h1.length).toBe(1)
      expect(h1.get(0).props.children).toBe(element.formType)
      const formGroup = wrapper.find('.form-group')
      expect(formGroup.length).toBe(Object.keys(element.formData).length)
      expect(formGroup.get(0).props.children.props.name).toBe(
        Object.keys(element.formData)[0]
      )
      expect(formGroup.get(0).props.children.props.value).toBe('')
    })
  })
})

describe('Form Component snapshot', () => {
  testData.forEach((element) => {
    it(`renders a ${element.formType} Form properly`, () => {
      const component = <Form {...element} />
      const tree = renderer.create(component).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
