import { TextInput, KeyboardTypeOptions } from "react-native";
import { useTheme } from "../context/ThemeContext";

interface InputProps {
    placeholder: string;
    value: string;
    onChangeText?: (text: string) => void;
    secureTextEntry?: boolean;
    keyboardType?: KeyboardTypeOptions;
    autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

function Input(props: InputProps) {
    const { theme } = useTheme();

    return (
        <TextInput
            style={{
                height: 48,
                width: "100%",
                borderColor: theme.colors.border,
                borderWidth: 2,
                backgroundColor: theme.colors.input,
                borderRadius: 12,
                paddingHorizontal: 20,
                marginBottom: 15,
                color: theme.colors.text,
            }}
            placeholder={props.placeholder}
            value={props.value}
            onChangeText={props.onChangeText}
            secureTextEntry={props.secureTextEntry}
            keyboardType={props.keyboardType}
            autoCapitalize={props.autoCapitalize}
            placeholderTextColor={theme.colors.textMuted}
        />
    );
}

export default Input;