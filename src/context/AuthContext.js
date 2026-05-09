import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fetch user data from Firestore
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          // Initialize new user in Firestore if they don't exist
          const newUserData = {
            uid: currentUser.uid,
            email: currentUser.email,
            username: currentUser.displayName || currentUser.email.split("@")[0],
            avatar: currentUser.photoURL || "",
            bio: "Building mental models, one node at a time.",
            streak: 0,
            xp: 0,
            level: 1,
            leetcodeUsername: "",
            githubUsername: "",
            solvedProblems: [],
            createdAt: new Date().toISOString(),
          };
          await setDoc(userDocRef, newUserData);
          setUserData(newUserData);
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const loginWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signupWithEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const updateUserProfile = async (updates) => {
    if (!user) return;
    const userDocRef = doc(db, "users", user.uid);
    
    let finalUpdates = { ...updates };

    // If solvedProblems is being updated, recalculate streak and metrics
    if (updates.solvedProblems) {
      const stats = calculateStreak(updates.solvedProblems);
      finalUpdates = {
        ...finalUpdates,
        streak: stats.currentStreak,
        longestStreak: Math.max(userData?.longestStreak || 0, stats.currentStreak),
        totalActiveDays: stats.totalActiveDays,
        lastSolvedAt: new Date().toISOString()
      };
    }

    await setDoc(userDocRef, finalUpdates, { merge: true });
    setUserData(prev => ({ ...prev, ...finalUpdates }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        loading,
        loginWithGoogle,
        loginWithEmail,
        signupWithEmail,
        logout,
        updateUserProfile,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// --- STREAK LOGIC UTILITY ---
function calculateStreak(solvedProblems) {
  if (!solvedProblems || !Array.isArray(solvedProblems) || solvedProblems.length === 0) {
    return { currentStreak: 0, totalActiveDays: 0 };
  }

  // 1. Extract unique dates (YYYY-MM-DD) from solve history
  // Added safe checks for legacy data (strings) and invalid dates
  const solveDates = [...new Set(solvedProblems
    .map(p => {
      const dateVal = typeof p === 'string' ? null : p.solvedAt;
      if (!dateVal) return null;
      const d = new Date(dateVal);
      return isNaN(d.getTime()) ? null : d.toISOString().split('T')[0];
    })
    .filter(d => d !== null)
  )].sort((a, b) => new Date(b) - new Date(a));

  if (solveDates.length === 0) return { currentStreak: 0, totalActiveDays: 0 };

  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  let currentStreak = 0;
  let lastDate = null;

  // 2. Check if the streak is still alive (solved today or yesterday)
  const isAlive = solveDates[0] === today || solveDates[0] === yesterday;
  
  if (!isAlive) return { currentStreak: 0, totalActiveDays: solveDates.length };

  // 3. Count consecutive days
  for (let i = 0; i < solveDates.length; i++) {
    const currentDate = new Date(solveDates[i]);
    
    if (i === 0) {
      currentStreak = 1;
    } else {
      const prevDate = new Date(solveDates[i-1]);
      const diffTime = Math.abs(prevDate - currentDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        currentStreak++;
      } else {
        break; // Streak broken
      }
    }
  }

  return {
    currentStreak,
    totalActiveDays: solveDates.length
  };
}
