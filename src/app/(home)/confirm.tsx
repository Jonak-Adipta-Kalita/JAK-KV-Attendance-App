import { useTeacherStore } from "@/src/store";
import { View, Text } from "react-native";

const ConfirmScreen = () => {
    const { students: studentAttendanceData } = useTeacherStore(
        (state) => state.teacher
    );

    return <View></View>;
};

export default ConfirmScreen;
