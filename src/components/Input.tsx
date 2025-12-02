import { TextInput } from "react-native";

interface InputProps {
    placeholder: string;
    value: string;
    onChangeText?: (text: string) => void;
    secureTextEntry?: boolean;
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
            }}
            placeholder={props.placeholder}
            value={props.value}
            onChangeText={props.onChangeText}
            secureTextEntry={props.secureTextEntry}
            
        />
    );
}

export default Input;