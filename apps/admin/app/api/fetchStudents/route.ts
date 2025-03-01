import cTData from "./metadata.json";

export const dynamic = "force-static";
export const revalidate = 60;

export const POST = async (req: Request) => {
    const { userID } = await req.json();

    const classTeacherData = cTData.class_teachers
        .map((teacher) => ({
            ...teacher,
            students: teacher.students.map((student) => ({
                ...student,
                attendance: "present",
            })),
        }))
        .find((teacher) => teacher.id === userID)!;

    return Response.json(classTeacherData);
};
