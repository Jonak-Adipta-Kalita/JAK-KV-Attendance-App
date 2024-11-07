import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SignedIn, useUser, useAuth } from "@clerk/clerk-expo";
import { Attendance, StudentData } from "@/@types/typings";

import classTeachersData from "@/metadata.json";

const AttendanceButton = ({
  attendance,
  setUIStatus,
  uiStatus,
}: {
  attendance: Attendance;
  uiStatus: Attendance | null;
  setUIStatus: Dispatch<SetStateAction<Attendance | null>>;
}) => {
  return (
    <TouchableOpacity
      className={`flex flex-row p-4 items-center justify-center bg-zinc-700 rounded-lg ${
        uiStatus === attendance ? "bg-zinc-800/70 border-2 border-gray-800" : ""
      }`}
      onPress={() => setUIStatus(attendance)}
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
      <Text className="ml-2 text-gray-300 font-bold tracking-wider text-base">
        {attendance.charAt(0).toUpperCase() + attendance.slice(1)}
      </Text>
    </TouchableOpacity>
  );
};

const Student = ({ studentData }: { studentData: StudentData }) => {
  const maxLength = 24;
  // use global store instead of a functional state?
  const [attendance, setAttendance] = useState<Attendance | null>(null);

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
      <View className="mt-5 gap-y-4">
        <View className="flex flex-row">
          {/* TODO: make buttons take the full half width! */}
          <AttendanceButton
            attendance="present"
            uiStatus={attendance}
            setUIStatus={setAttendance}
          />
          <AttendanceButton
            attendance="absent"
            uiStatus={attendance}
            setUIStatus={setAttendance}
          />
        </View>
        <AttendanceButton
          attendance="leave"
          uiStatus={attendance}
          setUIStatus={setAttendance}
        />
      </View>
    </View>
  );
};

export default () => {
  const { user } = useUser();
  const { signOut } = useAuth();

  const classTeacherData = useMemo(
    () =>
      classTeachersData.class_teachers.find(
        (teacher) => teacher.id === user!.id
      )!,
    [user!.id, classTeachersData]
  );

  return (
    <SignedIn>
      <View className="bg-background h-full">
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
        <View className="mb-8" />
      </View>
    </SignedIn>
  );
};
