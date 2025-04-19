// src/context/AuthContext.tsx

import React, { createContext, useEffect, useState, ReactNode } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

type AuthContextType = {
  user: FirebaseAuthTypes.User | null;
  loading: boolean;
  userRole: string | null;
  isProvider: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  userRole: null,
  isProvider: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  const isProvider = userRole === 'provider';

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        try {
          const userDoc = await firestore()
            .collection('users')
            .doc(firebaseUser.uid)
            .get();

          if (userDoc.exists) {
            const data = userDoc.data();
            setUserRole(data?.role || null);
          } else {
            setUserRole(null);
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
          setUserRole(null);
        }
      } else {
        setUserRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, userRole, isProvider }}>
      {children}
    </AuthContext.Provider>
  );
};