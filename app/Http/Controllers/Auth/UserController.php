<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    /**
     * Register a new user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Automatic login after registration
        if ($request->wantsJson()) {
            // For API requests - create token
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'User registered successfully',
                'data' => $user,
                'access_token' => $token,
                'token_type' => 'Bearer'
            ], 201);
        } else {
            // For web requests - log the user in
            Auth::login($user);

            return response()->json([
                'success' => true,
                'message' => 'User registered successfully',
                'data' => $user,
                'redirect' => route('dashboard')
            ], 201);
        }
    }

    /**
     * Login user and create token.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // Attempt to authenticate the user
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid login credentials'
            ], 401);
        }

        $user = User::where('email', $request->email)->firstOrFail();

        if ($request->wantsJson()) {
            // For API requests - create token
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'User logged in successfully',
                'data' => $user,
                'access_token' => $token,
                'token_type' => 'Bearer'
            ]);
        } else {
            // For web requests
            return response()->json([
                'success' => true,
                'message' => 'User logged in successfully',
                'data' => $user,
                'redirect' => route('dashboard')
            ]);
        }
    }

    /**
     * Logout user (revoke the token).
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        if ($request->wantsJson()) {
            // Revoke all tokens for API requests
            Auth::user()->tokens()->delete();

            return response()->json([
                'success' => true,
                'message' => 'Successfully logged out'
            ]);
        } else {
            // Log out for web requests
            Auth::guard('web')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return response()->json([
                'success' => true,
                'message' => 'Successfully logged out',
                'redirect' => route('login')
            ]);
        }
    }
}
