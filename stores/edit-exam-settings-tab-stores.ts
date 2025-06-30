import { create } from "zustand";

interface isCreatedSectionsHasParagraphType {
    isCreatedSectionsHasParagraph: boolean;
    questionId: string;
    setIsCreatedSectionsHasParagraph: (newValue: boolean, questionId : string) => void;
}

export const useIsCreatedSectionsHasParagraph =
    create<isCreatedSectionsHasParagraphType>()((set) => ({
        isCreatedSectionsHasParagraph: false,
        questionId : '',
        setIsCreatedSectionsHasParagraph: (
            newValue: boolean,
            questionId: string
        ) =>
            set({
                isCreatedSectionsHasParagraph: newValue,
                questionId: questionId,
            }),
    }));
