# A:FoP Localization Tool
## About the tool
### What is this tool
This tool is a GUI to allow easy editing of the locale files(.locpack and .locpackbin) from Avatar: Frontiers of Pandora 

### Why use the tool
This tool facilitates the editing of said files, as manual editing requires keeping the 2 files perfectly in sync and updating a precise length value, which introduces a lot of room for mistake. 
This tool does the editing in both files simultaneously. 

#### This tool is still under development and still has a lot of missing features and it looks ugly as all hell. I will do my best to improve it <3

## How to use the tool
### File selection
When you start the program, it prompt you for file selection. 
You will need to provide:
- <name>.locpack
- <name>.locpackbin

After selecting these, the program will verify that they are the same file(eg. `menus.locpack` and `menus.locpackbin`) and will the advance to the editing part.

### Editing lines using the tool
In the editing part of the app, a table with all the information is displayed. 
To edit a specific line, you need to double click whatever line you want to edit. 

A window will pop up, in which you can edit all kinds of information.
You will have fields, in which you can enter a number, which is usually either the character ID or type of line.

You also have the line itself.
**Important when editing lines:**
Some lines feature formatting, like 
- `Used slots: {0} / {1}` - The translated ***HAS TO HAVE EVERY FORMATER***(e.g. {0}, {1} and as many as there are).
- `"A juicy piece of raw meat, gathered from a Pandoran animal."` - Lines with surrounding quotes have to keep their surrounding quotes.
- `"Note: Items purchased with <font preset="Van Italic 22">{0}</font> cannot be refunded."` - The surrounding quotes and the complete content inside the <> formater need to remain as they are.

# Currently unavailable features
* **Search bar** - The search bar is current non-functional, but is on the highest priority for implementation.
* **"More Settings..." button** - This button will features a variety of filters, but is currently not implemented.
* **"Show Changes" button** - This button will show the unsaved changes you have made, but is currently not implemented.
* **"Load file" button** - This button will allow you to load in a different file.

For any feature requests or bug reports, please use the "Issues"-Tab on this repository. 

Thanks in advance. 

For any other questions, you can contact me on Discord under the username `palkxaruna`



**DISCLAIMER**: I allow myself to change the layout of the app significantly at any time. This file and the usage guide will be updated accordingly.
