import RecentMembers from "../components/RecentMembers";

export default function MainPage() {
    return (
        <div className="max-w-3xl mx-auto mt-10">
            <h1 style={{ color: "#333", marginBottom: "16px" }}>
                Welcom SimpleBlog
            </h1>
            <RecentMembers />
        </div>
    );
}