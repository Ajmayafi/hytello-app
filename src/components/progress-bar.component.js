import {  ProgressBar as Bar  } from "react-native-paper";

export const ProgressBar = () => {
    return (
        <Bar progress={0.5} color="#52ab98" indeterminate={true} />
    )
}