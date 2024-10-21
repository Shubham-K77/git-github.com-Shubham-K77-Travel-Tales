//IMPORTS
import nodemailer from "nodemailer";
import dotenv from "dotenv";

//CONSTANTS
dotenv.config();
const mail = process.env.gmail_Mail;
const password = process.env.gmail_Password;

const mailer = async ({ userMail, subject, blogTitle = " " }) => {
  let mailSubject;
  let mailContent;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: mail,
      pass: password,
    },
  });
  if (subject === "newuser") {
    mailSubject = "Welcome To Platform!";
    mailContent = `<div style="font-family: Verdana, sans-serif; line-height: 1.6; font-size: 16px; color: #333;">
  <p>Hello User,</p>
  <p>
    Welcome to <strong>Travel Tales</strong>! We are thrilled to have you join our community of passionate travelers. 
    Whether you're sharing your adventures, discovering new destinations, or connecting with fellow explorers, 
    this platform is your gateway to a world of unforgettable experiences. Feel free to create and post your 
    own travel stories, explore captivating narratives from around the globe, or interact with like-minded adventurers.
  </p>
  <p>
    Your journey starts here. We're excited to see the incredible stories you'll share!
  </p>
  <p>
    Happy travels, <br/>
    The Travel Tales Team
  </p>
</div>
`;
  } else if (subject == "newpost") {
    mailSubject = "Thanking For Your Contribution!";
    mailContent = `<div style="font-family: Verdana, sans-serif; line-height: 1.6; font-size: 16px; color: #333;">
        <p>Hello User,</p>
        <p>
          Thank you for contributing to <strong>Travel Tales</strong> by sharing your latest post, "<strong>${blogTitle}</strong>." 
          Your input adds immense value to our community of travelers, and we're thrilled to have you as an active participant. 
          Your stories help make this platform a vibrant space for travel enthusiasts across the globe.
        </p>
        <p>
          We appreciate your efforts and look forward to seeing more of your inspiring tales and adventures!
        </p>
        <p>
          Best regards, <br/>
          The Travel Tales Team
        </p>
      </div>`;
  } else if (subject === "editpost") {
    mailSubject = "Thank You for Enhancing the Content!";
    mailContent = `<div style="font-family: Verdana, sans-serif; line-height: 1.6; font-size: 16px; color: #333;">
  <p>Hello User,</p>
  
  <p>
    I hope you’re doing well. I wanted to personally thank you for your time and effort in editing and enhancing the content of the post titled "<strong>${blogTitle}</strong>."
  </p>
  
  <p>
    Your edits have contributed significantly to refining the clarity, engagement, and overall quality of the post. Your valuable insights and attention to detail are deeply appreciated and have helped bring out the best version of the content.
  </p>
  
  <p>
    We are excited to see how this improved version resonates with our readers, and we are grateful for your continuous dedication to making our content better.
  </p>

  <p>
    If you have any additional suggestions or would like to provide further feedback, please feel free to reach out. Your input is always highly valued!
  </p>
  
  <p>
    Thank you once again for your outstanding work!
  </p>
  
  <p>
    Best regards, <br/>
    <strong>Travel-Tales</strong><br/>
  </p>
</div>
`;
  } else {
    mailSubject = "Post Deletion Acknowledgment";
    mailContent = `<div style="font-family: Verdana, sans-serif; line-height: 1.6; font-size: 16px; color: #333;">
    <p>Hello User,</p>
    <p>
      We wanted to take a moment to acknowledge your recent decision to delete your post from <strong>Travel Tales</strong>.
    </p>
    <p>
      While we are sad to see your story go, we appreciate your contributions to our community. Each post adds to the richness of our platform, and your insights have helped inspire fellow travelers.
    </p>
    <p>
      If you have any feedback on your experience or reasons for this deletion, we would love to hear from you. Your input is invaluable to us as we strive to improve our platform.
    </p>
    <p>
      Thank you for being a part of the <strong>Travel Tales</strong> community, and we hope to see more of your amazing stories in the future!
    </p>
    <p>
      Best regards,<br/>
      The Travel Tales Team
    </p>
  </div>`;
  }
  const info = await transporter.sendMail({
    from: `"Travel-Tales" <${mail}>`, // sender address
    to: userMail, // list of receivers
    subject: mailSubject, // Subject line
    html: mailContent, // html body
  });
};

export default mailer;
