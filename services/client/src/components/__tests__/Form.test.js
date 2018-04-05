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
    match: {
      url: '/login',
    },
  },
]

describe('Form Component when not authenticated', () => {
  testData.forEach((testData) => {
    const component = <Form {...testData} isAuthenticated={false} />
    it(`renders ${testData.formType} Form properly`, () => {
      const wrapper = shallow(component)
      const h1 = wrapper.find('h1')
      expect(h1.length).toBe(1)
      expect(h1.get(0).props.children).toBe(testData.formType)
      const formGroup = wrapper.find('.form-group')
      expect(formGroup.length).toBe(Object.keys(testData.formData).length)
      expect(formGroup.get(0).props.children.props.name).toBe(
        Object.keys(testData.formData)[0]
      )
      expect(formGroup.get(0).props.children.props.value).toBe('')
    })
    it(`${testData.formType} Form submits the form properly`, () => {
      const wrapper = shallow(component)
      const input = wrapper.find('input[type="email"]')
      expect(testData.handleUserFormSubmit).toHaveBeenCalledTimes(0)
      expect(testData.handleFormChange).toHaveBeenCalledTimes(0)
      input.simulate('change')
      expect(testData.handleFormChange).toHaveBeenCalledTimes(1)
      wrapper.find('form').simulate('submit', testData.formData)
      expect(testData.handleUserFormSubmit).toHaveBeenCalledWith(
        testData.formData,
        testData.match.url
      )
      expect(testData.handleUserFormSubmit).toHaveBeenCalledTimes(1)
    })
    it(`renders a ${testData.formType} Form snapshot properly`, () => {
      const tree = renderer.create(component).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})

describe('Form Component when authenticated', () => {
  testData.forEach((testData) => {
    const component = <Form {...testData} isAuthenticated={true} />
    it(`${testData.formType} redirects properly`, () => {
      const wrapper = shallow(component)
      expect(wrapper.find('Redirect')).toHaveLength(1)
    })
  })
})
