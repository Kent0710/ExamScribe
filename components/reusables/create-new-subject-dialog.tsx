import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import CreateNewSubjectForm from "./create-new-subject-form";

const CreateNewSubject = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Plus />
                    Create new subject
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle> Create new subject </DialogTitle>
                    <DialogDescription>
                        Additional information will be used to design the exams later on.
                    </DialogDescription>
                    <CreateNewSubjectForm />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default CreateNewSubject;
