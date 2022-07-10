import { Button } from './Button'
import { render, fireEvent, screen } from '../../../helpers/test-utils'

describe('Button component', () => {
  test('Renders correctly and can be pressed', () => {
    const fakeOnClick = jest.fn()
    render(<Button onClick={fakeOnClick} label="Test" />)

    const renderedButton = screen.getByText('Test')

    fireEvent.click(renderedButton)

    expect(renderedButton).toBeDefined()
    expect(fakeOnClick).toHaveBeenCalled()
  })
})
