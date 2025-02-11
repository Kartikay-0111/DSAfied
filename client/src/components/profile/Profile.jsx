import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { SquareArrowOutUpRight } from 'lucide-react';
import mergeCPData from './all_data';
import ProfileLeft from './ProfileLeft';

const Profile = () => {
    const { user, getAccessTokenSilently } = useAuth0();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [formData, setFormData] = useState(null);
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;
    const logoPlatforms = {
        Leetcode: './leetcode-logo.png',
        Codeforces: './codeforces-logo.png',
        Codechef: './codechef-logo.svg',
        "Geeks for geeks": './gfg-logo.png',
    };
    const links = {
        Leetcode: 'https://leetcode.com/u/',
        Codeforces: 'https://codeforces.com/profile/',
        Codechef: 'https://www.codechef.com/users/',
        "Geeks for geeks": 'https://www.geeksforgeeks.org/user/',
    }
    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (!user?.sub) {
                    console.log("No user sub found");
                    return;
                }

                const token = await getAccessTokenSilently();
                const response = await fetch(
                    `${BASE_URL}/api/users/getUserById?id=${user.sub}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to fetch user data');
                }

                const data = await response.json();
                setUserData(data);

                setFormData({
                    username: data.username,
                    Name: data.Name,
                    email: data.email,
                    platforms: data.platforms,
                    difficulty: data.difficulty_pref
                });
            } catch (err) {
                console.error("Error fetching user:", err);
                setError(err.message);
            }
        };

        if (user) {
            fetchUser();
        }
    }, [user, getAccessTokenSilently]);

    // if (userData) {
    //     console.log(userData.platforms);
    // }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(`${BASE_URL}/api/users/updateUser`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    platform: formData.platforms // No need to stringify
                }),
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Failed to update profile");
            }

            setIsEditOpen(false);
            window.location.reload();
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };


    const handlePlatformChange = (platform, value) => {
        setFormData(prev => ({
            ...prev,
            platforms: {
                ...prev.platforms,
                [platform]: value
            }
        }));
    };

    if (error) {
        return <div className="text-error p-4">Error: {error}</div>;
    }

    if (!userData || !formData) {
        return <div className="flex items-center justify-center min-h-screen">
            <span className="loading loading-spinner loading-lg"></span>
        </div>;
    }

    return (
        <div className="flex w-full min-h-screen bg-slate-900">
            {/* Left */}
            <div className="w-3/12 p-6">
                <div className="card bg-black shadow-xl">
                    <div className="card-body items-center text-center">
                        <div className="avatar">
                            <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={userData.avatar} alt="Profile" />
                            </div>
                        </div>

                        <h2 className="card-title text-2xl mt-4">{userData.username}</h2>
                        <p className="text-base-content/70">{userData.Name}</p>
                        <p className="text-base-content/70 mb-4">{userData.email}</p>

                        <div className="divider"></div>

                        <div className="w-full">
                            <h3 className="text-lg font-bold mb-3">Platforms</h3>
                            {Object.entries(userData.platforms).map(([platform, username]) => (
                                <div key={platform} className="badge badge-outline gap-2 m-1 p-4">
                                    <img src={logoPlatforms[platform]} alt={`${platform} logo`} className="w-6 h-6 mr-2" />
                                    <a href={`${links[platform]}${username}`} target="_blank" rel="noopener noreferrer" className="font-medium flex items-center">
                                        {username}
                                        <SquareArrowOutUpRight />
                                    </a>
                                </div>
                            ))}
                        </div>

                        <div className="card-actions mt-6">
                            <button
                                className="btn btn-primary"
                                onClick={() => setIsEditOpen(true)}
                            >
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Placeholder (70%) */}
            <div className="w-9/12 p-6">
                <ProfileLeft />
            </div>

            {/* Edit Profile Modal */}
            {isEditOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">Edit Profile</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Username</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={formData.username}
                                    onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={formData.Name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, Name: e.target.value }))}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    className="input input-bordered w-full"
                                    value={formData.email}
                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                />
                            </div>

                            <div className="divider"></div>

                            <div className="space-y-4">
                                <h3 className="font-bold">Platforms</h3>
                                {Object.entries(formData.platforms).map(([platform, username]) => (
                                    <div key={platform} className="form-control">
                                        <label className="label">
                                            <span className="label-text">{platform}</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="input input-bordered w-full"
                                            value={username}
                                            onChange={(e) => handlePlatformChange(platform, e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Difficulty Preference</span>
                                </label>
                                <select
                                    className="select select-bordered w-full"
                                    value={formData.difficulty}
                                    onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value }))}
                                >
                                    <option value="Easy">Easy</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Hard">Hard</option>
                                </select>
                            </div>

                            <div className="modal-action">
                                <button type="button" className="btn" onClick={() => setIsEditOpen(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="modal-backdrop" onClick={() => setIsEditOpen(false)}></div>
                </div>
            )}
        </div>
    );
};

export default Profile;