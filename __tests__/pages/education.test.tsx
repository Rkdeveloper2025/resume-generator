import EducationStep from "@/app/education/page";
import { InitialData } from "@/app/models";
import { ResumeDataContext } from "@/app/services/form-context";
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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
const renderEducationStepComponent = () => {
    const setResumeData = jest.fn();
    const resumeData = InitialData;
    render(<ResumeDataContext value={{ resumeData, setResumeData }}>
        <EducationStep />
    </ResumeDataContext>);
};
describe('Education Step', () => {
    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue(mockRouter);
    });
    it('Checks if the Education Step component is rendered', () => {
        renderEducationStepComponent();
        const educationStep = screen.getByText('Add Education');
        expect(educationStep).toBeInTheDocument();
    });
    it('Checks if the step header is rendered', () => {
        renderEducationStepComponent();
        expect(screen.getByText('Step 6: Add Your Educational Information')).toBeInTheDocument();
    });
    it('Title field is rendered', () => {
        renderEducationStepComponent();
        expect(screen.getByLabelText('Title')).toBeInTheDocument();
    });
    it('Title field should be of minimum length 2', async () => {
        renderEducationStepComponent();
        const titleField = screen.getByLabelText('Title');
        fireEvent.change(titleField, { target: { value: 'A' } });
        const saveButton = screen.getByText('Save & Continue');
        fireEvent.click(saveButton);
        expect(await waitFor(() => screen.getByText('Title must be at least 2 characters long'))).toBeInTheDocument();
    });
    it('Title field should be of maximum length 100', async () => {
        renderEducationStepComponent();
        const titleField = screen.getByLabelText('Title');
        fireEvent.change(titleField, { target: { value: 'A'.repeat(101) } });
        const saveButton = screen.getByText('Save & Continue');
        fireEvent.click(saveButton);
        expect(await waitFor(() => screen.getByText('Title must be less than 100 characters long'))).toBeInTheDocument();
    });
    it('On click of the Add Education button it should add a new education entry', async () => {
        renderEducationStepComponent();
        const addEducationButton = screen.getByText('Add Education');
        fireEvent.click(addEducationButton);
        expect(await waitFor(() => screen.getAllByLabelText('Institution'))).toHaveLength(2);
    });
    it('Checks for the removal of an education entry', async () => {
        renderEducationStepComponent();
        const addEducationButton = screen.getByText('Add Education');
        fireEvent.click(addEducationButton);
        await waitFor(() => fireEvent.click(addEducationButton));
        const removeEducationButton = screen.getAllByText('Remove');
        fireEvent.click(removeEducationButton[0]);
        expect(await waitFor(() => screen.getAllByLabelText('Institution'))).toHaveLength(2);
    });
    it('Back button is rendered and enabled', () => {
        renderEducationStepComponent();
        expect(screen.getByText('Back')).toBeInTheDocument();
        expect(screen.getByText('Back')).toBeEnabled();
    });
    it('Next button is rendered and enabled', () => {
        renderEducationStepComponent();
        expect(screen.getByText('Next')).toBeInTheDocument();
        expect(screen.getByText('Next')).toBeEnabled();
    });
    it('Save & Continue field should lead to awards route on successful submission', async () => {
        renderEducationStepComponent();
        const saveButton = screen.getByText('Save & Continue');
        fireEvent.click(saveButton);
        expect(await waitFor(() => expect(mockRouter.push).toHaveBeenCalledWith('/awards')));
    });
});