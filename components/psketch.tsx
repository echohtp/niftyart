import React from "react";
import Sketch from "react-p5";

export const PSketch = (props: any) => {

    return(<Sketch setup={props.setup} draw={props.draw} />)
}