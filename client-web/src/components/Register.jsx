/* eslint-disable no-unused-vars */
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState(null);
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [profile, setProfile] = useState(null);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const roleOptions = [
        { label: 'Admin', value: 'admin' },
        { label: 'Customer', value: 'customer' },
        { label: 'Employee', value: 'employee' }
    ];

    const handleProfileUpload = ({ files }) => {
        setProfile(files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log({
            email,
            password,
            confirmPassword,
            role,
            fullName,
            username,
            phone,
            profile,
            termsAccepted
        });
    };

    return (
        <section className="bg-gray-50 h-screen flex items-center justify-center">
            <div className="flex flex-col items-center justify-center px-2 py-8 mx-auto lg:py-0 w-full max-w-md">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    Flowbite
                </a>
                <div className="w-full bg-white rounded-lg shadow overflow-y-auto max-h-[85vh]">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Create an account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900">Full Name</label>
                                    <InputText
                                        id="fullName"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                                    <InputText
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="john_doe"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Phone</label>
                                    <InputText
                                        id="phone"
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="123-456-7890"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900">Role</label>
                                    <Dropdown
                                        id="role"
                                        value={role}
                                        options={roleOptions}
                                        onChange={(e) => setRole(e.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600  w-full p-2.5"
                                        placeholder="Select a role"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="profile" className="block mb-2 text-sm font-medium text-gray-900">Profile Image</label>
                                    <FileUpload
                                        id="profile"
                                        mode="basic"
                                        accept="image/*"
                                        customUpload
                                        uploadHandler={handleProfileUpload}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        chooseLabel="Choose"
                                        maxFileSize={1000000} // Set max file size (e.g., 1MB)
                                        auto
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                    <InputText
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="name@company.com"
                                        required
                                    />
                                </div>
                                <div className="max-w-sm">
                                    <label htmlFor="password" className="block text-sm mb-2 text-gray-900">Password</label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                            placeholder="Enter password"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute top-0 end-0 p-3.5 rounded-e-md"
                                        >
                                            <svg
                                                className="flex-shrink-0 size-3.5 text-gray-400"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path className={showPassword ? "hidden" : "block"} d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                                                <path className={showPassword ? "hidden" : "block"} d="M10.73 5.08A10.43 10.43 0 0 1 12 5c4.35 0 8.09 2.44 10 6a10.53 10.53 0 0 1-1.6 2.23"></path>
                                                <path className={showPassword ? "hidden" : "block"} d="M1 1l22 22"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="max-w-sm">
                                    <label htmlFor="confirmPassword" className="block text-sm mb-2 text-gray-900">Confirm Password</label>
                                    <div className="relative">
                                        <input
                                            id="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                            placeholder="Enter password"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute top-0 end-0 p-3.5 rounded-e-md"
                                        >
                                            <svg
                                                className="flex-shrink-0 size-3.5 text-gray-400"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path className={showConfirmPassword ? "hidden" : "block"} d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                                                <path className={showConfirmPassword ? "hidden" : "block"} d="M10.73 5.08A10.43 10.43 0 0 1 12 5c4.35 0 8.09 2.44 10 6a10.53 10.53 0 0 1-1.6 2.23"></path>
                                                <path className={showConfirmPassword ? "hidden" : "block"} d="M1 1l22 22"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="terms"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                                            required
                                            checked={termsAccepted}
                                            onChange={() => setTermsAccepted(!termsAccepted)}
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terms" className="font-light text-gray-500">
                                            I accept the{" "}
                                            <a className="font-medium text-primary-600 hover:underline" href="#">
                                                Terms and Conditions
                                            </a>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <Button
                                type="submit"
                                label="Create Account"
                                className="w-full bg-primary-600 text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            />
                            <p className="text-sm font-light text-gray-500">
                                Already have an account?{" "}
                                <a
                                    href="#"
                                    onClick={() => navigate('/')}
                                    className="font-medium text-primary-600 hover:underline"
                                >
                                    Login here
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;
