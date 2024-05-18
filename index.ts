#! /usr/bin/env node
import inquirer from "inquirer";
import {differenceInSeconds} from "date-fns"

const counter = await inquirer.prompt (
    {
        name: "Input",
        type: "number",
        message:"Enter the amount of seconds",
        validate: (input)=> {
            if(isNaN(input)) {
                return "Please enter a valid number"
            } else if (input > 60) {
                return "Second must be in 60"
            } else {
                return true;
            }
        }
    }
);

let input = counter.Input
function startCounter(value:number) {
    const initialTime = new Date () .setSeconds (new Date().getSeconds() + value);
    const intervalTime = new Date (initialTime);
     setInterval((() => {
        const currentTime = new Date ();
        const timeDifference = differenceInSeconds (intervalTime , currentTime);

        if (timeDifference <= 0) {
            console.log("Time has run out");
            process.exit();
        }
        const minutes = Math.floor ((timeDifference%(3600 * 24))/3600)
        const seconds = Math.floor (timeDifference % 60)
        console.log(`${minutes.toString().padStart(2 , "0")}:${seconds.toString().padStart(2 , "0")}`);
     }),1000);
}
startCounter(input);