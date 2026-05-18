import { InitialData } from "@/app/models";
import { ResumeDataContext } from "@/app/services/form-context";
import SkillsStep from "@/app/skills/page";
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
const renderSkillsStepComponent = () => {
  const setResumeData = jest.fn();
  const resumeData = InitialData;
  render(<ResumeDataContext value={{resumeData, setResumeData}}>
    <SkillsStep />
  </ResumeDataContext>);
};
describe('Skills Step', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('Checks if the skills step renders correctly', () => {
    renderSkillsStepComponent();
    expect(screen.getByText('Add Skill Set')).toBeInTheDocument();
  });
  it('Checks if the step header is rendered', () => {
    renderSkillsStepComponent();
    expect(screen.getByText('Step 3: Add Your Skills')).toBeInTheDocument();
  });
  it('Title field is rendered', () => {
      renderSkillsStepComponent();
      expect(screen.getByLabelText('Title')).toBeInTheDocument();
    });
  it('On click of the Add Skill Set button it should add a new skill set', async() => {
    renderSkillsStepComponent();
    const addSkillButton = screen.getByText('Add Skill Set');
    fireEvent.click(addSkillButton);
    expect(await waitFor(() => screen.getAllByLabelText('Skill'))).toHaveLength(2);
  });
  it('Checks the collapse functionality of skill sets', async() => {
    renderSkillsStepComponent();
    const collapseButton = screen.getAllByText('Collapse');
    fireEvent.click(collapseButton[0]);
    expect(await waitFor(() => screen.getAllByText('Expand'))).toHaveLength(1);
  })
  it('Checks the expansion functionality of skill sets', async() => {
    renderSkillsStepComponent();
     const collapseButton = screen.getAllByText('Collapse');
    fireEvent.click(collapseButton[0]);
    await waitFor(() => {screen.getAllByText('Expand')});
    const expandButton = screen.getAllByText('Expand');
    fireEvent.click(expandButton[0]);
    expect(await waitFor(() => screen.getAllByText('Collapse'))).toHaveLength(1);
  })
  it('Checks the removal of a skill set', async() => {
    renderSkillsStepComponent();
    const addSkillButton = screen.getByText('Add Skill Set');
    fireEvent.click(addSkillButton);
    await waitFor(() => fireEvent.click(addSkillButton));
    const removeSkillButton = screen.getAllByText('Remove');
    fireEvent.click(removeSkillButton[0])
    expect(await waitFor(() => screen.getAllByLabelText('Skill'))).toHaveLength(2);
  })
  it ('Back button is rendered and enabled', () => {
      renderSkillsStepComponent();
      expect(screen.getByText('Back')).toBeInTheDocument();
      expect(screen.getByText('Back')).toBeEnabled();
    });
    it('Next button is rendered and enabled', () => {
      renderSkillsStepComponent();
      expect(screen.getByText('Next')).toBeInTheDocument();
      expect(screen.getByText('Next')).toBeEnabled();
    });
  it('Save & Continue field should lead to experience route on successful submission', async() => {
    renderSkillsStepComponent();
    const saveButton = screen.getByText('Save & Continue');
    fireEvent.click(saveButton);
    expect(await waitFor(() => expect(mockRouter.push).toHaveBeenCalledWith('/experience')));
  });
});