/*
File: script.js
GUI Assignment 3: Creating an interactive dynamic multiplication table_stuff
Tim Truong, UMass Lowell Computer Science, tim_truong1@student.uml.edu
Copyright (c) 2022 by Tim Truong. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
Updated on 6/15/22 at 10:00pm.
Instructor: Professor Wenjin Zhou
Sources of Help: W3Schools and Stackoverflow
Brief Overview: The site I created for hw 3 for GUI 1 is pretty much a multiplication table_stuff where
it takes in about four numbers from the user where each number that is required to be inputted be
the minimum and maximum value of first row and column. So for instance if the user inputs 5 and 9 for
the min and max number for row and 4 and 7 for column then it would generate a table_stuff that has 5 rows
and 4 columns where the starting row and column would have the minimum value inputted and at the last row
and column would have the max value inputted and each corresponding cell based on the row and column
would have the product of the value at that row and column. So for example at the row where its value is
at 6 and the column at 7, the cell corresponding to those positions would produce 42 as 6 * 7 = 42.
*/

// Loads DOM before we can do stuff
document.addEventListener("DOMContentLoaded", function(){
    document.getElementById('myForm').addEventListener("submit", function(event) {
        event.preventDefault();    // used preventDefault so it would not flash the table and disappear
        check();
    });
});

function check() {
    // Converted input value to number, for some unknown reason i kept recieving
    // garbage value but by adding the Number() method, it fixed this issue.
    // Learned about it in this w3schools link, Credit -> https://www.w3schools.com/jsref/jsref_number.asp
    let min_c_val = Number(document.getElementById("min-cVal").value);
    let max_c_val = Number(document.getElementById("max-cVal").value);
    let min_r_val = Number(document.getElementById("min-rVal").value);
    let max_r_val = Number(document.getElementById("max-rVal").value);

    let input_box = document.getElementById('box');
    let output = document.querySelector('table');
    let div = document.getElementById('msg');
    let scroll = document.getElementById('tab');
    scroll.style.display = "block";
    // Have multiple if statements check if min column value is larger than
    // max column value or min row value is greater than max row value.
    // If it is, display error without using generic popup box as discussed in class a few
    // weeks back.
    if (min_c_val > max_c_val) {
        div.innerHTML = "Please enter a larger number for max column value";
        output.style.display = "none";
        scroll.style.display = "none";
        div.style.display = "block";
        input_box.style.paddingBottom = "200px";
        return false;
    } else if (min_r_val > max_r_val) {
        div.innerHTML = "Please enter a larger number for max row value";
        output.style.display = "none";
        scroll.style.display = "none";
        div.style.display = "block";
        input_box.style.paddingBottom = "200px";
        return false;
        // If user somehow inputs wacky input or a string, which should not be possible we produce error msg.
    } else if (min_c_val === null || min_c_val === "") {
        div.innerHTML = "Please enter a number for min column value";
        output.style.display = "none";  
        scroll.style.display = "none";
        div.style.display = "block";
        input_box.style.paddingBottom = "180px";
        return false;
    } else if (max_c_val === null || max_c_val === "") {
        div.innerHTML = "Please enter a number for max column value";
        output.style.display = "none";
        scroll.style.display = "none";
        div.style.display = "block";
        input_box.style.paddingBottom = "180px";
    } else if (min_r_val === null || min_r_val === "") {
        div.innerHTML = "Please enter a number for min row value";
        output.style.display = "none";
        scroll.style.display = "none";
        div.style.display = "block";
        input_box.style.paddingBottom = "180px";
    } else if (max_r_val === null || max_r_val === "") {
        div.innerHTML = "Please enter a number for max row value";
        output.style.display = "none";
        scroll.style.display = "none";
        div.style.display = "block";
        input_box.style.paddingBottom = "180px";
        // Checks if the difference between max and min for either row or col is less than 600
        // or not. Because it crashes if i enter a large difference greater than 600 but
        // that could be my laptop, but to make sure it definitely works on all devices i set it to this,
    } else if (((max_r_val - min_r_val) > 600) || ((max_c_val - min_c_val) > 600)) {
        div.innerHTML = "Please enter a range where the difference between the max and min is <= 600";
        output.style.display = "none";
        scroll.style.display = "none";
        div.style.display = "block";
        input_box.style.paddingBottom = "220px";
    } else {    // If it passes all these checks, we get rid of error displaying and generate table
        output.style.display = "table";
        div.style.display = "none";
        input_box.style.paddingBottom = "160px";
        mult_table(min_c_val, max_c_val, min_r_val, max_r_val);
        return false;
    }
}

function mult_table(min_c_val, max_c_val, min_r_val, max_r_val) {
    // Had to use console.log because i kept recieving garbage value from input["text"]
    // I have no idea why so Number() from js helped me.
    console.log("min_c_val = ", min_c_val,
    " max_c_val = ", max_c_val, " min_r_val = ", min_r_val, " max_r_val = ", max_r_val);

    // Should always enter this condition, if it does not we console.log("Smth").
    if ((max_r_val >= min_r_val) && (max_c_val >= min_c_val)) {
        const tr = '<tr>';
        const tr_end = '</tr>';
        const td = '<td>';
        const td_end = '</td>';
        const th = '<th>';
        const th_end = '</th>';
        let table_stuff = tr + th + th_end;

        // Builds the top header or row
        for (let i = min_r_val; i <= max_r_val; i++) {
            table_stuff += th + i + th_end;
        }

        // Builds the rest of rows and data
        for (let i = min_c_val; i <= max_c_val; i++) {
            // Outer loop builds the side header or first column header
            table_stuff += tr + th + i + th_end;
            // Inner loop builds the rest of the table cells
            for (let j = min_r_val; j <= max_r_val; j++) {
                let result = i * j;
                table_stuff += td + result + td_end;
            }
            table_stuff += tr_end;
        }

        // Credit to this link from w3schools -> https://www.w3schools.com/jquery/html_html.asp
        $('#Multiplication-Table').html(table_stuff); // Used this instead of .innerHTML
        // let table = document.getElementById("Multiplication-Table");
        // table.innerHTML = table_stuff; // Tried table.innerHTML, made very wacky changes to my css so
        // I used a jQuery version of innerHTML that I messed around with as shown above.
    } else {
        console.log("Something went wrong");
    }
}
