import { TextInput, KeyboardTypeOptions } from "react-native";

interface InputProps {
    placeholder: string;
    value: string;
    onChangeText?: (text: string) => void;
    secureTextEntry?: boolean;
    keyboardType?: KeyboardTypeOptions;
    autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

function Input(props: InputProps) {
    return (
        <TextInput
            style={{
                height: 48,
                width: "100%",
                borderColor: "#EAEAEA",
                borderWidth: 2,
                backgroundColor: "#EAEAEA",
                borderRadius: 12,
                paddingHorizontal: 20,
                marginBottom: 15,
                color: "#000",
            }}
            placeholder={props.placeholder}
            value={props.value}
            onChangeText={props.onChangeText}
            secureTextEntry={props.secureTextEntry}
            keyboardType={props.keyboardType}
            autoCapitalize={props.autoCapitalize}
            placeholderTextColor="#999"
        />
    );
}

export default Input;