import RecentMembers from "../components/RecentMembers";

export default function MainPage() {
    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="p-14 bg-white rounded shadow text-3xl font-semibold mb-10">
                Welcom<br/>SimpleBlog
            </h1>
            <RecentMembers />
        </div>
    );
}