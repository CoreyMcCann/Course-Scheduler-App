# Queen's Course Scheduler

A web application designed to help Queen's University students generate optimal weekly course schedules for Fall or Winter terms. The scheduler intelligently handles time conflicts, mandatory course requirements, and provides a visual weekly calendar view to help students make faster enrollment decisions.

The application addresses the common challenge students face when trying to manually coordinate multiple course sections, times, and requirements. Instead of spending hours checking for conflicts and trying different combinations, students can input their desired courses and instantly see all valid schedule possibilities. This dramatically speeds up the course selection process and helps ensure students don't miss enrollment deadlines due to scheduling conflicts.

## Key Features & Tips

### 🎯 **Smart Schedule Generation**
- **Full Weekly Schedules**: Generate complete Monday-Friday schedules with all course meeting times
- **Conflict Detection**: Automatically identifies and eliminates schedules with time conflicts
- **Visual Calendar View**: See your schedules in a familiar weekly calendar format with color-coded courses

### 📚 **Mandatory Course Logic**
The scheduler includes sophisticated handling for mandatory courses:
- **Mark courses as mandatory** to ensure they appear in every generated schedule
- **Multiple sections support**: If a course code has multiple sections (e.g., COMP 206 Section 001 and Section 002), you can add both sections and mark them both as mandatory. The scheduler will include exactly one of them in each generated schedule, giving you flexibility while ensuring the course is covered.
- **Mixed requirements**: Combine mandatory and optional courses to explore different schedule possibilities

### ✏️ **Easy Course Management**
- **Edit Flow**: Click the edit button (✏️) on any course to repopulate the input form with its details. The "Add Course" button becomes "Update Course" for seamless editing.
- **Multiple Meeting Times**: Add courses that meet multiple times per week (e.g., Monday/Wednesday/Friday lectures)
- **Rich Course Details**: Include section numbers, course types, instructors, and locations

### ⭐ **Schedule Organization**
- **Favorites System**: Mark your preferred schedules as favorites for easy reference
- **Email Integration**: Send schedules to yourself or others via email
- **Course Legend**: Each schedule includes a color-coded legend showing all courses and their details

## Usage Instructions

### Step 1: Course Selection Setup
![Course Selection Form](documentation/course-selection.png)

1. **Choose your term**: Select Fall or Winter term from the dropdown
2. **Set course count**: Choose how many courses you want in each generated schedule (2-7 courses)

### Step 2: Add Your Courses
![Course Input Form](documentation/course-input.png)

1. **Enter course code** (required): e.g., "COMP 206", "MATH 121"
2. **Add meeting times** (required): 
   - Select day of week (Monday-Friday)
   - Set start and end times
   - Click "+ Add Meeting Time" for courses that meet multiple times per week
3. **Fill optional details**:
   - Section number (e.g., "001")
   - Course type (Lecture, Tutorial, Lab, Seminar)
   - Instructor name
   - Building/Room location
4. **Mark as mandatory** if the course must appear in every schedule
5. Click **"Add Course"** to save

### Step 3: Manage Your Course List
![Added Courses List](documentation/course-list.png)

- **View all added courses** with their meeting times and details
- **Edit courses**: Click the ✏️ button to modify any course
- **Delete courses**: Click the 🗑️ button to remove courses
- **See mandatory indicators**: Mandatory courses show a special badge

### Step 4: Generate Schedules
1. Once you have enough courses, click **"Generate Schedules"**
2. The system will create all valid combinations and show a scroll message
3. **Scroll down** to see your generated weekly schedules

### Step 5: Review and Organize Results
![Generated Weekly Schedule](documentation/weekly-schedule.png)

- **Browse schedules**: Each shows a full weekly calendar view
- **Mark favorites**: Click the heart button on schedules you prefer
- **Email schedules**: Send schedules to yourself for reference during enrollment
- **Use the legend**: Each schedule includes a color-coded course legend

## Screenshots

### Full Application Layout
![Full App Layout](documentation/full-app.png)

The application uses a two-column layout with input forms on the left and course management on the right, followed by full-width schedule results below.

## Getting Started / Setup

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd queens-course-scheduler
   \`\`\`

2. **Install backend dependencies**
   \`\`\`bash
   cd backend
   npm install
   \`\`\`

3. **Install frontend dependencies**
   \`\`\`bash
   cd ../frontend
   npm install
   \`\`\`

### Running in Development

1. **Start the backend server**
   \`\`\`bash
   cd backend
   npm run dev
   \`\`\`
   The API server will run on http://localhost:5001

2. **Start the frontend development server** (in a new terminal)
   \`\`\`bash
   cd frontend
   npm start
   \`\`\`
   The React app will run on http://localhost:3000

### Environment Variables

Create a `.env` file in the frontend directory if you need to customize the API URL:

\`\`\`env
REACT_APP_API_URL=http://localhost:5001/api
\`\`\`

The backend uses default settings but you can create a `.env` file in the backend directory for custom configuration:

\`\`\`env
PORT=5000
NODE_ENV=development
\`\`\`

## Tips for Effective Use

### 🚀 **Speed Up Enrollment Decisions**
1. **Start with mandatory courses**: Add your required courses first and mark them mandatory
2. **Explore options**: Add several optional courses to see different schedule possibilities  
3. **Compare schedules**: Use the favorite system to shortlist your top choices
4. **Plan ahead**: Generate schedules before enrollment opens to know exactly which sections to register for

### 📋 **Best Practices**
- **Add all meeting times**: Make sure to include all lectures, tutorials, and labs for each course
- **Use descriptive details**: Include instructor and location info to help distinguish between sections
- **Check for conflicts**: The system will automatically eliminate conflicting schedules
- **Email yourself results**: Send your favorite schedules to have them handy during enrollment

### ⚡ **Pro Tips**
- **Multiple sections**: If you're flexible about which section of a course to take, add multiple sections as separate courses
- **Backup plans**: Generate schedules with different course counts to have alternatives ready
- **Time preferences**: Use the visual calendar to quickly identify schedules that fit your preferred time blocks

## Technology Stack

- **Frontend**: React, JavaScript, CSS, React Big Calendar
- **Backend**: Node.js, Express.js
- **Scheduling Algorithm**: Custom conflict detection and combination generation
- **Calendar Display**: React Big Calendar with Moment.js
- **Styling**: Custom CSS with responsive design

---

**Built for Queen's University students**

*This tool helps generate course schedules but does not guarantee enrollment. Always verify course information and availability with the official Queen's course calendar and SOLUS system.*
