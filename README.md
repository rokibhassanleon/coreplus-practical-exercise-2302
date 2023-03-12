# coreplus-practical-exercise-2302

This project covers the business requirements stated in the TASK.pdf

## Pre-requisites
coreplus-sample-api require DotNet 7 to run
coreplus-sample-ui recommend using NodeJs 16+ (developed using 18.10)

## Installing Npm Packages
To install the npm packages run - 
```bash
npm i
```
To Run UI Project run following command -
```bash
npm run dev
```

To Run API Project run follwoing command -
```bash
dotnet run
```

## Business Requirements
Following business requirements met -

### 1) Reporting
   To get Practitioners report select Date Range from the Practitioner Report UI Section and then click on "Show Report" button
   
   To get specific practitioner report select a practitioner from left side ("Supervisor Practitioners" or "Remaining Practitioner") and then select date range
   from Practitioner Report UI Section followed by click on the "Show Report" button.
   
   #### Technical details
   
    ```bash
    /appointments/summary/
    ```
    This API has 3 parameters.
      1) practitionerId [Optional but by default 0 should be pass]
      2) dtStart [Required]
      3) dtEnd [Required]
    
    This API return monthly revenue and cost of each practitioner.
	
	### In left side practitioner list green colored highlighted items means selected. And clicking again will deslect the item and back to orignal color.
   
### 2) Breakdown of Practitioner's Appointments
   To view breakdown of any particular practitioner's appointments, click on the row from the summary report (should be visible after completing step#1).
   
   #### Technical details
   
    ```bash
    /appointments/list/
    ```
    This API has 3 parameters.
      1) practitionerId [Required]
      2) dtStart [Required]
      3) dtEnd [Required]

    This API returns the breakdown of a practitioner's appointments.
    
### 3) Appointment Details
   Clicking on any appointment (which will be available after completing step#2) will present the appointment details.
   
   Technical details
    ```bash
    /appointments/details/
    ```
    This API has 1 parameter.
      1) appointmentId [Required]

### Other APIs
Additional API added to fetch remaining practitioners -

  ```bash
  /practitioners/others/
  ```
  This returns the practitioners other than OWNER and ADMIN
  
## UI Project
## Priority given more on the functionality than the look of the UI.
