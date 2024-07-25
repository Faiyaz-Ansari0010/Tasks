const classInfo = [
    {
        "type": "PA: ",
        "teacher": "Wilson Kumar",
        "statusIcon": "status-active-icon.PNG",
        "announcement": "No classes will be held on 21st Nov",
        "attachmentIcon": "attachment-icon.PNG",
        "extraInfo": "2 files are attached",
        "dateTime": "15-Sep-2018 at 07:21pm"
    },

    {
        "type": "PA: ",
        "teacher": "Samson White",
        "statusIcon": "status-inactive-icon.PNG",
        "announcement": "Guest lecture on Geometry on 20th September",
        "attachmentIcon": "attachment-icon.PNG",
        "extraInfo": "2 files are attached",
        "dateTime": "15-Sep-2018 at 07:21pm"
    },

    {
        "type": "PA: ",
        "teacher": "Wilson Kumar",
        "statusIcon": "status-active-icon.PNG",
        "announcement": "Additional course materials available on request",
        "extraInfo": "Course: Mathematics 101",
        "dateTime": "15-Sep-2018 at 07:21pm"
    },

    {
        "type": "PA: ",
        "teacher": "Wilson Kumar",
        "statusIcon": "status-active-icon.PNG",
        "announcement": "No classes will be held on 25th Dec",
        "statusIcon": "status-inactive-icon.PNG",
        "dateTime": "15-Sep-2018 at 07:21pm"
    },

    {
        "type": "PA: ",
        "teacher": "Wilson Kumar",
        "statusIcon": "status-inactive-icon.PNG",
        "announcement": "Additional course materials available on request",
        "extraInfo": "Course: Mathematics 101",
        "dateTime": "15-Sep-2018 at 07:21pm"
    }
]

// function getImage(Class) {
//     return `<img class="attachment-icon" src="attachment-icon.PNG">`
// }

document.getElementById("announcement-container").innerHTML = `
        ${classInfo.map(Class => `
        
        <div class="class-details">
            <div class="teacher-info">
                <p>${Class.type}</p>
                <p>${Class.teacher}</p>
                <img class ="icon" src="${Class.statusIcon}">
            </div>

            <div class="announcement">
                ${Class.announcement}
            </div>

            <div class="extra-details">
                
                ${Class.attachmentIcon ? `<img class="attachment-icon" src="attachment-icon.PNG">` : ''}
                <p>${Class.extraInfo ? Class.extraInfo : ""}</p>
                <p>${Class.dateTime}</p>
            </div>
         </div >
    `).join('')}

   
        `