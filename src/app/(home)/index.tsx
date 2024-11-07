import { FlatList, Text, View } from "react-native";
import { SignedIn, useUser, useAuth } from "@clerk/clerk-expo";
import { Attendance, StudentData } from "@/@types/typings";

import classTeachersData from "@/metadata.json";
import { useMemo, useState } from "react";

const Student = ({ studentData }: { studentData: StudentData }) => {
  const maxLength = 24;
  // use global store instead of a functional state?
  const [attendance, setAttendance] = useState<Attendance>("absent");

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
      <View>
        <View>
          {/* Present */}
          {/* Absent */}
        </View>
        {/* On Leave */}
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
