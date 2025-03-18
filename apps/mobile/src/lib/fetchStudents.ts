export const fetchStudents = async (userID: string) => {
    const res = await fetch(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/fetchStudents`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userID }),
        }
    );

    if (!res.ok) {
        throw new Error("nop");
    }

    return res.json();
};
