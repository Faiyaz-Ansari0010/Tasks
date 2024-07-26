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

document.getElementById("announcement-outer-container").innerHTML = `

    <div id="announcement-container">
        ${classInfo.map(Class => `
        
        <div class="class-details">
            <div class="teacher-info">
                <p class="teacher-type">${Class.type}</p>
                <p class="teacher-name">${Class.teacher}</p>
                <img class ="icon" src="${Class.statusIcon}">
            </div>

            <div class="announcement">
                ${Class.announcement}
            </div>

            <div class="extra-details">
                
                ${Class.attachmentIcon ? `<img class="attachment-icon" src="attachment-icon.PNG">` : ''}
                <p class="extra-info">${Class.extraInfo ? Class.extraInfo : ""}</p>
                <p class="date-time">${Class.dateTime}</p >
            </div >
        </div >
    `).join('')

    }

    </div>

    <div class="announcement-buttons">
        <div class="button-1">SHOW ALL</div>
        <div class="button-2">CREATE NEW</div>
    </div>
        `

const element = document.getElementsByClassName("icon");

for (let i = 0; i < element.length; i++) {

    let text = element[i].getAttribute("src");
    let box = document.getElementsByClassName("class-details");

    if (text === "status-inactive-icon.PNG") {
        box[i].style.backgroundColor = '#FFFFEE';
    }

    else {
        box[i].style.backgroundColor = '#FFFFFF';
    }
}