import dotenv from 'dotenv';
dotenv.config();
import passport from 'passport';
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import jwt from "jsonwebtoken";
import User from '../Models/UserModel.js';// Adjust the path to your User model


passport.serializeUser((user, done) => {
  // Store only the user ID in the session
  done(null, user._id);
});
  

passport.deserializeUser(async (id, done) => {
    try {
      // Fetch the full user object from the database using the ID
      const user = await User.findById(id);
      done(null, user); // Attach the user object to req.user
    } catch (error) {
      done(error, null);
    }
  });
  

passport.use(new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            fullName: profile.displayName,
            password: "placeholderPassword",
            email: profile.emails ? profile.emails[0].value : null,
            avatar: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null,
          });
        }
        done(null,  user );
      } catch (error) {
        console.error("Error during Google authentication:", error);
        done(error, null);
      }
    }
  ));
  
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/facebook/callback",
        profileFields: ["id", "emails", "name"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ facebookId: profile.id });
          if (!user) {
            if (!profile.emails || profile.emails.length === 0) {
              throw new Error("Facebook profile does not provide an email");
            }
            user = await User.create({
              facebookId: profile.id,
              password: "placeholderPassword",
              fullName: `${profile.name.givenName} ${profile.name.familyName}`,
              email: profile.emails[0].value,
            });
          }
          done(null,  user );
        } catch (error) {
          console.error("Error during Facebook authentication:", error);
          done(error, null);
        }
      }
    )
  );
  