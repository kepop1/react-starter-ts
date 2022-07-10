import { TextButton } from './TextButton'
import { render, fireEvent, screen } from '../../../helpers/test-utils'

describe('TextButton component', () => {
  test('Renders correctly and can be pressed', () => {
    const fakeOnClick = jest.fn()
    render(<TextButton onClick={fakeOnClick} label="Test" />)

    const renderedButton = screen.getByText('Test')

    fireEvent.click(renderedButton)

    expect(renderedButton).toBeDefined()
    expect(fakeOnClick).toHaveBeenCalled()
  })
})
