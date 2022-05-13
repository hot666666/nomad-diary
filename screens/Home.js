import React, { useState } from "react";
import styled from "styled-components/native";
import colors from "../colors";

const emotions = ["😃", "😆", "🥲", "🥰", "😒", "🤪"];
// 네비 무시하고 터치시 어떻게 데이터 입력시키는지 참고하세요.

const Write = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [content, setContent] = useState("");

  const checkEmoji = (idx) => {
    setSelectedIndex(idx);
  };
  const checkValid = () => {
    if (content === "" || selectedIndex === null) {
      return alert("Please complete form.");
    }
    console.log(emotions[selectedIndex], content);
  };

  return (
    <View>
      <Title>How was the day?!</Title>
      <Emotions>
        {emotions.map((emoji, index) => (
          <Emotion
            key={index}
            onPress={() => checkEmoji(index)}
            isSelected={index === selectedIndex}
          >
            <Text style={{ fontSize: 25 }}>{emoji}</Text>
          </Emotion>
        ))}
      </Emotions>
      <Comment onChangeText={setContent} placeholder="Comment Here!" />
      <Save onPress={checkValid}>
        <Text style={{ fontWeight: "600", color: "white" }}>Save</Text>
      </Save>
      <Text>
        {emotions[selectedIndex]}
        {content}
      </Text>
    </View>
  );
};
export default Write;

const Text = styled.Text``;

const Title = styled.Text`
  margin-top: 50px;
  margin-bottom: 50px;
  font-size: 30px;
  font-weight: 600;
`;
const View = styled.View`
  flex:1
  align-items: center;
  padding-top:50px;
`;
const Comment = styled.TextInput`
  margin-top: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: white;
  width: 85%;
  border-radius: 20px;
  padding-left: 15px;
`;
const Save = styled.TouchableOpacity`
  margin-top: 15px;
  background-color: ${colors.btnColor};
  width: 85%;
  margin-top: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  margin-bottom: 200px;
`;
const Emotions = styled.View`
  margin-top: 50px;
  flex-direction: row;
  align-items: center;
`;
const Emotion = styled.TouchableOpacity`
  height: 50px;
  width: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: ${(props) => (props.isSelected ? "grey" : "white")};
  margin-right: 4px;
  margin-left: 4px;
`;
