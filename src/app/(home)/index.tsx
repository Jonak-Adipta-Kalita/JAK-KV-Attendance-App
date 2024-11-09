import { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SignedIn, useUser, useAuth } from "@clerk/clerk-expo";
import { Attendance, ClassTeacherData, StudentData } from "@/@types/typings";

import classTeachersData from "@/metadata.json";
import { useTeacherStore } from "@/src/store";

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
      } ${["absent", "present"].includes(attendance) ? "flex-1" : "mt-5"}`}
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

export default () => {
  const { user } = useUser();
  const { signOut } = useAuth();

  const teacherData = useTeacherStore((state) => state.teacher);
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
  }, [user!.id, classTeachersData]); // put back the code of injecting the absent status into students

  useEffect(() => {
    setTeacherData({
      name: user!.username!,
      students: classTeacherData.students,
    });
  }, []);

  return (
    <SignedIn>
      <View className="bg-background h-full mb-8">
        <View className="flex items-center py-4">
          <FlatList
            data={classTeacherData.students}
            keyExtractor={(item) => item.name}
            renderItem={({ item: studentData, index }) => (
              <Student studentData={studentData} key={index} />
            )}
            contentContainerClassName="gap-y-5 bg-background flex flex-col items-center"
          />
        </View>
      </View>
    </SignedIn>
  );
};
