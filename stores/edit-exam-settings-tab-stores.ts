import { create } from "zustand";

interface isCreatedSectionsHasParagraphType {
    isCreatedSectionsHasParagraph: boolean;
    setIsCreatedSectionsHasParagraph: (newValue: boolean) => void;
}

export const useIsCreatedSectionsHasParagraph =
    create<isCreatedSectionsHasParagraphType>()((set) => ({
        isCreatedSectionsHasParagraph: false,
        setIsCreatedSectionsHasParagraph: (newValue: boolean) =>
            set({
                isCreatedSectionsHasParagraph: newValue,
            }),
    }));
