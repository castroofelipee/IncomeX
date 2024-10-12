import React, { useState, useEffect } from 'react';
import { auth, provider, signInWithPopup } from '../../firebaseConfig';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login() {
    const [theme, setTheme] = useState('light');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(userPrefersDark ? 'dark' : 'light');

        document.title = "Login - PinnSystem";
    }, []);

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const token = await result.user.getIdToken();

            const response = await fetch('http://localhost:8000/verify-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });

            const data = await response.json();

            if (response.ok) {
                setSnackbarMessage('Login successful! Redirecting to dashboard...');
                setSnackbarSeverity('success');
                setOpenSnackbar(true);
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 2000);
            } else {
                setSnackbarMessage(`Login failed: ${data.detail}`);
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            }

        } catch (error) {
            console.error('Error during login: ', error);
            setSnackbarMessage('Login failed. Please try again.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} min-h-screen flex flex-col`}>
            <div className="flex-grow flex items-center justify-center p-4">
                <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-sm">
                    <div className="flex flex-col items-center">
                        <img
                            src="/pinn_background_white.png"
                            alt="Logo"
                            className="w-32 h-auto object-contain mx-auto mb-6"
                        />
                        <h1 className="text-2xl md:text-3xl font-bold mb-2">PinnSystem - IncomeX</h1>
                        <p className="text-sm md:text-base text-gray-400 mb-6 text-center">Welcome to your financial app! Please use Google to sign in.</p>
                        <button
                            onClick={handleGoogleSignIn}
                            className="bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 rounded-md shadow-md flex items-center justify-center w-full transition duration-300 ease-in-out transform hover:scale-105 border border-gray-300"
                        >
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.64 12.2c0-.77-.07-1.5-.2-2.2H12v4.18h6.44c-.3 1.66-1.18 3.06-2.51 4.02v3.34h4.06c2.36-2.17 3.7-5.38 3.7-9.34z" />
                                <path d="M12 24c3.3 0 6.07-1.1 8.1-2.95l-4.06-3.34c-1.13.75-2.58 1.2-4.04 1.2-3.1 0-5.75-2.09-6.7-4.91H1.94v3.1C4.02 20.78 7.73 24 12 24z" />
                                <path d="M5.3 14.7a7.43 7.43 0 010-4.18v-3.1H1.94a12 12 0 000 10.38l3.36-3.1z" />
                                <path d="M12 4.74c1.66 0 3.14.57 4.3 1.7l3.18-3.18C16.92 1.48 14.15 0 12 0 7.73 0 4.02 3.22 1.94 7.58l3.36 3.1c.95-2.82 3.6-4.91 6.7-4.91z" />
                            </svg>
                            Sign in with Google
                        </button>
                    </div>
                </div>
            </div>
            <footer className="mb-4 text-center">
                <p className="text-gray-600">V0.0.1</p>
            </footer>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Login;
