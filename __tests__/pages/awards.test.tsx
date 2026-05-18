import AwardStep from "@/app/awards/page";
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
const renderAwardsStepComponent = () => {
    const setResumeData = jest.fn();
    const resumeData = InitialData;
    render(<ResumeDataContext value={{ resumeData, setResumeData }}>
        <AwardStep />
    </ResumeDataContext>);
};
describe('Awards Step Component', () => {
    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue(mockRouter);
    });
    it('Checks if the Awards Step component is rendered', () => {
        renderAwardsStepComponent();
        const awardsStep = screen.getByText('Add Achievement');
        expect(awardsStep).toBeInTheDocument();
    });
    it('Checks if the step header is rendered', () => {
        renderAwardsStepComponent();
        expect(screen.getByText('Step 7: Awards & Achievements')).toBeInTheDocument();
    });
    it('Title field is rendered', () => {
        renderAwardsStepComponent();
        expect(screen.getByLabelText('Title')).toBeInTheDocument();
    });
    it('On click of the Add Achievement button it should add a new achievement entry', async () => {
        renderAwardsStepComponent();
        const addAchievementButton = screen.getByText('Add Achievement');
        fireEvent.click(addAchievementButton);
        expect(await waitFor(() => screen.getAllByLabelText('Award & Recognition'))).toHaveLength(2);
    });
    it('Checks for the removal of an achievement entry', async () => {
        renderAwardsStepComponent();
        const addAchievementButton = screen.getByText('Add Achievement');
        fireEvent.click(addAchievementButton);
        await waitFor(() => fireEvent.click(addAchievementButton));
        const removeAchievementButton = screen.getAllByText('Remove');
        fireEvent.click(removeAchievementButton[0]);
        expect(await waitFor(() => screen.getAllByLabelText('Award & Recognition'))).toHaveLength(2);
    });
    it('Back button is rendered and enabled', () => {
        renderAwardsStepComponent();
        expect(screen.getByText('Back')).toBeInTheDocument();
        expect(screen.getByText('Back')).toBeEnabled();
    });
    it('Next button is rendered and enabled', () => {
        renderAwardsStepComponent();
        expect(screen.getByText('Next')).toBeInTheDocument();
        expect(screen.getByText('Next')).toBeEnabled();
    });
    it('Save & Continue field should lead to projects route on successful submission', async () => {
        renderAwardsStepComponent();
        const saveButton = screen.getByText('Save & Continue');
        fireEvent.click(saveButton);
        expect(await waitFor(() => expect(mockRouter.push).toHaveBeenCalledWith('/projects')));
    });
})