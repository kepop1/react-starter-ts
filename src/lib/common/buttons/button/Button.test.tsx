import { vi } from 'vitest'
import { render, fireEvent, screen } from '@/lib/helpers/test-utils'
import { Button } from './Button'

describe('Button component', () => {
  test('Renders correctly and can be pressed', () => {
    const fakeOnClick = vi.fn()
    render(<Button onClick={fakeOnClick} label="Test" isLoading={false} />)

    const renderedButton = screen.getByText('Test')

    fireEvent.click(renderedButton)

    expect(renderedButton).toBeDefined()
    expect(fakeOnClick).toHaveBeenCalled()
  })
})
