const announcementInfo = [
    {
        "type": "PA: ",
        "teacher": "Wilson Kumar",
        "statusIcon": "status-active-icon.PNG",
        "announcement": "No classes will be held on 21st Nov",
        "attachmentIcon": "attachment-icon.PNG",
        "extraInfo": "2 files are attached",
        "dateTime": "15-Sep-2018 at 07:21pm",
        "checked": true
    },

    {
        "type": "PA: ",
        "teacher": "Samson White",
        "statusIcon": "status-inactive-icon.PNG",
        "announcement": "Guest lecture on Geometry on 20th September",
        "attachmentIcon": "attachment-icon.PNG",
        "extraInfo": "2 files are attached",
        "dateTime": "15-Sep-2018 at 07:21pm",
        "checked": false
    },

    {
        "type": "PA: ",
        "teacher": "Wilson Kumar",
        "statusIcon": "status-active-icon.PNG",
        "announcement": "Additional course materials available on request",
        "extraInfo": "Course: Mathematics 101",
        "dateTime": "15-Sep-2018 at 07:21pm",
        "checked": true
    },

    {
        "type": "PA: ",
        "teacher": "Wilson Kumar",
        "announcement": "No classes will be held on 25th Dec",
        "statusIcon": "status-inactive-icon.PNG",
        "dateTime": "15-Sep-2018 at 07:21pm",
        "checked": false
    },

    {
        "type": "PA: ",
        "teacher": "Wilson Kumar",
        "statusIcon": "status-inactive-icon.PNG",
        "announcement": "Additional course materials available on request",
        "extraInfo": "Course: Mathematics 101",
        "dateTime": "15-Sep-2018 at 07:21pm",
        "checked": false
    }
]

const alertInfo = [
    {
        "notification": "License for Introduction to Algebra has been assigned to your school",
        "statusIcon": "status-inactive-icon.PNG",
        "dateTime": "15-Sep-2018 at 07:21 pm",
        "checked": false
    },

    {
        "notification": "Lesson 3 Practice Worksheet overdue for Amy Santiago",
        "statusIcon": "status-active-icon.PNG",
        "dateTime": "15-Sep-2018 at 05:21 pm",
        "subjectCategory": "Course: ",
        "subject": "Advanced Mathematics",
        "checked": true
    },

    {
        "notification": "23 new students created",
        "statusIcon": "status-inactive-icon.PNG",
        "dateTime": "14-Sep-2018 at 01:21 pm",
        "checked": false
    },

    {
        "notification": "15 submissions ready for evaluation",
        "statusIcon": "status-inactive-icon.PNG",
        "dateTime": "15-Sep-2018 at 01:15 pm",
        "subjectCategory": "Class: ",
        "subject": "Basics of Algebra",
        "checked": false
    },

    {
        "notification": "License for Basic Concepts in Geometry has been assigned to your school",
        "statusIcon": "status-inactive-icon.PNG",
        "dateTime": "15-Sep-2018 at 07:21 pm",
        "checked": false
    },

    {
        "notification": "Lesson 3 Practice Worksheet overdue for Sam Diego",
        "statusIcon": "status-active-icon.PNG",
        "dateTime": "15-Sep-2018 at 07:21pm",
        "subjectCategory": "Course:",
        "subject": "Advanced Mathematics",
        "checked": true
    },
]

const boxInfo = [
    {
        "logo": "imageMask1.png",
        "alt": "image-mask-1",
        "heading": "Acceleration",
    }
]

document.getElementById("announcement-outer-container").innerHTML = `

    <div id="announcement-container">
        ${announcementInfo.map(Class => `
        
        <div class="class-details ${Class.checked ? "checked" : "unchecked"}">
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

document.getElementById("alert-outer-container").innerHTML = `

    <div id="alert-container">
        ${alertInfo.map(alert => `
        
        <div class="alert-details ${alert.checked ? "checked" : "unchecked"}">
            <div class="alert-info">
                <p class="alert-notification">${alert.notification}</p>
                <img class ="icon" src="${alert.statusIcon}">
            </div>

            
            <div class = "subject-category">
                <div class="subject-c">
                    ${alert.subjectCategory ? alert.subjectCategory : ""}
                </div>
                <div class="subject">
                    ${alert.subject ? alert.subject : ""}
                </div>
            </div >

            <p class="date-time">${alert.dateTime}</p>
        </div >
    `).join('')

    }

    </div>

    <div class="alert-container-button">
        SHOW ALL
    </div>

`

//     < div class="first-box-top" >

//         <img class="main-image" src="imageMask1.png" alt="image-mask-1">

//             <div class="class-info">

//                 <div class="heading">
//                     <div>Acceleration</div>
//                     <img class="favourite-icon" src="favourite.svg" alt="favourite-icon">
//                 </div>

//                 <div class="subject-grade">
//                     <span>Physics</span>
//                     <span class="seperation">|</span>
//                     <span>Grade 7 +2</span></span>
//             </div>


//             <div class="chapters">
//                 <span class="nums">4</span>
//                 <span class="words">Units</span>
//                 <span class="nums">18</span>
//                 <span class="words">Lessons</span>
//                 <span class="nums">24</span>
//                 <span class="words">Topics</span>
//             </div>

//             <div class="class-name">
//                 <span>Mr. Frank's Class B</span>
//                 <img src="arrow-down.svg" alt="dropdown icon">
//             </div>

//             <div class="class-detail">
//                 <span>50 Students</span>
//                 <span class="seperation">|</span>
//                 <span>21-Jan-2020 - 21-Aug-2020</span>
//             </div>

//         </div>

// </div >

//     <div class="class-stats">
//         <img class="preview-icon" src="preview.svg" alt="preview">
//             <img class="manage-course-icon" src="manage course.svg" alt="manage-course">
//                 <img class="grade-submission-icon" src="grade submissions.svg" alt="grade-submissions">
//                     <img class="reports-icon" src="reports.svg" alt="reports">
//                     </div>