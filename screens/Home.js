import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../colors";
import { useDB } from "../context";
import { FlatList } from "react-native-gesture-handler";
import { Platform, LayoutAnimation } from "react-native";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Home = ({ navigation, route: { params } }) => {
  const db = useDB();
  const [feelings, setFeelings] = useState([]);
  const [forceUpdate, forceUpdateId] = useForceUpdate();

  const loadDiary = async () => {
    await db.transaction(async (tx) => {
      await tx.executeSql(
        `SELECT * from DIARY;`,
        [],
        (_, { rows: { _array } }) => {
          if (_array.length >= 0) {
            const items = _array;
            setFeelings(items);
          }
        }
      );
    });
    LayoutAnimation.spring();
  };

  const deleteFeeling = (id) => {
    db.transaction(
      (tx) => {
        tx.executeSql(`delete from DIARY where id = ?;`, [id]);
      },
      null,
      forceUpdate
    );
    loadDiary();
  };

  if (params?.update) {
    loadDiary();
    params.update = false;
  }

  useEffect(() => {
    loadDiary();
  }, []);

  return (
    <View>
      <Title>Memo</Title>
      <FlatList
        style={{ marginBottom: 200 }}
        data={feelings}
        keyExtractor={(prop) => prop.id}
        ItemSeparatorComponent={Separator}
        renderItem={({ item }) => (
          <Record
            onPress={() => {
              console.log(item.id);
              deleteFeeling(item.id);
            }}
          >
            <Emotion>{item.emotion}</Emotion>
            <Content>{item.message}</Content>
          </Record>
        )}
      />
      <Btn onPress={() => navigation.navigate("Write")}>
        <Ionicons name="add" color="white" size={50} />
      </Btn>
    </View>
  );
};

const useForceUpdate = () => {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
};

export default Home;

const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  color: ${colors.textColor};
  margin-bottom: 100px;
`;
const View = styled.View`
  flex: 1;
  padding: 0px 30px;
  padding-top: 100px;
`;
const Btn = styled.TouchableOpacity`
  position: absolute;
  bottom: 50px;
  right: 50px;
  height: 80px;
  width: 80px;
  border-radius: 40px;
  background-color: ${colors.btnColor};
  align-items: center;
  justify-content: center;
  elevation: 5;
  box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.4);
`;
const Record = styled.TouchableOpacity`
  background-color: ${colors.cardColor};
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
  border-radius: 10px;
`;
const Emotion = styled.Text`
  font-size: 20px;
`;
const Content = styled.Text`
  font-size: 20px;
  margin-left: 10px;
`;
const Separator = styled.View`
  height: 10px;
`;
