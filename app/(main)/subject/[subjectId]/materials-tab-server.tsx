import getMaterials from "@/actions/get-materials";
import { MaterialsTab } from "./materials-tab";

interface MaterialsTabServerProps {
    subjectId : string;
}
const MaterialsTabServer : React.FC<MaterialsTabServerProps> = async ({
    subjectId
}) => {
    const materials = (await getMaterials(subjectId)).materials

    return (
        <MaterialsTab materials={materials} subjectId={subjectId} />
    )
};

export default MaterialsTabServer;