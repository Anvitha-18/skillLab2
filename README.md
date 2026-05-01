# skillLab2
Project Structure:

The code is organized as shown in the provided screenshots (image_a56618.png).

1.models/ - Contains schemas for Slots and ParkingRecords.
2.routes/ - Contains all API endpoints and parking logic.
3.middleware/ - Includes the custom request logging system.
4.server.js - The main file that connects to Atlas and starts the server.

Setup and Installation:
Install the required packages using the command: npm install.
Create a .env file in the root folder to store your MONGO_URI and PORT.
Ensure your .gitignore file includes .env to keep your Atlas credentials safe.
Start the backend by running the command: node server.js.

API Endpoints:

1.Initialize Parking
POST /api/parking/init
Body: {"count": 10}
This creates the physical slots in the database.

2.Vehicle Entry
POST /api/parking/entry
Body: {"numberPlate": "ABC-123"}
This finds the nearest available slot and records the entry time.

3.Vehicle Exit
POST /api/parking/exit
Body: {"numberPlate": "ABC-123"}
This marks the slot as available and calculates the stay duration.

4.Check Availability
GET /api/parking/slots
This returns the status of every slot in the parking lot.
