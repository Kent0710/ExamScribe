import getExamSettings from "@/actions/get-exam-settings";
import SettingsTab from "./settings-tab";

interface SettingsTabServerProps {
    examId: string;
}
const SettingsTabServer: React.FC<SettingsTabServerProps> = async ({
    examId,
}) => {
    const { success, examSettings } = await getExamSettings(examId);

    return (
        <SettingsTab
            examId={examId}
            isSettingsFetchedSuccessfully={success}
            examSettings={examSettings}
        />
    );
};

export default SettingsTabServer;
