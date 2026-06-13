import { InitialData } from "@/app/models";
import { ResumeDataContext } from "@/app/services/form-context";
import SummaryStep from "@/app/summary/page";
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
const renderSummaryStepComponent = () => {
  const setResumeData = jest.fn();
  const resumeData = InitialData;
  render(<ResumeDataContext value={{resumeData, setResumeData}}>
    <SummaryStep />
  </ResumeDataContext>);
};
describe('Summary Step', () => {
    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue(mockRouter);
    });
    it('Checks if the Summary Step component is rendered', () => {
      renderSummaryStepComponent();
      const summaryStep = screen.getByText('Professional Summary *');
      expect(summaryStep).toBeInTheDocument();
    });
    it('Checks if the step header is rendered', () => {
        renderSummaryStepComponent();
        expect(screen.getByText('Step 5: Review Your Summary')).toBeInTheDocument();
    });
    it('Title field is rendered', () => {
        renderSummaryStepComponent();
        expect(screen.getByLabelText('Title')).toBeInTheDocument();
    });
    it('Title field should be of minimum length 2', async () => {
        renderSummaryStepComponent();
        const titleField = screen.getByLabelText('Title');
        fireEvent.change(titleField, { target: { value: 'A' } });
        const saveButton = screen.getByText('Save & Continue');
        fireEvent.click(saveButton);
        expect(await waitFor(() => screen.getByText('Title must be at least 2 characters long'))).toBeInTheDocument();
    });
    it('Title field should be of maximum length 100', async () => {
        renderSummaryStepComponent();
        const titleField = screen.getByLabelText('Title');
        fireEvent.change(titleField, { target: { value: 'A'.repeat(101) } });
        const saveButton = screen.getByText('Save & Continue');
        fireEvent.click(saveButton);
        expect(await waitFor(() => screen.getByText('Title must be less than 100 characters long'))).toBeInTheDocument();
    });
    it('Professional Summary field is rendered and it is required', async() => {
        renderSummaryStepComponent();
        expect(screen.getByLabelText('Professional Summary *')).toBeInTheDocument();
        const saveButton = screen.getByText('Save & Continue');
        fireEvent.click(saveButton);
        await waitFor(() => {
            expect(screen.getByText('Professional summary is required')).toBeInTheDocument();
        });
    });
    it('Professional Summary field should have a minimum length of 10 characters', async() => {
        renderSummaryStepComponent();
        const descriptionField = screen.getByLabelText('Professional Summary *');
        fireEvent.change(descriptionField, { target: { value: 'A'.repeat(9) } });
        const saveButton = screen.getByText('Save & Continue');
        fireEvent.click(saveButton);
        await waitFor(() => {
            expect(screen.getByText('Professional summary must be at least 10 characters long')).toBeInTheDocument();
        });
    });
    it('Professional Summary field should have a maximum length of 1000 characters', async() => {
        renderSummaryStepComponent();
        const descriptionField = screen.getByLabelText('Professional Summary *');
        fireEvent.change(descriptionField, { target: { value: 'A'.repeat(1001) } });
        const saveButton = screen.getByText('Save & Continue');
        fireEvent.click(saveButton);
        await waitFor(() => {
            expect(screen.getByText('Professional summary must be less than 1000 characters long')).toBeInTheDocument();
        });
    });
    it('Back button is rendered and enabled', () => {
        renderSummaryStepComponent();
        expect(screen.getByText('Back')).toBeInTheDocument();
        expect(screen.getByText('Back')).toBeEnabled();
    });
    it('Next button is rendered and enabled', () => {
        renderSummaryStepComponent();
        expect(screen.getByText('Next')).toBeInTheDocument();
        expect(screen.getByText('Next')).toBeEnabled();
    });
    it ('Save & Continue field should lead to skills route on successful submission', async () => {
          renderSummaryStepComponent();
          fireEvent.change(screen.getByLabelText('Professional Summary *'), { target: { value: 'Professional summary will come here.' } });
          const saveButton = screen.getByText('Save & Continue');
          fireEvent.click(saveButton);
          // Add assertions for the currentIndex change if applicable
          expect(await waitFor(() => expect(mockRouter.push).toHaveBeenCalledWith('/education')));
        })
});