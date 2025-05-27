import {getAllCompanions} from "@/lib/actions/companion.actions";
import CompanionCard from "@/components/CompanionCard";
import {getSubjectColor} from "@/lib/utils";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import Link from "next/link";

const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
    const filters = await searchParams;
    const subject = filters.subject ?? '';
    const topic = filters.topic ?? '';
    const page = parseInt(filters.page) || 1;
    const limit = 9;

    const companions = await getAllCompanions({ subject, topic, page, limit });

    return (
        <main>
            <section className="flex justify-between gap-4 max-sm:flex-col">
                <h1>Companion Library</h1>
                <div className="flex gap-4">
                    <SearchInput />
                    <SubjectFilter />
                </div>
            </section>

            <section className="companions-grid">
                {companions.map((companion) => (
                    <CompanionCard
                        key={companion.id}
                        {...companion}
                        color={getSubjectColor(companion.subject)}
                    />
                ))}
            </section>

            <section className="flex justify-center gap-4 mb-5">
                {page > 1 && (
                   <Link href={`?page=${page - 1}&subject=${subject}&topic=${topic}`} className="px-4 py-2 rounded-xl bg-[#fe5933] border border-gray-300 shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-orange-300 transition-all duration-200 relative z-10">
                    ← Previous
                   </Link>
                )}
                {companions.length === limit && (
                    <Link
                        href={`?page=${page + 1}&subject=${subject}&topic=${topic}`}
                       className="px-4 py-2 rounded-xl bg-[#fe5933] border border-gray-300 shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-orange-300 transition-all duration-200 relative z-10"
                    >
                        Next →
                    </Link>
                )}
            </section>
        </main>
    );
}


export default CompanionsLibrary
