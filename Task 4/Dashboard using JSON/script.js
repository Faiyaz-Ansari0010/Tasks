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
        "boxPaddingZero": false,
        "boxTopLeftMargin": false,
        "logoImg": "imageMask1.png",
        "heading": "Acceleration",
        "favIconImg": "favourite.svg",
        "favIconOpaque": false,
        "subject": "Physics",
        "seperator1": "|",
        "grade": "Grade 7 +2",
        "chapterComponents": ["Units", "Lessons", "Topics"],
        "chapterComponentsNums": [4, 18, 24],
        "className": "Mr. Frank's Class B",
        "classNameOpaque": false,
        "arrowDownImg": "arrow-down.svg",
        "numStudents": "50 Students",
        "seperator2": "|",
        "duration": "21-Jan-2020 - 21-Aug-2020",
        "preview": "preview.svg",
        "manageCourse": "manage course.svg",
        "gradeSubmission": "grade submission.svg",
        "iconsOpaque": false,
        "reports": "reports.svg",
        "isExpired": false,
        "statsMargin": false
    },

    {
        "boxPaddingZero": false,
        "boxTopLeftMargin": false,
        "logoImg": "imageMask2.png",
        "heading": "Displacement, Velocity and Speed",
        "favIconImg": "favourite.svg",
        "favIconOpaque": false,
        "subject": "Physics",
        "seperator1": "|",
        "grade": "Grade 6 +3",
        "chapterComponents": ["Units", "Lessons", "Topics"],
        "chapterComponentsNums": [2, 15, 20],
        "className": "No Classes",
        "classNameOpaque": true,
        "arrowDownImg": "arrow-down.svg",
        "numStudents": "300 Students",
        "seperator2": "",
        "duration": "",
        "preview": "preview.svg",
        "manageCourse": "manage course.svg",
        "gradeSubmission": "grade submission.svg",
        "iconsOpaque": true,
        "reports": "reports.svg",
        "isExpired": false,
        "statsMargin": false
    },

    {
        "boxPaddingZero": false,
        "boxTopLeftMargin": false,
        "logoImg": "imageMask3.png",
        "heading": "Introduction to Biology: Micro organisms and how they affect the other life systems in Environment",
        "favIconImg": "favourite.svg",
        "favIconOpaque": false,
        "subject": "Biology",
        "seperator1": "|",
        "grade": "Grade 4 +1",
        "chapterComponents": ["Units", "Lessons", "Topics"],
        "chapterComponentsNums": [5, 16, 22],
        "className": "All Classes",
        "classNameOpaque": false,
        "arrowDownImg": "arrow-down.svg",
        "numStudents": "",
        "seperator2": "",
        "duration": "",
        "preview": "preview.svg",
        "manageCourse": "manage course.svg",
        "gradeSubmission": "grade submission.svg",
        "iconsOpaque": true,
        "reports": "reports.svg",
        "isExpired": false,
        "statsMargin": false
    },

    {
        "boxPaddingZero": true,
        "boxTopLeftMargin": true,
        "logoImg": "imageMask4.svg",
        "heading": "Introduction to High School Mathematics",
        "favIconImg": "favourite.svg",
        "favIconOpaque": true,
        "subject": "Mathematics",
        "seperator1": "|",
        "grade": "Grade 8 +3",
        "chapterComponents": ["", "", ""],
        "chapterComponentsNums": ["", "", ""],
        "className": "Mr. Frank's Class A",
        "classNameOpaque": false,
        "arrowDownImg": "arrow-down.svg",
        "numStudents": "44 Students",
        "seperator2": "|",
        "duration": "14-Oct-2019 - 20-Oct-2020",
        "preview": "preview.svg",
        "manageCourse": "manage course.svg",
        "gradeSubmission": "grade submission.svg",
        "iconsOpaque": false,
        "reports": "reports.svg",
        "isExpired": true,
        "statsMargin": true
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

document.getElementById("box-container").innerHTML = `

    ${boxInfo.map(data => `
        
         <div class="box-container-card ${data.boxPaddingZero ? "box-padding-zero" : ""}">

            ${data.isExpired ? `<div class="expired">EXPIRED</div>` : ""}

            <div class="box-container-card-top ${data.boxTopLeftMargin ? "box-top-left-margin" : ""}">

                <img class="main-image" src="${data.logoImg}" alt="image-mask">

                <div class="class-info">

                    <div class="heading">
                        <div>${data.heading}</div>
                        <img class="favourite-icon ${data.favIconOpaque ? "favourite-icon-4" : ""}" src="favourite.svg" alt="favourite-icon">
                    </div>
                    
                    <div class="subject-grade">
                        <span>${data.subject}</span> 
                        <span class="seperation">${data.seperator1}</span> 
                        <span>${data.grade}</span></span>
                    </div>

                    <div class="chapters">
                        <span class="nums">${data.chapterComponentsNums[0]}</span> 
                        <span class="words">${data.chapterComponents[0]}</span> 
                        <span class="nums">${data.chapterComponentsNums[1]}</span>
                        <span class="words">${data.chapterComponents[1]}</span> 
                        <span class="nums">${data.chapterComponentsNums[2]}</span> 
                        <span class="words">${data.chapterComponents[2]}</span>
                    </div>

                    <div class="class-name">
                        <span class = "${data.classNameOpaque ? "less-opaque" : ""}">${data.className}</span>
                        <img src="arrow-down.svg" alt="dropdown icon">
                    </div>

                    <div class="class-detail">
                        <span>${data.numStudents}</span> 
                        <span class="seperation">${data.seperator2}</span> 
                        <span>${data.duration}</span>
                    </div>

                </div>
                
            </div>

            <div class="class-stats ${data.statsMargin ? "last-class-stats" : ""}">
                <img class="preview-icon" src="preview.svg" alt="preview">
                <img class="manage-course-icon ${data.iconsOpaque ? "less-opaque" : ""}" src="manage course.svg" alt="manage-course">
                <img class="grade-submission-icon ${data.iconsOpaque ? "less-opaque" : ""}" src="grade submissions.svg" alt="grade-submissions">
                <img class="reports-icon" src="reports.svg" alt="reports">
            </div>

        </div>

    `).join('')

    }

`