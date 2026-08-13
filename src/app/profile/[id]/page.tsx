type UserProfilePageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function UserProfilePage({ params }: UserProfilePageProps) {
    const { id } = await params;

    return (
        <div className="flex flex-col flex-1 font-sans dark:bg-black">
            <h1 className="text-2xl bg-amber-500 text-cyan-500 font-bold">Profile</h1>
            <hr/>
            <p className = "text-4xl">Welcome profile page 
                <span className="font-bold text-amber-300">{id}</span>
            </p>
        </div> 
    )
}
