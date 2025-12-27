'use client';

import { useState, useEffect } from 'react';
import { onAuthStateChange } from '@/lib/firebase/auth';
import { User } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Profile fields
    const [name, setName] = useState('');
    const [occupation, setOccupation] = useState('');
    const [gender, setGender] = useState('');
    const [location, setLocation] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChange((currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setName(currentUser.displayName || '');
                setIsLoading(false);
            } else {
                router.push('/auth');
            }
        });

        return () => unsubscribe();
    }, [router]);

    const handleSaveProfile = () => {
        // TODO: Save to Firestore
        alert('Profile saved! (Firestore integration pending)');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="spinner w-12 h-12"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 mb-4 text-4xl font-bold text-white">
                        {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                    </div>
                    <h1 className="text-4xl font-bold gradient-text mb-2">Profile Settings</h1>
                    <p className="text-gray-400">{user?.email}</p>
                </div>

                {/* Profile Form */}
                <div className="glass-card max-w-2xl mx-auto">
                    <h2 className="text-2xl font-semibold text-white mb-6">Personal Information</h2>

                    <div className="space-y-6">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="input"
                                placeholder="John Doe"
                            />
                        </div>

                        {/* Occupation */}
                        <div>
                            <label htmlFor="occupation" className="block text-sm font-medium text-gray-300 mb-2">
                                Occupation / What I Do
                            </label>
                            <input
                                id="occupation"
                                type="text"
                                value={occupation}
                                onChange={(e) => setOccupation(e.target.value)}
                                className="input"
                                placeholder="e.g., Software Developer, Business Owner, Student"
                            />
                        </div>

                        {/* Gender */}
                        <div>
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-300 mb-2">
                                Gender
                            </label>
                            <select
                                id="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="input"
                            >
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                                <option value="prefer-not-to-say">Prefer not to say</option>
                            </select>
                        </div>

                        {/* Location */}
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-2">
                                Location
                            </label>
                            <input
                                id="location"
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="input"
                                placeholder="City, Country"
                            />
                        </div>

                        {/* Bio */}
                        <div>
                            <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-2">
                                Bio
                            </label>
                            <textarea
                                id="bio"
                                rows={4}
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                className="input resize-none"
                                placeholder="Tell us about yourself..."
                            />
                        </div>

                        {/* Save Button */}
                        <div className="flex gap-4 pt-4">
                            <button
                                onClick={handleSaveProfile}
                                className="btn-primary flex-1"
                            >
                                Save Changes
                            </button>
                            <button
                                onClick={() => router.push('/dashboard')}
                                className="btn-secondary flex-1"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>

                {/* Account Information */}
                <div className="glass-card max-w-2xl mx-auto mt-8">
                    <h2 className="text-2xl font-semibold text-white mb-6">Account Information</h2>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-white/10">
                            <span className="text-gray-400">Email</span>
                            <span className="text-white">{user?.email}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-white/10">
                            <span className="text-gray-400">Account Created</span>
                            <span className="text-white">
                                {user?.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-3">
                            <span className="text-gray-400">Last Sign In</span>
                            <span className="text-white">
                                {user?.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleDateString() : 'N/A'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
