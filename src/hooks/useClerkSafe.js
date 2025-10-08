/**
 * Safe wrapper for Clerk hooks that gracefully handles when Clerk is not available
 */
import { useUser } from '@clerk/clerk-react';

// Check if Clerk is available
const hasValidClerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY && 
                        import.meta.env.VITE_CLERK_PUBLISHABLE_KEY !== 'pk_test_placeholder';

/**
 * Safe useUser hook that returns fallback values when Clerk is not available
 */
export const useUserSafe = () => {
  console.log('useClerkSafe Debug:', {
    hasValidClerkKey,
    clerkKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ? 
      `${import.meta.env.VITE_CLERK_PUBLISHABLE_KEY.substring(0, 10)}...` : 'Not set'
  });

  if (hasValidClerkKey) {
    try {
      const clerkUserData = useUser();
      console.log('Clerk User Data:', {
        user: clerkUserData.user ? {
          id: clerkUserData.user.id,
          fullName: clerkUserData.user.fullName,
          email: clerkUserData.user.emailAddresses?.[0]?.emailAddress
        } : null,
        isSignedIn: clerkUserData.isSignedIn,
        isLoaded: clerkUserData.isLoaded
      });
      return clerkUserData;
    } catch (error) {
      console.warn('Clerk useUser failed, using fallback:', error.message);
    }
  }
  
  // Return fallback values when Clerk is not available
  console.log('Using fallback auth values');
  return {
    user: null,
    isSignedIn: false,
    isLoaded: true
  };
};

/**
 * Check if Clerk is properly configured and available
 */
export const isClerkAvailable = () => {
  return hasValidClerkKey && useUser;
};