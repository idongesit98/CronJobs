const cron = require("node-cron");
const {sendBirthdayEmail} = require("../Services/emailService")
const userModel = require("../Model/birthday")

// cron.schedule("0 7 * * *", async () => {
//     try {
//         console.log("Running birthday email job....");

//         //Get today's date in MM-DD format
//         const today = new Date().toISOString().slice(5, 10);

//         //Find users with birthday today
//         const users = await userModel.find({
//             dateOfBirth: {$regex: today},
//         });

//         if(users.length === 0){
//             console.log("No birthday today.");
//             return;
//         }

//         //Send emails
//         for(const user of users){
//             await sendBirthdayEmail(user.email, user.first_name);
//         }

//         console.log("Birthday emails sent successfully!!");
//     } catch (error) {
//         console.error("Error returning cron job:", error);
//     }
// })

// Function to manually test sending emails
const testCronJob = async () => {
    try {
        console.log("Running birthday email job test...");

        // Get today's date in MM-DD format
        const today = new Date();
        const month = today.getMonth() + 1;
        const day = today.getDate();

        // Find users with a birthday today
        const users = await userModel.find({
            $expr:{
                $and:[
                    {$eq: [{ $month: "$dateOfBirth"}, 4]},
                    {$eq: [{ $dayOfMonth: "$dateOfBirth"}, 3]}
                ]
            },
        });

        if (users.length === 0) {
            console.log("No birthdays today.");
            return;
        }

        // Send emails
        for (const user of users) {
            await sendBirthdayEmail(user.email, user.first_name);
        }

        console.log("Test: Birthday emails sent successfully!");
    } catch (error) {
        console.error("Test: Error running cron job:", error);
    }
};


// Run every minute for testing (change "0 7 * * *" back after testing)
cron.schedule("0 7 * * *", async () => {
    console.log("Test: Running cron job every minute...");
    await testCronJob();
});


// Run the test function manually
testCronJob();
