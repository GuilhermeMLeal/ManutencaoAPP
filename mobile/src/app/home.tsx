import { Text } from "react-native";

interface HomeNames{
    name: string;
}

export default function Home({name}: HomeNames){
    return(
        <Text>Página {name}</Text>
    );
}