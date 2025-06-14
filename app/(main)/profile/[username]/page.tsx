import PageTitleHeader from "@/components/reusables/page-title-header";

const ProfilePage = async ({
    params,
}: {
    params: Promise<{ username: string }>;
}) => {
    const awaitedParams = await params;

    return (
        <div className="space-y-4">
            <PageTitleHeader 
                title={awaitedParams.username + ' Profile'}
            />
        </div>
    )
};

export default ProfilePage;