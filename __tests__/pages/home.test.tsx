import { InitialData } from '@/app/models'
import Home from '@/app/page'
import { ResumeDataContext } from '@/app/services/form-context'
import '@testing-library/jest-dom'
import { render,screen,fireEvent, waitFor } from '@testing-library/react'
import { useRouter } from 'next/navigation';



jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

const mockPush = jest.fn()
const mockRouter = {
  push: mockPush,
  replace: jest.fn(),
  refresh: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  prefetch: jest.fn(),
}
const renderHomeComponent = () => {
  const setResumeData = jest.fn();
  const resumeData = InitialData;
  render(<ResumeDataContext value={{resumeData, setResumeData}}>
    <Home />
  </ResumeDataContext>);
};
describe('Home Page', () => {
  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
  })
  
  it('Checks if the home page renders correctly', () => {
    renderHomeComponent();
    expect(screen.getByText('Full Name *')).toBeInTheDocument();
  })
  it('Checks stepheader is rendered', () => {
    renderHomeComponent();
    expect(screen.getByText('Step 1: Complete Your Professional Heading')).toBeInTheDocument();
  })
  it('Full name field should be required and be displaying error message on submit', async() => {
    renderHomeComponent();
    fireEvent.click(screen.getByText('Save & Continue'));
    expect(await waitFor(() => screen.getByText('Name is required'))).toBeInTheDocument();
  })
  it ('Professional title field should be required', async () => {
    renderHomeComponent();
    fireEvent.click(screen.getByText('Save & Continue'));
    expect(await waitFor(() => screen.getByText('Title is required'))).toBeInTheDocument();
  })
  it ('Save & Continue field should lead to contact route on successful submission', async () => {
    renderHomeComponent();
    fireEvent.change(screen.getByLabelText('Full Name *'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Professional Title *'), { target: { value: 'Software Engineer' } });
    const saveButton = screen.getByText('Save & Continue');
    fireEvent.click(saveButton);
    // Add assertions for the currentIndex change if applicable
    expect(await waitFor(() => expect(mockRouter.push).toHaveBeenCalledWith('/contact')));
  })
  it ('Back button should be disabled on the first step', async () => {
    renderHomeComponent();
    const backButton = screen.getByText('Back');
    expect(backButton).toBeDisabled();
  })
})