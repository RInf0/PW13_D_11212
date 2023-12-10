<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Reviews;
use App\Models\Contents;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reviews = Reviews::inRandomOrder()->get();

        return response([
            'message' => 'All Review Retrieved',
            'data' => $reviews
        ], 200);
    }

    public function showReviewbyUser($id) {
        $user = User::find($id);
        if(!$user){
            return response([
                'message' => 'User Not Found',
                'data' => null
            ],404);
        }
        $reviews = Reviews::with('content', 'user')->where('id_user', $user->id)->get();
        return response([
            'message' => 'Content of '.$user->name.' Retrieved',
            'data' => $reviews
        ],200);
    }
 
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $storeData = $request->all();

        $validate = Validator::make($storeData,[
            'id_content' => 'required|numeric',
            'comment' => 'required',
        ]);
        if ($validator->fails()) {
            return response(['message'=> $validate->errors()],400);
        }
        $idUser = Auth::user()->id;
        $user = User::find($idUser);
        if(is_null($user)){
            return response([
                'message' => 'User Not Found'
            ],404);
        }
        $content = Contents::find($storeData['id_content']);
        if(is_null($contents)){
            return response([
                'message' => 'Content Not Found'
            ],404);
        }

        $reviews = Reviews::find($storeData['comment']);
        if(is_null($reviews)){
            return response([
                'message' => 'Review must be filled'
            ],404);
        }

        $reviews = Reviews::create($storeData);
        return response([
            'message' => 'Review Added',
            'data' => $reviews,
        ],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $reviews = Reviews::find($id);

        if($reviews){
            return response([
                'message' => 'Review Found',
                'data' => $reviews
            ],200);
        }

        return response([
            'message' => 'Review Not Found',
            'data' => null
        ],404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $reviews = Reviews::find($id);

        if(is_null($reviews)){
            return response([
                'message' => 'Review Not Found',
                'data' => null
            ],404);
        }

        if($reviews->delete()){
            return response([
                'message' => 'Review Deleted',
                'data' => $reviews,
            ],200);
        }

        return response([
            'message' => 'Delete Review Failed',
            'data' => null,
        ],400);
    }
}