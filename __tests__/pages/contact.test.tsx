import ContactPage from "@/app/contact/page";
import { InitialData } from "@/app/models";
import { ResumeDataContext } from "@/app/services/form-context";
import '@testing-library/jest-dom'
import { fireEvent, render,screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";

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
const renderContactComponent = () => {
  const setResumeData = jest.fn();
  const resumeData = InitialData;
  render(<ResumeDataContext value={{resumeData, setResumeData}}>
    <ContactPage />
  </ResumeDataContext>);
};
describe('Contact Page', () => {
  beforeEach(() => {
      ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
    })

  it('Checks if the contact page renders correctly', () => {
    renderContactComponent();
    expect(screen.getByText('Email *')).toBeInTheDocument();
  });
  it('Checks if step header is rendered', () => {
    renderContactComponent();
    expect(screen.getByText('Step 2: Add Your Contact Information')).toBeInTheDocument();
  });
  it('Title field is rendered', () => {
    renderContactComponent();
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
  });
  it('Title field should have minimum length requirement', async () => {
    renderContactComponent();
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'J' } });
    fireEvent.click(screen.getByText('Save & Continue'));
    expect(await waitFor(() => screen.getByText('Title must be at least 2 characters long'))).toBeInTheDocument();
  });
  it('Title field should have maximum length requirement', async () => {
    renderContactComponent();
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'A'.repeat(101) } });
    fireEvent.click(screen.getByText('Save & Continue'));
    expect(await waitFor(() => screen.getByText('Title must be less than 100 characters long'))).toBeInTheDocument();
  });
  it('Email field is required', async() => {
    renderContactComponent();
    fireEvent.click(screen.getByText('Save & Continue'));
    expect(await waitFor(() => screen.getByText('Email is required'))).toBeInTheDocument();
  });
  it('Phone field is required', async() => {
    renderContactComponent();
    fireEvent.click(screen.getByText('Save & Continue'));
    expect(await waitFor(() => screen.getByText('Phone is required'))).toBeInTheDocument();
  });
  it('Location field is required', async() => {
    renderContactComponent();
    fireEvent.click(screen.getByText('Save & Continue'));
    expect(await waitFor(() => screen.getByText('Location is required'))).toBeInTheDocument();
  });
  it('Location field should have minimum length requirement', async () => {
    renderContactComponent();
    fireEvent.change(screen.getByLabelText('Location *'), { target: { value: 'J' } });
    fireEvent.click(screen.getByText('Save & Continue'));
    expect(await waitFor(() => screen.getByText('Location must be at least 2 characters long'))).toBeInTheDocument();
  });
  it('Location field should have maximum length requirement', async () => {
    renderContactComponent();
    fireEvent.change(screen.getByLabelText('Location *'), { target: { value: 'A'.repeat(101) } });
    fireEvent.click(screen.getByText('Save & Continue'));
    expect(await waitFor(() => screen.getByText('Location must be less than 100 characters long'))).toBeInTheDocument();
  });
  it('Checks if profile link is rendered', () => {
    renderContactComponent();
    expect(screen.getByText('Profile Link')).toBeInTheDocument();
  });
  it('Checks if the link title is rendered', () => {
    renderContactComponent();
    expect(screen.getByText('Link Title')).toBeInTheDocument();
  });
  it('Link Title field should have minimum length requirement', async () => {
    renderContactComponent();
    fireEvent.change(screen.getByLabelText('Link Title'), { target: { value: 'J' } });
    fireEvent.click(screen.getByText('Save & Continue'));
    expect(await waitFor(() => screen.getByText('Link title must be at least 2 characters long'))).toBeInTheDocument();
  });
  it('Link Title field should have maximum length requirement', async () => {
    renderContactComponent();
    fireEvent.change(screen.getByLabelText('Link Title'), { target: { value: 'A'.repeat(101) } });
    fireEvent.click(screen.getByText('Save & Continue'));
    expect(await waitFor(() => screen.getByText('Link title must be less than 100 characters long'))).toBeInTheDocument();
  });
  it ('Back button is rendered and enabled', () => {
    renderContactComponent();
    expect(screen.getByText('Back')).toBeInTheDocument();
    expect(screen.getByText('Back')).toBeEnabled();
  });
  it('Next button is rendered and enabled', () => {
    renderContactComponent();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeEnabled();
  });
  it ('Save & Continue field should lead to skills route on successful submission', async () => {
      renderContactComponent();
      fireEvent.change(screen.getByLabelText('Email *'), { target: { value: 'john.doe@example.com' } });
      fireEvent.change(screen.getByLabelText('Phone *'), { target: { value: '9014156533' } });
      fireEvent.change(screen.getByLabelText('Location *'), { target: { value: 'New York' } });
      const saveButton = screen.getByText('Save & Continue');
      fireEvent.click(saveButton);
      // Add assertions for the currentIndex change if applicable
      expect(await waitFor(() => expect(mockRouter.push).toHaveBeenCalledWith('/skills')));
    })
});