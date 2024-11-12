import classTeachersData from "@/metadata.json";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
    FlatList,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SignedIn, useUser, useAuth } from "@clerk/clerk-expo";
import { Attendance, ClassTeacherData, StudentData } from "@/@types/typings";
import { useSearchStore, useTeacherStore } from "@/src/store";
import { useRouter } from "expo-router";

const AttendanceButton = ({
    attendance,
    uiStatus,
    onPress,
}: {
    attendance: Attendance;
    uiStatus: Attendance;
    onPress: () => void;
}) => {
    const activeButtonStyle =
        (() => {
            switch (attendance) {
                case "present":
                    return "bg-green-500/20 border-green-500";
                case "absent":
                    return "bg-red-500/20 border-red-500";
                case "leave":
                    return "bg-yellow-500/20 border-yellow-500";
            }
        })() + " border-[3px]";

    return (
        <TouchableOpacity
            className={`flex flex-row p-4 items-center justify-center bg-zinc-700 rounded-lg ${
                uiStatus === attendance ? activeButtonStyle : ""
            } ${
                ["absent", "present"].includes(attendance) ? "flex-1" : "mt-5"
            }`}
            onPress={onPress}
        >
            <Ionicons
                name={`${
                    attendance === "present"
                        ? "checkmark-circle"
                        : attendance === "absent"
                        ? "close-circle"
                        : "time"
                }`}
                color={
                    attendance === "present"
                        ? `#4ade80`
                        : attendance === "absent"
                        ? `#f87171`
                        : `#fbbf24`
                }
                size={24}
            />
            <Text
                className={`ml-2 ${
                    uiStatus === attendance ? "text-white" : "text-gray-300"
                } font-bold tracking-wider text-base`}
            >
                {attendance.charAt(0).toUpperCase() + attendance.slice(1)}
            </Text>
        </TouchableOpacity>
    );
};

const Student = ({ studentData }: { studentData: StudentData }) => {
    const maxLength = 24;
    const [attendance, setAttendance] = useState(studentData.attendance);
    const updateStudentAttendance = useTeacherStore(
        (state) => state.updateStudentAttendance
    );

    const onPress = useCallback(
        (attendance: Attendance) => {
            setAttendance(attendance);
            updateStudentAttendance(studentData.rollNo, attendance);
        },
        [updateStudentAttendance, studentData.rollNo]
    );

    return (
        <View className="box-style min-w-[95%] max-w-[95%] p-4">
            <View className="flex flex-row justify-between">
                <Text className="text-primary font-bold truncate tracking-wide">
                    {studentData.name.slice(0, maxLength)}
                    {studentData.name.length > maxLength ? "..." : ""}
                </Text>
                <Text className="text-gray-300/80 font-semibold">
                    Roll No: {studentData.rollNo}
                </Text>
            </View>
            <View className="mt-5 flex flex-row gap-4 items-center">
                <AttendanceButton
                    attendance="present"
                    uiStatus={attendance}
                    onPress={() => onPress("present")}
                />
                <AttendanceButton
                    attendance="absent"
                    uiStatus={attendance}
                    onPress={() => onPress("absent")}
                />
            </View>
            <AttendanceButton
                attendance="leave"
                uiStatus={attendance}
                onPress={() => onPress("leave")}
            />
        </View>
    );
};

const ListHeader = () => {
    const { signOut } = useAuth();
    const teacherData = useTeacherStore((state) => state.teacher);

    const [localSearch, setLocalSearch] = useState("");
    const setSearch = useSearchStore((state) => state.setSearch);

    useEffect(() => {
        // FIX: if the local search string is changed, check for more changes untill the user stops typing for some seconds, then update the global search string.
    }, [setLocalSearch]);

    return (
        <View className="flex items-center min-w-[95%] max-w-[95%]">
            <Text className="text-center text-secondary tracking-widest font-bold text-xl mb-5">
                Standard: {teacherData.standard} ({teacherData.section})
            </Text>
            <View className="flex items-center flex-row">
                <TextInput
                    className="bg-zinc-600 p-4 text-primary font-semibold tracking-wider rounded-lg my-5 mr-10 flex-1"
                    placeholder="Search Students..."
                    placeholderTextColor={"#f5f5f5"}
                    value={localSearch}
                    onChangeText={setLocalSearch}
                />
                {/* Replace this with a search confirm button, place this somewhere else... */}
                <TouchableOpacity
                    onPress={() => signOut()}
                    className="bg-zinc-600 rounded-full p-4"
                >
                    <Feather name="log-out" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const ListFooter = () => {
    const router = useRouter();

    return (
        <TouchableOpacity
            className="bg-teal-700 p-4 rounded-lg my-5 w-[95%] flex items-center justify-center"
            onPress={() => router.navigate("/(home)/confirm")}
        >
            <Text className="text-primary font-bold tracking-wider text-lg">
                Confirm Attendance
            </Text>
        </TouchableOpacity>
    );
};

// TODO FIX: whenever the searchstring changes, rerender occurs in the entire list, causing the keyboard to close and not persist if any additional text is added.

export default () => {
    const { user } = useUser();
    const searchString = useSearchStore((state) => state.search);
    const setTeacherData = useTeacherStore((state) => state.setTeacherData);

    const classTeacherData = useMemo(() => {
        const classTeacherData: ClassTeacherData[] =
            classTeachersData.class_teachers.map((teacher) => ({
                ...teacher,
                students: teacher.students.map((student) => ({
                    ...student,
                    attendance: "absent",
                })),
            }));
        return classTeacherData.find((teacher) => teacher.id === user!.id)!;
    }, [user!.id, classTeachersData]);

    const [studentData, setStudentData] = useState<StudentData[]>(
        classTeacherData.students
    );

    useEffect(() => {
        setTeacherData({
            id: classTeacherData.id,
            standard: classTeacherData.standard,
            section: classTeacherData.section,
            students: classTeacherData.students,
        });
    }, [classTeacherData]);

    useEffect(() => {
        if (searchString) {
            const filteredData = classTeacherData.students.filter((student) =>
                student.name.toLowerCase().includes(searchString.toLowerCase())
            );
            setStudentData(filteredData);
        } else {
            setStudentData(classTeacherData.students);
        }
    }, [searchString]);

    return (
        <SignedIn>
            <View className="bg-background h-full mb-8">
                <FlatList
                    data={studentData}
                    keyExtractor={(item) => item.rollNo.toString()}
                    renderItem={({ item: studentData, index }) => (
                        <Student studentData={studentData} key={index} />
                    )}
                    contentContainerClassName="gap-y-5 bg-background flex flex-col items-center py-4 px-2"
                    ListHeaderComponent={() => <ListHeader />}
                    ListFooterComponent={() => <ListFooter />}
                />
            </View>
        </SignedIn>
    );
};
