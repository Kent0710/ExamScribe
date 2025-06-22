"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useState } from "react";
import { Book, Loader2 } from "lucide-react";

interface SubjectCardButtonProps {
    subjectId: string;
}
const SubjectCardButton: React.FC<SubjectCardButtonProps> = ({ subjectId }) => {
    const [isNavigating, setIsNavigating] = useState(false);

    return (
        <Link href={`/subject/${subjectId}`}>
            <Button
                variant={"outline"}
                className={`w-full`}
                disabled={isNavigating}
                onClick={() => {
                    setIsNavigating(true);
                }}
                
            >
                {isNavigating ? (
                    <>
                        <Loader2 className="animate-spin" />
                        Opening subject...
                    </>
                ) : (
                    <>
                        {" "}
                        <Book /> Open subject{" "}
                    </>
                )}
            </Button>
        </Link>
    );
};

export default SubjectCardButton;
