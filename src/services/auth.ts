import { auth } from '../config/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useAdminStore } from '../store/adminStore';

export const loginAdmin = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logoutAdmin = async () => {
  try {
    await signOut(auth);
    useAdminStore.getState().logout();
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const requireAuth = async () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Authentication required');
  }
  return user;
};