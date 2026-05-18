import { InitialData } from "@/app/models";
import ProjectStep from "@/app/projects/page";
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
const renderProjectStepComponent = () => {
    const setResumeData = jest.fn();
    const resumeData = InitialData;
    render(<ResumeDataContext value={{ resumeData, setResumeData }}>
        <ProjectStep />
    </ResumeDataContext>);
};
describe('Project Step Component', () => {
    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue(mockRouter);
    });
    it('Checks if the Project Step component is rendered', () => {
        renderProjectStepComponent();
        const projectStep = screen.getByText('Add Project');
        expect(projectStep).toBeInTheDocument();
    });
    it('Checks if the step header is rendered', () => {
        renderProjectStepComponent();
        expect(screen.getByText('Step 8: Add Your Projects')).toBeInTheDocument();
    });
    it('Title field is rendered', () => {
        renderProjectStepComponent();
        expect(screen.getByLabelText('Title')).toBeInTheDocument();
    });
    it('On click of the Add Project button it should add a new project entry', async () => {
        renderProjectStepComponent();
        const addProjectButton = screen.getByText('Add Project');
        fireEvent.click(addProjectButton);
        expect(await waitFor(() => screen.getAllByLabelText('Project Name'))).toHaveLength(2);
    });
    it('Checks for the removal of a project entry', async () => {
        renderProjectStepComponent();
        const addProjectButton = screen.getByText('Add Project');
        fireEvent.click(addProjectButton);
        await waitFor(() => fireEvent.click(addProjectButton));
        const removeProjectButton = screen.getAllByText('Remove');
        fireEvent.click(removeProjectButton[0]);
        expect(await waitFor(() => screen.getAllByLabelText('Project Name'))).toHaveLength(2);
    });
    it('Back button is rendered and enabled', () => {
        renderProjectStepComponent();
        expect(screen.getByText('Back')).toBeInTheDocument();
        expect(screen.getByText('Back')).toBeEnabled();
    });
    it('Next button is rendered and enabled', () => {
        renderProjectStepComponent();
        expect(screen.getByText('Next')).toBeInTheDocument();
        expect(screen.getByText('Next')).toBeDisabled();
    });
    it('Save & Continue field should lead to preview route on successful submission', async () => {
        renderProjectStepComponent();
        const saveButton = screen.getByText('Save & Continue');
        fireEvent.click(saveButton);
        expect(await waitFor(() => expect(mockRouter.push).toHaveBeenCalledWith('/preview')));
    });
});